//app.js
const serverUrl = 'http://127.0.0.1:8090/';

App({
  globalData: {
    userInfo: null,
    user:null,
    serverUrl:serverUrl,
    token: ""
  },
  onLaunch: function () {
    // 调用登录方法，处理登录
    this.userLogin();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //登录
  userLogin: function () {
    var that = this;
    //获取登录code
    wx.login({
      // 小程序登录接口
      success: function (res) {
        if (res.code) {
          that.login(res.code);
        } else {
          // 登录失败的话 ，重新调用 登录方法
          that.userLogin();
          return false;
        }
      }
    })
  },
  //login
  login: function (code) {
    // code是wx.login 后拿到的code
    var that = this;
    let param = {
      code:code
    }
    //登录请求
    that.request(that.globalData.serverUrl+"auth/wxLogin","get", param).then(res => {
      const data = res;
      if (data.user) {
        that.globalData.user = data.user;
        that.globalData.token = data.token;
        wx.setStorageSync('token', data.token);
        wx.setStorageSync('user', data.user);
        wx.switchTab({
          url: '/pages/device/device'
        });
      }else {
        wx.redirectTo({
          url: '/pages/login/login?openId='+data.openId
        });
      }
    })
  },
 
  request (url,method,params) {
    //拿到用户标识时立刻放入缓存，保证每次请求带token
    let token = wx.getStorageSync('token');
    return new Promise((resolve,reject) => {
      wx.request({
        url: url,  // path路径需要自己在对应文件中配置业务需要的路径
        method: method,
        data: params,
        header: {
          'content-type': 'application/json', // 默认值
          'Access-Token': token
        },
        success: res => {
          if (res.statusCode !== 200 || res.data.code != 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              mask: true,
              duration: 1500
            })
            reject({ error: '服务器忙，请稍后重试', code: 500 });
            return;
          }
          let resData = res.data;
          resolve(resData.data)
        },
        fail: error => {
          wx.showToast({
            title: "服务器忙，请稍后重试",
            icon: 'none',
            mask: true,
            duration: 1500
          })
          reject(error)
        }
      });
    })
  }
})
// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:"",
    userInfo: {},
    username:"",
    password:""
  },

    //事件处理函数
  login: function() {
    let params = {
      username: this.data.username,
      password: this.data.password,
      openId: this.data.openId
    }
    console.log(params);
    app.request(app.globalData.serverUrl + '/auth/wxBinding',"post", params).then(res=>{
      app.globalData.user = res.user;
      app.globalData.token = res.token;
      wx.switchTab({
        url: '/pages/device/device'
      });
    })
  },

  usernameIn:function(e){
    this.setData({username: e.detail});
  },
  passwordIn: function (e) {
    this.setData({password: e.detail});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openId: options.openId,
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
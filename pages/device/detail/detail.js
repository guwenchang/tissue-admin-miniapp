// pages/device/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: undefined,
    item: {},
    markers: [],
    addWipe: false,
    testWipe: false,
    wipeType: '1',
    dryWipesCount: 0,
    wetWipesCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.getData()
  },
  addWipe() {
    this.setData({
      addWipe: true
    })
  },
  testWipe() {
    this.setData({
      testWipe: true
    })
  },
  onAddWipeClose() {
    this.setData({
      addWipe: false
    });
  },
  onTestWipeClose() {
    this.setData({
      testWipe: false
    });
  },

  dryWipesCountChange: function (e) {
    this.setData({dryWipesCount: e.detail});
  },
  wetWipesCountChange: function (e) {
    this.setData({wetWipesCount: e.detail});
  },
  wipeTypeChange: function (e) {
    this.setData({wipeType: e.detail});
  },
  reStart() {
    // 发起请求
    wx.showLoading({
      title: '提交中',
    })
    let reStartParam = {
      deviceIds: [this.data.item.deviceId]
    }
    app.request(app.globalData.serverUrl + '/device/restart', "post",reStartParam).then(res => {
      wx.hideLoading()
      this.setData({
        testWipe: false
      })
      wx.showToast({
        title: '命令发送成功',
        icon: 'success',
        duration: 2000
      })
    })
  },
  testWipeSubmit() {
    // 发起请求
    wx.showLoading({
      title: '提交中',
    })
    let testWipeParam = {
      deviceId: this.data.item.deviceId,
      wipeType: this.data.wipeType
    }
    app.request(app.globalData.serverUrl + '/device/testWipe', "post",testWipeParam).then(res => {
      wx.hideLoading()
      this.setData({
        testWipe: false
      })
      wx.showToast({
        title: '加纸成功',
        icon: 'success',
        duration: 2000
      })
    })
  },
  addWipeSubmit() {
    // 发起请求
    wx.showLoading({
      title: '提交中',
    })
    let addWipeParam = {
      deviceId: this.data.item.deviceId,
      dryWipesCount: this.data.dryWipesCount,
      wetWipesCount: this.data.wetWipesCount
    }
    app.request(app.globalData.serverUrl + '/device/addWipe', "post",addWipeParam).then(res => {
      wx.hideLoading()
      this.setData({
        addWipe: false
      })
      this.getData()
      wx.showToast({
        title: '加纸成功',
        icon: 'success',
        duration: 2000
      })
    })
  },
  getData() {
    // 发起请求
    wx.showLoading({
      title: '加载中',
    })
    app.request(app.globalData.serverUrl + '/device/' + this.data.id, "get").then(res => {
      wx.hideLoading()
      let arr = this.bMapToQQMap(res.place.longitude, res.place.latitude);
      res.place.longitude = arr[0]
      res.place.latitude = arr[1]
      let markers = [{
        latitude: res.place.latitude,
        longitude: res.place.longitude,
        name: res.place.name
      }]
      this.setData({
        item: res
      })
      this.setData({
        markers: markers
      })
      console.log(markers)
    })
  },


  /**
   * 坐标转换，百度地图坐标转换成腾讯地图坐标
   * lng 腾讯经度（pointy）
   * lat 腾讯纬度（pointx）
   * 经度>纬度
   */
  bMapToQQMap(lng, lat) {
    if (lng == null || lng == '' || lat == null || lat == '')
      return [lng, lat];
    var x_pi = 3.14159265358979324;
    var x = parseFloat(lng) - 0.0065;
    var y = parseFloat(lat) - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var lng = (z * Math.cos(theta)).toFixed(7);
    var lat = (z * Math.sin(theta)).toFixed(7);
    return [lng, lat];
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
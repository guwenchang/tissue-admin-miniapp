// pages/device/device.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    devices : [],
    type: 0,
    pageNo: 0,
    pageSize: 10,
    isLastPage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("device")
    this.getData()
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

  },

  typeChange: function (e) {
    this.setData({ 
      pageNo: 0,
      type: e.detail.name,
      isLastPage: false,
      devices: []
    })
    this.getData()
  },

  detail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/device/detail/detail?id=' + id
    })
  },

  getData() {
    if (this.data.isLastPage) {
      return
    }
    this.setData({ pageNo: this.data.pageNo + 1 })
    // 发起请求
    wx.showLoading({
      title: '加载中',
    })
    let params = {
      queryType: this.data.type,
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize
    }
    app.request(app.globalData.serverUrl + '/device/page', "get", params)         .then(res => {
        wx.hideLoading()
        var newData = {}
        if (res.records.length < this.data.pageSize) {
          // 没有数据了，已经是最后一页
          newData.isLastPage = true
        }
        // 追加数据
        newData.devices = this.data.devices.concat(res.records)
        this.setData(newData)
      })
  }
})
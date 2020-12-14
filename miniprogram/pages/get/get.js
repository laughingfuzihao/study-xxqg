// pages/get/get.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var needSearch = wx.getStorageSync("ble_deviceId");
    console.log(needSearch)
    console.log(this.isNeedSearch())
    this.enterMainPage(this.isNeedSearch());
  },
  isNeedSearch() {
    var needSearch = wx.getStorageSync("ble_deviceId");
    if (!needSearch) {
      return true;
    }
    return false;
  },

  enterMainPage(flag) {
    if (flag) {
      wx.redirectTo({
        url: '../tx/tx',
      });
    } else {
      wx.redirectTo({
        url: '../search/search',
      });
    }
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

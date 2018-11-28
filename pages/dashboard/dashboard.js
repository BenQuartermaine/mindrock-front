// pages/dashboard/dashboard.js
Page({

  data: {
    days: [1, 2, 3, 4, 5, 6, 7],
    currentDay: 4,
  },

  journalLog: function () {
    wx.navigateTo({
      url: '../journal/journal',
    })
  },



  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**

   * Lifecycle function--Called when page is initially rendered

   */
  onReady: function () {

  },

  onShow: function () {

  },

  /**

   * Lifecycle function--Called when page hide
r
   */
  onHide: function () {

  },

  /**

   * Lifecycle function--Called when page unload

   */
  onUnload: function () {

  },

  /**

   * Page event handler function--Called when user drop down

   */
  onPullDownRefresh: function () {

  },

  /**

   * Called when page reach bottom

   */
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})
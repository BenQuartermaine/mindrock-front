// pages/dashboard/dashboard.js
Page({

  /**

   * Page initial data
   */
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

   */
  onReady: function () {

  },


   */
  onShow: function () {

  },

  /**

   */
  onHide: function () {

  },

  /**

   */
  onUnload: function () {

  },

  /**

   */
  onPullDownRefresh: function () {

  },

  /**

   */
  onReachBottom: function () {

  },

  /**

   */
  onShareAppMessage: function () {

  }
})
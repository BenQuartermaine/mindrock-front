// pages/show/show.js
Page({

  /**
   * Page initial data
   */
  data: {
    showExpand: false, 
    photo: [
      '/img/1.jpg',
      '/img/2.jpg',
      '/img/3.jpg',
      '/img/4.jpg',
      '/img/5.jpg',
      '/img/6.jpg',
      '/img/7.jpg',
      '/img/8.jpg',
    ]
  },
  clickToDash:function (){
    wx.switchTab({
      url: '../dashboard/dashboard'
    })
  },

  expand:function () {
    console.log(this.data.showExpand)
    if (this.data.showExpand) {
      this.setData({
        showExpand: false
      })
    } else {
      this.setData({
        showExpand: true
      })
    }
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const app = getApp()
    const that = this
    const dev = app.globalData.dev
    wx.request({
      url: dev + "api/v1/challenges/1",
      method: 'GET',
      success(res) {
        console.log(res)
        const challenges = res.data
        that.setData(
          challenges
        )
      }
    })

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
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

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
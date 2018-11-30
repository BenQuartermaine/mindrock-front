// pages/show/show.js
Page({

  /**
   * Page initial data
   */
  data: {
    joined: false,
    challenge_list: [],
    challenge: {},
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

    const challenge_id = this.data.challenge.id
    const userId = wx.getStorageSync("userId")
    const app = getApp()
    const dev = app.globalData.dev
    const prod = app.globalData.prod

    const request = {
      user_id: userId
    }
    wx.request({
      url: prod + `/api/v1/challenges/${challenge_id}/assignments`,
      method: "POST",
      data: request,
      success(res) {
        wx.switchTab({
          url: '/pages/dashboard/dashboard',
        })
      }
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

  NavigateToDashboard: function() {
    wx.switchTab({
      url: '/pages/dashboard/dashboard',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('challenges')
    console.log(options)
    const app = getApp()
    const that = this
    const dev = app.globalData.dev
    const prod = app.globalData.prod
    const userId = wx.getStorageSync("userId")

    wx.request({
      url: prod + `api/v1/challenges/${options.id}`,
      method: 'GET',
      success(res) {
        console.log(res)
        const challenge = res.data.challenge
        that.setData(
          { challenge: challenge}
        )

        wx.request({
          url: prod + `api/v1/users/${userId}`,
          method: 'GET',
          success(res) {
            console.log(res)
            let i
            let id = []
            for (i = 0; i < res.data.user.challenges.length; i++) {
              const d = new Date()
              const year = d.getFullYear()
              const month = d.getMonth() + 1
              const day = d.getDate()
              const date = `${year}-${month}-${day}`
              if (res.data.user.challenges[i].assignments[6].date >= date) {
                id.push(res.data.user.challenges[i].id);
              }
            }
            that.setData({
              challenge_list: id,
              joined: id.includes(challenge.id)
            })
          }
        })
      }
    })
    console.log("data")
    console.log(this.data)
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
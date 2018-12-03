// pages/dashboard/dashboard.js
Page({

  data: {
    collapse: false,
    min: '/img/min.svg',
    max: '/img/max.svg',
    dashboardTeamToggle: ['Dashboard', 'Team'],
    dashboardTeamNum: 1,
  },

  dashboardTeamFunction: function (e) {
    console.log(e)
    this.setData ({
      dashboardTeamNum: e.currentTarget.dataset.toggle
    })
  },

  journalLog: function (e) {
    console.log(e)
    const data = e.currentTarget.dataset
    const assignment_id = data.assignment

    wx.navigateTo({
      url: `../journal/journal?assignment=${assignment_id}`,
    })
  },

  journalHistory: function (e) {
    console.log("JournalHistory")
    console.log(e)
    const data = e.currentTarget.dataset
    const assignment_id = data.assignment

    wx.navigateTo({
      url: `../display/display?id=${assignment_id}`
    })
  },

  getDashboardData() {
    const userId = wx.getStorageSync("userId")

    const app = getApp()
    const dev = app.globalData.dev
    const prod = app.globalData.prod

    const page = this

    wx.request({
      url: dev + `api/v1/users/${userId}`,
      method: "GET",
      success(res) {
        page.setData(
          res.data
        )
      }
    })
    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    let date = ""

    if(day<10){
      date = `${year}-${month}-0${day}`;
    }else{
      date = `${year}-${month}-${day}`;
    }
    
    this.setData({
      currentDay: date
    })
  },

  // Expand and minimize challenge box
  expand: function () {
    console.log(this.data.collapse)
    if (this.data.collapse) {
      this.setData({
        collapse: false
      })
    } else {
      this.setData({
       collapse: true
      })
    }
  },
  
  /**Display Show Page */
  // displayShow: function (e) {
  //   console.log(displayShow)
  //   console.log(e)
  //   const data = e.currentTarget.dataset
  //   const assignment_id = data.assignment

  //   wx.redirectTo({
  //     url: `../display/display?id=${assignment_id}`,
  //   })
  // },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options)
    this.getDashboardData()
    const userInfo = wx.getStorageSync("userInfo")
    this.setData({
      avatar: userInfo.avatarUrl
    })
    console.log(this.data)
  },

  /**

   * Lifecycle function--Called when page is initially rendered

   */
  onReady: function () {

  },

  onShow: function () {
    this.getDashboardData()
    const userInfo = wx.getStorageSync("userInfo")
    this.setData({
      avatar: userInfo.avatarUrl
    })
    console.log(this.data)
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
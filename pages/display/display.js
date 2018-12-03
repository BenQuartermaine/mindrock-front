// pages/display/display.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: [
      '/img/1.jpg',
      '/img/2.jpg',
      '/img/4.jpg',
      '/img/5.jpg',
      '/img/6.jpg',
      '/img/7.jpg',
      '/img/8.jpg',
    ]
  },
  redirectDashboard: function () {

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
      method: "GET",
      data: request,
      success(res) {
        wx.switchTab({
          url: '/pages/dashboard/dashboard',
        })
      }
    })
  },
  getDisplayData() {
    const userId = wx.getStorageSync("userId")

    const app = getApp()
    const dev = app.globalData.dev
    const prod = app.globalData.prod

    const page = this
  },
    // wx.request({
    //   url: prod + `api/v1/users/${userId}`,
    //   method: "GET",
    //   success(res) {
    //     page.setData(
    //       res.data
    //     )
    //   }
    // })
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log()
    this.getDisplayData()
    const userInfo = wx.getStorageSync("userInfo")
    this.setData({
      avatar: userInfo.avatarUrl
    })
    console.log(this.data)

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
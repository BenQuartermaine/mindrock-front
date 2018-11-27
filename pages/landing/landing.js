// pages/landing/landing.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  clickSearch: function (e) {
   wx.navigateTo({
     url: 'pages/index/index',
   })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // get user_id from local storage if it exists
    let userId = wx.getStorageSync("userId")
    if (userId) {
      wx.switchTab({
        // if already has user_id, switch to index page
        url: '../index/index',
      });
    }else{
      // if no userid in storage
      let page = this
      const host = app.globalData.dev
      // send post request to wx
      // wx.login({
      //   success: (res) => {
      //     wx.request({
      //       url: host + 'login',
      //       method: 'POST',
      //       data: {
      //         code: res.code
      //       },
      //       success: (res) => {
      //         //store userid in local storage
      //         wx.setStorageSync("userId", res.data.userId)
      //       }
      //     })
      //   }
      // })

    }

  },

  getUserInfo: function (e) {
    let userInfo = e.detail.userInfo
    wx.setStorageSync("userInfo", userInfo)

    wx.switchTab({
      url: '../index/index',
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
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
      // get api url from globalData, dev for testing, prod for production
      const dev = app.globalData.dev
      const prod = app.globalData.prod
      //send post request to wx
      wx.login({
        success: (res) => {
          console.log(res)
          wx.request({
            url: dev + 'login',
            method: 'POST',
            data: {
              code: res.code
            },
            success: (res) => {
              //store userid in local storage
              wx.setStorageSync("userId", res.data.userId)
            }
          })
        }
      })

    }

  },

  getUserInfo: function (e) {
    let userInfo = e.detail.userInfo
    wx.setStorageSync("userInfo", userInfo)
    let userId = wx.getStorageSync("userId")
    const dev = app.globalData.dev
    const prod = app.globalData.prod
    wx.request({
      url: dev + `api/v1/users/${userId}`,
      method: "PUT",
      data: {
        user: userInfo
      },
      success: (res) => {
        console.log(res.data)
        wx.switchTab({
          url: '../index/index',
        })
      }
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
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  // --------for submission only----------
  ClickCreativity: function() {
   wx.navigateTo({
     url: '/pages/creativity/creativity',
     success: function (res) { },
     fail: function (res) { },
     complete: function (res) { },
   })
  },
  ClickSpeaking: function () {
    wx.navigateTo({
      url: '/pages/speaking/speaking',
    })
  },
  ClickNo: function () {
    wx.navigateTo({
      url: '/pages/yes/yes',
    })
  },
  ClickYes: function () {
    wx.navigateTo({
      url: '/pages/no/no',
    })
  },
  // ------------for submission only-----------

  onLoad: function () {
    // get api url from globalData, dev for testing, prod for production
    const dev = app.globalData.dev
    const prod = app.globalData.prod
    // get current user id
    const userId = wx.getStorageSync("userId")

    const page = this

    wx.request({
      url: dev + 'api/v1/challenges',
      method: "GET",
      success(res) {
        page.setData(
          res.data
        )
      }
    })
  },

  showChallenge(e) {
    console.log(e)
    const data = e.currentTarget.dataset;
    const challenge = data.challenge;

    wx.navigateTo({
      url: `../show/show?id=${challenge.id}`
    });
  }
  
})

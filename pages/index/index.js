//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
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

  onLoad: function () {
    // get api url from globalData, dev for testing, prod for production
    const dev = app.globalData.dev
    const prod = app.globalData.prod
  },
  
})

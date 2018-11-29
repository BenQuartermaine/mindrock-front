//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    categories: [],
    photos: [
      '/img/confidence.png',
      '/img/self-awareness.png',
      '/img/courage.png',
      '/img/productivity.png',
      '/img/habit.png',
      '/img/communication.jpg',
      
    ]
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

  getChallengeData() {
    const dev = app.globalData.dev
    const prod = app.globalData.prod
    const userId = wx.getStorageSync("userId")
    const page = this

    wx.request({
      url: dev + 'api/v1/categories',
      method: "GET",
      success(res) {
        page.setData({
          categories: res.data

        })
      }
    })
    console.log(this.data)
  },
  // ------------for submission only-----------

  onLoad: function () {
    this.getChallengeData()

  },

  showChallenge(e) {
    console.log(e)
    const data = e.currentTarget.dataset;
    const challenge = data.challenge;

    wx.navigateTo({
      url: `../show/show?id=${challenge.id}&name=${challenge.name}`
    });
  },
})

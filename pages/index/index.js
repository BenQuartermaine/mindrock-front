//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  

  getChallengeData() {
    const dev = app.globalData.dev
    const prod = app.globalData.prod
    const userId = wx.getStorageSync("userId")
    const page = this

    wx.request({
      url: prod + 'api/v1/categories',
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

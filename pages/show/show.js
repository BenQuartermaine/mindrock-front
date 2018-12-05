// pages/show/show.js
Page({

  /**
   * Page initial data
   */
  data: {
    joined: false,
    challenge_dash: [],
    challenge_team: [],
    challenge: {},
    showExpand: false, 
    photo: [
      '/img/1.jpg',
    ],
    difficulty: ['Easy', 'Medium', 'Hard'],
    howDifficult: 'Medium',
    difficultyColor: ['background-color: #1B51B8', 'background-color: #D1693E', 'background-color: #B8321B'],
    howDifficultColor: "background-color: green",
  },
  
  randomSelector: function (data) {
    console.log('Random selector selecting a difficulty...')
    let difficult = this.data.difficulty[Math.floor(Math.random() * this.data.difficulty.length)]
    let difColor = this.data.difficultyColor
    let howDifficult = this.howDifficult
    let howDifficultColor = this.howDifficultColor
    let newDifColor = ""
    let difficulty = this.data.difficulty

    this.setData({
      howDifficult: difficult,
    })
// If statememt determining the 
   if (difficult == difficulty[0]) {
      newDifColor = difColor[0]
   } else if (difficult == difficulty[1]) {
      newDifColor = difColor[1]
    } else {
      newDifColor = difColor[2]
    }
    this.setData({
      howDifficultColor: newDifColor
    })
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
    app.globalData.toggle_tab = 0
    
    wx.request({
      url: prod + `api/v1/challenges/${challenge_id}/assignments`,
      method: "POST",
      data: request,
      success(res) {
        wx.switchTab({
          url: '/pages/dashboard/dashboard',
        })
        
      }
    })
  
  },

  createTeam: function () {
    const challenge_id = this.data.challenge.id
    const userId = wx.getStorageSync("userId")
    const app = getApp()
    const dev = app.globalData.dev
    const prod = app.globalData.prod
    const page = this

    const request = {
      userId: userId,
      challenge_id: challenge_id,
      user_id: userId
    }
    app.globalData.toggle_tab = 1
    console.log(app.globalData.toggle_tab)
    wx.request({
      url: prod + `api/v1/teams`,
      method: "POST",
      data: request,
      success(res) {
        wx.request({
          url: prod + `api/v1/challenges/${challenge_id}/assignments`,
          method: "POST",
          data: request,
          success(res) {
            wx.switchTab({
              url: '/pages/dashboard/dashboard',
            })
          }
        })
      }
    })
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
    this.randomSelector(this.data)
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
            let id_c = []
            let id_t = []
            for (i = 0; i < res.data.user.challenges.length; i++) {
              const d = new Date()
              const year = d.getFullYear()
              const month = d.getMonth() + 1
              const day = d.getDate()
              let date = ""

              if (day < 10) {
                date = `${year}-${month}-0${day}`;
              } else {
                date = `${year}-${month}-${day}`;
              }
              
              if (res.data.user.challenges[i].dashboard) {
                if (res.data.user.challenges[i].dashboard.assignments[res.data.user.challenges[i].dashboard.assignments.length - 1].date >= date) {
                  id_c.push(res.data.user.challenges[i].dashboard.id);
                }
              }
              
              if (res.data.user.challenges[i].team) {
                if (Object.keys(res.data.user.challenges[i].team.teams)[Object.keys(res.data.user.challenges[i].team.teams).length - 1] >= date) {
                  id_t.push(res.data.user.challenges[i].team.id);
                }
              }
            }
            that.setData({
              challenge_dash: id_c,
              challenge_team: id_t,
              joined_d: id_c.includes(challenge.id),
              joined_t: id_t.includes(challenge.id)
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
// pages/invite/invite.js
const app = getApp()
const dev = app.globalData.dev
const prod = app.globalData.prod
Page({

  /**
   * Page initial data
   */
  data: {
    showExpand: false,
    photo: [
      '/img/1.jpg',
      '/img/2.jpg'
    ],
    ismember: false
  },

  onShareAppMessage: function(){
    console.log('share');
    wx.showShareMenu({
      withShareTicket:true
    })
  },
  expand: function () {
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

  clickToDecline: function () {
    wx.navigateTo({
      url: '/pages/landing/landing',
    })
  },

  clickToAccept: function () {
    let userId = wx.getStorageSync("userId")
    const page = this
    const dev = app.globalData.dev
    const prod = app.globalData.prod

    const userInfo = wx.getStorageSync("userInfo")

    if (userInfo) {
      console.log("hi")
      wx.request({
        url: prod + `api/v1/teams/${page.data.team_id}`,
        method: "PUT",
        data: {
          userId: userId
        },
        success: (res) => {
          page.createAssignment()
        }
      })
    }else {
      console.log("uygygyugyugy")
      wx.getUserInfo({
        success: (res) => {
          console.log(111, res)
          const userInfo = res.userInfo
          wx.setStorageSync("userInfo", userInfo)
          // update user with user info
          wx.request({
            url: prod + `api/v1/users/${userId}`,
            method: "PUT",
            data: {
              user: userInfo
            },
            success: (res) => {
              console.log(res.data)
              // update team & create assignment
              wx.request({
                url: prod + `api/v1/teams/${page.data.team_id}`,
                method: "PUT",
                data: {
                  userId: userId
                },
                success: (res) => {
                  page.createAssignment()
                }
              })
            }
          })
          page.clickToAccept()
        }
      })
    }
  },

  createAssignment: function () {

    const challenge_id = this.data.challenge_id
    const userId = wx.getStorageSync("userId")
    const app = getApp()
    const dev = app.globalData.dev
    const prod = app.globalData.prod

    const request = {
      user_id: userId
    }
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

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const page = this
    console.log("team")
    console.log(options)
    // get team/challenge id from the click in dashboard
    const team_id = options.team_id
    const challenge_id = options.challenge_id
    const challenge_name = options.challenge_name
    const description = options.description
    this.setData({
      team_id: team_id,
      challenge_id: challenge_id,
      challenge_name: challenge_name,
      description: description
    })
    // get user_id from local storage if it exists
    let userId = wx.getStorageSync("userId")
    if (userId) {
      // if already has user_id, ...
    } else {
      // if no userid in storage
      // get api url from globalData, dev for testing, prod for production
   
      //send post request to wx
      wx.login({
        success: (res) => {
          console.log(res)
          wx.request({
            url: prod + 'login',
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
  // get team members info
    wx.request({
      url: prod + `api/v1/teams/${page.data.team_id}`,
      method: "GET",
      success(res) {
        console.log("memebers id")
        console.log(res)
        page.setData({
          leader: res.data.team.leader,
          members: res.data.team.members
        })
        console.log(page.data)
        let person = []
        let i
        // hide accept for team leader
        for (i = 0; i < page.data.members.length; i++) {
          person.push(page.data.members[i].id)
        }
        page.setData({
          ismember: person.includes(userId),
        })
      }
    })
   
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
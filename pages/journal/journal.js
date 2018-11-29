let app = getApp();
let host = app.globalData.dev;
const AV = require('../../utils/av-weapp-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: "/img/upload.png",
    assignment_id: '',
  },

  photoUpload: function () {
    var page = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        page.setData({
          tempFilePaths: res.tempFilePaths[0]
        })
      }
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let page = this

    new AV.File('file-name', {
      blob: {
        uri: this.data.tempFilePaths,
      },
    }).save().then(
      function (file) {
        //got url from LeanCloud
        console.log(file.url())
        let userId = wx.getStorageSync("userId")
        // console.log(userId)
        let journal = {
          user:{
            user_id: userId
          },
          assignment: {
            assignment_id: page.data.assignment_id,
            status: true,
          },
          content: e.detail.value.content,
          summary_tag_list: e.detail.value.summary_tag_list,
          photo_tag_list: file.url(),
        }
      
    wx.request({
      url: host +`api/v1/assignments/${page.data.assignment_id}/journals`,
      method: 'POST',
      data: journal,
      success(res) {
        // console.log(res)
        // wx.navigateTo({
        //   url: '../confirm/confirm',
        // })
      }
      })
      }).catch(console.error)
  },

  journalSuccess: function() {
    // wx.showModal({
    //   title: ' Your Mind Rock',
    //   content: 'Journal submitted successfully!',
    //   confirmText: "Rock",
    //   confirmColor: '#931621',
    //   showCancel: false,
    //   success: function () {
      const page = this
        wx.navigateTo({
          url: `../confirm/confirm?id=${page.data.assignment_id}`,
        })
      },
    // })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    this.setData({
      assignment_id: options.id
    })
    //get the assignment data and set to page data
   
 
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
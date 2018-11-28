let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    const userId = wx.getStorageSync("userId")
    console.log(userId)
    let host = app.globalData.dev
    let page = this
    
    let journal = {
      user:{
        user_id: userId
      },
      assignment: {
        assignment_id: options.id,
        status: true,
      },
      content: e.detail.value.content,
      summary_tag_list: e.detail.value.summary_tag_list,
      photo_tag_list: e.detail.value.photo_tag_list
    };

    wx.request({
      url: host +`assignments/${page.data.assignment_id}/journals`,
      method: 'POST',
      data: journal,
      success(res) {
        console.log(res)
        // wx.redirectTo({
        //   url: '',
        // })
      }
    })
  },
  journalSuccess: function() {
    wx.showModal({
      title: ' Your Mind Rock',
      content: 'Journal submitted successfully!',
      confirmText: "Rock",
      confirmColor: '#931621',
      showCancel: false,
      success: function (res) {
        wx.switchTab({
          url: '../index/index'
        })
      },
    })
  },

  backhome: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
import initCalendar from '../../template/calendar/index';
import { getSelectedDay } from '../../template/calendar/index';
// import initDatepicker from '../../template/datepicker/index';
const conf = {
  disablePastDay: false,
  defaultDay: false,
  // placeholder: 'Pick a date', // input 输入框
  // type: 'normal',
  };
const app = getApp();
const dev = app.globalData.dev;
const prod = app.globalData.prod;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: [
      '/img/1.jpg',
      '/img/2.jpg',
      '/img/4.jpg',
      '/img/5.jpg',
      '/img/6.jpg',
      '/img/7.jpg',
      '/img/8.jpg',
    ],
    calendar_show: false,
  
  },
  showCalendar: function () {
    this.setData({
      calendar_show: true
    })
  },
  redirectDashboard: function () {
        wx.switchTab({
          url: '/pages/dashboard/dashboard',
        })
  },
  getDisplayData() {
    const userId = wx.getStorageSync("userId")

    const app = getApp()
    const dev = app.globalData.dev
    const prod = app.globalData.prod
    const page = this
  },
    // wx.request({
    //   url: dev + `api/v1/users/${userId}`,
    //   method: "GET",
    //   success(res) {
    //     page.setData(
    //       res.data
    //     )
    //   }
    // })
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    const page =this
    console.log("JournalDisplay")
    console.log(options)
    const assignment_id = options.id
    this.getDisplayData()
    const userInfo = wx.getStorageSync("userInfo")
    this.setData({
      avatar: userInfo.avatarUrl,
      assignment_id: assignment_id
    })
   
    
    wx.request({
      url: prod + `api/v1/assignments/${assignment_id}/journals`,
      method: "GET",
      success(res) {
        console.log(res.data)
        const data = res.data.journals.journals[0]
        page.setData({
          date: res.data.journals.date,
          content: data.content,
          id: data.id,
          photo_tag_list: data.photo_tag_list
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

    initCalendar(conf);
    // initDatepicker(conf);

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
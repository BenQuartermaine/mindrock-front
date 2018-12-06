import initCalendar from '../../template/calendar/index';
import { getSelectedDay } from '../../template/calendar/index';
// import initDatepicker from '../../template/datepicker/index';
const conf = {
  disablePastDay: false,
  defaultDay: false
};
const app = getApp();
const dev = app.globalData.dev;
const prod = app.globalData.prod;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendar_show: false
  
  },
  showCalendar: function () {
    this.setData({
      calendar_show: true
    })
  },
  redirectDashboard: function () {
    wx.switchTab({
      url: '/pages/dashboard/dashboard'
    })
  },

  getDisplayData() {
    const userId = wx.getStorageSync("userId")

    const app = getApp()
    const dev = app.globalData.dev
    const prod = app.globalData.prod
    const page = this
  },

  dayPicker: function () {
    const page = this
    const userId = wx.getStorageSync("userId")
    console.log(getSelectedDay());
    let choose = getSelectedDay()[0];
    console.log(choose);
    let chooseDate ="";
    if (choose.day < 10) {
      chooseDate = `${choose.year}-${choose.month}-0${choose.day}`;
    } else {
      chooseDate = `${choose.year}-${choose.month}-${choose.day}`;
    }
    console.log(chooseDate);
    this.setData({
      date: chooseDate,
      calendar_show: false
    })

    wx.request({
      url: prod + `api/v1/users/${userId}/assignments?date=${page.data.date}`,
      method: "GET",

      success(res) {
        console.log("assignments")
        console.log(res)
        let response = res.data.assignments
        console.log(response)
        if (response.length == 0 ) {
          wx.showModal({
          title: 'No Journal on Seleted Day',
          content: 'Keep Working to Make your Mind Stronger!',
          showCancel: false,
          confirmText: "Rock",
          confirmColor: "#3CC51F"
        })
          page.setData({
            content: "Your Mind Rocks",
            photo_tag_list: "/img/sunrise.png"
          })
        } else{
          let data = response[0].journals[0]
          page.setData({
            content: data.content,
            id: data.id,
            photo_tag_list: data.photo_tag_list
          })
        }
        
      }
     
      
    })
  },

  selectAssignment(date) {

  },
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
    const userId = wx.getStorageSync("userId")
    this.setData({
      avatar: userInfo.avatarUrl,
      assignment_id: assignment_id,
      userId: userId
    })
   
    
    wx.request({
      url: prod + `api/v1/assignments/${assignment_id}/journals`,
      method: "GET",
      success(res) {
        console.log(res.data)
        let data = res.data.assignment.journals[0]
        page.setData({
          date: res.data.assignment.date,
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
    // initDatepicker(config);

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
import initCalendar from '../../template/calendar/index';
import { getSelectedDay } from '../../template/calendar/index';
import initDatepicker from '../../template/datepicker/index';
const conf = {
  disablePastDay: false,
  defaultDay: false,
  afterTapDay: (currentSelect, allSelectedDays) => { },
  /**
   * 日期点击事件（此事件会完全接管点击事件）
   * @param { object } currentSelect 当前点击的日期
   * @param { object } event 日期点击事件对象
   */
  onTapDay(currentSelect, event) { },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender() { },
  };
const config = {
  disablePastDay: false, // 是否禁选过去日期
  showInput: false, // 默认为 true
  placeholder: '请选择日期', // input 输入框
  type: 'normal', // [normal 普通单选模式(默认), timearea 时间区域选择模式(待开发), multiSelect 多选模式(待完善)]

  /**
   * 选择日期后执行的事件
   * @param { object } currentSelect 当前点击的日期
   */
  afterTapDay: (currentSelect) => { },

  /**
   * 日期点击事件（此事件会完全接管点击事件）
   * @param { object } currentSelect 当前点击的日期
   * @param {object} event 日期点击事件对象
   */
  onTapDay(currentSelect, event) { },
}
const app = getApp();
const dev = app.globalData.dev;
const prod = app.globalData.prod;
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
        const data = res.data.assignment.journals[0]
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
    initDatepicker(config);

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
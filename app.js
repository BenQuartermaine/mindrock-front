//app.js
const AV = require('./utils/av-weapp-min.js')
const config = require('./key')

AV.init({
  appId: config.appId,
  appKey: config.appSecret,
});
App({
  onLaunch: function () {
    this.globalData.dev = 'http://localhost:3000/'
    this.globalData.prod = 'https://mindrock.wogengapp.cn/'
  },
  globalData: {
    // development mode testing api
    dev: '',
     // production mode testing api
    prod: ''
  }
})

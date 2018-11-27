//app.js
App({
  onLaunch: function () {
    this.globalData.dev = 'http://localhost:3000/'
  },
  globalData: {
    // development mode testing api
    dev: '',
     // production mode testing api
    prod: ''
  }
})
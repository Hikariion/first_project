// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionList: [{
        "url":"/xx",
        "title": "我的"
      },
      {
        "url":"/xx",
        "title": "信誉中心"
      },
      {
        "url":"/xx",
        "title": "。。。"
      },
    ],


    isLogin: false,
    avatarUrl:"",
    nickname:"",
  },

  /**
   * 点击登录
   */
clickLogin(e){
  console.log("eeeee:",e)
  var that = this
  if(e.detail.errMsg=="getUserInfo:ok"){
    that.setData({
      avatarUrl:e.detail.userInfo.avatarUrl,
      nickName:e.detail.userInfo.nickName
    })
    wx.login({
      success (res) {
        if (res.code) {
          var code = res.code
          // 获取code2Session
          wx.request({
            // 服务器url
            url:"http://localhost:8081/user/login?code="+code,
            success(res) {
              if(!res.data.errcode){
                that.setData({
                  isLogin:true
                })
                console.log("登录成功",res)
              }
              else{
                console.log('登录失败',res)
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  },
  /**
   * 查看是否已经授权
   */
  chackAuth(){
    var that = this
    wx.getSetting({
      success(res){
        // 查看是否授权
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success(res){
              that.setData({
                avatarUrl:res.userInfo.avatarUrl,
                nickName:res.userInfo.nickName,
                isLogin:true
              })
            }
          })
        }
      }
    })
  },

   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.chackAuth()
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
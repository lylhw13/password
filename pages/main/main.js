// pages/main/main.js
var Crypto = require('../../utils/cryptojs/cryptojs.js').Crypto;
var CryptoJS = require('../../utils/components/core.js');
require('../../utils/components/sha256.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      show_flag : [true,false],
      passwd:"hello",
      passwdStr : "******"
  },

  onEyeChange: function(e){
     var id = e.currentTarget.id
     this.data.show_flag[id] = !this.data.show_flag[id];
     if(id == 1) {
       if(this.data.show_flag[id])
          this.data.passwdStr = this.data.passwd;
        else {
          this.data.passwdStr = '*'.repeat(this.data.passwd.length);
        }
     }
     this.setData({
       show_flag : this.data.show_flag,
       passwdStr : this.data.passwdStr
     })
  },

  onCopyPasswd: function(e) {
    wx.setClipboardData({
      data: this.data.passwd,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(CryptoJS.SHA256("你好").toString());
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
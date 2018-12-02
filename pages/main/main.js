// pages/main/main.js
var Crypto = require('../../utils/cryptojs/cryptojs.js').Crypto;
var CryptoJS = require('../../utils/components/core.js');
require('../../utils/components/sha256.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_flag: [true, false],
    seed_state: false,
    passwd: "hello",
    passwdStr: "",
    the_seed_key: "seed",

    inputData: ["", ""],

    //dialog
    showModal: false,
    showModalId: 0, // 0 InitSeed
    modalDialog: [{
      title: "设定种子",
      inputHolder: ["请输入种子", "请再次输入种子"],
      password: [true, true]
    }]

  },

  onEyeChange: function(e) {
    var id = e.currentTarget.id
    this.data.show_flag[id] = !this.data.show_flag[id];
    if (id == 1) {
      if (this.data.show_flag[id])
        this.data.passwdStr = this.data.passwd;
      else {
        this.data.passwdStr = '*'.repeat(this.data.passwd.length);
      }
    }
    this.setData({
      show_flag: this.data.show_flag,
      passwdStr: this.data.passwdStr
    })
  },

  onCopyPasswd: function(e) {
    wx.setClipboardData({
      data: this.data.passwd,
    });
  },

  onToSettings: function(e) {
    wx.navigateTo({
      url: '../settings/settings',
    });
  },

  onInitSeed: function(e) {
    if (!this.data.showModal) {
      this.setData({
        showModal: true,
      })
    }
  },
  bindKeyInput: function(e) {
    var id = e.currentTarget.id;
    this.data.inputData[id] = e.detail.value;
  },
  onBtnCancel: function() {
    this.setData({
      showModal: false,
      inputData: ["", ""]
    })
  },
  onBtnConfirm: function(e) {
    if (this.data.inputData[0].length != 0 || this.data.inputData[1].length != 0) {
      if (this.data.inputData[0] === this.data.inputData[1]) {
        var seedStr = CryptoJS.SHA256(this.data.inputData[0]).toString();
        wx.setStorageSync(this.data.the_seed_key, seedStr);

        this.data.seed_state = true;

      } else {
        wx.showToast({
          title: 'The two input is different',
        })
      }
    } else {
      wx.showToast({
        title: 'One input is empty',
      })
    }

    this.setData({
      showModal: false,
      inputData: ["", ""],
      seed_state: this.data.seed_state
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setStorageSync("seed", "");
    var seed = wx.getStorageSync('seed');
    if (seed.length == 0) {
      this.data.seed_state = false;
    } else if (seed.length == 64) {
      this.data.seed_state = true;
    } else {
      this.data.seed_state = false;
      wx.setStorageSync("seed", "");
    }
    this.setData({
      seed_state: this.data.seed_state
    })
    console.log(CryptoJS.SHA256("你好").toString());
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
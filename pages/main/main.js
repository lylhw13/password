// pages/main/main.js
var Crypto = require('../../utils/cryptojs/cryptojs.js').Crypto;
var CryptoJS = require('../../utils/components/core.js');
require('../../utils/components/sha256.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_flag: [true, false],   // 口令和密码是否显示为明文
    seed_state: false,
    passwd: "",
    passwdStr: "",    // show in the page, it may be string or ***
    inputKey: "",   //用户输入的口令
    inputKeyText: "",   //仅用于清空输入框
    seedKey: "seed",    //seed的键名


    //dialog
    dialogInputData: ["", ""],
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
    if (this.data.seed_state && this.data.passwd.length != 0) {
      wx.setClipboardData({
        data: this.data.passwd,
      });
    }
    this.setData({
      passws: "",     // after the copy, clear the passwd
      passwdStr: "",
      inputKeyText: "",

    })
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

  bindTextInput: function(e) {    // the dialog input
    var id = e.currentTarget.id;
    this.data.dialogInputData[id] = e.detail.value;
  },

  bindKeyInput: function(e) {     // the key input
    this.data.inputKey = e.detail.value;
  },


  onBtnCancel: function() {
    this.setData({
      showModal: false,
      dialogInputData: ["", ""]
    })
  },

  onBtnConfirm: function(e) {
    if ((this.data.dialogInputData[0].length != 0 || this.data.dialogInputData[1].length != 0) && this.data.dialogInputData[0] === this.data.dialogInputData[1]) {
      var seedStr = CryptoJS.SHA256(this.data.dialogInputData[0]).toString();
      wx.setStorageSync(this.data.seedKey, seedStr);
      this.data.seed_state = true;
      wx.showToast({
        title: '种子设定成功',
      })
    } else {
      wx.showToast({
        title: '输入值为空或不一致',
        icon: "none"
      })
    }

    this.setData({
      showModal: false,
      dialogInputDataa: ["", ""],
      seed_state: this.data.seed_state
    })
  },

  onGeneratePasswd: function() {
    if(this.data.inputKey.length!=0) {
      console.log(this.data.inputKey)
    }
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
});

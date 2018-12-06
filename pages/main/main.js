// pages/main/main.js
var CryptoJS = require('../../utils/components/core.js');
require('../../utils/components/sha256.js');
require('../../utils/components/hmac.js');

var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_flag: [true, false], // 口令和密码是否显示为明文
    seed_state: false,

    passwd: "",
    passwdStr: "", // show in the page, it may be string or ***
    generatePasswd: true,

    inputKey: "", //用户输入的口令
    inputKeyText: "", //仅用于清空输入框

    seedKey: "seed", //seed的键名

    timeOutIds: [-1, -1, -1],
    timers: [30000, 60000, 60000], //unit is ms, 0 time to delete key, 1 time to delete passwd, 2 time to generate passwd

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
      passws: "", // after the copy, clear the passwd
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
  preventMaskTouch: function(e) {
    //do nothing
  },

  bindTextInput: function(e) { // the dialog input
    var id = e.currentTarget.id;
    this.data.dialogInputData[id] = e.detail.value;
  },

  bindKeyInput: function(e) { // the key input
    this.data.inputKey = e.detail.value;

    countDown(this, 0);
  },

  onBtnCancel: function() {
    this.setData({
      showModal: false,
      dialogInputData: ["", ""]
    })
  },

  onBtnConfirm: function(e) {
    if ((this.data.dialogInputData[0].length != 0 || this.data.dialogInputData[1].length != 0) && this.data.dialogInputData[0] === this.data.dialogInputData[1]) { //not empty and equal
      var seed = util.generateSeed(this.data.dialogInputData[0])
      wx.setStorageSync(this.data.seedKey, seed);
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
      dialogInputData: ["", ""],
      seed_state: this.data.seed_state
    })
  },

  onGeneratePasswd: function() {
    if (!this.data.generatePasswd || this.data.inputKey.length == 0) {
      return;
    }
    var seed = wx.getStorageSync(this.data.seedKey);
    console.log(seed);
    console.log(this.data.inputKey)
    //var test = CryptoJS.HmacSHA256(seed,this.data.inputKey).toString();
    var test = CryptoJS.HmacSHA256(this.data.inputKey, seed).toString();//inputKey as message, seed as secret Key
    console.log(test);

    countDown(this, 1);
    countDown(this, 2);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var timers = wx.getStorageSync('timers');
    if (timers.length != 0) { //init timers
      this.setData({
        timers: timers
      })
    }

    var seed = wx.getStorageSync(this.data.seedKey);
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
    this.onLoad();
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

function changeData(that, id) {
  that.data.timeOutIds[id] = -1
  if (id == 0) {
    console.log('time to delete key');
    that.setData({
      inputKeyText: '',
      timeOutIds: that.data.timeOutIds
    })
  } else if (id == 1) {
    console.log('time to delete passwd');
    that.setData({
      passwd: '',
      passwdStr: '',
      timeOutIds: that.data.timeOutIds
    })
  } else {
    console.log('time to generate passwd');
    that.setData({
      generatePasswd: true,
      timeOutIds: that.data.timeOutIds
    })
  }
};

function countDown(that, id) {
  if (that.data.timeOutIds[id] > 0) {
    clearTimeout(that.data.timeOutIds[id]);
  }
  if (that.data.timers[id] > 0) {
    //var timeOutId = setTimeout(function(){ChangeData(there,id)}, that.data.timers[id]); //this is work too
    var timeOutId = setTimeout(changeData, that.data.timers[id], that, id);
    that.data.timeOutIds[id] = timeOutId;
    if (id == 2) {
      that.data.generatePasswd = false;
    }
    that.setData({
      timeOutIds: that.data.timeOutIds,
      generatePasswd: that.data.generatePasswd,
    })
  }
};
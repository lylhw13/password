// pages/setting/settings.js
var CryptoJS = require('../../utils/components/core.js');
require('../../utils/components/sha256.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    seed_state: true,
    seedKey:'seed',
    showModal: false,
    showModalId: 0, // 0 InitSeed, 1 ResetSeed, 2 modify time
    btnId: 0,
    dialogInputData: ["", "",""],
    modalDialog: [{
        title: "设定种子",
        inputHolder: ["请输入种子", "请再次输入种子"],
        password: [true, true]
      },
      {
        title: "重设种子",
        inputHolder: ["请输入旧种子", "请输入新种子", "请再次输入新种子"],
        password: [true, true, true]
      },
      {
        title: "修改时间",
        inputHolder: ["请输入时间间隔", "请输入种子"],
        password: [false, true]
      }
    ],
    timeItem:[{label:"清除口令的间隔", time:5},{label:"清除密码的间隔",time:1},{label:"产生密码的间隔",time:1}],
  },

  onPageBtn: function(e) {
    var id = e.currentTarget.id;
    this.data.showModalId = id>2?2:id;
    if (!this.data.showModal) {
      this.setData({
        showModal: true,
        showModalId: this.data.showModalId,
        btnId: id
      })
    }
  },

  bindTextInput: function (e) { // the dialog input
    var id = e.currentTarget.id;
    this.data.dialogInputData[id] = e.detail.value;
  },

  onDeleteSeedBtn: function() {
    //todo
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除种子吗？',
      success (res) {
        if(res.confirm){
          wx.setStorageSync(that.data.seedKey, '');
          that.setData({
            seed_state:false,
          })
        }
      }
    });
  },

  hideModal: function() {
    this.setData({
      showModal: false
    })
  },
  onBtnCancel: function() {
    this.setData({
      showModal: false
    })
  },
  onBtnConfirm: function() {
    this.setData({
      showModal: false,
    })
    if(this.data.btnId>2){
      var seed = CryptoJS.SHA256(this.data.dialogInputData[1]);
      if(seed == wx.getStorageSync(this.data.seedKey)){

      } else {
        wx.showToast({
          title: '请输入正确的种子',
          icon:"none"
        })
      }

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
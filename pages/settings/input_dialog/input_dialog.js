// pages/settings/input_dialog/input_dialog.js
Page({

  /**
   * Page initial data
   */
  data: {
      showModal: false,
  },

  showDialogBtn: function(){
    this.setData({
      showModal:true
    })
  },
  preventTouch: function(){

  },
  preventTouchMove: function(){

  },

  hideModal: function() {
    this.setData({
      showModal: false
    })
  },
  onBtnCancel:function(){
    this.setData({
      showModal: false
    })
  },
  onBtnConfirm: function () {
    this.setData({
      showModal: true
    })
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
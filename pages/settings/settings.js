// pages/setting/settings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      seed_flag: true,
      time_span: 1,
      showModal: false,
    showModalId: 0,// 0 InitSeed, 1 ResetSeed, 2 modify time
    modalDialog: [{ title: "设定种子", inputHolder: ["请输入种子", "请再次输入种子"], password:[true,true]},
      { title: "重设种子", inputHolder: ["请输入旧种子", "请输入新种子", "请再次输入新种子"], password: [true,true, true] },
      { title: "修改时间", inputHolder: ["请输入时间间隔", "请输入种子"], password: [false, true] }]
  },
  onPageBtn: function(e) {
      var id = e.currentTarget.id;
      if(!this.data.showModal) {
        this.setData({
          showModal: true,
          showModalId : id
        })
      }
  },
  
  onDeleteSeedBtn: function() {
      //todo
  },
  
  hideModal: function () {
    this.setData({
      showModal: false
    })
  },
  onBtnCancel: function () {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
// pages/setting/settings.js

var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    seedState: true,
    seedKey: 'seed', //seed的键名
    timerKey: "timers", //timer的键名

    showModal: false,
    showModalId: 0, // 0 InitSeed, 1 ResetSeed, 2 modify time
    btnId: 0,
    dialogInputData: ["", "", ""],
    modalDialog: [{
        title: "设定种子",
        inputItem: [{
          placeHolder: "请输入种子",
          password: true,
          type: 'text'
        }, {
          placeHolder: "请再次输入种子",
          password: true,
          type: 'text'
        }]
      },
      {
        title: "重设种子",
        inputItem: [{
          placeHolder: "请输入旧种子",
          password: true,
          type: 'text'
        }, {
          placeHolder: "请输入新种子",
          password: true,
          type: 'text'
        }, {
          placeHolder: "请再次输入新种子",
          password: true,
          type: 'text'
        }]
      },
      {
        title: "修改时间",
        inputItem: [{
          placeHolder: "请输入时间间隔",
          password: false,
          type: 'digit'
        }, {
          placeHolder: "请输入种子",
          password: true,
          type: 'text'
        }]
      }
    ],
    timeItem: [{
      label: "清除口令的间隔",
      time: 5
    }, {
      label: "清除密码的间隔",
      time: 1
    }, {
      label: "产生密码的间隔",
      time: 1
    }],
  },
  preventMaskTouch: function(e) {
    //to prevent the touch on the mask, so do nothing
  },
  onPageBtn: function(e) {
    var id = e.currentTarget.id;
    this.data.showModalId = id > 2 ? 2 : id;
    if (!this.data.showModal) {
      this.setData({
        showModal: true,
        showModalId: this.data.showModalId,
        btnId: id
      })
    }
  },

  bindTextInput: function(e) { // the dialog input
    var id = e.currentTarget.id;
    this.data.dialogInputData[id] = e.detail.value;
  },

  onDeleteSeedBtn: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除种子吗？',
      success(res) {
        if (res.confirm) {
          wx.setStorageSync(that.data.seedKey, '');
          that.setData({
            seedState: false,
          })
        }
      }
    });
  },

  onBtnCancel: function() {
    this.setData({
      showModal: false,
      dialogInputData: ['', '', '']
    })
  },
  onBtnConfirm: function() {
    var inputData = this.data.dialogInputData.slice();
    this.setData({
      showModal: false,
      dialogInputData: ['', '', '']
    })

    if (this.data.btnId == 0) { //init seed
      if (inputData[1].length == 0 || inputData.length[2] == 0 || inputData[1] !== inputData[2]) {
        wx.showToast({
          title: '输入值为空或不一致',
          icon: "none"
        });
        return;
      }
      var seed = util.generateSeed(inputData[0]);
      wx.setStorageSync(this.data.seedKey, seed);
      this.data.seedState = true;
      wx.showToast({
        title: '种子设定成功',
      })

      this.setData({
        seedState: this.data.seedState
      })
    } else if (this.data.btnId == 1) { //reset seed

      var local_seed = wx.getStorageSync(this.data.seedKey);
      var input_seed = util.generateSeed(inputData[0])
      console.log('local_seed   ' + local_seed);
      console.log('input_seed   ' + input_seed);
      if (local_seed !== input_seed) {
        wx.showToast({
          title: '请输入正确的旧种子',
          icon: 'none'
        });
        return;
      };

      if (inputData[1].length == 0 || inputData.length[2] == 0 || inputData[1] !== inputData[2]) {
        wx.showToast({
          title: '输入值为空或不一致',
          icon: "none"
        });
        return;
      }
      var new_seed = util.generateSeed(inputData[1]);
      wx.setStorageSync(this.data.seedKey, new_seed);

    } else if (this.data.btnId >= 2) {
      var inputSeed = util.generateSeed(inputData[1]);
      if (inputSeed !== wx.getStorageSync(this.data.seedKey)) {
        wx.showToast({
          title: '请输入正确的种子',
          icon: "none"
        });
        return;
      }
      this.data.timeItem[this.data.btnId - 2].time = inputData[0] - 0;
      this.setData({
        timeItem: this.data.timeItem,
      })

      var timer = [];
      for (var i = 0; i < this.data.timeItem.length; i++) {
        timer.push(this.data.timeItem[i].time * 60000);
      }
      wx.setStorageSync('timers', timer)


      console.log(this.data.timeItem)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var seed = wx.getStorageSync(this.data.seedKey);
    var timer = wx.getStorageSync(this.data.timerKey);
    if (seed.length == 0) {
      this.data.seedState = false;
    } else if (seed.length == 64) {
      this.data.seedState = true;
    } else {
      this.data.seedState = false;
      wx.setStorageSync(this.data.seedKey, "");
    }
    for (var i = 0; i < timer.length; i++) {
      this.data.timeItem[i].time = timer[i] / 60000;
    }
    console.log(this.data.timeItem)
    this.setData({
      seedState: this.data.seedState,
      timeItem: this.data.timeItem
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

})
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 历史记录列表
    historyList: ['电费', '水费', '二手书', '社团', '学生会'],
    // 确认删除
    deleteHidden: true,
    // 搜索框内容
    title: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // 点击“删除”按钮
  onDeleteHistory() {
    this.setData({
      deleteHidden: !this.data.deleteHidden
    })
  },

  deleteAll() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除全部历史记录？',
      success: function (res) {
        if (res.confirm) {
          let {
            historyList
          } = that.data;
          that.setData({
            historyList: [],
            deleteHidden: true
          })
        } // 点击“确认”
      }
    })
  },

  deleteSingle(e) {
    var index = e.currentTarget.dataset.set;
    let {
      historyList
    } = this.data;
    historyList.splice(index, 1);
    this.setData({
      historyList: historyList
    })
  },

  // 清空输入框
  Onclear() {
    this.setData({
      title: ''
    })
  },

  // 点击“搜索”
  Onsearch() {
    let {
      historyList, title
    } = this.data;
    if (title) {
      historyList.push(title);
      this.setData({
        historyList: historyList
      })
    }

  },

  // 点击历史记录下的控件
  clickhistory(e) {
    var title = e.currentTarget.dataset.set;
    console.log(title);
  }
})
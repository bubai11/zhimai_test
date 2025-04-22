// pages/actishow/actishow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    button_hidden: true,
    title: '"感悟青年力量"之五四故事决赛'
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

  // 点击右上角，显示按钮
  onButtonShow(){
    let{
      button_hidden
    } = this.data;
    
    this.setData({
      button_hidden: button_hidden? false: true
    })
  },

  // 添加到“我的收藏”
  addCollection(){
    wx.showToast({
      title: '已加入我的收藏',
      icon: 'success',
      duration: 600,
      mask: true
    });
    this.onButtonShow();
  }
})
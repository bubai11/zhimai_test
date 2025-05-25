// subPackages/pages/subactivity/subactivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actList: [
      {
        pic: '/assets/activity/1.jpg',
        status: '进行中',
        title: '"感悟青年力量"之五四故事决赛',
        type: 'assess',
      },
      {
        pic: '/assets/activity/2.jpg',
        status: '进行中',
        title: '红会知行·技能赋能之旅',
        type: 'credit',
      },
      {
        pic: '/assets/activity/3.jpg',
        status: '进行中',
        title: '“金子之光”校友报告',
        type: 'assess',
      },
      {
        pic: '/assets/activity/4.jpg',
        status: '进行中',
        title: '2025春之记忆之“易”起绘春章——手账作品征集活动',
        type: 'credit',
      },
      {
        pic: '/assets/activity/5.jpg',
        status: '进行中',
        title: '第十四届“胜券在握”金融理财大赛宣讲会',
        type: 'credit',
      },
      {
        pic: '/assets/activity/6.jpg',
        status: '进行中',
        title: '2025新语征文比赛',
        type: 'all',
      },
      {
        pic: '/assets/activity/7.jpg',
        status: '进行中',
        title: '第十五届“医”路求知，“疗”在实践医疗知识竞赛初赛',
        type: 'all',
      },
      {
        pic: '/assets/activity/8.jpg',
        status: '进行中',
        title: '第十一届资信杯',
        type: 'credit',
      },
      {
        pic: '/assets/activity/act.jpg',
        status: '已结束',
        title: 'test',
        type: 'all',
      },
      {
        pic: '/assets/activity/act.jpg',
        status: '已结束',
        title: 'test',
        type: 'all',
      },
      {
        pic: '/assets/activity/act.jpg',
        status: '已结束',
        title: 'test',
        type: 'all',
      },
      {
        pic: '/assets/activity/act.jpg',
        status: '已结束',
        title: 'test',
        type: 'all',
      },
      {
        pic: '/assets/activity/act.jpg',
        status: '已结束',
        title: 'test',
        type: 'all',
      },
      {
        pic: '/assets/activity/act.jpg',
        status: '已结束',
        title: 'test',
        type: 'all',
      },
    ], // 活动列表
    actShowList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      actShowList: this.data.actList
    })
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

  }
})
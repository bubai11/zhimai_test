// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 活动列表
    actList: [
      {
        title: '标题1', classify: '分类1', time: '时间1',
        img: '/assets/activity/swiper1.jpg',
        timeShow: ''
      },
      {
        title: '标题2', classify: '分类2', time: '时间2', img: '/assets/activity/swiper2.jpg',
        timeShow: ''
      },
      {
        title: '标题3', classify: '分类3', time: '时间2', img: '/assets/activity/swiper3.jpg',
        timeShow: ''
      },
      {
        title: '标题4', classify: '分类4', time: '时间3', img: '/assets/activity/swiper4.jpg',
        timeShow: ''
      },
    ],

    // 类型 下划线 切换
    showborder1: true,
    showborder2: false,

    // 是否点击“管理”按钮，控制圆点是否选中
    point_show: false,
    point_active: [false, false, false, false],

    // “管理”按钮的文字
    administation: "管理",

    // 回到顶部 按钮
    // 滑动的指定距离
    back_top: 0,
    // 返回顶部标记，为true显示回到顶部按钮，false则不显示
    isTop: false,
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
    wx.setNavigationBarTitle({
      title: '浏览历史',
    });

    let {
      actList
    } = this.data;

    for (var i = 1; i < actList.length; i++) {
      if (actList[i].time == actList[i - 1].time)
        actList[i].timeShow = 'hidden';
      else actList[i].timeShow = 'show';
    }

    this.setData({
      actList: actList
    })
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

  // 切换“综测活动” 和 “校园资讯”
  act_switch1() {
    this.setData({
      showborder1: true,
      showborder2: false
    })
  },
  act_switch2() {
    this.setData({
      showborder1: false,
      showborder2: true
    })
  },

  // 点击“管理”按钮
  admini_act() {
    let {
      point_show,
      point_active
    } = this.data;
    if (!point_show) {
      for (var i = 0; i < point_active.length; i++)
        point_active[i] = false;
      this.setData({
        point_show: true,
        point_active: point_active,
        administation: "完成"
      })
    }
    else {
      this.setData({
        point_show: false,
        administation: "管理"
      })
    }
  },

  // 点击圆点选择活动
  choose_act: function (event) {
    let {
      point_active
    } = this.data;
    const index = event.currentTarget.dataset.index;
    point_active[index] = point_active[index] ? false : true;
    this.setData({
      point_active: point_active
    })
  },

  // 查看活动
  act_navigator(e) {
    let {
      point_show
    } = this.data;
    if (!point_show)
      wx.navigateTo({
        url: '/subPackages/pages/actishow/actishow',
      })
    else this.choose_act(e);
  },

  // 返回顶部 按钮
  backTop() {
    wx.pageScrollTo({
      // 页面滚动距离
      scrollTop: 0,
      // 滚动执行时间，100毫秒
      duration: 100
    })
  },

  // 显示回到顶部按钮
  onPageScroll(e) {
    // 滚动距离
    let {
      scrollTop
    } = e;
    //
    let {
      back_top,
      isTop
    } = this.data;

    // 判断当前滚动距离是否大于设定规定距离
    if (scrollTop >= back_top && !isTop) {
      // 滑动到了指定位置
      this.setData({
        isTop: true
      })
    }
    else {
      if (scrollTop <= back_top && isTop) {
        this.setData({
          isTop: false
        })
      }
    }
  },

  // 删除选中的历史记录
  deleteAct() {
    let {
      point_active,
      actList
    } = this.data;
    var i = 0;
    while (i < point_active.length) {
      if (point_active[i]) {
        point_active.splice(i, 1);
        actList.splice(i, 1);
      }
      else i++;
    }
    actList[0].timeShow = 'show';
    for (var i = 1; i < actList.length; i++) {
      if (actList[i].time == actList[i - 1].time)
        actList[i].timeShow = 'hidden';
      else actList[i].timeShow = 'show';
    }
    this.setData({
      point_active: point_active,
      actList: actList
    })
  }
})
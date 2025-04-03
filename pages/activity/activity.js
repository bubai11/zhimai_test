// index.js

Page({
  data: {
    // 最新活动 轮播图
    swiperHeight: '',
    nowIndex: 0,
    actList: [], // 活动列表
    loading: false,
    // 回到顶部 按钮
    back_top: 0,
    isTop: false,
    // 筛选条件
    filters: {
      activity_type: '', // 二课/综测/二课综测
      credit_type: '',   // 活动板块
      status: '进行中'    // 默认显示进行中的活动
    }
  },

  // 获取活动列表
  async fetchActivities() {
    try {
      this.setData({ loading: true });
      
      // 使用传统的wx.request替代云函数调用
      wx.request({
        url: 'http://localhost:3000/api/activities', // 本地开发环境
        // url: 'https://your-domain.com/api/activities', // 生产环境
        method: 'GET',
        data: this.data.filters,
        success: (res) => {
          if (res.statusCode === 200 && Array.isArray(res.data)) {
            // 处理活动数据
            const activities = res.data.map(activity => ({
              activity_id: activity.activity_id,
              pic: activity.image_url,
              title: activity.title,
              start_time: this.formatDateTime(activity.start_time),
              end_time: this.formatDateTime(activity.end_time),
              location: activity.location,
              status: activity.status,
              credit_type: activity.credit_type,
              activity_type: activity.activity_type
            }));

            this.setData({
              actList: activities,
              loading: false
            });
          }
        },
        fail: (error) => {
          console.error('获取活动列表失败:', error);
          wx.showToast({
            title: '获取活动列表失败',
            icon: 'none'
          });
        },
        complete: () => {
          this.setData({ loading: false });
        }
      });
    } catch (error) {
      console.error('获取活动列表失败:', error);
      wx.showToast({
        title: '获取活动列表失败',
        icon: 'none'
      });
      this.setData({ loading: false });
    }
  },

  // 格式化日期时间
  formatDateTime(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
  },

  // 筛选活动
  filterActivities(e) {
    const { type, value } = e.currentTarget.dataset;
    this.setData({
      ['filters.' + type]: value
    }, () => {
      this.fetchActivities();
    });
  },

  // 最新活动 轮播图
  getHeight: function(e) {
    var winWidth = wx.getSystemInfoSync().windowWidth - 260;
    var imgHeight = e.detail.height;
    var imgWidth = e.detail.width;
    var swiperHeight = winWidth * imgHeight / imgWidth + "px";
    this.setData({
      swiperHeight: swiperHeight
    })
  },

  swiperChange: function(e) {
    this.setData({
      nowIndex: e.detail.current
    })
  },

  // 返回顶部
  backTop() {
    wx.pageScrollTo({
      // 页面滚动距离
      // 滚动执行时间，100毫秒
      scrollTop: 0,
      duration: 100
    })
  },

  onPageScroll(e) {
    let { scrollTop } = e;
    let { back_top, isTop } = this.data;

    if (scrollTop >= back_top && !isTop) {
      this.setData({
        isTop: true
      })
    } else if (scrollTop <= back_top && isTop) {
      this.setData({
        isTop: false
      })
    }
  },

  // 下拉刷新
  async onPullDownRefresh() {
    await this.fetchActivities();
    wx.stopPullDownRefresh();
  },

  onLoad() {
    this.fetchActivities();
  }
});

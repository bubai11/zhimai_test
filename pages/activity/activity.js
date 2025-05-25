// index.js

Page({
  data: {
    // 最新活动 轮播图
    swiperHeight: '',
    nowIndex: 0,
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
    activity_type: 'all',
    loading: false,
    // 回到顶部 按钮
    back_top: 0,
    isTop: false,
    // 筛选条件
    filters: {
      activity_type: 'all', // 二课/综测/二课综测
      credit_type: '',   // 活动板块
      status: 'all'    // 默认显示进行中的活动
    }
  },

  // observers:{
  //   'activity_type' : function(type, value) {
  //     console.log('sss',type,value)
  //   }
  // },

  // getActList () {
  //   console.log('test')
  //   return this.actList.filter(
  //     item => item.type === 'all' || this.activity_type 
  //   )
  // },

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
      activity_type: value
    })

    let {actList, activity_type} = this.data
    let actShowList
    switch (activity_type) {
      case 'all':
        actShowList = actList; break;
      case 'credit':
        actShowList = actList.filter(item => item.type === 'credit' || item.type === 'all'); break;
      case 'assess':
        actShowList = actList.filter(item => item.type === 'assess' || item.type === 'all'); break;
    }
    // this.fetchActivities();

    this.setData({
      activity_type: value,
      actShowList
    })
  },

  // 最新活动 轮播图
  getHeight: function (e) {
    var winWidth = wx.getSystemInfoSync().windowWidth - 260;
    var imgHeight = e.detail.height;
    var imgWidth = e.detail.width;
    var swiperHeight = winWidth * imgHeight / imgWidth + "px";
    this.setData({
      swiperHeight: swiperHeight
    })
  },

  swiperChange: function (e) {
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
    // this.fetchActivities();
    this.setData({
      actShowList: this.data.actList
    })
  }
});

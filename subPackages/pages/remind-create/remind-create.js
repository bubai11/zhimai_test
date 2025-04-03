// pages/remind-create/remind-create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 从“定时提醒”页面跳转到当前页面，该提醒位于“定时提醒”页面的第几个提醒
    id: -1,

    // ~Start~ 表示picker选择的起始范围
    // 开始日期+时间
    // beginStartDate: '',
    // beginStartTime: '',
    beginDate: '',
    beginTime: '',
    // 结束日期+时间
    // endStartDate: '',
    // endStartTime: '',
    endDate: '',
    endTime: '',

    // 标题
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      title: options.title,
    })
    // 属性值可能为空
    if (options.beginDate != null)
      this.setData({
        id: options.id,
        beginDate: options.beginDate,
        beginTime: options.beginTime,
        endDate: options.endDate,
        endTime: options.endTime
      })
      // console.log(options.beginDate);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var temp = this.DateFormatString();
    var date, time;
    date = temp.date;
    time = temp.time;
    // this.setData({
    //   beginStartDate: date,
    //   beginStartTime: time,
    //   endStartDate: date,
    //   endStartTime: time,
    // })

    if (this.data.beginDate == '')
      this.setData({
        beginDate: date,
        beginTime: time,
        endDate: date,
        endTime: time
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

  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  // date去除前导0
  // DateFormat(num) {
  //   num = num.toString();
  //   return num[0]=='0' ? num[1] : num;
  // },
  
  // time增加前导0
  TimeFormat(num){
    num = num.toString();
    return num[1] ? num : '0'+num[0];
  },

  // 将 Date 转化为 String  
  DateFormatString(date) {
    var date = new Date(), time;
    var year, month, day, hour, minute;
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hour = date.getHours();
    minute = date.getMinutes();
    date = [year, month, day].join('-');
    time = [hour, minute].map(this.TimeFormat).join(':');
    return {
      date: date,
      time: time
    };
  },

  onBeginDateChange(e) {
    var date = e.detail.value.split('-').join('-');
    this.setData({
      beginDate: date
    })
  },

  onBeginTimeChange(e) {
    this.setData({
      beginTime: e.detail.value
    })
  },

  onEndDateChange(e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  onEndTimeChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  onSave() {
    const that = this;
    let {
      beginDate,
      beginTime,
      endDate,
      endTime,
      title,
      id
    } = this.data;
    var begin = (beginDate.split('-')).concat(beginTime.split(':'));
    var end = (endDate.split('-')).concat(endTime.split(':'));
    var temp = false;
    for (var i = 0; i < 5; i++)
      if (begin[i] < end[i]) {
        temp = true;
        break;
      }
    if (!temp) {
      wx.showModal({
        title: '提示',
        content: '开始时间早于结束时间，\n请重新设置',
        showCancel: false
      })
    }
    else if (title == '') {
      wx.showModal({
        title: '提示',
        content: '标题不能为空，请重新设置',
        showCancel: false
      })
    }
    else {
      // wx.showToast({
      //   title: '保存失败',
      //   icon: 'error',
      //   duration: 2000
      // })
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 700,
        mask: true
      }).then((res) => {
        setTimeout(() => {
          // 获取页面栈（数组的第一个元素是首页，最后一个元素是当前页面）
          let pages = getCurrentPages();
          // 上一个页面
          let prevPage = pages[pages.length - 2];
          
          if (prevPage) {
            var remind = {
              title: title,
              beginDate: beginDate,
              beginTime: beginTime,
              endDate: endDate,
              endTime: endTime
            }
            prevPage.setData({
              newRemindId: id,
              newRemind: remind
            })
          }
          that.goBack();
        }, 800);
      })
    }
  },

  onDelete(){
    let that = this;
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 700,
      mask: true
    }).then((res)=>{
      setTimeout(()=>{
        that.goBack();
      },800)
    })
  },
})
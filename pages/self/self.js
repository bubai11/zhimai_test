// pages/self/self.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      // 通知文本
      content: '暂无消息',
      // 间隔时间
      interval: '',
      // 通知列表
      contentList: ['"感悟青年力量"之五四故事决赛', '红会知行·技能赋能之旅', '“金子之光”校友报告'],
      // 通知列表索引
      index: 0,
  
      // 个人信息
      userInfo: {},
  
      // 登录状态
      isLoggedIn: false,

      showLogin: false,

      tempUserInfo: {
        avatarUrl: '/assets/self/basic-face.png',
        nickname: ''
      }
  
      // more_service:[{
      //   title: '关于我们',
      //   pic: 'about-us.png' 
      // },{
      //   title: '帮助中心',
      //   pic: 'help-center.png'
      // },{
      //   title: '商务合作',
      //   pic: 'business.png'
      // },{
      //   title: '账号与安全',
      //   pic: 'exit.png'
      // }]
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if (this.data.contentList.length == 0) return;
      this.OnRemind();
      let that = this;
      this.setData({
        interval: setInterval(() => {
          that.OnRemind()
        }, 3000)
      });

      // 检查登录状态
      const app = getApp();
      this.setData({
        isLoggedIn: app.globalData.isLoggedIn,
        userInfo: app.globalData.userInfo || {},
        tempUserInfo: app.globalData.tempUserInfo
      });
    },
  
    OnRemind() {
      let {
        contentList, index
      } = this.data;
      var str = contentList[index];
      if (str.length > 30) str = str.substr(0, 30) + "...";
      var content = '"' + str + '"即将开始';
      if (++index >= contentList.length) index = 0;
      this.setData({
        content: content,
        index: index
      })
    },
  
    /**
   * 生命周期函数--监听页面卸载
   */
    onUnload() {
      // 停止计时器
      let that = this;
      clearInterval(that.data.interval);
    },

    showLogin() {
      this.setData({
        showLogin: !this.data.showLogin
      });
    },
  
    // 登录
    Login() {
      const app = getApp();
      if (!this.data.tempUserInfo.avatarUrl || !this.data.tempUserInfo.nickname) {
        wx.showToast({
          title: '请选择头像并输入昵称',
          icon: 'none'
        });
        return;
      }

      wx.showLoading({
        title: '登录中...',
      });

      app.login().then(res => {
        wx.hideLoading();
        this.setData({
          isLoggedIn: true,
          userInfo: res.userInfo,
          showLogin: false
        });
        
        if (!app.globalData.isProfileComplete) {
          wx.showModal({
            title: '完善信息',
            content: '需要完善个人信息才能使用更多功能',
            confirmText: '去完善',
            success: (res) => {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/profile/complete/index'
                });
              }
            }
          });
        }
      }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: err.message,
          icon: 'none'
        });
      });
    },
    // 获取用户信息
    // getUserProfile() {
    //   var that = this;
    //   wx.getUserProfile({
    //     desc: '用于完善用户信息',
    //     success: (res) => {
    //       // console.log(res);
    //       console.log(res.userInfo);
    //       that.setData({
    //         login: true
    //       })
    //     },
    //     fail: (err)=>{
    //       console.log("获取用户信息失败！",err);
    //     }
    //   })
    // },
  
    tapFace(){
      if (this.data.isLoggedIn)
        wx.navigateTo({
          url: '/subPackages/pages/individual-edit/individual-edit',
        })
      else this.showLogin();
    },

    beforeNavigator(e){
      // if (this.data.isLoggedIn){
        var url = e.currentTarget.dataset.set;
        wx.navigateTo({
          url: url,
        })
      // }
      // else this.showLogin();
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
      // 页面显示时刷新用户信息
      if (this.data.isLoggedIn) {
        this.refreshUserInfo();
      }
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
  
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

    // 刷新用户信息
    async refreshUserInfo() {
      try {
        const app = getApp();
        const userInfo = await app.getUserInfo();
        this.setData({
          userInfo: userInfo
        });
      } catch (error) {
        console.error('获取用户信息失败：', error);
      }
    },

    // 取消登录
    cancelLogin() {
      console.log('取消登录');
      this.setData({
        showLogin: false
      });
    },

    onChooseAvatar(e) {
      const { avatarUrl } = e.detail;
      const app = getApp();
      
      this.setData({
        'tempUserInfo.avatarUrl': avatarUrl
      });
      app.globalData.tempUserInfo.avatarUrl = avatarUrl;
    },

    onInputNickname(e) {
      const { value } = e.detail;
      const app = getApp();
      
      this.setData({
        'tempUserInfo.nickname': value
      });
      app.globalData.tempUserInfo.nickname = value;
    }
  })
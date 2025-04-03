// pages/individual-edit/individual-edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头像,
    faceSrc: '',

    // 信息列表
    infoList: [{
      name: 'nickname',
      title: '昵称',
      content: ''
    }, {
      name: 'campus',
      title: '校区',
      content: ''
    }, {
      name: 'grade',
      title: '年级',
      content: ''
    }, {
      name: 'institute',
      title: '学院',
      content: ''
    }, {
      name: 'major',
      title: '专业',
      content: ''
    }, {
      name: 'email',
      title: '邮箱',
      content: ''
    }, {
      name: 'phone',
      title: '手机号',
      content: ''
    }],

    // [校区,年级]
    list: [
      ['广州校区', '清远校区', '肇庆校区'],
      ['大一', '大二', '大三', '大四']],

    // 学院
    institutes: ['财经与新媒体学院', '互联网金融与信息工程学院', '外国语言与文化学院'],

    // 专业
    intituteIndex: 0,
    majors: [
      ['汉语言文学', '文化产业管理', '网络与新媒体', '数字媒体艺术'],
      ['互联网金融', '计算机科学与技术', '数据科学与大数据技术', '信息管理与信息系统', '软件工程'],
      ['英语', '商务英语', '翻译']
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadUserInfo();
  },

  // 加载用户信息
  async loadUserInfo() {
    const app = getApp();
    try {
      const userInfo = await app.getUserInfo();
      
      // 更新头像
      this.setData({
        faceSrc: userInfo.avatarUrl || '/assets/self/basic-face.png'
      });

      // 更新信息列表
      const infoList = this.data.infoList;
      infoList[0].content = userInfo.nickname || '';
      infoList[1].content = userInfo.campus || '';
      infoList[2].content = userInfo.grade || '';
      
      // 找到学院索引
      const instituteIndex = this.data.institutes.findIndex(
        institute => institute === userInfo.institute
      );
      if (instituteIndex !== -1) {
        infoList[3].content = userInfo.institute;
        infoList[4].content = userInfo.major || '';
        this.setData({ intituteIndex: instituteIndex });
      }

      infoList[5].content = userInfo.email || '';
      infoList[6].content = userInfo.phone || '';

      this.setData({ infoList });

    } catch (error) {
      console.error('获取用户信息失败：', error);
      if (error.message === '账户待激活') {
        // 账户待激活时，显示提示但允许用户继续编辑
        wx.showToast({
          title: '请完善您的个人信息',
          icon: 'none',
          duration: 2000
        });
        
        // 设置默认值
        const infoList = this.data.infoList;
        const globalUserInfo = app.globalData.userInfo || {};
        
        infoList[0].content = globalUserInfo.nickname || '';
        infoList[1].content = globalUserInfo.campus || '';
        infoList[2].content = globalUserInfo.grade || '';
        
        // 找到学院索引
        const instituteIndex = this.data.institutes.findIndex(
          institute => institute === globalUserInfo.institute
        );
        if (instituteIndex !== -1) {
          infoList[3].content = globalUserInfo.institute || '';
          infoList[4].content = globalUserInfo.major || '';
          this.setData({ intituteIndex: instituteIndex });
        }

        infoList[5].content = globalUserInfo.email || '';
        infoList[6].content = globalUserInfo.phone || '';

        this.setData({ 
          infoList,
          faceSrc: globalUserInfo.avatarUrl || '/assets/self/basic-face.png'
        });
      } else {
        wx.showToast({
          title: error.message || '获取信息失败',
          icon: 'none',
          duration: 2000
        });
      }
    }
  },

  // 选择头像
  chooseFace() {
    var that = this;
    wx.chooseImage({
      count: 1, // 可选择的图片数量
      sizeType: ['compressed'], //压缩图片
      sourceType: ['album', 'camera'], //来源：相册/相机
      success: (res) => {
        console.log("获取头像成功！");
        var src = res.tempFilePaths[0];
        that.setData({
          faceSrc: src
        })
        // 将图片上传到服务器(点击"保存"再发送)
        // this.uploadImage(src);
      },
      fail: (res) => {
        console.log("获取头像失败！");
      }
    })
  },

  uploadImage(path) {
    wx.uploadFile({
      filePath: path, // 图片地址（小程序本地地址）
      name: 'face',   // 后台获取图片的key




      url: 'ip+url', // 服务器地址
      method: 'POST',
      formData: {},  // 额外的参数
      success: (res) => {
        console.log("上传头像成功！");
      },
      fail: (res) => {
        console.log("上传头像失败！");
      }
    })
  },

  // 修改校区或年级
  changeSchoolGrade(e) {
    const index = e.currentTarget.dataset.set;
    const value = e.detail.value;
    const infoList = this.data.infoList;
    
    console.log('Debug - changeSchoolGrade:', { index, value });
    
    // 校区是第一个选择器，年级是第二个选择器
    if (index === '1') {
      infoList[1].content = this.data.list[0][value];
      console.log('Debug - Updated campus:', infoList[1].content);
    } else if (index === '2') {
      infoList[2].content = this.data.list[1][value];
      console.log('Debug - Updated grade:', infoList[2].content);
    }
    
    this.setData({
      infoList: infoList
    }, () => {
      console.log('Debug - Updated infoList:', this.data.infoList);
    });
  },

  // 修改学院
  changeInstitute(e) {
    const index = e.detail.value;
    const infoList = this.data.infoList;
    
    // 更新学院
    infoList[3].content = this.data.institutes[index];
    // 更新专业为对应学院的第一个专业
    infoList[4].content = this.data.majors[index][0];
    
    this.setData({
      infoList: infoList,
      intituteIndex: index
    });
  },

  // 修改专业
  changeMajor(e) {
    const value = e.detail.value;
    const infoList = this.data.infoList;
    const intituteIndex = this.data.intituteIndex;
    
    // 更新专业
    infoList[4].content = this.data.majors[intituteIndex][value];
    
    this.setData({
      infoList: infoList
    });
  },

  // 修改昵称
  changeNickname(e) {
    const infoList = this.data.infoList;
    infoList[0].content = e.detail.value;
    this.setData({
      infoList: infoList
    });
  },

  // 修改邮箱
  changeEmail(e) {
    const infoList = this.data.infoList;
    infoList[5].content = e.detail.value;
    this.setData({
      infoList: infoList
    });
  },

  // 修改手机号
  changePhone(e) {
    const infoList = this.data.infoList;
    infoList[6].content = e.detail.value;
    this.setData({
      infoList: infoList
    });
  },

  chooseAvatar(e) {
    if (e.detail)
    this.setData({
      faceSrc: e.detail.avatarUrl
    })
  },

  Submit(e) {
    console.log(e.detail.value);
  },

  // 保存信息
  onSave() {
    const app = getApp();
    wx.showLoading({
      title: '保存中...',
      mask: true
    });

    // 获取token并验证
    const token = wx.getStorageSync('token');
    console.log('Debug - Token exists:', !!token);
    console.log('Debug - Token length:', token ? token.length : 0);
    console.log('Debug - Token first 20 chars:', token ? token.substring(0, 20) : 'no token');
    console.log('Debug - OpenID:', app.globalData.openId);

    if (!token) {
      wx.hideLoading();
      // 如果没有token，重新登录
      app.login().then(() => {
        // 登录成功后重试保存
        this.onSave();
      }).catch(err => {
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none',
          duration: 2000
        });
      });
      return;
    }

    if (!app.globalData.openId) {
      wx.hideLoading();
      wx.showToast({
        title: '用户信息无效，请重新登录',
        icon: 'none',
        duration: 2000
      });
      // 清除token并重新登录
      wx.removeStorageSync('token');
      setTimeout(() => {
        app.login().then(() => {
          this.onSave();
        }).catch(err => {
          wx.showToast({
            title: '登录失败，请重试',
            icon: 'none',
            duration: 2000
          });
        });
      }, 1000);
      return;
    }

    const userInfo = {
      avatarUrl: this.data.faceSrc,
      nickname: this.data.infoList[0].content,
      campus: this.data.infoList[1].content,
      grade: this.data.infoList[2].content,
      institute: this.data.infoList[3].content,
      major: this.data.infoList[4].content,
      email: this.data.infoList[5].content,
      phone: this.data.infoList[6].content
    };

    console.log('Debug - UserInfo to update:', userInfo);

    // 验证必填字段
    if (!userInfo.nickname || !userInfo.campus || !userInfo.grade || !userInfo.institute || !userInfo.major || !userInfo.email || !userInfo.phone) {
      wx.hideLoading();
      wx.showToast({
        title: '请填写必填信息',
        icon: 'none'
      });
      return;
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      wx.hideLoading();
      wx.showToast({
        title: '请输入正确的邮箱格式',
        icon: 'none'
      });
      return;
    }

    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(userInfo.phone)) {
      wx.hideLoading();
      wx.showToast({
        title: '请输入正确的手机号格式',
        icon: 'none'
      });
      return;
    }

    const url = `${app.globalData.serverUrl}/user/${app.globalData.openId}`;
    console.log('Debug - Request URL:', url);
    console.log('Debug - Token:', token);

    // 调用更新用户信息接口
    wx.request({
      url: url,
      method: 'PUT',
      header: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: userInfo,
      success: (res) => {
        console.log('Debug - Response:', res.data);
        wx.hideLoading();
        
        if (res.data.success) {
    wx.showToast({
      title: '保存成功',
      icon: 'success',
            duration: 1500
          });
          
          // 更新全局用户信息
          app.globalData.userInfo = {...app.globalData.userInfo, ...userInfo};
          app.globalData.isProfileComplete = true;
          
          // 延迟返回上一页
          setTimeout(() => {
            wx.navigateBack({ delta: 1 });
          }, 1500);
        } else if (res.data.message === '账户待激活') {
          // 处理账户待激活的情况
          wx.showModal({
            title: '账户待激活',
            content: '您的账户需要完善信息才能激活，是否继续？',
            success: (modalRes) => {
              if (modalRes.confirm) {
                // 用户确认继续，更新本地信息
                app.globalData.userInfo = {...app.globalData.userInfo, ...userInfo};
                app.globalData.isProfileComplete = true;
                
                wx.showToast({
                  title: '信息已保存',
                  icon: 'success',
                  duration: 1500
                });
                
                // 延迟返回上一页
                setTimeout(() => {
                  wx.navigateBack({ delta: 1 });
                }, 1500);
              }
            }
          });
        } else {
          wx.showToast({
            title: res.data.message || '保存失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: (err) => {
        console.error('Debug - Request failed:', err);
        wx.hideLoading();
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
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
// app.js
App({
  globalData: {
    userInfo: null,
    tempUserInfo: {
      avatarUrl: '/assets/self/basic-face.png',
      nickname: ''
    },
    // 开发环境服务器地址
    // serverUrl: 'http://172.20.10.3:3000/api',  // 请将此IP替换为你的电脑实际IP地址
    // serverUrl: 'http://10.205.27.253:3000/api',
    serverUrl: 'http://localhost:3000/api',
    openId: '',
    isProfileComplete: false,
    isLoggedIn: false // 添加登录状态标记
  },

  onLaunch() {
    // 启动时检查登录状态
    const token = wx.getStorageSync('token');
    console.log('token', token);
    if (token) {
      this.checkTokenAndGetUserInfo(token);
    }
  },

  // 检查token并获取用户信息
  checkTokenAndGetUserInfo(token) {
    this.getUserInfo().then(userInfo => {
      this.globalData.isLoggedIn = true;
      this.globalData.userInfo = userInfo;
      this.globalData.isProfileComplete = userInfo.status === 'active';

      // 如果用户状态是 pending，提示完善信息
      if (userInfo.status === 'inactive') {
        wx.showModal({
          title: '完善信息',
          content: '请完善个人信息以激活账户',
          confirmText: '去完善',
          success: (res) => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/subPackages/pages/individual-edit/individual-edit'
              });
            }
          }
        });
      }
    }).catch(err => {
      console.error('获取用户信息失败：', err);
      // token 无效，清除存储的登录信息
      wx.removeStorageSync('token');
      this.globalData.isLoggedIn = false;
      this.globalData.userInfo = null;
    });
  },

  login() {
    return new Promise((resolve, reject) => {
      wx.getNetworkType({
        success: (res) => {
          if (res.networkType === 'none') {
            reject(new Error('无网络连接'));
            return;
          }

          wx.login({
            success: (loginRes) => {
              if (loginRes.code) {
                console.log('获取code成功：', loginRes.code);

                wx.request({
                  url: `${this.globalData.serverUrl}/user/wx-login`,
                  method: 'POST',
                  timeout: 10000, 
                  data: {
                    code: loginRes.code,
                    avatarUrl: this.globalData.tempUserInfo.avatarUrl,
                    nickname: this.globalData.tempUserInfo.nickname
                  },
                  success: (res) => {
                    if (res.data.code === 200) {
                      const loginData = res.data.data;
                      console.log('登录成功：', loginData);

                      this.globalData.openId = loginData.openId;
                      this.globalData.userInfo = loginData.userInfo;
                      this.globalData.isLoggedIn = true;
                      wx.setStorageSync('token', loginData.token);
                      // 保存 token
                      console.log('登录成功，token:', loginData.token);


                      // 检查用户状态
                      this.globalData.isProfileComplete = loginData.userInfo.status === 'active';

                      // 如果用户状态是 inactive 或 pending，提示完善信息
                      if (loginData.userInfo.status !== 'active') {
                        wx.showModal({
                          title: '完善信息',
                          content: '请完善个人信息以激活账户',
                          confirmText: '去完善',
                          success: (modalRes) => {
                            if (modalRes.confirm) {
                              wx.navigateTo({
                                url: '/subPackages/pages/individual-edit/individual-edit'
                              });
                            }
                          }
                        });
                      }

                      resolve(loginData);
                    } else {
                      reject(new Error(res.data.message || '登录失败'));
                    }
                  },
                  fail: (err) => {
                    console.error('请求失败：', err);
                    reject(new Error('服务器连接失败，请检查网络设置'));
                  }
                });
              } else {
                reject(new Error('获取登录凭证失败'));
              }
            },
            fail: (err) => {
              console.error('wx.login 失败：', err);
              reject(new Error('微信登录失败'));
            }
          });
        },
        fail: () => {
          reject(new Error('无法获取网络状态'));
        }
      });
    });
  },

  getUserInfo() {
    return new Promise((resolve, reject) => {
      const token = wx.getStorageSync('token');
      if (!token || !this.globalData.openId) {
        reject(new Error('未登录'));
        return;
      }

      wx.request({
        url: `${this.globalData.serverUrl}/user/${this.globalData.openId}`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.globalData.userInfo = res.data.userInfo;
            this.globalData.isProfileComplete = res.data.userInfo.status === 'active';
            resolve(res.data.userInfo);
          } else {
            reject(new Error(res.data.message || '获取用户信息失败'));
          }
        },
        fail: (err) => {
          reject(new Error('网络请求失败'));
        }
      });
    });
  },

  checkProfileComplete() {
    if (!this.globalData.isProfileComplete) {
      wx.showModal({
        title: '完善信息',
        content: '需要完善个人信息才能使用该功能',
        confirmText: '去完善',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/individual-edit/individual-edit'
            });
          }
        }
      });
      return false;
    }
    return true;
  },

  // 退出登录
  logout() {
    return new Promise((resolve, reject) => {
      const token = wx.getStorageSync('token');
      if (!token || !this.globalData.openId) {
        // 如果没有token或openId，直接清除本地数据
        this.clearUserData();
        resolve();
        return;
      }

      wx.request({
        url: `${this.globalData.serverUrl}/user/${this.globalData.openId}/logout`,//修改为不用带id
        method: 'POST',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.clearUserData();
            resolve();
          } else {
            reject(new Error(res.data.message || '退出登录失败'));
          }
        },
        fail: (err) => {
          console.error('退出登录请求失败：', err);
          reject(new Error('网络请求失败'));
        },
        complete: () => {
          // 无论成功失败，都清除本地数据
          this.clearUserData();
        }
      });
    });
  },

  // 注销账号
  deleteAccount() {
    return new Promise((resolve, reject) => {
      const token = wx.getStorageSync('token');
      if (!token || !this.globalData.openId) {
        reject(new Error('未登录'));
        return;
      }

      wx.request({
        url: `${this.globalData.serverUrl}/user/${this.globalData.openId}`,
        method: 'DELETE',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.clearUserData();
            resolve();
          } else {
            reject(new Error(res.data.message || '注销账号失败'));
          }
        },
        fail: (err) => {
          console.error('注销账号请求失败：', err);
          reject(new Error('网络请求失败'));
        }
      });
    });
  },

  // 清除用户数据
  clearUserData() {
    wx.removeStorageSync('token');
    this.globalData.userInfo = null;
    this.globalData.openId = '';
    this.globalData.isLoggedIn = false;
    this.globalData.isProfileComplete = false;
  }
})
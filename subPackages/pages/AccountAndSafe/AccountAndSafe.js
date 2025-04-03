// pages/AccountAndSafe/AccountAndSafe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    isLoggedIn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.updateUserInfo();
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
    this.updateUserInfo();
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

  updateUserInfo() {
    const app = getApp();
    this.setData({
      userInfo: app.globalData.userInfo,
      isLoggedIn: app.globalData.isLoggedIn
    });
  },

  // 退出登录
  handleLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          wx.showLoading({
            title: '退出中...',
            mask: true
          });

          app.logout().then(() => {
            wx.hideLoading();
            wx.showToast({
              title: '已退出登录',
              icon: 'success',
              duration: 1500
            });
            
            // 延迟返回首页
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/self/self'
              });
            }, 1500);
          }).catch(err => {
            wx.hideLoading();
            wx.showToast({
              title: err.message || '退出失败',
              icon: 'none',
              duration: 2000
            });
          });
        }
      }
    });
  },

  // 注销账号
  handleDeleteAccount() {
    wx.showModal({
      title: '注销账号',
      content: '注销账号后，所有数据将被清除且无法恢复，确定要继续吗？',
      success: (res) => {
        if (res.confirm) {
          // 二次确认
          wx.showModal({
            title: '最终确认',
            content: '这是最后的确认，注销后无法撤销，是否继续？',
            success: (finalRes) => {
              if (finalRes.confirm) {
                const app = getApp();
                wx.showLoading({
                  title: '处理中...',
                  mask: true
                });

                app.deleteAccount().then(() => {
                  wx.hideLoading();
                  wx.showToast({
                    title: '账号已注销',
                    icon: 'success',
                    duration: 1500
                  });
                  
                  // 延迟返回首页
                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/self/self'
                    });
                  }, 1500);
                }).catch(err => {
                  wx.hideLoading();
                  wx.showToast({
                    title: err.message || '注销失败',
                    icon: 'none',
                    duration: 2000
                  });
                });
              }
            }
          });
        }
      }
    });
  }
})
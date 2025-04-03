// pages/info/info.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      // 滑动的指定距离
      back_top: 0,
      // 返回顶部标记，为true显示回到顶部按钮，false则不显示
      isTop: false,
      infoList: [1,2,3,4,5,6],
      swiper: ['广金百科全书','大学资料获取','33','444','555','6']
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
    
    backTop(){
      wx.pageScrollTo({
        // 页面滚动距离
        scrollTop: 0,
        // 滚动执行时间，100毫秒
        duration: 100
      })
    },
  
    // 显示回到顶部按钮
    onPageScroll(e){
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
      if (scrollTop >= back_top && !isTop){
        // 滑动到了指定位置
        this.setData({
          isTop: true
        })
      }
      else {
        if (scrollTop <= back_top && isTop){
          this.setData({
            isTop: false
          })
        }
      }
    },
  
    // query(id, fn){
    //   // 获取组件进行操作
    //   let query = wx.createSelectorQuery();
    //   query.select(id).boundingClientRect()
    //   query.selectViewport().scrollOffset()
    //   query.exec(fn)
    // },
  
    // onLoad(){
    //   this.query("#to-top",(e)=>{
    //     let{
    //       back_top
    //     } = e[0];
    //     this.setData({
    //       top
    //     })
    //   })
    // }
  })
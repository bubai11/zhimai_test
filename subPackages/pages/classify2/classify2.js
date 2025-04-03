// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 所有分类列表
    List: [
      {
        title: '年级',
        // 所有项目列表
        obj: ['所有', '大一', '大二', '大三', '大四', 'A6'],
        // 项目是否被选择
        choose: [true, false, false, false, false, false]
      },
      {
        title: '学分',
        obj: ['所有', '文体', '思想成长', '实践实习', '志愿公益'],
        choose: [true, false, false, false, false]
      },
      {
        title: '校区',
        obj: ['所有', '广州', '清远', '肇庆'],
        choose: [true, false, false, false]
      },
      {
        title: 'D',
        obj: ['所有', 'D2', 'D3'],
        choose: [true, false, false]
      },
      {
        title: 'E',
        obj: ['所有', 'E2'],
        choose: [true, false]
      },
      {
        title: 'F',
        obj: ['所有'],
        choose: [true]
      }
    ],
    // 当前的分类索引
    listIndex: 0,
    // 当前所有分类的项目索引
    // objIndex: [0,0,0,0,0,0];
    // 当前分类选择了几个非“所有”项目
    objCount: [0, 0, 0, 0, 0, 0]
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
      title: '分类',
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

  // 点击项目
  changeObj(e) {
    let {
      List, listIndex, objCount,
    } = this.data;
    var newIndex = e.currentTarget.dataset.index;
    //选择“所有”
    if (newIndex == 0) {
      for (var i = 1; i < List[listIndex].choose.length; i++)
        List[listIndex].choose[i] = false;
      List[listIndex].choose[0] = true;
      objCount[listIndex] = 0;
    }
    // 选择其他选项
    else {
      // 该选项未选择-标亮
      if (!List[listIndex].choose[newIndex]) {
        List[listIndex].choose[0] = false;
        List[listIndex].choose[newIndex] = true;
        objCount[listIndex]++;
      }
      // 该选项未选择-取消；若其他选项全取消，则标亮 “所有”
      else {
        List[listIndex].choose[newIndex] = false;
        objCount[listIndex]--;
        if (objCount[listIndex] == 0)
          List[listIndex].choose[0] = true;
      }
    }
    // List[listIndex].choose[objIndex[listIndex]] = false;
    // if (List[listIndex].choose[newIndex]){
    //   List[listIndex].choose[newIndex] = false;
    //   objCount[listIndex]--;
    // }
    // else{
    //   List[listIndex].choose[newIndex] = true;
    //   objCount[listIndex]++;
    // }
    // objIndex[listIndex] = newIndex;
    // if (objCount[listIndex] > 0)
    //   List[listIndex].choose[0] = false;
    // else list[listIndex].choose[0] = true;
    // console.log(objCount[listIndex]);
    this.setData({
      List: List,
      objCount: objCount
      // objIndex: objIndex
    })
  },

  // 点击分类
  changeList(e) {
    var newIndex = e.currentTarget.dataset.index;
    this.setData({
      listIndex: newIndex
    })
  },

  // 重置
  resetChoose() {
    let {
      listIndex, List
    } = this.data;
    listIndex = 0;
    // objIndex = new Array(objIndex.length).fill(0);
    for (var i = 0; i < List.length; i++) {
      List[i].choose = new Array(List[i].choose.length).fill(false);
      List[i].choose[0] = true;
    }
    this.setData({
      listIndex: listIndex,
      // objIndex: objIndex,
      List: List
    })
  }
})
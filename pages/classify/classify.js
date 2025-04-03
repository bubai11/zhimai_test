// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 分类选项，每个分类包含：title标题、list选项、choose每个是否选中、choosenum选中个数
     * 若有子分类：children每个选择的子分类汇总、childIndex子分类是否选中
     * 若为子分类：isChild当前分类为子分类
     */
    obj: [{
      title: '校区',
      list: ['不限', '广州校区', '清远校区', '肇庆校区'],
      choose: [true, false, false, false],
      choosenum: 0
    },{
      title: '年级',
      list: ['不限', '大一', '大二', '大三', '大四', '专升本'],
      choose: [true, false, false, false, false, false],
      choosenum: 0
    }, {
      title: '学分类型',
      list: ['不限', '思想成长', '文体活动', '实践实习', '创新创业', '志愿公益', '技能特长', '菁英成长'],
      choose: [true, false, false, false, false, false, false, false],
      choosenum: 0
    }, {
      title: '证书',
      list: ['不限', '外语类', '计算机与软件类', '数学与统计类'],
      choose: [true, false, false, false],
      choosenum: 0,
      children: [null,
        ['不限', '四六级', '其他'],
        ['不限', '计算机等级证书', '其他'],
        ['不限']
      ]
    }, {
      title: '院系',
      list: ['不限', '金融与投资学院', '会计学院', '保险学院', '财经与新媒体学院', '国家金融学学院', '金融数学与统计学院', '国际教育学院', '大数据与人工智能学院', '工商管理学院', '法学院', '外国语言与文化学院', '创业教育学院', '经济贸易学院'],
      choose: [true, false, false, false, false, false, false, false, false, false, false, false, false, false],
      choosenum: 0
    }],
    /**
     * splice 函数 (start, deletecount, insertData)
     * 插入 (index, 0, Object)
     * 删除 (index,1)
     */

    /**
     * 由于有 插入、删除，对obj索引影响大，
     *  插入和删除 子分类时不使用索引，而用父分类 + 当前已选择的子分类数量 来 推算子分类的索引
     */
  },

  // 选择某个分类的选项
  onChangeChoice(e) {
    var that = this;
    let {
      obj
    } = this.data;
    var index = e.currentTarget.dataset.set;
    // index表示分类的索引，index表示该分类下的索引
    var inindex = index[1];
    index = index[0];
    // 点击“不限”
    if (inindex == 0) {
      var len = obj[index].choose.length;
      // 重置全部选项
      obj[index].choose = new Array(len).fill(false);
      obj[index].choose[0] = true;
      obj[index].choosenum = 0;
      // 如果有子分类，移除子分类
      if (obj[index].childrenIndex)
        that.removeChildren(index);
    }

    // 点击选项（选项已被选中）
    else if (obj[index].choose[inindex]) {
      obj[index].choose[inindex] = false;
      obj[index].choosenum--;
      // 当前分类全部选项被取消，则自动选中“不限”
      if (obj[index].choosenum == 0)
        obj[index].choose[0] = true;

      // 当前选项含有子分类，移除子分类
      if (obj[index].children && obj[index].children[inindex])
        that.removeChild(index,inindex);
    }

    // 点击选项（选项未选中）
    else {
      obj[index].choose[inindex] = true;
      obj[index].choose[0] = false;
      obj[index].choosenum++;
      // 添加子分类
      that.onShowSecondChoice(index, inindex);
    }
    this.setData({
      obj: obj
    })
  },

  // 添加二级分类（子分类）选项
  onShowSecondChoice(outindex, inindex) {
    let {
      obj
    } = this.data;
    // 当前分类没有子分类
    if (!obj[outindex].children)
      return;

    // 当前父分类的所有子分类的选中情况
    var newlist = obj[outindex].children[inindex];
    // 设置子分类的选项
    var newobj = {
      title: obj[outindex].list[inindex],
      list: newlist,
      choose: new Array(newlist.length).fill(false),
      choosenum: 0,
      // 标记为子分类
      isChild: true
    }
    // 默认第一个选项“不限”被选中
    newobj.choose[0] = true;

    //newIndex 表示当前应在obj中插入的索引位置
    var newindex;
    /**
     * 添加父分类childrenIndex(表示每个子分类是否被选中)
     * 未添加 则 新建childrenIndex
     * 当前子分类的索引：父分类索引 + 1
     */
    if (!obj[outindex].childrenIndex) {
      var childrenIndex = new Array(obj[outindex].children.length).fill(false);
      newindex = outindex + 1;
      // 设置子分类被选中
      childrenIndex[inindex] = true;
      obj[outindex].childrenIndex = childrenIndex
    }
    else {
      var count = 0;
      for (var i = 0; i < inindex; i++)
        if (obj[outindex].childrenIndex[i])
          count++;
      // 当前子分类索引：父分类索引 + 子分类中比当前分类更前的已选择的个数 + 1
      newindex = outindex + count + 1;
      // 设置子分类被选中
      obj[outindex].childrenIndex[inindex] = true;
    }

    // 插入子分类
    obj.splice(newindex, 0, newobj);

    this.setData({
      obj: obj,
    })
  },

  // 移除obj[index]的所有子分类
  removeChildren(index) {
    let {
      obj
    } = this.data;
    var list = obj[index].childrenIndex;
    list.forEach(item => {
      // 子分类被选中 则 删除，后面的子分类索引-1，所以一直删除的都是 index+1
      if (item)
        obj.splice(index + 1, 1);
    })

    // 清空childrenIndex(子分类选择情况)
    obj[index].childrenIndex = null;
    this.setData({
      obj: obj
    })
  },

  // 移除单个子分类
  //（outindex 父分类索引，inindex 子分类在父分类中的索引）
  removeChild(outindex,inindex) {
    let {
      obj
    } = this.data;
    var index = outindex, count = 0;

    // count：父分类的所有子分类中，已被选择的、在当前子分类之前的个数
    for (var i=0; i<inindex; i++)
      if (obj[outindex].childrenIndex[i])
        count++;
    
    // 移除当前子分类
    obj.splice(index + count + 1, 1);
    obj[outindex].childrenIndex[inindex] = null;
    this.setData({
      obj: obj
    })
  },

  // 点击"重置"按钮
  resetChoose() {
    var that = this;
    let {
      obj
    } = this.data;

    // 所有分类的选项重置为：只选中“不限”
    obj.forEach((item,index) => {
      var len = item.choose.length;
      item.choose = new Array(len).fill(false);
      item.choose[0] = true;
      item.choosenum = 0;
      // 若存在子分类，则删除
      if (item.childrenIndex)
        that.removeChildren(index);
    })

    this.setData({
      obj: obj
    })
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
})
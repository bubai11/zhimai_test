// pages/classify2/classify2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 菜单数据
    menu:[
      {
        title: '校区',
        list: ['全部','广州校区','清远校区','肇庆校区'],
        choose: [true,false,false,false],
        choosecount: 0,
      },{
        title: '年级',
        list: ['全部','大一', '大二', '大三', '大四', '专升本'],
        choose: [true,false,false],
        choosecount: 0,
      },{
        title: '学分类型',
        list: ['不限', '思想成长', '文体活动', '实践实习', '创新创业', '志愿公益', '技能特长', '菁英成长'],
        choose: [true,false,false,false,false],
        choosecount: 0,
      },{
        title: '证书',
        list: ['不限','四六级','雅思托福','计算机等级证书','教资','普通话','会计','证券从业资格证'],
        choose: [true,false,false,false,false,false,false,false],
        choosecount: 0,
      },{
        title: '院系',
        list: ['不限', '金投院', '会计学院', '保险学院', '财新院', '国家金融学学院', '金统院', '国教院', '大数据院', '工管院', '法学院', '外文院', '创业教育学院', '经贸院'],
        choose: [true, false, false, false, false, false, false, false, false, false, false, false, false, false],
        choosecount: 0,
      },{
        title: 'four',
        list: [0,1,2,3,4,5,6,7],
        choose: [true,false,false,false,false,false,false,false],
        choosecount: 0,
      },{
        title: 'four',
        list: [0,1,2,3,4,5,6,7],
        choose: [true,false,false,false,false,false,false,false],
        choosecount: 0,
      },{
        title: 'four',
        list: [0,1,2,3,4,5,6,7],
        choose: [true,false,false,false,false,false,false,false],
        choosecount: 0,
      }
    ],
    // 当前选中的左菜单选项
    leftIndex: 0,
    rightIndex: 0,
    // 右侧菜单,每个选项的累计高度
    // heightArr: [],
  },
  onReady(){
    let that = this;
    let arr = [0];
    const query = wx.createSelectorQuery()
    query.selectAll('.right-item').boundingClientRect();
    // query.selectViewport().scrollOffset();
    // 异步
    query.exec(function(res){
      res[0].map( (value) => {
        let height = value.height + arr[arr.length - 1];
        arr.push(height);
      })
      that.setData({
        heightArr: arr
      })
    })
  },
  // 点击左侧菜单选项
  onClickLeft(e){
    // 当前左侧菜单选项索引
    var index = e.currentTarget.dataset.current_index
    // 修改索引值
    this.setData({
      leftIndex: index,
      rightIndex: index
    })
  },
  // 点击按钮
  onClickOption(e){
    let{
      menu
    } = this.data;
    var index = e.currentTarget.dataset.option_index
    var out = index[0]
    var In = index[1]
    // 点击"全部"
    if (In == 0){
      var len = menu[out].choose.length;
      // 重置选项
      menu[out].choose = new Array(len).fill(false)
      menu[out].choose[0] = true;
      menu[out].choosenum = 0;
    }

    // 点击已选中选项,则取消选中
    else if (menu[out].choose[In]){
      menu[out].choose[In] = false;
      menu[out].choosenum--;
      // 当前分类全部选项被取消，则自动选中“全部”
      if (menu[out].choosenum == 0)
        menu[out].choose[0] = true;
    }
    
    // 点击未选中选项
    else{
      menu[out].choose[In] = true;
      menu[out].choose[0] = false;
      menu[out].choosenum++;
    }

    this.setData({
      menu: menu
    })
  },
  // 点击"重置"按钮
  resetOptions(e){
    let{
      menu
    } = this.data;

    menu.forEach((item,index) =>{
      var len = item.choose.length;
      item.choose = new Array(len).fill(false);
      item.choose[0] = true;
      item.choosenum = 0;
    })

    this.setData({
      menu: menu,
      leftIndex: 0,
      rightIndex: 0
    })
  },
  // 滚动右侧菜单
  onScrollRight(e){
    let{
      heightArr
    } = this.data;
    let top = e.detail.scrollTop;
    for (var i = 0; i<heightArr.length-1; i++){
      // console.log(top,heightArr[i],heightArr[i+1])
      if (top >= heightArr[i] && top <= heightArr[i+1]){
        this.setData({
          leftIndex: i
        })
        return ;
      }
    }
   }
})
// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDynasty: 0,
    dynastyList: [
      { id: 1, name: '先秦', year: '前1600年-前221年' },
      { id: 2, name: '秦汉', year: '前221年-220年' },
      { id: 3, name: '魏晋', year: '220年-420年' },
      { id: 4, name: '南北朝', year: '420年-589年' },
      { id: 5, name: '隋唐', year: '581年-907年' },
      { id: 6, name: '宋', year: '960年-1279年' },
      { id: 7, name: '元', year: '1271年-1368年' },
      { id: 8, name: '明清', year: '1368年-1912年' }
    ],
    styleData: {
      0: {
        name: '甲骨文',
        period: '商代晚期',
        works: [
          {
            id: 1,
            name: '甲骨文例字',
            author: '商代',
            image: '/assets/images/history/jiaguwen1.jpg'
          },
          {
            id: 2,
            name: '甲骨卜辞',
            author: '商代',
            image: '/assets/images/history/jiaguwen2.jpg'
          }
        ],
        features: [
          '刻写在龟甲和兽骨上的文字',
          '笔画以直线为主，造型方折',
          '字形呈象形特征，保留图画性质',
          '结构疏朗自然，布局灵活'
        ],
        background: '甲骨文是中国最早的成熟文字系统，主要用于记录商代晚期的占卜卜辞。它的发现为研究中国文字起源和早期历史提供了重要资料。甲骨文的书写工具是刀，因此呈现出独特的刻划痕迹，这种痕迹对后来书法艺术产生了深远影响。'
      },
      1: {
        name: '小篆',
        period: '秦朝',
        works: [
          {
            id: 1,
            name: '泰山刻石',
            author: '秦代',
            image: '/assets/images/history/xiaozhuanti1.jpg'
          },
          {
            id: 2,
            name: '秦权量铭文',
            author: '秦代',
            image: '/assets/images/history/xiaozhuanti2.jpg'
          }
        ],
        features: [
          '笔画圆转流畅，线条均匀',
          '字形方正，结构规整',
          '横平竖直，笔画规范',
          '承上启下，统一书体'
        ],
        background: '小篆是秦始皇统一文字后的规范字体，由秦朝丞相李斯持整理完成。在形上保留了古文字的特点，但更加规范化、艺术化，是中国书法发展史上的重要里程碑。'
      },
      2: {
        name: '隶书',
        period: '汉代',
        works: [
          {
            id: 1,
            name: '张迁碑',
            author: '汉代',
            image: '/assets/images/history/lishu1.jpg'
          },
          {
            id: 2,
            name: '乙瑛碑',
            author: '汉代',
            image: '/assets/images/history/lishu2.jpg'
          }
        ],
        features: [
          '横画波磔，富于变化',
          '字形扁方，结构舒展',
          '笔画有粗细变化',
          '点画趋向扁平化'
        ],
        background: '隶书是在秦汉之际由小篆演变而来的一种书体，它打破了小篆一味求圆的造型特点，创造出富于变化的笔法，开创了中国书法艺术的新纪元。'
      },
      3: {
        name: '楷书',
        period: '魏晋南北朝',
        works: [
          {
            id: 1,
            name: '兰亭序',
            author: '王羲之',
            image: '/assets/images/history/kaishu1.jpg'
          },
          {
            id: 2,
            name: '九成宫醴泉铭',
            author: '欧阳询',
            image: '/assets/images/history/kaishu2.jpg'
          }
        ],
        features: [
          '笔画方正，结构严谨',
          '点画清晰，笔法精妙',
          '横平竖直，规矩严整',
          '结构匀称，章法严谨'
        ],
        background: '楷书在魏晋南北朝时期逐渐成熟，是由隶书演变而来。它的出现标志着中国书法进入了一个规范化的新阶段，也是后世最常用的书体。'
      }
      // ... 可以继续添加其他朝代的书法风格数据
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化时加载第一个朝代的数据
    this.loadDynastyStyle(0);
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

  // 切换朝代
  switchDynasty(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentDynasty: index });
    this.loadDynastyStyle(index);
  },

  // 加载朝代书法风格
  loadDynastyStyle(index) {
    const style = this.data.styleData[index];
    if (style) {
      this.setData({ currentStyle: style });
    }
  },

  // 预览图片
  previewImage(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: this.data.currentStyle.works.map(work => work.image)
    });
  },

  // 在 Page 对象中添加
  handleImageError(e) {
    const index = e.currentTarget.dataset.index;
    const defaultImage = '/assets/images/history/placeholder.jpg';
    
    const works = this.data.currentStyle.works;
    works[index].image = defaultImage;
    
    this.setData({
      'currentStyle.works': works
    });
  }
})
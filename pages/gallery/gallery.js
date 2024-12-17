// pages/gallery/gallery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'all',
    // 保存原始数据
    originalWorks: [
      {
        author: '王羲之',
        dynasty: '东晋',
        works: [
          {
            id: 1,
            name: '兰亭序',
            type: '行书',
            image: '/assets/images/gallery/works/lantingxu.jpg'
          },
          {
            id: 2,
            name: '平安帖',
            type: '行书',
            image: '/assets/images/gallery/works/pingan.jpg'
          },
          {
            id: 3,
            name: '十七帖',
            type: '草书',
            image: '/assets/images/gallery/works/shiqitie.jpg'
          }
        ]
      },
      {
        author: '颜真卿',
        dynasty: '唐',
        works: [
          {
            id: 4,
            name: '多宝塔碑',
            type: '楷书',
            image: '/assets/images/gallery/works/duobaota.jpg'
          },
          {
            id: 5,
            name: '祭侄文稿',
            type: '行书',
            image: '/assets/images/gallery/works/jizhiwengao.jpg'
          }
        ]
      },
      {
        author: '欧阳询',
        dynasty: '唐',
        works: [
          {
            id: 6,
            name: '九成宫醴泉铭',
            type: '楷书',
            image: '/assets/images/gallery/works/jiuchenggong.jpg'
          }
        ]
      }
    ],
    authorWorks: [] // 当前显示的作品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化显示所有作品
    this.setData({
      authorWorks: this.data.originalWorks
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

  },

  // 切换分类标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ 
      currentTab: tab,
      authorWorks: this.filterWorks(tab)
    });
  },

  // 根据书体类型筛选作品
  filterWorks(tab) {
    if (tab === 'all') {
      return this.data.originalWorks;
    }
    
    const typeName = this.getTypeName(tab);
    const filteredWorks = this.data.originalWorks
      .map(author => {
        // 创建作者数据的副本
        const authorCopy = { ...author };
        // 筛选该作者的作品
        authorCopy.works = author.works.filter(work => 
          work && work.type === typeName
        );
        return authorCopy;
      })
      .filter(author => author.works && author.works.length > 0);

    return filteredWorks;
  },

  // 获取书体类型名称
  getTypeName(tab) {
    const typeMap = {
      'lishu': '隶书',
      'kaishu': '楷书',
      'xingshu': '行书',
      'caoshu': '草书',
      'zhuanshu': '篆书'
    };
    return typeMap[tab] || '';
  },

  // 预览作品
  previewWork(e) {
    const work = e.currentTarget.dataset.work;
    if (!work || !work.image) return;
    
    wx.previewImage({
      current: work.image,
      urls: [work.image]
    });
  },

  // 图片加载错误处理
  handleImageError(e) {
    const { authorIndex, workIndex } = e.currentTarget.dataset;
    if (typeof authorIndex !== 'number' || typeof workIndex !== 'number') return;
    
    const defaultImage = '/assets/images/gallery/placeholder.jpg';
    
    this.setData({
      [`authorWorks[${authorIndex}].works[${workIndex}].image`]: defaultImage
    });
  }
})
Page({
  data: {
    collections: []
  },

  onLoad() {
    this.loadCollections()
  },

  onShow() {
    this.loadCollections()
  },

  loadCollections() {
    // 模拟数据 - 字帖收藏
    const mockCollections = [
      {
        id: 1,
        imageUrl: '/assets/images/works/work1.jpg',
        title: '兰亭序',
        author: '王羲之',
        dynasty: '东晋',
        description: '永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。'
      },
      {
        id: 2,
        imageUrl: '/assets/images/works/work2.jpg',
        title: '自叙帖',
        author: '颜真卿',
        dynasty: '唐代',
        description: '颜真卿自述生平经历，笔法遒劲有力，结字严谨，是颜体书法的代表作。'
      }
    ]

    this.setData({
      collections: mockCollections
    })
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/gallery/work-detail/work-detail?id=${id}`
    })
  },

  cancelCollection(e) {
    const id = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '提示',
      content: '确定要取消收藏吗？',
      success: (res) => {
        if (res.confirm) {
          // 从收藏列表中移除
          const collections = this.data.collections.filter(item => item.id !== id)
          this.setData({ collections })

          wx.showToast({
            title: '已取消收藏',
            icon: 'success'
          })
        }
      }
    })
  }
}) 
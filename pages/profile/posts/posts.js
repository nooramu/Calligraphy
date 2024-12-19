Page({
  data: {
    posts: []
  },

  onLoad() {
    this.loadPosts()
  },

  onShow() {
    this.loadPosts()
  },

  loadPosts() {
    // 模拟数据
    const mockPosts = [
      {
        id: 1,
        title: '分享一下我临摹的兰亭序',
        content: '最近在临摹兰亭序，感觉有些进步。大家帮我看看写得怎么样，还有哪些地方需要改进...',
        images: [
          '/assets/images/posts/post1-1.jpg',
          '/assets/images/posts/post1-2.jpg'
        ],
        createTime: '2024-03-20',
        status: 'published',
        views: 128,
        likes: 32,
        comments: 8
      },
      {
        id: 2,
        title: '请教一个关于笔法的问题',
        content: '在练习永字八法时，发现收笔总是不够圆润，想请教一下各位老师，应该如何改进...',
        images: [
          '/assets/images/posts/post2.jpg'
        ],
        createTime: '2024-03-18',
        status: 'pending',
        views: 56,
        likes: 12,
        comments: 3
      }
    ]

    this.setData({
      posts: mockPosts
    })
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${id}&from=myPosts`
    })
  },

  deletePost(e) {
    const id = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '提示',
      content: '确定要删除这篇帖子吗？',
      success: (res) => {
        if (res.confirm) {
          // 从列表中移除
          const posts = this.data.posts.filter(item => item.id !== id)
          this.setData({ posts })

          wx.showToast({
            title: '已删除',
            icon: 'success'
          })
        }
      }
    })
  }
}) 
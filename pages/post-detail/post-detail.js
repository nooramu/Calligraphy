Page({
  data: {
    post: null,
    from: '',
    commentText: '',
    autoFocus: false
  },

  onLoad(options) {
    const { id, from } = options
    this.setData({ from })
    this.loadPostDetail(id)
  },

  loadPostDetail(id) {
    // 模拟数据，实际应该从服务器获取
    const mockPost = {
      id: id,
      title: '分享一下我临摹的兰亭序',
      content: '最近在临摹兰亭序，感觉有些进步。大家帮我看看写得怎么样，还有哪些地方需要改进...',
      images: [
        '/assets/images/posts/post1-1.jpg',
        '/assets/images/posts/post1-2.jpg'
      ],
      author: {
        id: 'user123',
        nickname: '书法爱好者小王',
        avatar: '/assets/images/avatars/user1.jpg'
      },
      createTime: '2024-03-20 14:30',
      views: 128,
      likes: 32,
      isLiked: false,
      comments: [
        {
          id: 1,
          author: {
            nickname: '书法老师',
            avatar: '/assets/images/avatars/user2.jpg'
          },
          content: '笔法很有进步，建议多注意字的结构...',
          createTime: '2024-03-20 15:00'
        }
      ]
    }

    this.setData({ post: mockPost })
  },

  // 点赞处理
  handleLike() {
    const post = this.data.post
    if (!post) return

    const isLiked = !post.isLiked
    const likes = isLiked ? post.likes + 1 : post.likes - 1

    this.setData({
      'post.isLiked': isLiked,
      'post.likes': likes
    })

    wx.showToast({
      title: isLiked ? '点赞成功' : '取消点赞',
      icon: 'none'
    })
  },

  // 评论相关方法
  focusComment() {
    this.setData({ autoFocus: true })
  },

  onCommentInput(e) {
    this.setData({ commentText: e.detail.value })
  },

  submitComment() {
    const content = this.data.commentText.trim()
    if (!content) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    }

    // 模拟添加评论
    const newComment = {
      id: Date.now(),
      author: {
        nickname: '当前用户',
        avatar: '/assets/images/avatars/default.jpg'
      },
      content: content,
      createTime: '刚刚'
    }

    const comments = [newComment, ...this.data.post.comments]
    this.setData({
      'post.comments': comments,
      commentText: ''
    })

    wx.showToast({
      title: '评论成功',
      icon: 'success'
    })
  },

  // 图片预览
  previewImage(e) {
    const { url } = e.currentTarget.dataset
    const { images } = this.data.post
    wx.previewImage({
      current: url,
      urls: images
    })
  },

  // 分享功能
  onShareAppMessage() {
    const { post } = this.data
    return {
      title: post.title,
      path: `/pages/post-detail/post-detail?id=${post.id}`,
      imageUrl: post.images[0]
    }
  }
}) 
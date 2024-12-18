Page({
  data: {
    post: null,
    commentList: [],
    commentText: '',
    autoFocus: false
  },

  onLoad(options) {
    const { id, postData } = options;
    
    if (postData) {
      // 解析传递的帖子数据
      const post = JSON.parse(decodeURIComponent(postData));
      this.setData({
        post: {
          ...post,
          createTime: '2024-01-20 14:30',  // 添加详情页需要的额外数据
          isLiked: false
        }
      });
    }

    this.loadComments(id);
  },

  loadPostDetail(id) {
    // 模拟加载帖子详情
    const post = {
      id,
      title: '行书练习心得',
      description: '今天练习王羲之的兰亭序，重点研究了永字八法的用笔技巧，感觉有些突破...',
      image: '/assets/images/forum/post1.jpg',
      avatar: '/assets/images/avatars/user1.jpg',
      username: '书法爱好者',
      createTime: '2024-01-20 14:30',
      likes: 128,
      comments: 32,
      isLiked: false
    };
    
    this.setData({ post });
  },

  loadComments(postId) {
    // 模拟加载评论数据
    const commentList = [
      {
        id: 1,
        username: '墨香斋',
        avatar: '/assets/images/avatars/user2.jpg',
        content: '笔法很有特点，继续加油！',
        createTime: '2024-01-20 15:00'
      },
      {
        id: 2,
        username: '逸笔生花',
        avatar: '/assets/images/avatars/user3.jpg',
        content: '永字八法确实是书法入门的重要基础',
        createTime: '2024-01-20 15:30'
      }
    ];
    
    this.setData({ commentList });
  },

  handleLike() {
    const post = this.data.post;
    // 添加数据检查
    if (!post) return;
    
    const isLiked = !post.isLiked;
    const likes = isLiked ? post.likes + 1 : post.likes - 1;
    
    this.setData({
      'post.isLiked': isLiked,
      'post.likes': likes
    });

    // 可以添加点赞反馈
    wx.showToast({
      title: isLiked ? '点赞成功' : '取消点赞',
      icon: 'none',
      duration: 1500
    });
  },

  focusComment() {
    this.setData({ autoFocus: true });
  },

  onCommentInput(e) {
    this.setData({ commentText: e.detail.value });
  },

  submitComment() {
    if (!this.data.post) return;
    
    const content = this.data.commentText.trim();
    if (!content) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      });
      return;
    }

    // 模拟提交评论
    const newComment = {
      id: Date.now(),
      username: '当前用户',
      avatar: '/assets/images/avatars/default.jpg',
      content,
      createTime: '刚刚'
    };

    this.setData({
      commentList: [newComment, ...this.data.commentList],
      commentText: '',
      'post.comments': this.data.post.comments + 1
    });
  },

  previewImage(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: [url]
    });
  },

  // 添加分享处理方法
  handleShare() {
    const post = this.data.post;
    if (!post) return;
    
    wx.showActionSheet({
      itemList: ['分享给朋友', '分享到朋友圈'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 分享给朋友
          wx.shareAppMessage({
            title: post.title,
            path: `/pages/post-detail/post-detail?id=${post.id}`,
            imageUrl: post.image,
            success: () => {
              wx.showToast({
                title: '分享成功',
                icon: 'success'
              });
            }
          });
        } else if (res.tapIndex === 1) {
          // 分享到朋友圈
          wx.showToast({
            title: '分享到朋友圈功能开发中',
            icon: 'none'
          });
        }
      }
    });
  },

  // 添加页面分享配置
  onShareAppMessage() {
    const post = this.data.post;
    if (!post) {
      return {
        title: '书法交流',
        path: '/pages/forum/forum'
      };
    }
    
    return {
      title: post.title,
      path: `/pages/post-detail/post-detail?id=${post.id}`,
      imageUrl: post.image
    };
  }
}); 
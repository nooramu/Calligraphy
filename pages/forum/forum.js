// pages/forum/forum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRefreshing: false,
    showPostModal: false,
    newPost: {
      title: '',
      content: '',
      images: []
    },
    postsList: [
      {
        id: 1,
        username: '书法爱好者',
        avatar: '/assets/images/avatars/user1.jpg',
        createTime: '10分钟前',
        title: '谈谈书法创作中的用笔技巧',
        content: '书法创作中，用笔的轻重缓急至关重要。我认为要做到"提按分明，轻重得宜"...',
        images: [
          '/assets/images/forum/post1_1.jpg',
          '/assets/images/forum/post1_2.jpg'
        ],
        likes: 12,
        isLiked: false,
        comments: 5
      },
      {
        id: 2,
        username: '墨痕斋主',
        avatar: '/assets/images/avatars/user2.jpg',
        createTime: '1小时前',
        title: '临摹兰亭序心得',
        content: '最近在临摹兰亭序，分享一下心得体会和作品，请各位指教...',
        images: [
          '/assets/images/forum/post2_1.jpg',
          '/assets/images/forum/post2_2.jpg',
          '/assets/images/forum/post2_3.jpg'
        ],
        likes: 28,
        isLiked: false,
        comments: 15
      }
    ]
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

  // 加载更多帖子
  loadMorePosts() {
    // TODO: 加载下一页帖子
  },

  // 下拉刷新
  onRefresh() {
    this.setData({ isRefreshing: true });
    setTimeout(() => {
      this.setData({ isRefreshing: false });
    }, 1000);
  },

  // 跳转到帖子详情
  navigateToPost(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${id}`
    });
  },

  // 预览图片
  previewImage(e) {
    const { urls, current } = e.currentTarget.dataset;
    wx.previewImage({
      urls,
      current
    });
  },

  // 显示发帖弹窗
  showPostModal() {
    this.setData({ showPostModal: true });
  },

  // 隐藏发帖弹窗
  hidePostModal() {
    this.setData({ 
      showPostModal: false,
      newPost: {
        title: '',
        content: '',
        images: []
      }
    });
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 9 - this.data.newPost.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const images = this.data.newPost.images.concat(res.tempFilePaths);
        this.setData({
          'newPost.images': images
        });
      }
    });
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.newPost.images;
    images.splice(index, 1);
    this.setData({
      'newPost.images': images
    });
  },

  // 提交帖子
  submitPost() {
    const { title, content, images } = this.data.newPost;
    if (!title.trim()) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      });
      return;
    }
    if (!content.trim()) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({ title: '发布中...' });
    // TODO: 上传图片和发布帖子
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      });
      this.hidePostModal();
    }, 1500);
  },

  // 处理点赞
  handleLike(e) {
    const id = e.currentTarget.dataset.id;
    const posts = this.data.postsList;
    const index = posts.findIndex(post => post.id === id);
    
    if (index === -1) return;
    
    const post = posts[index];
    const isLiked = !post.isLiked;
    const likes = isLiked ? post.likes + 1 : post.likes - 1;
    
    this.setData({
      [`postsList[${index}].isLiked`]: isLiked,
      [`postsList[${index}].likes`]: likes
    });

    // 显示点赞反馈
    if (isLiked) {
      wx.showToast({
        title: '点赞成功',
        icon: 'success',
        duration: 1500
      });
    }

    // TODO: 调用后端 API 更新点赞状态
  },

  // 处理评论
  handleComment(e) {
    const id = e.currentTarget.dataset.id;
    // 跳转到评论页面
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${id}&focus=comment`
    });
  },

  // 处理分享
  handleShare(e) {
    const id = e.currentTarget.dataset.id;
    const post = this.data.postsList.find(post => post.id === id);
    
    if (!post) return;
    
    wx.showActionSheet({
      itemList: ['分享给朋友', '分享到朋友圈'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 分享给朋友
          wx.shareAppMessage({
            title: post.title,
            path: `/pages/post-detail/post-detail?id=${id}`,
            imageUrl: post.images?.[0],
            success: () => {
              wx.showToast({
                title: '分享成功',
                icon: 'success'
              });
            }
          });
        } else if (res.tapIndex === 1) {
          // 分享到朋友圈
          wx.shareToTimelineMessage({
            title: post.title,
            query: `id=${id}`,
            imageUrl: post.images?.[0],
            success: () => {
              wx.showToast({
                title: '分享成功',
                icon: 'success'
              });
            }
          });
        }
      }
    });
  }
})
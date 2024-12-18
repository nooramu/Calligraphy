// pages/forum/forum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftPosts: [],
    rightPosts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadPosts();
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
    const posts = [...this.data.leftPosts, ...this.data.rightPosts];
    const post = posts.find(p => p.id === id);
    
    if (post) {
      // 将帖子数据转换为 URL 参数
      const postData = encodeURIComponent(JSON.stringify(post));
      wx.navigateTo({
        url: `/pages/post-detail/post-detail?id=${id}&postData=${postData}`
      });
    }
  },

  // 预览图片
  previewImage(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: [url]
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
    // 处理点赞逻辑
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
  },

  loadPosts() {
    // 模拟数据
    const posts = [
      {
        id: 1,
        image: '/assets/images/forum/post1.jpg',
        title: '行书练习心得',
        description: '今天练习王羲之的兰亭序，重点研究了永字八法的用笔技巧，感觉有些突破...',
        avatar: '/assets/images/avatars/user1.jpg',
        username: '书法爱好者',
        likes: 128,
        comments: 32
      },
      {
        id: 2,
        image: '/assets/images/forum/post2.jpg',
        title: '楷书基本笔画练习',
        description: '分享一下楷书基本笔画的练习方法，包括横、竖、撇、捺等...',
        avatar: '/assets/images/avatars/user2.jpg',
        username: '墨香斋',
        likes: 89,
        comments: 15
      },
      {
        id: 3,
        image: '/assets/images/forum/post3.jpg',
        title: '草书创作分享',
        description: '最近在研究张旭的草书，这是我的一些习作，请大家指教...',
        avatar: '/assets/images/avatars/user3.jpg',
        username: '逸笔生花',
        likes: 256,
        comments: 48
      },
      {
        id: 4,
        image: '/assets/images/forum/post4.jpg',
        title: '篆刻作品展示',
        description: '新完成的篆刻作品，用的是上等寿山石，请欣赏...',
        avatar: '/assets/images/avatars/user4.jpg',
        username: '印痴',
        likes: 167,
        comments: 23
      },
      // 新增的4个帖子
      {
        id: 5,
        image: '/assets/images/forum/post5.jpg',
        title: '隶书临习心得',
        description: '最近在临习《张迁碑》，重点研究了波磔的用笔方法，分享一下心得体会...',
        avatar: '/assets/images/avatars/user5.jpg',
        username: '古法新韵',
        likes: 145,
        comments: 28
      },
      {
        id: 6,
        image: '/assets/images/forum/post6.jpg',
        title: '小楷日常练习',
        description: '每日坚持练习赵佶小楷，今天重点研究了点画的收笔技巧...',
        avatar: '/assets/images/avatars/user6.jpg',
        username: '书法日记',
        likes: 112,
        comments: 19
      },
      {
        id: 7,
        image: '/assets/images/forum/post7.jpg',
        title: '行草创作分享',
        description: '用王羲之的《十七帖》为范本，尝试创作了一幅行草作品，请各位指教...',
        avatar: '/assets/images/avatars/user7.jpg',
        username: '墨韵轩',
        likes: 198,
        comments: 42
      },
      {
        id: 8,
        image: '/assets/images/forum/post8.jpg',
        title: '篆书学习笔记',
        description: '正在研习《说文解字》，对篆书的结构有了新的认识，记录一下学习心得...',
        avatar: '/assets/images/avatars/user8.jpg',
        username: '金石之趣',
        likes: 134,
        comments: 26
      }
    ];

    this.distributePosts(posts);
  },

  distributePosts(posts) {
    const left = [];
    const right = [];
    
    posts.forEach((post, index) => {
      if (index % 2 === 0) {
        left.push(post);
      } else {
        right.push(post);
      }
    });

    this.setData({
      leftPosts: left,
      rightPosts: right
    });
  },

  createPost() {
    wx.navigateTo({
      url: '/pages/post/create'
    });
  }
})
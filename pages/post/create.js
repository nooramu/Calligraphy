Page({
  data: {
    post: {
      title: '',
      content: '',
      description: '',
      images: []
    }
  },

  onTitleInput(e) {
    this.setData({
      'post.title': e.detail.value
    });
  },

  onContentInput(e) {
    this.setData({
      'post.content': e.detail.value
    });
  },

  onDescriptionInput(e) {
    this.setData({
      'post.description': e.detail.value
    });
  },

  chooseImage() {
    wx.chooseImage({
      count: 9 - this.data.post.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'post.images': [...this.data.post.images, ...res.tempFilePaths]
        });
      }
    });
  },

  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.post.images;
    images.splice(index, 1);
    this.setData({
      'post.images': images
    });
  },

  previewImage(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: this.data.post.images
    });
  },

  submitPost() {
    const { title, content, description, images } = this.data.post;
    
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

    wx.showLoading({
      title: '发布中...'
    });

    // 模拟发布
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      });
      
      // 返回上一页并刷新列表
      const pages = getCurrentPages();
      const forumPage = pages[pages.length - 2];
      if (forumPage) {
        forumPage.loadPosts();
      }
      
      wx.navigateBack();
    }, 1500);
  }
}); 
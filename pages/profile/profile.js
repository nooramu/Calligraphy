// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoggedIn: false,
    userInfo: {},
    defaultAvatarUrl: '/assets/images/default-avatar.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 检查登录状态
    this.checkLoginStatus();
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
    // 每次显示页面时刷新用户数据
    if (this.data.isLoggedIn) {
      this.loadUserData();
    }
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

  // 检查登录状态
  checkLoginStatus() {
    const token = wx.getStorageSync('token')
    const userInfo = wx.getStorageSync('userInfo')
    
    if (token && userInfo) {
      this.setData({
        isLoggedIn: true,
        userInfo: userInfo
      })
    } else {
      this.setData({
        isLoggedIn: false,
        userInfo: {}
      })
    }
  },

  // 加载用户数据
  loadUserData() {
    // 模拟数据
    const mockUserInfo = {
      avatarUrl: '/assets/images/avatars/user1.jpg',
      nickName: '书法爱好者小王',
      signature: '临池学书，十年磨一剑',
      posts: 12,
      likes: 168,
      collections: 45
    }
    const mockUserId = 'SF88888'

    this.setData({
      userInfo: mockUserInfo,
      userId: mockUserId
    })
  },

  // 处理登录
  handleLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = res.userInfo
        // 保存用户信息和登录状态
        wx.setStorageSync('userInfo', userInfo)
        wx.setStorageSync('token', 'mock-token')
        
        this.setData({
          isLoggedIn: true,
          userInfo: userInfo
        })
      },
      fail: (err) => {
        console.error('获取用户信息失败：', err)
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  },

  // 页面导航
  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    // 关于我们页面不需要登录验证
    if (url === '/pages/profile/about/about') {
      wx.navigateTo({ url });
      return;
    }
    
    // 其他页面需要登录验证
    if (!this.data.isLoggedIn) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    wx.navigateTo({ url });
  },

  editUserInfo() {
    wx.navigateTo({
      url: '/pages/profile/edit/edit'
    })
  }
})
// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoggedIn: false,
    userInfo: {
      avatar: '',
      nickname: '',
      description: '',
      posts: 0,
      likes: 0,
      collections: 0
    }
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
    // TODO: 检查本地存储的登录信息或调用后端API
    const token = wx.getStorageSync('token');
    if (token) {
      this.setData({ isLoggedIn: true });
      this.loadUserData();
    }
  },

  // 加载用户数据
  loadUserData() {
    // TODO: 调用后端API获取用户数据
    // 这里使用模拟数据
    this.setData({
      userInfo: {
        avatar: '/assets/images/avatars/user1.jpg',
        nickname: '书法爱好者',
        description: '热爱书法，追求艺术',
        posts: 12,
        likes: 168,
        collections: 45
      }
    });
  },

  // 处理登录
  handleLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        // TODO: 调用后端API进行登录
        console.log('用户信息：', res.userInfo);
        this.setData({
          isLoggedIn: true,
          userInfo: {
            ...this.data.userInfo,
            avatar: res.userInfo.avatarUrl,
            nickname: res.userInfo.nickName
          }
        });
        // 存储登录状态
        wx.setStorageSync('token', 'mock-token');
      },
      fail: (err) => {
        console.error('获取用户信息失败：', err);
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  },

  // 页面导航
  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    if (!this.data.isLoggedIn && url !== '/pages/about/about') {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    wx.navigateTo({ url });
  }
})
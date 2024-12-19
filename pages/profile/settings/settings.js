Page({
  navigateTo(e) {
    const url = e.currentTarget.dataset.url
    wx.navigateTo({ url })
  },

  handleLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除登录信息
          wx.removeStorageSync('token')
          wx.removeStorageSync('userInfo')
          
          // 返回个人页面并刷新
          wx.navigateBack({
            success: () => {
              const pages = getCurrentPages()
              const profilePage = pages[pages.length - 2]
              if (profilePage) {
                profilePage.checkLoginStatus()
              }
            }
          })
        }
      }
    })
  }
}) 
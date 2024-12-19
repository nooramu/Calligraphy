Page({
  data: {
    userInfo: {}
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo') || {}
    this.setData({ userInfo })
  },

  changeAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        this.setData({
          'userInfo.avatarUrl': tempFilePath
        })
      }
    })
  },

  onNicknameInput(e) {
    this.setData({
      'userInfo.nickName': e.detail.value
    })
  },

  onSignatureInput(e) {
    this.setData({
      'userInfo.signature': e.detail.value
    })
  },

  saveUserInfo() {
    // 保存用户信息
    wx.setStorageSync('userInfo', this.data.userInfo)
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
    // 返回上一页
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
}) 
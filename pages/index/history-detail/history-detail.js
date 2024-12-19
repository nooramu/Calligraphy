Page({
  data: {
    detail: null
  },

  onLoad(options) {
    const historyList = wx.getStorageSync('historyList') || []
    const detail = historyList.find(item => item.id === options.id)
    if (detail) {
      this.setData({ 
        detail: {
          imagePath: detail.imagePath,
          styleName: detail.styleName,
          confidence: detail.confidence,
          description: detail.description,
          analyzeTime: detail.analyzeTime
        }
      })
    } else {
      wx.showToast({
        title: '记录不存在',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  }
}) 
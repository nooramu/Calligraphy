Page({
  data: {
    historyList: [],
    showModal: false,
    currentItem: null
  },

  onLoad() {
    const historyList = wx.getStorageSync('historyList') || []
    this.setData({
      historyList
    })
  },

  viewDetail(e) {
    const item = e.currentTarget.dataset.item
    this.setData({
      showModal: true,
      currentItem: {
        imagePath: item.imagePath,
        styleName: item.styleName,
        confidence: item.confidence,
        description: item.description,
        analyzeTime: item.analyzeTime
      }
    })
  },

  hideModal() {
    this.setData({
      showModal: false,
      currentItem: null
    })
  }
}) 
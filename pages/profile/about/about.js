Page({
  data: {
    // 可以添加版本号等数据
  },

  onShareAppMessage() {
    return {
      title: '书法风格识别 - 您的书法鉴赏助手',
      path: '/pages/index/index'
    }
  }
}) 
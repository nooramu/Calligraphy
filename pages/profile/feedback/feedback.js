Page({
  data: {
    content: '',
    contact: ''
  },

  onContentInput(e) {
    this.setData({ content: e.detail.value })
  },

  onContactInput(e) {
    this.setData({ contact: e.detail.value })
  },

  submitFeedback() {
    const { content, contact } = this.data

    if (!content.trim()) {
      wx.showToast({
        title: '请输入反馈内容',
        icon: 'none'
      })
      return
    }

    // TODO: 提交反馈到服务器
    console.log('提交反馈：', {
      content,
      contact
    })

    wx.showToast({
      title: '提交成功',
      icon: 'success'
    })

    // 延迟返回上一页
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
}) 
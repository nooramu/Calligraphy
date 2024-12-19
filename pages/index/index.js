// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    tempImagePath: '',
    historyList: [],
    recognitionResult: null
  },

  onLoad() {
    this.loadHistory();
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          tempImagePath: res.tempFilePaths[0],
          recognitionResult: null // 清除之前的识别结果
        });
      }
    });
  },

  // 分析书法风格
  analyzeStyle() {
    if (!this.data.tempImagePath) {
      return;
    }

    wx.showLoading({
      title: '正在识别...',
    });

    // 这里需要调用后端API进行风格识别
    // 示例代码，实际需要替换为真实的API调用
    setTimeout(() => {
      const result = {
        styleName: '楷书',
        confidence: 95,
        description: '楷书是继隶书后产生的一种字体，其特点是字形方正，笔画平直，结构严谨。在书法发展史上具有重要地位，是初学书法者最基本的入门字体。'
      };

      this.setData({
        recognitionResult: result
      });

      this.saveHistory(result);
      
      wx.hideLoading();
    }, 2000);
  },

  // 清除结果
  clearResult() {
    this.setData({
      tempImagePath: '',
      recognitionResult: null
    });
  },

  // 保存历史记录
  saveHistory(result) {
    wx.saveFile({
      tempFilePath: this.data.tempImagePath,
      success: (res) => {
        console.log('原始临时路径：', this.data.tempImagePath)
        console.log('图片保存成功，永久路径：', res.savedFilePath)
        
        const historyList = wx.getStorageSync('historyList') || []
        const newRecord = {
          id: Date.now().toString(),
          imagePath: res.savedFilePath,
          styleName: result.styleName,
          confidence: result.confidence || 0,
          description: result.description || '暂无描述',
          analyzeTime: new Date().toLocaleString()
        }
        
        console.log('新建的历史记录：', newRecord)
        historyList.unshift(newRecord)
        wx.setStorageSync('historyList', historyList)
        
        // 更新页面显示
        this.setData({
          historyList: historyList
        })
      },
      fail: (error) => {
        console.error('保存图片失败：', error)
        wx.showToast({
          title: '保存图片失败',
          icon: 'none'
        })
      }
    })
  },

  // 加载历史记录
  loadHistory() {
    const historyList = wx.getStorageSync('historyList') || [];
    this.setData({
      historyList
    });
  }
});

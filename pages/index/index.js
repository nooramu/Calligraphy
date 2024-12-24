// index.js
Page({
  data: {
    imageUrl: '',
    recognitionResult: null,
    isRecognizing: false
  },

  // 防抖定时器
  analyzeTimer: null,
  onLoad() {
    this.loadHistory();
  },
  onShow() {
    // 页面显示时重新加载历史记录
    if (!this.data.isRecognizing) {
      this.loadHistory();
    }
  },
  // 选择图片
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.setData({ 
          imageUrl: tempFilePath,
          recognitionResult: null
        });
        console.log('图片已上传，路径:', tempFilePath);
      }
    })
  },

  // 获取书法风格描述
  getStyleDescription(style) {
    const descriptions = {
      '楷书': '楷书工整严谨，笔画方正，结构规范，是最常见的书法字体。',
      '行书': '行书介于楷书与草书之间，既保持了楷书的规范，又带有行云流水般的流畅感。',
      '草书': '草书笔画连绵，形态奔放，讲究气韵流动，是最��艺术性的书法字体。',
      '隶书': '隶书横画肥厚，竖画瘦劲，呈现出独特的"蚕头燕尾"特征。',
      '篆书': '篆书笔画圆润，结构匀称，是最古老的书法字体之一。'
    };
    return descriptions[style] || '暂无描述';
  },

  // 识别书法风格
  recognizeCalligraphy() {
    if (this.data.isRecognizing) {
      console.log('正在识别中，请等待...');
      return;
    }
    
    if (!this.data.imageUrl) {
      wx.showToast({
        title: '请先上传图片',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    wx.showLoading({
      title: '识别中...',
      mask: true
    });
    
    const app = getApp();
    app.recognizeCalligraphy(this.data.imageUrl)
      .then(result => {
        console.log('服务器返回原始数据:', result);
        const newResult = {
          styleName: result.style,
          confidence: Math.round(result.probability * 100),
          description: this.getStyleDescription(result.style)
        };
        console.log('处理后的结果:', newResult);
        
        try {
          this.setData({
            recognitionResult: newResult,
            isRecognizing: false
          }, () => {
            console.log('状态更新完成');
            wx.hideLoading();
            
            const historyList = wx.getStorageSync('historyList') || [];
            const newRecord = {
              id: Date.now().toString(),
              imagePath: this.data.imageUrl,
              ...newResult,
              analyzeTime: new Date().toLocaleString()
            };
            historyList.unshift(newRecord);
            wx.setStorageSync('historyList', historyList);
            this.setData({
              historyList: historyList
            });
          });
        } catch (err) {
          console.error('状态更新出错:', err);
          wx.hideLoading();
        }
      })
      .catch(error => {
        console.error('识别失败:', error);
        wx.hideLoading();
        
        if (error.message && error.message.includes('exceed max upload connection count')) {
          wx.showToast({
            title: '系统繁忙，请稍后重试',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: error.message || '识别失败，请重试',
            icon: 'none',
            duration: 2000
          });
        }
        this.setData({ 
          isRecognizing: false 
        });
      });
  },

  // 开始识别
  analyzeStyle() {
    // 清除之前的定时器
    if (this.analyzeTimer) {
      clearTimeout(this.analyzeTimer);
    }
    
    // 防止重复点击
    if (this.data.isRecognizing) {
      wx.showToast({
        title: '正在识别中...',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (!this.data.imageUrl) {
      wx.showToast({
        title: '请先上传图片',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 使用定时器延迟执行
    this.analyzeTimer = setTimeout(() => {
      this.recognizeCalligraphy();
    }, 300);
  },

  // 清除结果
  clearResult(e) {
    this.setData({
      imageUrl: '',
      recognitionResult: null
    });
    console.log('已清除图片和识别结果');
  },

  // 加载历史记录
  loadHistory() {
    const historyList = wx.getStorageSync('historyList') || [];
    this.setData({
      historyList
    });
  },

  // 页面卸载时的处理
  onUnload() {
    // 页面卸载时清除定时器
    if (this.analyzeTimer) {
      clearTimeout(this.analyzeTimer);
    }
  }
  
});

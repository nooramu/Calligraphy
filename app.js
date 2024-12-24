// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  // 书法识别接口
  recognizeCalligraphy(imagePath) {
    return new Promise((resolve, reject) => {
      // 检查参数
      if (!imagePath) {
        console.error('缺少图片路径');
        reject(new Error('缺少图片路径'));
        return;
      }

      console.log('开始上传图片:', imagePath);

      try {
        const uploadTask = wx.uploadFile({
          url: 'http://127.0.0.1:3000/predict',
          filePath: imagePath,
          name: 'image',
          header: {
            'content-type': 'multipart/form-data',
            'accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
          timeout: 30000,
          formData: {
            timestamp: Date.now()
          },
          success: (res) => {
            if (res.statusCode !== 200) {
              reject(new Error(`服务器响应错误: ${res.statusCode}`));
              return;
            }
            
            console.log('服务器响应状态码:', res.statusCode);
            console.log('服务器响应头:', res.header);
            console.log('服务器响应数据:', res.data);
            
            try {
              const result = JSON.parse(res.data);
              
              if (!result.style || typeof result.probability === 'undefined') {
                reject(new Error('服务器返回数据格式错误'));
                return;
              }
              
              resolve({
                style: result.style,
                probability: result.probability
              });
              
            } catch (error) {
              console.error('解析响应失败:', error);
              reject(new Error('解析结果失败: ' + error.message));
            }
          },
          fail: (error) => {
            console.error('请求失败:', error);
            reject(new Error('上传失败：' + error.errMsg));
          }
        });

        // uploadTask.onProgressUpdate((res) => {
        //   if (res.progress > 0) {
        //     console.log('上传进度:', res.progress + '%');
        //   }
        // });
      } 
      catch (error) {
        console.error('创建上传任务失败:', error);
        reject(new Error('创建上传任务失败: ' + error.message));
      }
    });
  }
})

# 小程序图片资源规范指南

## 目录结构
```
assets/
  └── images/
      ├── icons/          # 图标资源目录
      │   ├── upload.png  # 上传图标
      │   ├── home.png    # 首页图标
      │   └── ...
      ├── history/        # 书法史图片目录
      │   ├── jiaguwen1.jpg   # 甲骨文例字
      │   ├── jiaguwen2.jpg   # 甲骨卜辞
      │   ├── xiaozhuanti1.jpg  # 泰山刻石
      │   ├── xiaozhuanti2.jpg  # 秦权量铭文
      │   ├── lishu1.jpg    # 张迁碑
      │   ├── lishu2.jpg    # 乙瑛碑
      │   ├── kaishu1.jpg   # 兰亭序
      │   ├── kaishu2.jpg   # 九成宫醴泉铭
      │   └── placeholder.jpg  # 图片加载失败时的占位图
      └── gallery/        # 作品库图片目录
          ├── works/      # 用户上传作品
          └── samples/    # 示例作品

## 图片规格要求

### 1. 书法作品图片 (history/, gallery/)
- 格式：JPG/JPEG
- 分辨率：建议 1080px × 1440px (3:4)
- 文件大小：单张不超过 200KB
- 品质要求：
  * 画面清晰，字迹可辨
  * 光线均匀，无严重反光
  * 背景干净，无杂物干扰
  * 构图完整，留有适当边距

### 2. 图标资源 (icons/)
- 格式：PNG (支持透明背景)
- 尺寸：108px × 108px (3倍图)
- 风格：
  * 线条粗细统一
  * 视觉重量平衡
  * 风格统一，简约现代
  * 搭配主题配色

### 3. 占位图片 (placeholder.jpg)
- 格式：JPG/PNG
- 尺寸：400px × 400px
- 设计：
  * 简约的书法元素
  * 中性灰色调
  * 可包含加载提示文字

## 命名规范

### 1. 书法史图片
- 格式：`{书体拼音}{序号}.jpg`
- 示例：
  * jiaguwen1.jpg
  * lishu2.jpg
  * kaishu1.jpg

### 2. 图标文件
- 格式：`{功能描述}.png`
- 示例：
  * upload.png
  * home.png
  * share.png

### 3. 作品库图片
- 格式：`{分类}_{日期}_{id}.jpg`
- 示例：
  * work_20240101_001.jpg
  * sample_20240101_001.jpg

## 图片优化建议

1. 压缩处理
   - 使用 TinyPNG 等工具进行无损压缩
   - 保持清晰度的同时减小文件体积

2. 加载优化
   - 重要图片预加载
   - 添加加载状态提示
   - 实现图片加载失败后的优雅降级

3. 存储管理
   - 定期清理未使用的图片资源
   - 建立图片资源版本管理
   - 保持目录结构整洁

## 注意事项

1. 版权问题
   - 确保图片使用权
   - 注明图片来源
   - 避免使用有争议的图片

2. 性能考虑
   - 控制图片总量
   - 适当使用缓存策略
   - 考虑弱网环境下的体验

3. 维护更新
   - 定期检查图片有效性
   - 及时更新过期内容
   - 保持资源文件的同步
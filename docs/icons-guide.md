# 小程序图标指南

## 待添加的图标路径
需要在项目中创建以下图标文件：

### 首页图标
- assets/icons/home.png
- assets/icons/home-active.png

### 风格史图标
- assets/icons/history.png
- assets/icons/history-active.png

### 作品库图标
- assets/icons/gallery.png
- assets/icons/gallery-active.png

### 论坛图标
- assets/icons/forum.png
- assets/icons/forum-active.png

### 个人中心图标
- assets/icons/profile.png
- assets/icons/profile-active.png

## 图标制作注意事项

1. 图标尺寸要求：
   - 建议尺寸：81px × 81px
   - 格式：PNG
   - 背景：透明

2. 命名规则：
   - 普通状态：功能名.png
   - 选中状态：功能名-active.png

3. 使用说明：
   - 准备好图标后，将其放入 assets/icons/ 目录
   - 在 app.json 中配置对应的图标路径
   - 路径格式示例：
     ```json
     {
       "pagePath": "pages/index/index",
       "text": "首页",
       "iconPath": "assets/icons/home.png",
       "selectedIconPath": "assets/icons/home-active.png"
     }
     ```

4. 图标风格建议：
   - 保持统一的设计风格
   - 选中状态建议使用主题色
   - 图标要简洁清晰，易识别 
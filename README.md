# mika-img2base64-loader

这是一个将代码中引用本地资源图片(png、jpg、jpeg、gif、webp、svg格式)转换为base64格式的Webpack loader


### 安装

```bash
npm install --save-dev ./webpack-plugins/mika-img2base64-loader
```

### 配置使用

1.在`webpack.config.js`中配置loader：

```javascript
module.exports = {
  // ... 其他配置
  module: {
    rules: [
      // ... 其他规则
      {
        test: /\.(png|jpg|jpeg|gif|webp|svg)$/i,
        type: 'javascript/auto',
        use: {
          loader: './webpack-plugins/mika-img2base64-loader',
          options: {
            limit: 100000, // 100KB
            encoding: 'base64',
            mimetype: undefined,
            fallback: 'file-loader'
          }
        }
      }
    ]
  }
}
```
2. 在代码中正常导入图片：

```javascript
import logo from './assets/logo.png'
```

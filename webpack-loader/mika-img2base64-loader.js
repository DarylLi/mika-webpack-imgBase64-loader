const fs = require('fs').promises;
const path = require('path');

module.exports = async function(content) {
  const callback = this.async();
  const options = this.getOptions() || {};
  
  const {
    limit = 100000,
    mimetype,
    encoding = 'base64',
    fallback = 'file-loader'
  } = options;

  const resourcePath = this.resourcePath;

  try {
    // 获取文件信息
    const stats = await fs.stat(resourcePath);
    
    // 超过限制，使用 fallback
    if (stats.size > limit) {
      const fallbackLoader = require(fallback);
      return fallbackLoader.call(this, content);
    }

    // 确定 MIME 类型
    const ext = path.extname(resourcePath).slice(1);
    const mime = mimetype || `image/${ext === 'svg' ? 'svg+xml' : ext.replace('jpg', 'jpeg')}`;

    // 转换为 base64
    const base64 = content.toString(encoding);
    const dataUrl = `data:${mime};${encoding},${base64}`;

    // 返回模块代码
    const esModule = this._module && this._module.type === 'javascript/esm';
    const code = esModule 
      ? `export default ${JSON.stringify(dataUrl)}`
      : `module.exports = ${JSON.stringify(dataUrl)}`;
    callback(null, code);
  } catch (error) {
    callback(error);
  }
};

module.exports.raw = true;
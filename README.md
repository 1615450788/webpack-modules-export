# webpack-modules-export
  用于静态化依赖文件的webpack插件，主要用于spa单页应用的前端配置文件生成

## 安装方式
```
npm install webpack-modules-export
```

## 示例
```javascript
// webpack.config.js
const webpackModulesExport = require('webpack-modules-export');

module.exports = {
  /*...*/
  plugins:[
    new webpackModulesExport({
        fileName:'menu.js',
        outputName:'menu.json'
    })
  ]
};
```

## 参数
- fileName
    - 类型：`String` 
    - 默认值：`menu.js`
    需要导出的文件路径或文件名
- outputName
   - 类型：`String` 
   - 默认值：`menu.json`
   导出后的文件名

## 联系方式

邮箱 : 1615450788@qq.com

有任何问题请发Issues或者邮箱联系我-.-  谢谢!

const fs = require('fs');
const filterObject = require('./lib/filterObject');

function HelloWorldPlugin(options) {
    // 使用配置（options）设置插件实例
    this.fileName=options.fileName||'menu.js';
    this.outputName=options.outputName||'menu.json';
    this.onComplete=options.onComplete;
}

HelloWorldPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', (compilation, callback)=>{
        let menuObj=[],menuText='';
        if(this.fileName){
          compilation.chunks.forEach((chunk)=>{
            chunk.modules.forEach((module)=>{
              if(module&&module.resource&&(module.resource.indexOf(this.fileName)>=0)){
                module.fileDependencies.forEach((filepath)=>{
                  let menu=fs.readFileSync(filepath).toString();
                  menu=filterObject(menu);
                  if(menu instanceof Array){
                    menuObj=menuObj.concat(menu);
                  }
                });
              }
            });
          });
        }
        if(this.onComplete instanceof Function){
          menuObj=this.onComplete(menuObj);
        }
        menuText=JSON.stringify(eval(menuObj),null,'  ');
        compilation.assets[this.outputName] = {
            source: () => {
                return menuText
            },
            size: () => {
                return menuText.length
            }
        };
        // 最后调用callback
        callback();
    });
};
module.exports = HelloWorldPlugin;
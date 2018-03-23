const fs = require('fs');
const Import = require('./lib/import');

function HelloWorldPlugin(options) {
    // 使用配置（options）设置插件实例
    this.fileName=options.fileName||'menu.js';
    this.outputName=options.outputName||'menu.json';
}

HelloWorldPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', function(compilation, callback){
        let menuObj=[],menuText='';
        compilation.chunks.forEach((chunk)=>{
            chunk.modules.forEach((module)=>{
                if(module&&module.resource&&(module.resource.indexOf(this.fileName)>=0)){
                    module.fileDependencies.forEach((filepath)=>{
                        let menu=fs.readFileSync(filepath).toString();
                        let variable=Import.match(menu);
                        if(variable&&variable.length){
                            let reg=Import.variable(variable);
                            menu=Import.replace(menu);
                            menu=menu.replace(reg,'""').replace(/""""/g,'""');
                        }
                        if(menu instanceof Array){
                            menuObj=menuObj.concat(menu);
                        }else if(menu instanceof Object){
                            menuObj=menuObj.push(menu);
                        }
                    });
                }

            });
        });
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
let { match, variableReg, replace,recursion} = require('./methods');

module.exports=function (_text) {
    let result,
        text,
        object,
        reg,
        importChunk;
    importChunk=match(_text);
    reg=variableReg(importChunk);
    text=replace(_text);
    text=text.replace(reg,'');
    try{
        object=eval(text);
    }catch(e){
        console.log(`js文件转对象时(eval)出错：`);
        console.log(text,importChunk,reg);
    }
    if(object instanceof Array){
        result=object;
    }else if(object instanceof Object){
        result=[object];
    }
    result=recursion(result,'children',(val,index)=>{
        return {
          icon:val.icon,
          name:val.name,
          authorityCode:val.authorityCode,
          children:val.children
        }
    })
    return result
};
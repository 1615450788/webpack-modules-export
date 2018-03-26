function match(str){
    let result;
    if(typeof str==='string'){
        result=str.match(/import [a-zA-Z0-9{}, *]+/g);
    }
    return result
}

function variableReg(arr) {
    let result;
    if(arr instanceof Array&&arr.length){
        result=arr.map((val)=>val.replace(',','|').replace(/import|from|\{|\}|as|\*| /g,'')).join('|');
        result=new RegExp(result,'g')
    }
    return result
}

function replace(str) {
    let result;
    if(typeof str==='string'){
        result=str.replace(/(import .+)|(export default)|(vue.+)/g,'').replace(/require(.+)/g,'""');
    }
    return result
}


module.exports = {
    match,
    variableReg,
    replace,
};


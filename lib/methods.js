let reg={
    importFilter:/import .+/g,
    requireFilter:/.+=.*require(.ensure)?\(.+\);?/g
}

function match(str){
    let result=[];
    if(typeof str==='string'){
        let importFilter=str.match(reg.importFilter);
        importFilter instanceof Array&&importFilter.map(val=>{
            let packName=val.replace(/import|from|\{|\}| as |\*|('.+')|(".+")|;| /g,'');
            if(packName.indexOf(',')>=0){
                result.push(...packName.split(','))
            }else{
                result.push(packName)
            }
        });
        let requireFilter=str.match(reg.requireFilter);
        requireFilter instanceof Array&&requireFilter.map(val=>{
            let packName=val.replace(/let|var|const|;| |\{|\}|=.*require(.ensure)?\(.+\)/g,'');
            if(packName.indexOf(',')>=0){
                result.push(...packName.split(','))
            }else{
                result.push(packName)
            }
        })
    }
    return result
}

function variableReg(arr) {
    let result;
    if(arr instanceof Array&&arr.length){
        result=`.+(${arr.join('|')})((?=\\.).+|[^"': a-zA-Z0-9]+)`;
        result=new RegExp(result,'g');
    }
    return result
}

function replace(str) {
    let result;
    if(typeof str==='string'){
        result=str.replace(/export default/g,'').replace(reg.importFilter,'').replace(reg.requireFilter,'').replace(/require\(.+\)/g,'""');
    }
    return result
}


module.exports = {
    match,
    variableReg,
    replace
};


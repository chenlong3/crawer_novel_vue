/**
 * Created by cl on 2017/6/22.
 */
function http(type,url,data){
    return new Promise(function(resolve,reject){
        if(type === 'GET'){
            data&&Object.keys(data).forEach((item,index)=>{
                if(index===0){
                    url += '?' + item + '=' + data[item]
                }else{
                    url += '&' + item + '=' + data[item]
                }
            })
        }
        let xhr = new XMLHttpRequest();
        xhr.open(type||'GET',url,true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.onreadystatechange=function(){
            if (xhr.readyState === 4) {
                let ready = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    resolve(ready)
                } else {
                    reject(ready)
                }
            }
        };
        xhr.send(JSON.stringify(data))
    })
}
export default http
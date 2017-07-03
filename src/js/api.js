/**
 * Created by cl on 2017/6/29.
 */
import http from './methods'
import {NOVELAPI,WEBSITEAPI,DOWNAPI} from './constant'
export default {
    downNovel:function(id){
        return http('GET',DOWNAPI+id)
    },
    getNovel:function(data,id){
        return http('GET',NOVELAPI+(id||''),data)
    },
    addNovel:function(data){
        return http('POST',NOVELAPI,data)
    },
    delNovel:function(id){
        return http('DELETE',NOVELAPI+id)
    },
    upNovel:function(id,data){
        return http('PUT',NOVELAPI+id,data)
    },
    getWebsite:function(data,id){
        return http('GET',WEBSITEAPI+(id||''),data)
    },
    addWebsite:function(data){
        return http('POST',WEBSITEAPI,data)
    },
    delWebsite:function(id){
        return http('DELETE',WEBSITEAPI+id)
    },
    upWebsite:function(id,data){
        return http('PUT',WEBSITEAPI+id,data)
    }
}
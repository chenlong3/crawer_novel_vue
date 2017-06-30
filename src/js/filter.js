/**
 * Created by cl on 2017/6/22.
 */
import Vue from 'vue'

Vue.filter('isOR',function(val){
    return val?'是':'否'
});

export default Vue
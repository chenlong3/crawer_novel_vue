import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUi from 'element-ui'
import App from './App.vue'
import login from './template/login.vue'
import admin from './template/admin.vue'
import article from './template/article.vue'
import product from './template/product.vue'
import home from './template/home.vue'
import Quill from 'quill'

import 'element-ui/lib/theme-default/index.css'
import 'normalize.css/normalize.css'
import 'quill/dist/quill.snow.css'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(ElementUi);

const router = new VueRouter({
        mode: 'history',
        base: __dirname,
        routes:[
            { path: '/', component: login },
            {
                path: '/admin', component: admin,
                children: [
                    {
                        path: 'home',
                        component: home
                    },
                    {
                        path: 'article',
                        component: article
                    },
                    {
                        path: '/',
                        component: product
                    }
                ]
            }
        ]
    }
);
Vue.directive('editor', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el,bin) {

        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['image'],

            ['clean']                                         // remove formatting button
        ];
        let input = document.getElementById('file');
        function imageHandler() {
            if(!input){
                input = document.createElement("input");
                input.setAttribute('type','file');
                input.setAttribute('id','file');
                input.setAttribute('accept','image/png, image/jpeg, image/gif, image/jpg');
                input.setAttribute('style','display:none');
                el.appendChild(input);
            }
            input.click();
            input.addEventListener('change',listener, false);
            function listener(){
                console.log(1);
                if(input.files[0]){
                    console.log(input.files[0]);
                    let data = new FormData();
                    data.append('image', input.files[0]);

                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://localhost:9000/api/image', true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            let ready = JSON.parse(xhr.responseText);
                            if (ready.status === 200 && ready.success) {
                                console.log('上传成功',ready);
                                fn(ready.url)
                            } else {
                                let reader = new FileReader();
                                reader.onload = function (e) {
                                    fn(e.target.result);
                                };
                                reader.readAsDataURL(input.files[0]);
                            }
                        }
                    };
                    xhr.send(data);
                }
            }
            function fn(url){
                console.log(quill.getSelection().index);
                quill.insertEmbed(quill.getSelection().index, 'image', url);
                input.removeEventListener('change',listener,false)
            }
        }
        // 聚焦元素
        let quill = new Quill(el, {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: 'Insert an image...',
        });
        quill.getModule('toolbar').addHandler('image', imageHandler);
        quill.on('text-change', function(delta, oldDelta, source) {
            console.log(quill.getSelection());
            bin.value(quill.container.firstChild.innerHTML);
            if (source == 'api') {
                console.log("An API call triggered this change.");
            } else if (source == 'user') {
                console.log("A user action triggered this change.");
            }
        });
    }
});

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');


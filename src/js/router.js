/**
 * Created by cl on 2017/6/29.
 */
import VueRouter from 'vue-router'
import login from '../template/login.vue'
import admin from '../template/admin.vue'
import article from '../template/article.vue'
import website from '../template/website.vue'
import addWebsite from '../template/addwebsite.vue'
import home from '../template/home.vue'
import novel from '../template/novel.vue'
import addNovel from '../template/addNovel.vue'

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
                        name:'website',
                        path: '/',
                        component: website
                    },
                    {
                        name:'addWebsite',
                        path: '/addWebsite/:id',
                        component: addWebsite
                    },
                    {
                        name:'novel',
                        path: 'novel',
                        component: novel
                    },
                    {
                        name:'addNovel',
                        path: '/addNovel/:id',
                        component: addNovel
                    }
                ]
            }
        ]
    }
);
export default router
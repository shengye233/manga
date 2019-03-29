import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Manga from './views/Manga'
import Mine from './views/Mine'
import Shoucang from './views/Shoucang'
// import ReadManga from './views/ReadManga'
import Login from './views/Login'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/manga',name: 'manga',component: Manga},
        {path: '/mine',name: 'mine',component: Mine},
        // {path: '/login',name: 'login',component: Login},
        {path: '/shoucang',name: 'shoucang',component: Shoucang},
        {path: '/login',name: 'login',component: Login}
        // {path: '/read',name: 'read',component: ReadManga}
    ],
    linkActiveClass: 'active'
})

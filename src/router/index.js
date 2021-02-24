import Vue from 'vue'
import Router from 'vue-router'
import Data from '../components/Data.vue'
import Shouru from '../components/Shouru.vue'
// import App from './App.vue'

Vue.use(Router)
Vue.use(Data)
Vue.use(Shouru)
const routes = [{
    path: '/',
    redirect: '/index'
}, {
    path: '/index',
    component: Data
}, {

    path: '/shouru',
    component: Shouru

}]
export default new Router({
    mode: 'history',
    routes
})
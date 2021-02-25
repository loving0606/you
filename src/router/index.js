import Vue from 'vue'
import Router from 'vue-router'
import Data from '../components/OilData.vue'
import Shouru from '../components/Shouru.vue'
import Home from '../components/Home.vue'
import OilSale from '../components/OilSale.vue'
// import App from './App.vue'

Vue.use(Router)
Vue.use(Data)
Vue.use(Shouru)
Vue.use(OilSale)
const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        children: [{
            path: '/home/oil',
            component: Data
        }, {

            path: '/home/shouru',
            component: Shouru

        }, {
            path: '/home/oilsale',
            component: OilSale
        }]
    }




]
export default new Router({
    mode: 'history',
    routes
})
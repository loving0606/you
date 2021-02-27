import Vue from 'vue'
import Router from 'vue-router'
import Data from '../components/OilData.vue'
import Shouru from '../components/Shouru.vue'
import Home from '../components/Home.vue'
import OilSale from '../components/OilSale.vue'
import Urea1 from '../components/urea/Urea1.vue'
import Urea2 from '../components/urea/Urea2.vue'
import Welcome from '../components/Welcome.vue'
import Cards from '../components/cards/Cards.vue'
// import App from './App.vue'

Vue.use(Router)
Vue.use(Data)
Vue.use(Shouru)
Vue.use(OilSale)
Vue.use(Home)
Vue.use(Urea1)
Vue.use(Urea2)
Vue.use(Welcome)
Vue.use(Cards)
const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [{
            path: '/welcome',
            component: Welcome
        }, {
            path: '/oil',
            component: Data
        }, {

            path: '/shouru',
            component: Shouru

        }, {
            path: '/oilsale',
            component: OilSale
        }, {
            path: '/urea1',
            component: Urea1
        }, {
            path: '/urea2',
            component: Urea2
        }, {
            path: '/cards',
            component: Cards
        }]
    }




]
export default new Router({
    mode: 'history',
    routes
})
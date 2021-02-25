import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'
import router from './router'
import { Button, Table, TableColumn, FormItem, Form, Input, Col, TimePicker, DatePicker, Container, Header, Aside, Main, Menu, Submenu, MenuItem, Card, Pagination, Breadcrumb, BreadcrumbItem, Row, Dialog, Footer } from 'element-ui'

Vue.config.productionTip = false
    // Vue.prototype.$axios = axios

// Vue.use(router)
Vue.use(Button)
Vue.use(Table)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(TableColumn)
Vue.use(Col)
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Dialog)
Vue.use(Footer)
new Vue({
    render: h => h(App),
    router
}).$mount('#app')
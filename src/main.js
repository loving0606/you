import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'
import router from './router'
import './assets/css/font_2388651_qd5spc196ke.css'
import { Button, Table, TableColumn, FormItem, Form, Input, Col, TimePicker, DatePicker, Container, Header, Aside, Main, Menu, Submenu, MenuItem, Card, Pagination, Breadcrumb, BreadcrumbItem, Row, Dialog, Footer, Message } from 'element-ui'
import './assets/css/index.css'
import './assets/js/font_2388651_qd5spc196ke.js'
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
    Vue.use(Message)
// Vue.component(Message.name, Message)
Vue.prototype.$message = Message
    // Vue.filter("dateForm", function(value) {
    //     var das = new Date(value)
    //     console.log(das)
    //     console.log(das.getMonth())
    //     let Y = das.getFullYear()
    //     let M = das.getMonth() + 1
    //     if (M < 10) {
    //         M = ('0' + M)
    //     }
    //     let D = das.getDate()
    //     if (D < 10) {
    //         D = ('0' + D)
    //     }
    //     return (Y + '年' + M + '月' + D + '日')
    // })
new Vue({
    render: h => h(App),
    router
}).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'
import router from './router'
import { Button, Table, TableColumn, FormItem, Form, Input, Col, TimePicker, DatePicker } from 'element-ui'

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
new Vue({
    render: h => h(App),
    router
}).$mount('#app')
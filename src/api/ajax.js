import axios from 'axios'
import qs from 'qs'
const instance = axios.create({
    baseURL = 'http://loaclhost:3000'
})
export default instance
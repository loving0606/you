<template>
  <div class="data">
    {{name}}
    <button @click="findData">点击</button>
    <div class="shows">
      <ul>
        <li v-for="(data,index) in datas"
            v-show="!editShow">{{data.date}}---{{data.oil1}}--{{data.oil2}}--{{data.oil3}}--{{data.oil4}}--{{data.oil5}}<button @click="edit(data.keys)">编辑</button></li>

      </ul>
      <ul>
        <li v-for="(data,index) in dataShouyi">{{data.date}}---{{data.oil1}}--{{data.oil2}}--{{data.oil3}}--{{data.oil4}}--{{data.oil5}}</li>
      </ul>
    </div>
    <button @click="update">新增数据</button>
    <div>
      <input type='text'
             v-model="addForm.oil1"
             value="addForm.oil1">
      <input type='text'
             v-model="addForm.oil2"
             value="addForm.oil2">
      <input type='text'
             v-model="addForm.oil3"
             value="addForm.oil3">
      <input type='text'
             v-model="addForm.oil4"
             value="addForm.oil4">
      <input type='text'
             v-model="addForm.oil5"
             value="addForm.oil5">
      <button @click=update>确定增加</button>
    </div>
    <div>
      <h2>修改{{editForm.date}}的数据</h2>
      <input type='text'
             v-model="editForm.oil1"
             value="addForm.oil1">
      <input type='text'
             v-model="editForm.oil2"
             value="addForm.oil2">
      <input type='text'
             v-model="editForm.oil3"
             value="addForm.oil3">
      <input type='text'
             v-model="editForm.oil4"
             value="addForm.oil4">
      <input type='text'
             v-model="editForm.oil5"
             value="addForm.oil5">
      <button @click='editUpdate'>确定修改</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Data',
  props: {
    msg: String
  },
  data () {
    return {
      name: 'abc',
      datas: [],
      dataShouyi: [],
      addForm: {
        oil1: 0,
        oil2: 0,
        oil3: 0,
        oil4: 0,
        oil5: 0,
        date: ''
      },
      editForm: {
        oil1: 0,
        oil2: 0,
        oil3: 0,
        oil4: 0,
        oil5: 0,
        date: '',
        keys: 0
      },
      editShow: false
    }
  },
  created: function () {
    this.findData()
    this.findDataShouyi()
  },
  computed: {

  },
  methods: {
    findData () {

      // var url = 'http://127.0.0.1:3000/get'
      var url = '/api/get'

      axios.get(url)
        .then(res => {
          console.log(res.data)
          this.datas = res.data
        })
        .catch(err => {
          console.log(err)
        })

    },
    update () {
      var url = '/api/add'
      let date = new Date()
      let das = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      this.addForm.date = das
      // const form = _.cloneDeep(this.addForm)
      console.log(this.addForm + '---------------------------')
      axios.post('/api/add', qs.stringify(this.addForm)).then(res => {
        console.log(res.status)
        if (res.status === 200) {
          axios.post('/api/shouyi', qs.stringify(this.addForm)).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.findData()
              this.findDataShouyi()
            }
          })
        }

      })
    },
    findDataShouyi () {
      var url = '/api/findShouyi'

      axios.get(url)
        .then(res => {
          console.log(res.data)
          this.dataShouyi = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    edit (id) {
      // this.editShow = true
      console.log(id)
      const ids = id


      axios.post('/api/findEdit', qs.stringify({ keys: ids })).then(res => {

        if (res.status === 200) {
          console.log(res.data)
          this.editForm = res.data
        }
      })
    },
    editUpdate () {
      console.log(this.editForm + '==============')
      axios.post('/api/updateEdit', qs.stringify(this.editForm)).then(res => {

        if (res.status === 200) {
          console.log(res.data)

        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
.shows {
  overflow: hidden;
}
.shows ul {
  float: left;
}
</style>

<template>
  <div class="data">
<!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
  
        <el-breadcrumb-item>销量-油</el-breadcrumb-item>
        <el-breadcrumb-item>油表剩余数字显示</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="text-align:left;margin-bottom:30px;"><el-button type="primary"
                   @click="addShow = true">新增数据</el-button></div>
    <el-card>
      
      <el-row>
        <!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->
        

        <!-- <el-button :plain="true"
                   @click="succ">新增数据</el-button> -->

        <!-- <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button> -->
      </el-row>
      <el-table :data="dataShow">
        <el-table-column prop='date'
                         label='日期'>
          <template slot-scope="scope">
            {{ scope.row.date | dateForm }}
          </template>
        </el-table-column>
        <el-table-column prop='oil1'
                         label='第一油枪'>
        </el-table-column>
        <el-table-column prop='oil2'
                         label='第二油枪'>
        </el-table-column>
        <el-table-column prop='oil3'
                         label='第三油枪'>
        </el-table-column>
        <el-table-column prop='oil4'
                         label='第四油枪'>
        </el-table-column>
        <el-table-column prop='oil5'
                         label='第五油枪'>
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="100"
                         style="padding-top:30px">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)"
                         type="text"
                         size="small">查看</el-button> -->
            <el-button type="text"
                       size="small"
                       @click="edit(scope.row._id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!---分页--->
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total"
                     :page-size="pageSize"
                     :pager-count="11"
                     :current-page='1'
                     @current-change="handleCurrentChange">
      </el-pagination>

    </el-card>
    <!----新增数据对话框--->
    <el-dialog title="新增数据"
               :visible.sync="addShow"
               width="30%"
               @close="addressDialogClosed">
      <el-form ref="dataFormRef"
               :model='addForm'>
        <el-form-item label="第一油枪"
                      prop="oil1">
          <el-input v-model="addForm.oil1"></el-input>
        </el-form-item>
        <el-form-item label="第一油枪"
                      prop="oil2">
          <el-input v-model="addForm.oil2"></el-input>
        </el-form-item>
        <el-form-item label="第一油枪"
                      prop="oil3">
          <el-input v-model="addForm.oil3"></el-input>
        </el-form-item>
        <el-form-item label="第一油枪"
                      prop="oil4">
          <el-input v-model="addForm.oil4"></el-input>
        </el-form-item>
        <el-form-item label="第一油枪"
                      prop="oil5">
          <el-input v-model="addForm.oil5"></el-input>
        </el-form-item>
        <el-form-item label="数据日期"
                      prop="date">
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker placeholder="选择日期"
                              v-model="addForm.date"
                              style="width: 100%;"
                              type='date'>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="primary"
                   @click=update>确 定</el-button>
      </span>
    </el-dialog>
    <!----编辑修改数据对话框----->
    <!----新增数据对话框--->
    <el-dialog title="新增数据"
               :visible.sync="editShow"
               width="30%">
      <el-form ref="editDataFormRef"
               :model='editForm'>
        <el-form-item label="第一油枪"
                      prop="oil1">
          <el-input v-model="editForm.oil1"></el-input>
        </el-form-item>
        <el-form-item label="第一油枪"
                      prop="oil2">
          <el-input v-model="addForm.oil2"></el-input>
        </el-form-item>
        <el-form-item label="第一油枪"
                      prop="oil3">
          <el-input v-model="editForm.oil3"></el-input>
        </el-form-item>
        <el-form-item label="第一油枪"
                      prop="oil4">
          <el-input v-model="editForm.oil4"></el-input>
        </el-form-item>
        <el-form-item label="第一油枪"
                      prop="oil5">
          <el-input v-model="editForm.oil5"></el-input>
        </el-form-item>
        <el-form-item label="数据日期"
                      prop="date">
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker placeholder="选择日期"
                              v-model="editForm.date"
                              style="width: 100%;"
                              type='date'>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary"
                   @click='editUpdate'>确 定</el-button>
      </span>
    </el-dialog>
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
      datas: [],
      addForm: {
        oil1: 0,
        oil2: 0,
        oil3: 0,
        oil4: 0,
        oil5: 0,
        date: new Date()
      },
      editForm: {
        oil1: 0,
        oil2: 0,
        oil3: 0,
        oil4: 0,
        oil5: 0,
        date: '',
        keys: 0,
        _id: ''
      },
      editShow: false,
      //数据总条数
      total: 0,
      //当前页
      currentPage: 1,
      //一共多少页
      pageNum: 1,
      //当前页中的数据
      dataShow: [],
      //根据页数对数据分组，并存进每一页
      totalPage: [],
      //每页多少条
      pageSize: 5,
      //将数据转为数组
      dataArray: [],
      addShow: false
    }
  },
  created: function () {
    this.findData()
    // this.findDataShouyi()
  },
  computed: {

  },
  methods: {
    //查找所有油枪数据
    findData () {
      // var url = 'http://127.0.0.1:3000/get'
      var url = '/api/get'

      axios.get(url)
        .then(res => {
          console.log(res.data)
          this.datas = res.data
          this.total = res.data.length
          this.pageData()
        })
        .catch(err => {
          console.log(err)
        })

    },
    //新增数据请求
    update () {
      this.addShow = false
      var url = '/api/add'
      // let date = new Date()
      // let das = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      // this.addForm.date = das
      // const form = _.cloneDeep(this.addForm)
      axios.post('/api/add', qs.stringify(this.addForm)).then(res => {
        console.log(res.status)
        if (res.status === 200) {
          axios.post('/api/shouyi', qs.stringify(this.addForm)).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.succ('恭喜，添加成功！')
              this.findData()
            } else {
              this.fail('对不起，添加失败')
            }
          })
        }

      })
    },

    //编辑某天数据前先得到这条数据
    edit (id) {
      // this.editShow = true
      console.log(id)
      this.editShow = true
      const ids = id
      axios.post('/api/findEdit', qs.stringify({ _id: ids })).then(res => {
        if (res.status === 200) {
          // console.log(res.data)
          this.editForm = res.data
          this.findData()
        }
      })
    },
    //提交编辑某天的数据
    editUpdate () {
      this.editShow = false
      axios.post('/api/updateEdit', qs.stringify(this.editForm)).then(res => {
        if (res.status === 200) {
          this.succ('恭喜，编辑成功！')
          this.findData()
        } else {
          this.fail('对不起，编辑失败')
        }
      })
    },
    //计算分页，及存入数据
    pageData () {
      // let pages = this.dataShouyi
      // for (let j = 0; j < this.total; j++) {
      //   // this.dataArray.push(this.dataShouyi[j])
      // }
      //计算页数
      this.pageNum = Math.ceil(this.datas.length / this.pageSize) || 1
      //根据页数对数据分组，并存进每一页
      for (let i = 0; i < this.pageNum; i++) {
        // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
        // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5条，即slice(0,5)，第二页是6-10条，即slice(5,10)...

        console.log(this.datas, '==================')
        let das = []
        // if (i == (this.pageNum - 1)) {
        // console.log(this.dataShouyi.length)
        for (let j = 0; j < this.pageSize; j++) {

          if ((this.pageSize * i + j) < (this.datas.length)) {
            das[j] = this.datas[this.pageSize * i + j]
          }



        }


        this.totalPage[i] = das
      }
      this.dataShow = this.totalPage[this.currentPage - 1]
    },
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.currentPage = newPage
      this.dataShow = this.totalPage[this.currentPage - 1]
    },
    //关闭新增数据对话框同时把数据清空
    addressDialogClosed () {
      this.$refs.dataFormRef.resetFields()
    },
    //弹出成功消息
    succ (msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    },
    //弹出制作消息
    fail (msg) {
      this.$message({
        message: msg,
        type: 'error'
      })
    }
  },
  filters: {
    dateForm: function (value) {
      var das = new Date(value)
      console.log(das)
      console.log(das.getMonth())
      let Y = das.getFullYear()
      let M = das.getMonth() + 1
      if (M < 10) {
        M = ('0' + M)
      }
      let D = das.getDate()
      if (D < 10) {
        D = ('0' + D)
      }
      return (Y + '年' + M + '月' + D + '日')
    }
  }
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
.el-pagination {
  padding-top: 30px;
}
.el-breadcrumb {
  padding-bottom: 30px;
}
</style>

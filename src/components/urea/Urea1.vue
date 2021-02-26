<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>销量-尿素</el-breadcrumb-item>
      <el-breadcrumb-item>102号油销售情况</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="text-align:left">
    <el-button type="primary"
                   @click="addShow = true">新增数据</el-button>
                   </div>
    <el-card>
      <el-table :data='dataShow'>
        <el-table-column prop="date"
                         label='创建日期'>
                         <template slot-scope="scope">
                         {{scope.row.date | dateFormat}}
                         </template>
        </el-table-column>
        <el-table-column prop="enter"
                         label='进货'>
        </el-table-column>
        <el-table-column prop="out"
                         label='出货'>
        </el-table-column>
        <el-table-column prop="leftover"
                         label='剩余'>
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="edit(scope.row._id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total"
                     :page-size="pageSize"
                     :pager-count="11"
                     :current-page='1'
                     @current-change="handleCurrentChange">

      </el-pagination>
    </el-card>
    <!--------新增对话框--------->
    <el-dialog title="新增数据" :visible.sync="addShow" width="30%"  @close="addressDialogClosed">
        <el-form ref="dataFormRef" :model="addForm">
            <el-form-item label="进货" prop="enter">
                <el-input v-model="addForm.enter"></el-input>
            </el-form-item>
            <el-form-item label="出货" prop="out">
                <el-input v-model="addForm.out"></el-input>
            </el-form-item>
            <el-form-item label="数据日期" prop="date">
                <el-date-picker placeholder="选择日期" v-model="addForm.date" style="width:100%" type="date">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addShow = false">取 消</el-button>
          <el-button type="primary"  @click="addData">确 定</el-button>
        </span>
    </el-dialog>
    <!--------编辑对话框--------->
    <el-dialog title="编辑数据" :visible.sync="editShow" width="30%"  @close="editDialogClosed">
        <el-form ref="editDataFormRef" :model="editForm">
            <el-form-item label="进货" prop="enter">
                <el-input v-model="editForm.enter"></el-input>
            </el-form-item>
            <el-form-item label="出货" prop="out">
                <el-input v-model="editForm.out"></el-input>
            </el-form-item>
            <el-form-item label="数据日期" prop="date">
                <el-date-picker placeholder="选择日期" v-model="editForm.date" style="width:100%" type="date">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editShow = false">取 消</el-button>
          <el-button type="primary"  @click="editData">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      datas: [],
      addForm: {
        enter:0,
        out:0,
        date:new Date()
      },
      editForm:{
        enter:0,
        out:0,
        date:new Date(),
        _id:''
      },
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
      addShow: false,
      editShow:false
    }
  },
  created () {
    this.findAll()
  },
  methods: {
    //查询所有数据
    findAll () {
      let url = '/api/urea1'
      axios.get(url).then(res => {
        // console.log(res.data)
        this.datas = res.data
        this.total = res.data.length
        this.pageData()
      })
    },
    //新增数据
    addData(){
        this.addShow = false
        let url='/api/addUrea1'
        axios.post(url,qs.stringify(this.addForm)).then(res=>{
          if(res.status === 200){
              this.succ('恭喜，添加成功！')
              this.findAll()
          }else{
              this.fail('对不起，添加失败')
          }
        })
    },
    //编辑某天的数据,先查询当天的数据
    edit (id) {
        this.editShow = true
        console.log(id)
        let url = '/api/findOneUrea1'
        axios.post(url,qs.stringify({_id:id})).then(res=>{
           if(res.status === 200){
              this.editForm = res.data
           }
        })
    },
    //确定编辑数据
    editData(){
        this.editShow = false
        let url='/api/editUrea1'
        console.log('============')
        axios.post(url,qs.stringify(this.editForm)).then(res=>{
          console.log(res.status)
              if(res.status === 200){
                  this.succ('恭喜，编辑成功！')
                  this.findAll()
              }else{
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

        let das = []

        for (let j = 0; j < this.pageSize; j++) {
          if ((this.pageSize * i + j) < (this.datas.length)) {
            das[j] = this.datas[this.pageSize * i + j]
          }
          console.log(das)
        }
        this.totalPage[i] = das
      }

      console.log('------------')
      this.dataShow = this.totalPage[this.currentPage - 1]
      console.log(this.dataShow)
    },
    //分页，修改页码时的设置
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.currentPage = newPage
      this.dataShow = this.totalPage[this.currentPage - 1]
    },
    //关闭新增数据对话框同时把数据清空
    addressDialogClosed () {
      this.$refs.dataFormRef.resetFields()
    },
    editDialogClosed(){
      this.$refs.editDataFormRef.resetFields()
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
    dateFormat: function (value) {
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
<style scoped>
.el-pagination {
  padding-top: 30px;
}
.el-breadcrumb {
  padding-bottom: 30px;
}
.el-card{
  margin-top:30px;
}
</style>
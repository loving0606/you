<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>收入</el-breadcrumb-item>
      <el-breadcrumb-item>各方面收入情况</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="text-align:left;margin-bottom:30px;">
    <el-button type="primary"
                   @click="addShow = true">新增数据</el-button>
    </div>
    <el-card>
      <el-row>
        <!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->
        
        <!-- <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button> -->
      </el-row>

      <el-table :data="dataShow"
                style="width:100%">
        <el-table-column prop="date"
                         label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.date | dateForm }}
          </template>
        </el-table-column>
        <el-table-column prop="weixin1"
                         label="微信一">
        </el-table-column>
        <el-table-column prop="weixin2"
                         label="微信二">
        </el-table-column>
        <el-table-column prop="weixin3"
                         label="微信三">
        </el-table-column>
        <el-table-column prop="alipay"
                         label="支付宝">
        </el-table-column>
        <el-table-column prop="money"
                         label="现金">
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

      <!-- <button @click="addDatas">添加数据</button>
      <el-form :label-position="labelPosition"
               label-width="80px"
               :model="addForm">
        <el-form-item label="微信一"
                      :span='3'>
          <el-input v-model="addForm.weixin1"></el-input>
        </el-form-item>
        <el-form-item label="微信二"
                      :span='3'>
          <el-input v-model="addForm.weixin2"></el-input>
        </el-form-item>
        <el-form-item label="微信三"
                      :span='3'>
          <el-input v-model="addForm.weixin3"></el-input>
        </el-form-item>
        <el-form-item label="支付宝"
                      :span='3'>
          <el-input v-model="addForm.alipay"></el-input>
        </el-form-item>
        <el-form-item label="现金">
          <el-input v-model="addForm.money"></el-input>
        </el-form-item>
        <el-form-item label="选择日期">

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
      </el-form> -->

    </el-card>
    <!----新增数据对话框--->
    <el-dialog title="新增数据"
               :visible.sync="addShow"
               width="30%"
               @close="addressDialogClosed">
      <el-form ref="dataFormRef"
               :model='addForm'>
        <el-form-item label="微信一"
                      prop="oil1">
          <el-input v-model="addForm.weixin1"></el-input>
        </el-form-item>
        <el-form-item label="微信二"
                      prop="oil2">
          <el-input v-model="addForm.weixin2"></el-input>
        </el-form-item>
        <el-form-item label="微信三"
                      prop="oil3">
          <el-input v-model="addForm.weixin3"></el-input>
        </el-form-item>
        <el-form-item label="支付宝"
                      prop="oil4">
          <el-input v-model="addForm.alipay"></el-input>
        </el-form-item>
        <el-form-item label="现金"
                      prop="oil5">
          <el-input v-model="addForm.money"></el-input>
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
                   @click='addDatas'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Shouru',
  data () {
    return {
      labelPosition: 'right',
      datas: [],
      addForm: {
        weixin1: 0,
        weixin2: 0,
        weixin3: 0,
        alipay: 0,
        money: 0,
        date: new Date()
      },
      rules: {

        // date: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ]

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
  created () {
    this.getDatas()
  },
  methods: {
    //获取所有数据
    getDatas () {
      let url = '/api/shouruData'
      axios.get(url).then(res => {
        if (res.status === 200) {
          this.datas = res.data
          this.total = res.data.length
          this.pageData()
        } else {
          console.log(err)
        }
      })
    },
    //新增数据
    addDatas () {
      console.log(this.addForm.weixin1)
      console.log(this.addForm.date)
      this.addShow = false
      let url = '/api/addShouru'
      console.log('====================')
      axios.post(url, qs.stringify(this.addForm)).then(res => {

        if (res.status === 200) {
          // console.log('====================')

          this.getDatas()
        }

      }).catch(err => {
        console.log('--------------------')
        console.log(err)
      })
    },
    addressDialogClosed () {
      this.$refs.dataFormRef.resetFields()
    },
    pageData () {
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
        }
        this.totalPage[i] = das
      }
      this.dataShow = this.totalPage[this.currentPage - 1]
    },
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.currentPage = newPage
      this.dataShow = this.totalPage[this.currentPage - 1]
    }
  },
  //过滤器，设置日期格式
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
<style scoped>
.el-pagination {
  padding-top: 30px;
}
.el-breadcrumb {
  padding-bottom: 30px;
}
</style>
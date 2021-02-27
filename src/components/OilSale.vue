<template>
  <div class="data">

    <!-- <div class="shows">
      <ul>
        <li v-for="(data,index) in dataShouyi">{{data.date}}---{{data.oil1}}--{{data.oil2}}--{{data.oil3}}--{{data.oil4}}--{{data.oil5}}</li>
      </ul>
    </div> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销量-油</el-breadcrumb-item>
      <el-breadcrumb-item>油表每天卖出数量</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 面包屑导航区域 -->

      <el-table :data="dataShow">
        <el-table-column prop='date'
                         label='日期'>
          <template slot-scope="scope">
            {{ scope.row.date | dateFormat }}
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

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Data',
  props: {
    msg: String
  },
  data () {
    return {

      datas: [],
      dataShouyi: [],
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
      dataArray: []
    }
  },
  created: function () {

    this.findDataShouyi()
  },
  computed: {

  },
  methods: {

    findDataShouyi () {
      var url = '/api/findShouyi'

      axios.get(url)
        .then(res => {
          // console.log(res.data,)
          this.dataShouyi = res.data

          this.total = res.data.length
          this.pageData()
        })
        .catch(err => {
          console.log(err)
        })

    },
    //计算分页，及存入数据
    pageData () {
      // let pages = this.dataShouyi
      // for (let j = 0; j < this.total; j++) {
      //   // this.dataArray.push(this.dataShouyi[j])
      // }
      //计算页数
      this.pageNum = Math.ceil(this.dataShouyi.length / this.pageSize) || 1
      //根据页数对数据分组，并存进每一页
      for (let i = 0; i < this.pageNum; i++) {
        // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
        // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5条，即slice(0,5)，第二页是6-10条，即slice(5,10)...

        console.log(this.dataShouyi, '==================')
        let das = []
        // if (i == (this.pageNum - 1)) {
        // console.log(this.dataShouyi.length)
        for (let j = 0; j < this.pageSize; j++) {
          // console.log(this.dataShouyi[this.pageSize * i + j])
          // if ((this.pageSize * i + j) >= (this.dataShouyi.length - 1)) {
          //   return
          // } else {
          if ((this.pageSize * i + j) < (this.dataShouyi.length)) {
            das[j] = this.dataShouyi[this.pageSize * i + j]
          }

          // }

        }
        // } else {
        //   for (let j = 0; j < this.pageSize; j++) {
        //     console.log(this.dataShouyi[this.pageSize * i + j])
        //     das[j] = this.dataShouyi[this.pageSize * i + j]
        //   }
        // }

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
.el-pagination,
.el-table {
  padding-top: 30px;
}
.el-breadcrumb {
  margin-bottom: 30px;
}
</style>

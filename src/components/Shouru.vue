<template>
  <div>
    <el-table :data="datas"
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
    <button @click="addDatas">添加数据</button>
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
    </el-form>
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

      }
    }
  },
  created () {
    this.getDatas()
  },
  methods: {
    getDatas () {
      let url = '/api/shouruData'
      axios.get(url).then(res => {
        if (res.status === 200) {
          this.datas = res.data
        } else {
          console.log(err)
        }
      })
    },
    addDatas () {
      console.log(this.addForm.weixin1)
      console.log(this.addForm.date)
      let url = '/api/addShouru'
      axios.post(url, qs.stringify(this.addForm)).then(res => {
        console.log(res.data)
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
      let D = das.getDay()
      if (D < 10) {
        D = ('0' + D)
      }
      return (Y + '年' + M + '月' + D + '日')
    }
  }
}
</script>
<style scoped>
</style>
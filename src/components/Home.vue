<template>
  <!-- <div id="app"> -->
  <!-- <router-link to="/index">首页</router-link>
    <router-link to="/shouru">收入</router-link>
    <router-view></router-view> -->
  <el-container>
    <el-header>大华加油管理系统</el-header>
    <!---主体部分--->
    <el-container>
      <!---左侧导航--->
      <el-aside style="width:200px;text-align:left">
        <el-menu router
                 :default-openeds="['1','/home','3','4','5','6','7']">
          <!--有级菜单-->
          <!---用户管理--->
          <el-submenu index="1">
            <template slot="title"
                      :default-active="activePath">
              <!-- 图标 -->
              <i class="el-icon-user-solid"></i>
              <!-- 文本 -->
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <!-- 二级菜单模板 -->
              <template>
                <!-- 图标 -->
                <i class="el-icon-s-tools"></i>
                <!-- 文本 -->
                <span>管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!---销量-油--->
          <el-submenu index="/home"
                      :default-openeds="['/oil']">
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-xiaoliang1"></i>
              <!-- 文本 -->
              <span>销量-油</span>
            </template>
            <el-menu-item index="/oil">
              <!-- 二级菜单模板 -->
              <template>
                <!-- 图标 -->
                <i class="iconfont icon-shenghuochongyouqia"></i>
                <!-- 文本 -->
                <span>油表剩余数字显示</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/oilsale">
              <!-- 二级菜单模板 -->
              <template>
                <!-- 图标 -->
                <i class="iconfont icon-xiaoliangdinghuo"></i>
                <!-- 文本 -->
                <span>油表每天卖出数量</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!---销量-油--->
          <el-submenu index="3"
                      :default-openeds="['1']">
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-xiaoliangzuigao"></i>
              <!-- 文本 -->
              <span>销量-尿素</span>
            </template>
            <el-menu-item index="/urea1">
              <!-- 二级菜单模板 -->
              <template>
                <!-- 图标 -->
                <i class="iconfont icon-ziyuan"></i>
                <!-- 文本 -->
                <span>102号油销售情况</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/urea2">
              <!-- 二级菜单模板 -->
              <template>
                <!-- 图标 -->
                <i class="iconfont icon-chuhuo1"></i>
                <!-- 文本 -->
                <span>310号油销售情况</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!---收入--->
          <el-submenu index="4"
                      :default-openeds="['1']">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-coin"></i>
              <!-- 文本 -->
              <span>收入</span>
            </template>
            <el-menu-item index="/shouru">
              <!-- 二级菜单模板 -->
              <template>
                <!-- 图标 -->
                <i class="el-icon-coin"></i>
                <!-- 文本 -->
                <span>各方面收入情况</span>
              </template>
            </el-menu-item>
            <!-- <el-menu-item index="4-2">-->
            <!-- 二级菜单模板 -->
            <!-- <template> -->
            <!-- 图标 -->
            <!-- <i class="el-icon-coin"></i> -->
            <!-- 文本 -->
            <!-- <span>尿素数量数据</span> -->
            <!-- </template> -->
            <!-- </el-menu-item> -->
          </el-submenu>
          <!---油卡--->
          <el-submenu index="5"
                      :default-openeds="['1']">
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-youka"></i>
              <!-- 文本 -->
              <span>油卡</span>
            </template>

            <el-menu-item index="/cards">
              <!-- 二级菜单模板 -->
              <template>
                <!-- 图标 -->
                <i class="iconfont icon-shenghuochongyouqia"></i>
                <!-- 文本 -->
                <span>油卡使用记录</span>
              </template>
            </el-menu-item>

          </el-submenu>
          <!---油卡--->
          <el-submenu index="6"
                      :default-openeds="['1']">
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-kehu2"></i>
              <!-- 文本 -->
              <span>大客户管理</span>
            </template>

            <el-menu-item index="6-1">
              <!-- 二级菜单模板 -->
              <template>
                <!-- 图标 -->
                <i class="iconfont icon-kehu1"></i>
                <!-- 文本 -->
                <span>大客户管理1</span>
              </template>
            </el-menu-item>
            <el-menu-item index="6-2">
              <!-- 二级菜单模板 -->
              <template>
                <!-- 图标 -->
                <i class="iconfont icon-customer1"></i>
                <!-- 文本 -->
                <span>大客户管理2</span>
              </template>
            </el-menu-item>

          </el-submenu>
          <!---油卡--->
          <el-submenu index="7"
                      :default-openeds="['1']">
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-huibao"></i>
              <!-- 文本 -->
              <span>汇报</span>
            </template>

            <el-menu-item index="7-1">
              <!-- 二级菜单模板 -->
              <template>
                <!-- 图标 -->
                <i class="iconfont icon-gongzuohuibao"></i>
                <!-- 文本 -->
                <span>汇报1</span>
              </template>
            </el-menu-item>
            <el-menu-item index="7-2">
              <!-- 二级菜单模板 -->
              <template>
                <!-- 图标 -->
                <i class="iconfont icon-xiaoliang"></i>
                <!-- 文本 -->
                <span>汇报2</span>
              </template>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧内容展示--->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>版权信息</el-footer>
  </el-container>

  <!-- <Data /> -->
  <!-- </div> -->

</template>

<script>
// import Data from './components/Data.vue'

export default {
  name: 'Home',
  // components: {
  //   Data
  // }
  data () {
    return {
      activePath: ''
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.el-header {
  background: #373d41;

  line-height: 60px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.el-footer {
  background: #373d41;
  line-height: 60px;
  color: #fff;
}
.el-container {
  height: 100%;
  background: #eee;
}
.el-aside {
  background: #333744;
}

.el-aside .el-menu {
  background: #333744;
  color: #fff;
  border: none;
}
.el-submenu__title,
.el-menu-item {
  color: #fff;
}

.el-main {
  background: #e3e6ea;
}
.el-menu-item:hover {
  outline: 0;
  background-color: #666;
}
.el-submenu__title:hover {
  background-color: #666;
}
.el-submenu__title:hover {
  outline: 0;
  background-color: #666;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #666;
  color: #66b1ff;
}
</style>

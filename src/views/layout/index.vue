<template>
<el-container>
  <!-- 头部组件 -->
  <el-header height="100px">
    <APPHeader></APPHeader>
  </el-header>
  <!-- 侧边栏导航组件 -->
  <el-container>
    <el-aside width="200px">
      <Navmenu></Navmenu>
    </el-aside>
    <el-main>
      <!-- layout子路由展示在这里 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import APPHeader from './header.vue'
import Navmenu from './navmenu.vue'

export default {
  name: 'layout',
  data () {
    return {
    }
  },
  components: {
    APPHeader,
    Navmenu
  }
}
</script>

<style scoped>
.el-container{
  height: 100%;
  width:100%;
}
.el-header{
  background-color: #b3c0d1;
}
.el-aside{
  height: 100%;
  background-color: #D3DCE6;
}
.el-main{
  background-color: #E9EEF3;
}
.el-menu{
  height: 100%;
}
</style>

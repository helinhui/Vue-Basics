<template>
<el-row :gutter="20" class="app-header">
  <el-col :span="4">
    <img src="./layout.jpg">
  </el-col>
  <el-col :span="16" class="title">
    welcome cap
  </el-col>
  <el-col :span="4">
    <el-button type="primary" @click="handelout">退出</el-button>
  </el-col>
</el-row>
</template>

<script>
import { removeToken } from '@/utils/auth'

export default {
  name: 'APPHeader',
  data () {
    return {
    }
  },
  methods: {
    handelout () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1:清空登录状态
        // window.localStorage.removeItem('token')
        removeToken()
        // 2:跳转到login
        this.$router.replace('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch((err) => {
        console.log(err) // 全局抛出promise错误
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped>
.app-header img{
  height: 100px;
  width: 200px;
  margin-left: -20px;
}
.app-header{
  display: flex;
  align-items: center;
}
.title{
  color:hotpink;
  font-size: 40px;
  font-style: oblique;
  font-style: '宋体';
}
</style>

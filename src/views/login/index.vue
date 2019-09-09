<template>
<div class="login">
  <div class="login-container">
    <div class="login-icon">
      <img src="./login.jpg">
    </div>
    <el-form label-position="left" label-width="80px" :model="loginform" :rules="loginformRule" ref="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginform.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginform.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click.prevent="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import { login } from '@/api'
import { setToken } from '@/utils/auth'


export default {
  data () {
    return {
      loginform: {
        username: '',
        password: ''
      },
      loginformRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      // ['form'] 中的 form 就是 el-form 标签 ref 属性值
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    async login () {
      const { data, meta } = await login(this.loginform)
      const { msg, status } = meta
      if (status === 200) {
        // 将凭证放到到本地存储（会在路由守卫那里使用）
        // window.localStorage.setItem('token', data.token)
        setToken(data.token)
        // 跳转到首页
        this.$router.push('/')
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
      } else if (status === 400) {
        this.$message.error(`登录失败,${msg}`)
      }
    }
  }
}
</script>

<style scoped>
.login{
  background-color: #2d3f50;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container{
  padding: 10px 20px;
  height: 280px;
  width: 360px;
  background-color: aliceblue;
  border-radius: 10px;
}
.login-btn{
  width: 100%;
}
.login-icon{
  height: 100px;
  width :100px;
  justify-content: center;
  margin: 0 auto;
  margin-top: -40px;
  border: 1px solid aliceblue;
  border-radius: 50%;
}
.login-icon img{
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
</style>

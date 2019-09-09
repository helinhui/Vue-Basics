<template>
<div>
  <el-card class="box-card">
    <!-- 卡片头部 -->
    <div slot="header" class="clearfix">
      <!-- 面包屑路径导航组件 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- /面包屑路径导航组件 -->
    </div>
    <el-row :gutter="20">
      <el-col :span="4">
        <!-- native监听组件根元素的原生事件
        这里loadusers作为原生事件的处理函数,手动添加1,代表第一页的数据,
        否则-他的第一个参数就是事件源对象,所以报错
        另一种见methods :handleSearch,
        -->
        <el-input
            placeholder="请输入内容"
            v-model="searchText"
            @keyup.enter.native="loadusers(1)">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click ="addFormVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 卡片头部 -->

    <!-- 卡片内容 -->
    <!-- 表格组件
      data是users
      stripe是隔行换色
      el-table-column表格列组件,
      label是列名,prop是数据,width默认px
      会自动生成遍历
    -->
    <el-table
      :data="users"
      stripe
      border
      style="width: 100%"
      v-loading="loading">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="handleChangeState(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <!--
        1:自定义表格列,自定义内容写到template中
        2:slot-scoped是固定属性,
        3:值scope是随便起的名字,scope.row获取当前遍历项
        4:scope.$index就是遍历的索引
       -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$refs.usereditele.showeditdialog(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
          <el-button
          type="success"
          icon="el-icon-check"
          size="mini"
          @click="$refs.usereditroleEle.showeditroledialog(scope.row)">分类角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格组件 -->
    <!-- 分页组件
      background带有背景色
      layout分页结构,pager, next下一页
      total:总条数
      组件自带功能:current-change页码改变会触发该事件
    -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="loadusers"
      :page-size="5">
    </el-pagination>
    <!-- /分页组件 -->
  </el-card>


  <!-- 添加用户弹框
    :visible对话框布尔值,对话框是否显示
    false隐藏
    true显示
  -->
  <el-dialog
  title="添加用户"
  :visible.sync="addFormVisible"
  width="30%">
    <el-form
    :model="addform"
    size="mini"
    label-position="left"
    ref="addformele"
    :rules="addformroles">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="addform.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input v-model="addform.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="addform.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px" prop="mobile">
        <el-input v-model="addform.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleAdd">确 定</el-button>
    </div>
  </el-dialog>
  <!-- /添加用户弹框 -->

  <!-- 编辑用户对话框
    添加ref属性,可以在当前组件中通过this.$refs.组件的ref的值来访问到这个组件
    this.$refs.useredit,可以直接访问到useredit的内容
    可以直接操作子组件里的逻辑,但是尽量使用$refs调用
   -->
  <useredit ref="usereditele" v-on:edit-success="loadusers"></useredit>
  <!-- /编辑用户对话框 -->

  <!-- 编辑用户角色组件 -->
  <usereditrole ref="usereditroleEle"></usereditrole>
  <!-- /编辑用户角色组件 -->
  <!-- 卡片内容 -->
</div>
</template>

<script>
// import { userlist, adduser } from '@/api/users'
import * as User from '@/api/users'
import useredit from './edit'
import usereditrole from './editrole'

export default {
  name: 'Userlist',
  data () {
    return {
      // 用户列表
      users: [],
      searchText: '',
      // 对话框是否显示
      addFormVisible: false,
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 加载效果
      loading: true,
      // 表单验证规则
      addformroles: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: false, message: '请输入电话', trigger: 'blur' }
        ]
      },
      total: 0
    }
  },

  watch: {
    searchText () {
      this.value = this.searchText
      if (this.value === '') {
        this.loadusers()
      }
    }
  },

  created () {
    console.log('2:token存在,进入具体业务.')
    this.loadusers()
  },

  methods: {
    // 加载用户列表
    async loadusers (page = 1) {
      this.loading = true // 加载loading
      const { data } = await User.userlist({ pagenum: page, pagesize: 5, query: this.searchText })
      this.users = data.users
      this.total = data.total
      this.loading = false // 停止加载loading
    },

    // 添加用户
    handleAdd () {
      this.$refs.addformele.validate(valid => {
        if (!valid) {
          return // 验证失败,啥也不做
        }
        this.submitAdd() // 验证通过,提交表单
      })
    },
    // 添加用户验证成功
    async submitAdd () {
      const { meta } = await User.adduser(this.addform)
      const { status, msg } = meta
      if (status === 201) {
        this.$refs.addformele.resetFields()// 清空表单数据
        this.addFormVisible = false // 隐藏对话框
        this.loadusers() // 重新加载列表
      } else {
        this.$message.error(`添加失败,${msg}`)
      }
    },

    // 删除用户
    handleDelete (item) {
      console.log(item.id)
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await User.deleteId(item.id)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: `${meta.msg}`
          })
          this.loadusers()
        }
      }).catch((err) => {
        console.log(err) // 全局抛出promise错误
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 用户状态
    async handleChangeState (item) {
      const { meta, data } = await User.changeState(item.id, item.mg_state)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: `${data.mg_state ? '启用' : '禁用'}用户状态成功`
        })
      }
    },
    // 搜索
    // handleSearch () {
    //   this.loadusers()
    // }
  },

  components: {
    useredit,
    usereditrole
  }
}
</script>

<style scoped>
.box-card{
  height: 100%;
}
</style>

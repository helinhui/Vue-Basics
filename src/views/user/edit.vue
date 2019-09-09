<template>
  <el-dialog
  title="编辑用户"
  :visible.sync="FormVisible"
  width="30%">
    <el-form
    :model="editform"
    size="mini"
    label-position="left"
    ref="editformele"
    :rules="editformroles">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="editform.username" autocomplete="off" disabled ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="editform.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px" prop="mobile">
        <el-input v-model="editform.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="FormVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 起个别名
import { getId as getusersid, updateId as updateuserid } from '@/api/users'
export default {
  name: 'useredit',
  data () {
    return {
      FormVisible: false, // 默认不显示
      editform: {
        username: '',
        email: '',
        mobile: ''
      },
      editformroles: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: false, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleEdit () {
      this.$refs.editformele.validate(valid => {
        if (!valid) {
          return
        }
        this.submitedit()
      })
    },
    async submitedit () {
      const { email, mobile, id } = this.editform
      const { meta } = await updateuserid(id, {
        email,
        mobile
      })
      if (meta.status === 200) {
        // 更新列表数据
        // 1:在当前组件调用父组件成员(不建议,太依赖父组件)
        // 2:事件方式(推荐)
        // 为当前组件发布了一个自定义事件,
        // 谁要用这个组件,谁就可以去监听这个事件
        // this.$parent可以直接访问父组件
        this.$emit('edit-success') // edit-success是自定义的
        // 隐藏对话框
        this.FormVisible = false
        this.$message({
          type: 'success',
          message: '编辑成功' // 编辑成功之后要干嘛和当前组件没关系
        })
      }
    },
    async showeditdialog (item) {
      const { data, meta } = await getusersid(item.id)
      if (meta.status === 200) {
        this.editform = data
        this.FormVisible = true // 展示对话框
      }
    }
  }
}
</script>

<style>

</style>

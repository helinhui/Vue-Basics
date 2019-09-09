<template>
  <!-- visible是否显示 Dialog，支持 .sync 修饰符 默认false -->
  <el-dialog
  title="编辑用户角色"
  :visible.sync="FormVisible"
  width="30%">
    <el-form
    :model="editform"
    size="mini"
    label-position="left"
    ref="editformele"
    :rules="editformroles">
      <el-form-item label="当前用户" label-width="80px" prop="username">
        <el-input v-model="editform.username" autocomplete="off" disabled ></el-input>
      </el-form-item>
      <el-form-item label="请选择角色" label-width="80px" prop="email">
          <!-- el-select会自动el-options的value与editform.rid 相等的被选中 -->
          <el-select placeholder="请选择" v-model="editform.rid">
            <el-option
              label="请选择"
              :value="-1">
            </el-option>
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="FormVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleEditrole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 起个别名as,按需加载
import { getId as getusersid, updaterole } from '@/api/users'
import { getrolelist } from '@/api/role'

export default {
  name: 'usereditrole',
  data () {
    return {
      FormVisible: false, // 默认不显示
      editform: {
        username: '',
        email: '',
        mobile: '',
        rid: 0
      },
      roles: [],
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
    async handleEditrole () {
      const { rid, id: UserId } = this.editform
      const { meta } = await updaterole(UserId, rid)
      console.log(meta.msg)
      if (meta.status === 200) {
        this.FormVisible = false
        this.$message({
          type: 'success',
          message: `${meta.msg}`
        })
      }
    },
    async showeditroledialog (item) {
      const { data, meta } = await getusersid(item.id)
      if (meta.status === 200) {
        this.editform = data
        this.FormVisible = true // 展示对话框
      }
      const { data: roledata, meta: rolemeta } = await getrolelist()
      if (rolemeta.status === 200) {
        this.roles = roledata
      }
    }
  }
}
</script>

<style>

</style>

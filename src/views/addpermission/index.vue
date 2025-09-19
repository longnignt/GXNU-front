<!-- src/views/addpermission/index.vue -->
<template>
  <div class="user-permission-management">
    <el-card class="user-card">
      <template #header>
        <div class="card-header">
          <span class="header-title">用户权限管理</span>
          <el-button type="primary" @click="addUser" :icon="Plus">添加用户</el-button>
        </div>
      </template>
      
      <el-table 
        :data="users" 
        style="width: 100%" 
        border
        stripe
        v-loading="loading"
        element-loading-text="加载中..."
        header-cell-class-name="table-header"
        row-class-name="table-row"
      >
        <el-table-column prop="id" label="用户ID" width="80" align="center">
          <template #default="scope">
            <el-tag type="primary" size="small">{{ scope.row.id }}</el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="name" label="用户名" width="150">
          <template #default="scope">
            <div class="user-info">
              <el-avatar :size="30" class="user-avatar">{{ scope.row.name.charAt(0) }}</el-avatar>
              <span class="user-name">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="email" label="邮箱">
          <template #default="scope">
            <i class="el-icon-message" style="margin-right: 5px; color: #409EFF;"></i>
            {{ scope.row.email }}
          </template>
        </el-table-column>
        
        <el-table-column label="权限列表" min-width="250">
          <template #default="scope">
            <div class="permission-tags">
              <el-tag 
                v-for="permission in scope.row.permissions" 
                :key="permission.id" 
                :type="getPermissionType(permission.name)"
                size="small"
                effect="dark"
                class="permission-tag"
              >
                {{ permission.name }}
              </el-tag>
              <el-tag v-if="scope.row.permissions.length === 0" type="info" size="small">无权限</el-tag>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column label="权限数量" width="100" align="center">
          <template #default="scope">
            <el-badge :value="scope.row.permissions.length" :max="99" type="primary">
              <el-button size="small">查看</el-button>
            </el-badge>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="managePermissions(scope.row)" :icon="Edit">管理权限</el-button>
            <el-button size="small" type="danger" @click="deleteUser(scope.row)" :icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </el-card>
    
    <!-- 用户编辑对话框 -->
    <el-dialog 
      v-model="userDialogVisible" 
      :title="userDialogTitle" 
      width="500px"
      :before-close="handleUserDialogClose"
    >
      <el-form 
        :model="currentUser" 
        :rules="userRules" 
        ref="userFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="currentUser.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="currentUser.email" placeholder="请输入邮箱地址" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveUser" :loading="savingUser">保存</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 权限管理对话框 -->
    <el-dialog 
      v-model="permissionDialogVisible" 
      title="管理用户权限" 
      width="700px"
      :before-close="handlePermissionDialogClose"
    >
      <div class="permission-header">
        <div class="user-summary">
          <el-avatar :size="40">{{ selectedUser.name?.charAt(0) }}</el-avatar>
          <div class="user-details">
            <div class="user-name">{{ selectedUser.name }}</div>
            <div class="user-email">{{ selectedUser.email }}</div>
          </div>
        </div>
        <div class="selected-count">
          已选择 <span class="count">{{ selectedPermissions.length }}</span> 项权限
        </div>
      </div>
      
      <div class="permission-search">
        <el-input 
          v-model="permissionSearch" 
          placeholder="搜索权限..." 
          :prefix-icon="Search"
          clearable
          style="width: 300px;"
        />
      </div>
      
      <el-checkbox-group v-model="selectedPermissions" class="permission-checkbox-group">
        <el-row :gutter="20">
          <el-col 
            v-for="permission in filteredPermissions" 
            :key="permission.id" 
            :span="24"
            class="permission-item"
          >
            <el-card 
              shadow="hover" 
              :class="{ 'selected-card': selectedPermissions.includes(permission.id) }"
            >
              <el-checkbox :label="permission.id" class="permission-checkbox">
                <div class="permission-content">
                  <div class="permission-info">
                    <div class="permission-name">
                      <el-tag 
                        :type="getPermissionType(permission.name)" 
                        size="small"
                        effect="dark"
                      >
                        {{ permission.name }}
                      </el-tag>
                      <span class="permission-title">{{ permission.description.split('，')[0] }}</span>
                    </div>
                    <div class="permission-desc">{{ permission.description }}</div>
                  </div>
                </div>
              </el-checkbox>
            </el-card>
          </el-col>
        </el-row>
      </el-checkbox-group>
      
      <template #footer>
        <div class="permission-footer">
          <el-checkbox 
            v-model="selectAll" 
            @change="handleSelectAllChange"
            :indeterminate="isIndeterminate"
          >
            全选
          </el-checkbox>
          <div>
            <el-button @click="permissionDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveUserPermissions" :loading="savingPermissions">保存权限</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Edit, Delete, Search } from '@element-plus/icons-vue'

// 用户数据
const users = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    permissions: [
      { id: 1, name: 'admin', description: '管理员权限，拥有所有操作权限' },
      { id: 3, name: 'editor', description: '编辑权限，可以编辑和查看数据' }
    ]
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    permissions: [
      { id: 2, name: 'user', description: '普通用户权限，只能查看数据' }
    ]
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    permissions: [
      { id: 2, name: 'user', description: '普通用户权限，只能查看数据' },
      { id: 3, name: 'editor', description: '编辑权限，可以编辑和查看数据' },
      { id: 4, name: 'viewer', description: '只读权限，只能查看数据' }
    ]
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    permissions: []
  }
])

// 所有可分配权限
const allPermissions = ref([
  { id: 1, name: 'admin', description: '管理员权限，拥有所有操作权限' },
  { id: 2, name: 'user', description: '普通用户权限，只能查看数据' },
  { id: 3, name: 'editor', description: '编辑权限，可以编辑和查看数据' },
  { id: 4, name: 'viewer', description: '只读权限，只能查看数据' },
  { id: 5, name: 'reporter', description: '报告权限，可以生成和查看报告' },
  { id: 6, name: 'auditor', description: '审计权限，可以查看系统日志' },
  { id: 7, name: 'manager', description: '管理权限，可以管理用户和权限' }
])

// 搜索关键词
const permissionSearch = ref('')

// 过滤后的权限列表
const filteredPermissions = computed(() => {
  if (!permissionSearch.value) {
    return allPermissions.value
  }
  return allPermissions.value.filter(permission => 
    permission.name.toLowerCase().includes(permissionSearch.value.toLowerCase()) ||
    permission.description.toLowerCase().includes(permissionSearch.value.toLowerCase())
  )
})

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(4)

// 加载状态
const loading = ref(false)
const savingUser = ref(false)
const savingPermissions = ref(false)

// 用户对话框相关
const userDialogVisible = ref(false)
const userDialogTitle = ref('')
const isEditUser = ref(false)
const userFormRef = ref()

// 权限对话框相关
const permissionDialogVisible = ref(false)
const selectedPermissions = ref([])
const selectAll = ref(false)
const isIndeterminate = ref(false)

// 表单验证规则
const userRules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

// 当前编辑的用户
const currentUser = reactive({
  id: 0,
  name: '',
  email: ''
})

// 选中的用户（用于权限管理）
const selectedUser = ref({})

// 获取权限类型（用于标签颜色）
const getPermissionType = (permissionName) => {
  const types = {
    'admin': 'danger',
    'manager': 'warning',
    'editor': 'success',
    'reporter': 'info',
    'auditor': 'info',
    'viewer': '',
    'user': 'primary'
  }
  return types[permissionName] || ''
}

// 添加用户
const addUser = () => {
  isEditUser.value = false
  userDialogTitle.value = '添加用户'
  // 重置表单
  currentUser.id = 0
  currentUser.name = ''
  currentUser.email = ''
  userDialogVisible.value = true
}

// 编辑用户
const editUser = (user) => {
  isEditUser.value = true
  userDialogTitle.value = '编辑用户'
  // 填充表单数据
  currentUser.id = user.id
  currentUser.name = user.name
  currentUser.email = user.email
  userDialogVisible.value = true
}

// 保存用户
const saveUser = async () => {
  if (!userFormRef.value) return
  
  await userFormRef.value.validate((valid) => {
    if (valid) {
      savingUser.value = true
      // 模拟保存过程
      setTimeout(() => {
        if (isEditUser.value) {
          // 编辑用户
          const index = users.value.findIndex(u => u.id === currentUser.id)
          if (index !== -1) {
            users.value[index].name = currentUser.name
            users.value[index].email = currentUser.email
          }
          ElMessage.success('用户更新成功')
        } else {
          // 添加用户
          const newUser = {
            id: users.value.length + 1,
            name: currentUser.name,
            email: currentUser.email,
            permissions: []
          }
          users.value.push(newUser)
          ElMessage.success('用户添加成功')
        }
        savingUser.value = false
        userDialogVisible.value = false
      }, 500)
    }
  })
}

// 删除用户
const deleteUser = (user) => {
  ElMessageBox.confirm(
    `确定要删除用户 "${user.name}" 吗？此操作不可恢复！`,
    '删除用户',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value.splice(index, 1)
      ElMessage.success('用户删除成功')
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 管理用户权限
const managePermissions = (user) => {
  selectedUser.value = user
  // 初始化选中的权限
  selectedPermissions.value = user.permissions.map(p => p.id)
  updateSelectAllState()
  permissionDialogVisible.value = true
}

// 保存用户权限
const saveUserPermissions = () => {
  savingPermissions.value = true
  // 模拟保存过程
  setTimeout(() => {
    // 根据选中的权限ID找到对应的权限对象
    const permissions = allPermissions.value.filter(
      p => selectedPermissions.value.includes(p.id)
    )
    
    // 更新用户权限
    const userIndex = users.value.findIndex(u => u.id === selectedUser.value.id)
    if (userIndex !== -1) {
      users.value[userIndex].permissions = permissions
      ElMessage.success('用户权限更新成功')
    }
    
    savingPermissions.value = false
    permissionDialogVisible.value = false
  }, 500)
}

// 分页处理
const handlePageChange = (page) => {
  currentPage.value = page
  loading.value = true
  // 模拟加载数据
  setTimeout(() => {
    loading.value = false
  }, 300)
}

// 页面大小改变
const handleSizeChange = (size) => {
  pageSize.value = size
  loading.value = true
  // 模拟加载数据
  setTimeout(() => {
    loading.value = false
  }, 300)
}

// 全选状态更新
const updateSelectAllState = () => {
  const selectedCount = selectedPermissions.value.length
  const totalCount = filteredPermissions.value.length
  
  if (selectedCount === 0) {
    selectAll.value = false
    isIndeterminate.value = false
  } else if (selectedCount === totalCount) {
    selectAll.value = true
    isIndeterminate.value = false
  } else {
    selectAll.value = false
    isIndeterminate.value = true
  }
}

// 全选/取消全选
const handleSelectAllChange = (val) => {
  if (val) {
    selectedPermissions.value = filteredPermissions.value.map(p => p.id)
  } else {
    selectedPermissions.value = []
  }
  isIndeterminate.value = false
}

// 监听选中权限变化
watch(selectedPermissions, () => {
  updateSelectAllState()
})

// 对话框关闭前处理
const handleUserDialogClose = (done) => {
  ElMessageBox.confirm('确认关闭吗？未保存的数据将会丢失', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    done()
  }).catch(() => {
    // 取消关闭
  })
}

const handlePermissionDialogClose = (done) => {
  ElMessageBox.confirm('确认关闭吗？未保存的权限设置将会丢失', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    done()
  }).catch(() => {
    // 取消关闭
  })
}
</script>

<style scoped>
.user-permission-management {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.table-header {
  background-color: #f5f7fa !important;
  color: #606266;
  font-weight: 600;
}

.table-row:hover {
  background-color: #f0f9ff !important;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  margin-right: 10px;
  background-color: #409eff;
}

.user-name {
  font-weight: 500;
}

.permission-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.permission-tag {
  margin: 0;
}

.permission-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.permission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}

.user-summary {
  display: flex;
  align-items: center;
}

.user-details {
  margin-left: 10px;
}

.user-name {
  font-weight: 600;
  font-size: 16px;
}

.user-email {
  font-size: 12px;
  color: #909399;
}

.selected-count .count {
  font-weight: 600;
  color: #409eff;
  font-size: 18px;
}

.permission-search {
  margin-bottom: 20px;
}

.permission-checkbox-group {
  max-height: 400px;
  overflow-y: auto;
}

.permission-item {
  margin-bottom: 15px;
}

.permission-checkbox {
  width: 100%;
}

.permission-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.permission-info {
  flex: 1;
}

.permission-name {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.permission-title {
  margin-left: 10px;
  font-weight: 500;
}

.permission-desc {
  font-size: 12px;
  color: #909399;
  margin-left: 34px;
}

.selected-card {
  border-color: #409eff;
  background-color: #ecf5ff;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #409eff;
  border-color: #409eff;
}

:deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
  background-color: #409eff;
  border-color: #409eff;
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #606266;
}

:deep(.el-table__row) {
  transition: all 0.3s;
}
</style>
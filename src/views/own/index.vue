<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <span>个人中心</span>
        </div>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="24" class="avatar-section">
          <div class="avatar-wrapper">
            <el-avatar :size="120" :src="user.avatar" />
            <div class="avatar-upload">
              <input 
                type="file" 
                ref="avatarInput" 
                @change="uploadAvatar" 
                accept="image/*" 
                style="display: none;"
              >
              <el-button 
                type="primary" 
                size="small" 
                @click="$refs.avatarInput.click()"
                round
              >
                更换头像
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-form 
        :model="user" 
        label-width="100px" 
        class="profile-form"
        label-position="left"
      >
        <el-form-item label="用户名">
          <el-input v-model="user.username" disabled>
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="联系方式">
          <el-input v-model="user.phone">
            <template #prefix>
              <el-icon><Phone /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="出生年月">
          <el-date-picker
            v-model="user.birthdate"
            type="date"
            placeholder="请选择出生日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="user.email">
            <template #prefix>
              <el-icon><Message /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="user.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="saveProfile" round>保存信息</el-button>
          <el-button @click="resetForm" round>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { User, Phone, Message } from '@element-plus/icons-vue'

export default {
  name: 'Profile',
  components: {
    User,
    Phone,
    Message
  },
  data() {
    return {
      user: {
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        username: '张三',
        phone: '13800000000',
        birthdate: '1990-01-01',
        email: 'zhangsan@example.com',
        gender: '男'
      }
    };
  },
  methods: {
    uploadAvatar(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveProfile() {
      this.$message.success('信息保存成功');
      console.log('保存的用户信息:', this.user);
    },
    resetForm() {
      this.user.phone = '13800000000';
      this.user.birthdate = '1990-01-01';
      this.user.email = 'zhangsan@example.com';
      this.user.gender = '男';
      this.$message.info('表单已重置');
    }
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.profile-card {
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #303133;
}

.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.profile-form {
  max-width: 500px;
  margin: 0 auto;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
}

:deep(.el-input.is-disabled .el-input__inner) {
  background-color: #f5f7fa;
  color: #a8abb2;
}

.save-button {
  width: 100%;
  padding: 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.save-button:hover {
  background-color: #66b1ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .profile-container {
    padding: 10px;
  }
  
  .profile-form {
    max-width: 100%;
  }
  
  :deep(.el-form-item__label) {
    width: 80px !important;
  }
}
</style>
<template>
  <div class="login-container">
    <div class="form-wrapper">
      <h2>登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" style="width: 100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
     handleLogin() {
    // 模拟登录请求
    // 假设登录成功后跳转到首页
    console.log('用户名:', this.loginForm.username);
    console.log('密码:', this.loginForm.password);

    // 实际开发中，这里可能是调用登录API的逻辑
    // 假设登录成功
    setTimeout(() => {
      this.$router.push('/'); // 跳转到指定页面
    }, 100); // 模拟网络请求延迟
  }
  }
};
</script>

<style scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/1.bmp'); /* 替换为你自己的背景图片路径 */
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-wrapper {
  background-color: rgba(255, 255, 255, 0.9); /* 添加轻微透明背景防止文字看不清 */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

</style>
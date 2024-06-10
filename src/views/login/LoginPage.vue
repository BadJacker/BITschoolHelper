<template>
  <div class="login-container">
    <h2 class="title">欢迎登录！</h2>
    <form @submit.prevent="login">
      <div class="input-group">
        <van-icon name="user-o" size="20" class="icon" />
        <input type="text" v-model="username" placeholder="学号" required />
      </div>
      <div class="input-group">
        <van-icon name="lock" size="20" class="icon" />
        <input type="password" v-model="password" placeholder="密码" required />
      </div>
      <div class="button-container">
        <button type="submit" class="submit-btn">
          <van-icon name="arrow" size="20" class="arrow-icon" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // 处理登录逻辑，例如调用 API 验证用户凭据
      // 假设登录成功
      this.$router.push('/layout/home');
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f9f9f9, #e6f7f1);
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.title {
  font-size: 32px;
  color: #333;
  margin-bottom: 50px;
  font-weight: bold;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px; /* 缩小文本框的宽度 */
  padding: 5px 15px; /* 调整内边距 */
}

.icon {
  margin-right: 10px;
  color: #a0a0a0;
}

input {
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 16px; /* 调整字体大小 */
  color: #333;
  padding: 5px; /* 调整内边距 */
}

input::placeholder {
  color: #aaa;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #4caf50;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #45a045;
}

.arrow-icon {
  color: #fff;
}
</style>

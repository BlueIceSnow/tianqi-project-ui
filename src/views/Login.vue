<template>
  <div class="container">
    <div class="wrap">
      <el-card shadow="always">
        <div class="login">
          <div class="topText">系统登录</div>
          <el-form ref="form" :model="formData">
            <el-form-item prop="username">
              <el-input v-model="formData.username" placeholder="请输入用户名">
                <template v-slot:prefix
                  ><i class="icon el-icon-user-solid"></i
                ></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formData.password"
                show-password
                placeholder="请输入密码"
              >
                <template v-slot:prefix>
                  <i class="icon el-icon-lock"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="formData.tenantId" placeholder="租户">
                <el-option label="普通用户" value="0"></el-option>
                <el-option label="超级用户" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="formData.appKey" placeholder="应用">
                <el-option label="普通用户" value="0"></el-option>
                <el-option
                  label="超级应用"
                  value="XQI7tnRpyFddsNNfO"
                ></el-option></el-select
            ></el-form-item>
            <el-form-item>
              <el-button class="loginBtn" type="primary" @click="onSubmit"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const formData = reactive({
  username: '',
  password: '',
  appKey: '',
  tenantId: '',
});

function onSubmit() {
  store.dispatch('user/DO_LOGIN', formData);
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: white;
}
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login {
  width: 400px;
  padding: 10px;
}
.topText {
  color: black;
  font-size: 26px;
  padding: 0px 0px 20px 0px;
  letter-spacing: 10px;
  text-align: center;
}
.loginBtn {
  width: 100%;
  padding: 5px;
}
.icon {
  font-size: 18px;
  line-height: 40px;
}
</style>

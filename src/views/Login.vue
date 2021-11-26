<template>
  <div class="container">
    <div class="wrap">
      <el-card shadow="always">
        <div class="login">
          <div class="topText">系统登录</div>
          <el-form ref="form" :model="formData">
            <el-form-item prop="username">
              <el-input
                v-model="formData.username"
                placeholder="请输入用户名"
                @input="loadApplication"
              >
                <template #prefix
                  ><el-icon class="icon" size="20"><user /></el-icon
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
                  <el-icon class="icon" size="20"><key /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="formData.appKey" placeholder="请选择应用">
                <el-option
                  v-for="application in applicationList"
                  :label="application.name"
                  :value="application.appKey"
                ></el-option> </el-select
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
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import applicationApis from 'api/application';
import __ from 'lodash';

const applicationList = ref([]);

const store = useStore();
const formData = reactive({
  username: '',
  password: '',
  appKey: '',
});

function onSubmit() {
  store.dispatch('user/DO_LOGIN', formData);
}

const loadApplication = __.debounce(function loadApplicationList(username) {
  applicationApis.loadApplicationByUsername(username).then((res) => {
    applicationList.value = res.row;
  });
}, 1000);
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
  height: 40px;
  line-height: 45px;
}
</style>

<template>
  <div class="login_page fillcontain" style>
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <!-- <div class="manage_tip">
          <p>点点乐多渠道管理系统</p>
        </div>-->
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item>
            <h1 style="color:#00A5B3;">
              <img
                src="../assets/img/icon_smile.png"
                style=" vertical-align: middle;padding-right:5px;"
              >点点乐多渠道管理系统
            </h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名">
              <span>dsfsf</span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item style="width:50%;float:left;">
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
          <el-form-item style="width:50%;float:left;">
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">注册</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
    <div class="login-bottom">
      <p class="tip">上海点点乐信息科技有限公司版权所有Copyright 2014 ddianle.com Inc.All rights reserved</p>
    </div>
  </div>
</template>

<script>
import { login, getAdminInfo } from "@/api/getData";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      showLogin: false
    };
  },
  mounted() {
    this.showLogin = true;
    if (!this.adminInfo.id) {
      this.getAdminData();
    }
  },
  computed: {
    ...mapState(["adminInfo"])
  },
  methods: {
    ...mapActions(["getAdminData"]),
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await login({
            user_name: this.loginForm.username,
            password: this.loginForm.password
          });
          if (res.status == 1) {
            this.$message({
              type: "success",
              message: "登录成功"
            });
            this.$router.push("manage");
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "请输入正确的用户名密码",
            offset: 100
          });
          return false;
        }
      });
    }
  },
  watch: {
    adminInfo: function(newValue) {
      if (newValue.id) {
        this.$message({
          type: "success",
          message: "检测到您之前登录过，将自动登录"
        });
        this.$router.push("manage");
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.login_page {
  background-color: #324057;
  background: url(../assets/img/bg_pc.png) no-repeat center center;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;

  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  .wh(320px, 210px);
  .ctp(320px, 210px);
  padding: 25px;
  margin-left: 180px;
  margin-top: -220px;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;

  .submit_btn {
    width: 90%;
    font-size: 16px;
    background-color: #00a5b3;
    border: #00a5b3;
  }
}
.tip {
  font-size: 12px;
  color: gray;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
.login-bottom {
  position: fixed;
  bottom: 0;
  height: 30px;
  width: 100%;
  text-align: center;
  // background-color: rgba(0, 165, 179, 0.5);
}
</style>

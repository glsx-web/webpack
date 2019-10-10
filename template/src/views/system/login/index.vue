<template>
  <div class="page-login">
    <dialog-reg :isVisible="registerDialogVisible" />
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div class="page-login--layer page-login--layer-time" flex="main:center cross:center">{{time}}</div>
    <div class="page-login--layer">
      <div class="page-login--content" flex="dir:top main:justify cross:stretch box:justify">
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto"></p>
        </div>
        <div class="page-login--content-main" flex="dir:top main:center cross:center">
          <!-- form -->
          <div class="page-login--form">
            <div class="form-left">
              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default"
              >
                <div class="title-wrap">
                  <span class="form-title">tFIMS管理系统</span>
                  <span class="form-sub">让服务更智慧、更直接</span>
                </div>
                <div class="input-wrap">
                  <el-form-item prop="loginName">
                    <el-input
                      type="text"
                      v-on:keyup.native.13="submit"
                      v-model="formLogin.loginName"
                      placeholder="请输入用户名"
                      clearable
                      maxlength="10"
                      v-focus
                    >
                      <d2-el-icon slot="prepend" name="user"></d2-el-icon>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      type="password"
                      v-model="formLogin.password"
                      v-on:keyup.native.13="submit"
                      clearable
                       maxlength="12"
                      placeholder="请输入密码"
                    >
                      <d2-el-icon slot="prepend"  name="key"/>
                    </el-input>
                  </el-form-item>
                  <el-form-item class="form-action">
                    <el-button @click="submit" type="primary" :loading="$store.state.d2admin.loading.value" class="button-login">登录</el-button>
                    <el-button
                      @click.prevent="registerDialogVisible = true"
                      plain
                      class="button-reg"
                    >注册</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <div class="form-right">
              <div class="img-top"></div>
              <div class="img-bg"></div>
            </div>
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-copyright">
            <!-- 版权所有 -->
            <!-- <d2-icon name="copyright"/> -->
            <!-- -2019 GLSX粤ICP备12020087号 -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import { LOGIN_TYPE } from '@/common/constants'
export default {
  components: {
    DialogReg: () => import('./dialogReg')
  },
  data() {
    return {
      registerDialogVisible: false,
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      // 表单
      formLogin: {
        loginName: '',
        password: '',
        loginType: LOGIN_TYPE
      },
      // 表单校验
      rules: Object.freeze({
        loginName: [{
          required: true,
          message: '请输入用户名',
          trigger: 'submit'
        }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'submit'
        }
        ]
      })
    }
  },
  mounted() {
    this.timeInterval = setInterval(() => this.refreshTime(), 1000)
    this.$event.$on('e-reg-dialog', res => (this.registerDialogVisible = res))
  },
  beforeDestroy() {
    clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions({
      login: 'd2admin/account/login',
      current: 'd2admin/page/currentGet'
    }),
    // ...mapActions('d2admin/account', ['login']),
    refreshTime() {
      this.time = dayjs().format('HH:mm:ss')
    },
    // 提交登录信息
    submit() {
      // console.log(navigator.userAgent.toLocaleLowerCase())
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const { browser, os } = this.$store.state.d2admin.ua.data
          const _p = {
            ...this.formLogin,
            deviceCode: `${os.name}${os.version}-${browser.name}${browser.version}`
          }
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login(_p)
            // .then(() => this.$store.dispatch('d2admin/auth/init'))
            .then(async _ => {
              const _current = await this.current()
              this.$router.replace(this.$route.query.redirect || _current)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $backgroundColor: #2a343d;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  &--layer {
    @extend %full;
    overflow: auto;
    &-area {
      overflow: hidden;
    }
    // 时间
    &-time {
      font-size: 24em;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }
  }
  // 登陆页面控件的容器
  &--content {
    height: 100%;
    min-height: 500px;
    // header
    &-header {
      padding: 1em 0;
      &-motto {
        margin: 0px;
        padding: 0px;
        color: $color-text-normal;
        text-align: center;
        font-size: 12px;
      }
    }
    // footer
    &-footer {
      padding: 1em 0;
      &-locales {
        padding: 0px;
        margin: 0px;
        margin-bottom: 15px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        color: $color-text-normal;
        a {
          color: $color-text-normal;
          margin: 0 0.5em;
          &:hover {
            color: $color-text-main;
          }
        }
      }
      &-copyright {
        padding: 0px;
        margin: 0px;
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 12px;
        text-align: center;
        color: $color-text-normal;
        a {
          color: $color-text-normal;
        }
      }
      &-options {
        padding: 0px;
        margin: 0px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        a {
          color: $color-text-normal;
          margin: 0 1em;
        }
      }
    }
  }
  // 登录表单
  &--form {
    width: 720px;
    height: 400px;
    background: #ffffff;
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.06);
    border-radius: 16px;
    padding: 40px 0 0 37px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .form-left {
      width: 300px;
      .title-wrap {
        width: 180px;
        height: 45px;
        margin-bottom: 62px;
        .form-title {
          font-size: 20px;
          color: #333;
          line-height: 28px;
        }
        .form-sub {
          font-size: 12px;
          color: #999;
          line-height: 17px;
          float: left;
        }
      }
      .input-warp {
        .el-input {
          width: 300px;
          height: 35px;
          margin-bottom: 24px;
          background: #ffffff;
          border: 1px solid #ddd;
          border-radius: 2px;
        }
      }
      .form-action {
        .el-button {
          width: 145px;
          height: 35px;
          border-radius: 2px;
          letter-spacing: 2px;
          font-size: 14px;
          line-height: 35px;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
          span {
            transform: translateY(-12px);
          }
        }
        .button-login {
          // background-color: #3D6FE4 !important;
          // color: #FFF;
          letter-spacing: 2px;
          float: left;
        }
        .button-reg {
          border: 1px solid #ddd;
          background-color: #fff;
          opacity: 0.9;
          color: #333;
          float: right;
        }
      }
    }
    .form-right {
      width: 354px;
      .img-top {
        width: 364px;
        height: 24px;
        background: url("./image/bz.png");
        margin-bottom: 53px;
        transform: translateX(-20px);
      }
      .img-bg {
        // box-sizing: border-box;
        background: url("./image/bg.png");
        width: 322px;
        height: 276px;
        // border:6px solid #F4F9FF;
      }
    }
    @keyframes login-form-animate {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    animation: login-form-animate 0.5s ease;
  }

  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 0.1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>

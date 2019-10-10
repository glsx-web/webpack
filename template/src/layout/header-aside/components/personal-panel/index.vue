<template>
  <div class="personal">
    <div class="personal-panel">
      <div
        class="personal-desc"
        v-if="user"
      >
        <div class="avatar-container">
          <el-avatar
            :size="'large'"
            :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
          ></el-avatar>
        </div>
        <div class="name-role">
          <span class="sender">{{ user.userName }} - {{ user.postName }}</span>
        </div>
        <div class="registe-info">
          <span class="registe-info">
            <d2-el-icon name="time" />
            有效期：{{user.validTime || '未知' }}
          </span>
        </div>
      </div>
      <!-- <div class="personal-relation">
        <span class="relation-item">followers</span>
        <span class="relation-item">watches</span>
        <span class="relation-item">friends</span>
      </div>-->
      <div class="main-operation">
        <span class="main-operation-item">
          <el-button
            size="small"
            icon="el-icon-user"
            @click="personalVisible = true"
          > 个人信息</el-button>
        </span>
        <span class="main-operation-item">
          <el-button
            size="small"
            icon="el-icon-key"
            @click="passwordVisible = true"
          > 修改密码</el-button>
        </span>
      </div>
      <div
        class="other-operation"
        @click="clear"
      >
        <div class="other-operation-item">
          <d2-el-icon name="delete" />
          清空本地缓存
        </div>
      </div>
      <div
        class="personal-footer"
        @click="logOut"
      >
        <el-button type="text">
          <d2-el-icon name="switch-button" /> 退出
        </el-button>
      </div>
    </div>
    <personal-dialog
      :visible="personalVisible"
      :user="info"
    />
    <password-dialog
      :visible="passwordVisible"
      :user="info"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'PersonalPanel',
  props: {
    user: Object
  },
  computed: {
    ...mapState('d2admin/user', ['info'])
  },
  data() {
    return {
      personalVisible: false,
      passwordVisible: false
    }
  },
  mounted() {
    this.$event.$on('e-ps-close', is2Login => {
      this.passwordVisible = false
      if (!is2Login) return
      this.$message('修改密码成功，2秒后退回登录页')
      setTimeout(async() => {
        await this.logout()
        this.$router.push('/login')
      }, 2000)
    })
    this.$event.$on('e-pd-close', () => (this.personalVisible = false))
  },
  components: {
    personalDialog: () => import('./personalDialog'),
    passwordDialog: () => import('./passwordDialog')
  },
  methods: {
    ...mapActions('d2admin/account', ['logout']),
    /**
     * @description 登出
     */
    async logOut() {
      await this.logout()
      await this.$StoreReset.call(this.$store) // 重置 store
      this.$router.push('/login')
    },
    clear() {
      this.$store.commit('d2admin/gray/set', true)
      MessageBox.confirm(
        '清空本地缓存将重置所有个性化设置并退出到登录界面',
        '清空本地缓存',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const reload = async() => {
            localStorage.clear()
            await this.logout()
            this.$store.commit('d2admin/gray/set', false)
            window.location.reload()
          }
          if (this.$router.currentRoute.name === 'index') {
            reload()
          } else {
            this.$router.push({ name: 'index' })
            var _t = setInterval(() => {
              if (this.$router.currentRoute.name === 'index') {
                clearInterval(_t)
                reload()
              }
            }, 0)
          }
        })
        .catch(() => {
          this.$store.commit('d2admin/gray/set', false)
          // Message({
          //   message: '取消清除缓存操作'
          // })
        })
    },
    comfirm(text, title, cancleText) {
      // eslint-disable-next-line promise/param-names
      return new Promise((resolve, reject) => {
        this.$store.commit('d2admin/gray/set', true)
        MessageBox.confirm(text, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await this.$store.commit('d2admin/gray/set', false)
            resolve(true)
          })
          .catch(() => {
            this.$store.commit('d2admin/gray/set', false)
            Message({
              message: cancleText
            })
            reject(new Error('错误'))
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-panel {
  font-size: 13px;
  width: 220px;
  text-align: center;
  border-color: rgba(180, 190, 190, 0.2);
  border-width: 1px;
  border-style: solid;
  background: rgba(182, 172, 172, 0.1);
  margin: -14px;
}
.personal-desc {
  /* padding: 15px;
  color: #fff; */
  padding: 24px 0;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 90px;
}
.avatar-container {
  display: inline-block;
  text-align: center;
}
.name-role {
  font-size: 12px;
  padding: 5px;
}
.personal-relation {
  font-size: 16px;
  padding: 12px;
  margin-right: 1px;
  background: rgba(200, 209, 204, 0.3);
}
.relation-item {
  padding: 12px;
}
.relation-item:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
}
.main-operation {
  padding: 2px 0;
  /* background: rgba(175, 182, 179, 0.3); */
  border-color: rgba(201, 206, 206, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
  display: flex;
  justify-content: space-between;
}
.main-operation-item {
  margin: 4px;
}
.other-operation {
  padding: 0;
  margin-right: 1px;
  text-align: left;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
  &-item {
    padding: 8px 16px;
  }
  &:hover {
    cursor: pointer;
    color: rgb(19, 138, 156);
    background: #b1a6a61e;
  }
}
.personal-footer {
  margin-right: 1px;
  font-size: 14px;
  text-align: center;
  padding: 2px 0;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
  &:hover {
    cursor: pointer;
    color: rgb(19, 138, 156);
    background: #b1a6a61e;
  }
}
</style>

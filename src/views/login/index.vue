<template>
  <div class="login">
    <!-- 头部标题 -->
    <van-nav-bar class="mytitle" title="标题" />
    <van-form @submit="onSubmit">
      <!-- 手机号&验证码输入框 -->
      <van-cell-group>
        <van-field v-model="user.phone" :rules="[{ required: true, message: '请填写手机号' },{ pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确'}]" placeholder="请输入手机号">
          <template #left-icon>
            <span class="iconfont icon-Phone"></span>
          </template>
        </van-field>
        <van-field v-model="user.code" :rules="[{ required: true, message: '请填写用户名' }]" placeholder="请输入验证码">
          <template #button>
            <van-button class="codebtn" round color="#ededed" size="small">发送验证码</van-button>
          </template>
          <template #left-icon>
            <span class="iconfont icon-lock"></span>
          </template>
        </van-field>
      </van-cell-group>
      <!-- 登录按钮 -->
      <div class="loginBtn">
        <van-button type="info" :loading="isloading" size="large">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入localstrage
import { localSet } from '../../utils/mylocal.js'
// 导入登录的axios
import { apiLogin } from '../../api/user.js'
export default {
  data () {
    return {
      user: {
        phone: '13911111111',
        code: '246810'
      },
      isloading: false
    }
  },
  methods: {
    async onSubmit () {
      if (this.isloading === false) {
        this.isloading = true
        try {
          const res = await apiLogin({
            mobile: this.user.phone,
            code: this.user.code
          })
          this.isloading = false
          // console.log(res)
          // 保存到vuex中
          this.$store.commit('setUserInfo', res.data.data)
          // 保存到localStorage 中
          // window.localStorage.setItem('userinfo', JSON.stringify(res.data.data))
          localSet('userinfo', res.data.data)
          // 添加判断,判断请求的路由
          if (this.$route.path === '/login') {
            // 跳转到用户页面
            this.$router.push('/home')
          } else {
            this.$router.back()
          }
        } catch (error) {
          console.log('出错了')
          this.isloading = false
          this.$toast.fail('手机号或验证码不正确')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .mytitle {
    background-color: #3e9df8;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .codebtn {
    .van-button__text {
      color: #666;
    }
  }
  .loginBtn {
    padding: 20px;
  }
}
</style>

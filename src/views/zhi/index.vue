<template>
  <div class="zhi">
    <!-- 完成标题 -->
    <van-nav-bar @click-left="$router.back()" left-arrow :fixed="true" class="mytitle" title="小智同学" />
    <!-- 聊天内容 -->
    <div class="content" ref="main">
        <div v-for="(item, index) in chatArr" :class="{user: item.isRobot === false}" :key="index" class="item">
            <img v-if="item.isRobot" src="http://img3.imgtn.bdimg.com/it/u=3397418,679254973&fm=26&gp=0.jpg" alt="">
            <img v-else src="http://img2.imgtn.bdimg.com/it/u=1368931271,1176452547&fm=26&gp=0.jpg" alt="">
            <div class="chart">{{item.content}}</div>
        </div>
    </div>
    <!-- 发送按钮 -->
    <van-field class="send"  v-model="value" center clearable >
      <template #button>
        <van-button size="small" id="btn" @click="send"  type="primary">发送</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
// 导入socket.io-client客户端
import io from 'socket.io-client'
export default {
  data () {
    return {
      value: '',
      // 定义一个数组用来保存聊天记录
      chatArr: [
        { content: '你好啊，我是小智同学!!!', isRobot: true }
      ],
      // 创建一个 socket 对象
      socket: null
    }
  },
  methods: {
    send () {
      // 将聊天内容提交到服务器,必须要先使用  socket.io-client 来连接服务器
      this.socket.emit('message', {
        msg: this.value,
        timestamp: Date.now()
      })
      this.chatArr.push({
        content: this.value,
        isRobot: false
      })
      this.value = ''
      console.log(this.$refs.main.scrollTop)
      console.log(this.$refs.main.scrollHeight)
    }
  },
  mounted () {
    // 判断用户有没有登录
    if (!this.$login()) {
      return
    }
    // 得到token
    const token = this.$store.state.userInfo.token
    // 连接服务器: socket. 可以用来发送 & 接收请求
    this.socket = io(`http://ttapi.research.itcast.cn?token=${token}`)
    // 接收消息
    this.socket.on('message', res => {
      this.chatArr.push({
        content: res.msg,
        isRobot: true
      })
    })
  },
  watch: {
    'chatArr' () {
      this.$nextTick(() => {
        this.$refs.main.scrollTop = this.$refs.main.scrollHeight
      })
    }
  }
}
</script>

<style lang="less" scoped>
.zhi{
  margin-top: 46px;
  .mytitle {
    background-color: #3e9df8;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
    /deep/ .van-nav-bar__arrow {
      color: #fff;
    }
  }
  .content{
    position: absolute;
    top: 46px;
    bottom: 63px;
    background-color: pink;
    width: 100%;
    overflow: auto;
    .item{
        margin-top: 10px;
        overflow: hidden;
        img{
            width: 30px;
            height: 30px;
            border-radius: 20px;
            float: left;
            margin-left: 10px;
            margin-right: 10px;
        }
        .chart{
            float: left;
            border: 1px solid #039ad7;
            padding: 5px 3px;
            border-radius: 5px;
            max-width: 60%;
        }
    }
    .user{
        margin-top: 10px;
        img{
            float: right;
        }
        .chart{
            float: right;
        }
    }
  }
  .send{
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: #f3f3f3;
    /deep/ .van-field__control{
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 8px;
      border-radius: 25px;
      padding-left: 18px;
    }
  }
}
</style>

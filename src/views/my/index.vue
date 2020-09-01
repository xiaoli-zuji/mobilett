<template>
  <div class="my">
    <!-- 个人信息区域 -->
    <div class="info">
      <div class="msg">
        <img @click="$router.push('/info')" :src="userInfo.photo" alt="">
        <span>{{userInfo.name}}</span>
        <div class="read">
          <div>今日阅读</div>
          <div> 0 分钟</div>
        </div>
      </div>
      <div class="other">
        <div class="item">
          <div>{{userInfo.art_count}}</div>
          <div>动态</div>
        </div>
        <div class="item">
          <div>{{userInfo.follow_count}}</div>
          <div>关注</div>
        </div>
        <div class="item">
          <div>{{userInfo.fans_count}}</div>
          <div>粉丝</div>
        </div>
      </div>
    </div>
    <!-- 收藏区域 -->
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
      <van-grid-item icon="orders-o" text="作品" />
    </van-grid>
    <!-- 信息区域 -->
    <van-cell-group class="top">
      <van-cell title="消息通知" is-link />
      <van-cell title="实名认证" is-link />
    </van-cell-group>
    <van-cell-group class="bottom">
      <van-cell title="用户反馈" is-link />
      <van-cell @click="xiaozhi" title="小智同学" is-link />
      <van-cell title="系统设置" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { apiGetUserInfo } from '../../api/user'
export default {
  data  () {
    return {
      userInfo: {}
    }
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      const res = await apiGetUserInfo()
      console.log(res)
      this.userInfo = res.data.data
    },
    // 跳转到小智页面
    xiaozhi () {
      this.$router.push('/zhi')
    }
  },
  mounted () {
    this.getUserInfo()
  }
}

</script>

<style lang="less" scoped>
.my {
  .info {
    width: 100%;
    height: 200px;
    background-color: #3e9df8;
    color: #fff;
    overflow: hidden;
    .msg {
      display: flex;
      margin-top: 50px;
      margin-left: 30px;
      position: relative;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .read {
        position: absolute;
        top: 0px;
        right: 0px;
        background-color: rgba(0, 0, 0, .5);
        font-size: 12px;
        padding: 5px 10px;
        text-align: center;
        border-radius: 24px 0 0 24px; // opacity: .5;
      }
    }
    .other {
      display: flex;
      margin-top: 30px;
      .item {
        text-align: center;
        flex: 1;
      }
    }
  }
  /deep/ .van-icon-star-o{
      color: #ffb24f;
  }
  /deep/.van-icon-clock-o{
      color: red;
  }
  /deep/ .van-icon-orders-o{
      color: green;
  }
  .top{
      padding: 3px 0;
      background-color: #f5f5f5;
  }
}
</style>

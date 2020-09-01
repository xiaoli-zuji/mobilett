<template>
  <div class="result">
    <!-- 完成标题 -->
    <van-nav-bar @click-left="onClickLeft" left-arrow :fixed="true" class="mytitle" title="搜索结果" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div  v-for="(item, index) in resultList" :key="index">
        <van-cell @click="$router.push('/detail/'+ item.art_id)">
          <template #title>
            <!-- 标题 -->
            <h4 >{{item.title}}</h4>
            <!-- 图片 -->
            <van-grid v-if="item.cover.type != 0" :border="false" :column-num="3">
              <van-grid-item v-for="(imgitem, imgindex) in item.cover.images" :key="imgindex">
                <van-image lazy-load :src="imgitem" />
              </van-grid-item>
            </van-grid>
            <!-- 其它信息 -->
            <div class="msgbox">
              <div class="left">
                <span>{{item.aut_name}}</span>
                <span>{{item.comm_count}} 条评论</span>
                <span>{{ item.pubdate | timefilter}}</span>
              </div>
            </div>
          </template>
        </van-cell>
        <van-grid direction="horizontal" :column-num="3">
          <van-grid-item icon="comment-o" @click="commont" :text="item.comm_count + '' " />
          <van-grid-item icon="like-o" @click="zan" text="点赞" />
          <van-grid-item icon="exchange" @click="showShare = true" text="分享" />
        </van-grid>
        <!-- 分享面板 -->
        <van-share-sheet
          v-model="showShare"
          :options="options"
          title="立即分享给好友"
          description="描述信息"
        />
      </div>
    </van-list>
  </div>
</template>

<script>
// 导入方法: 搜索结果
import { apiResult } from '../../api/utils'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      // 关键词
      key: '',
      // 页码
      page: 1,
      // 每页数量
      perpage: 10,
      // 搜索结果
      resultList: [],
      // 分享面板
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link', description: '描述信息' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    // 上拉加载
    async onLoad () {
      const res = await apiResult({
        page: this.page,
        perpage: this.perpage,
        q: this.key
      })
      this.resultList = [...this.resultList, ...res.data.data.results]
      // 让list的加载状态变为false
      this.loading = false
      // 每次请求完之后页码+1
      this.page++
      // 判断数据全部加载完毕后,应该将finished变为true
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
    },
    // 评论
    commont () {
      // 判断有没有登录
      const token = this.$store.state.userInfo.token
      if (token) {
        console.log('已经登陆了')
      } else {
        this.$toast.fail('对不起,你还没有登录,请登录')
        this.$router.push('/login')
      }
    },
    // 赞
    zan () {
      if (!this.$login()) {
        return
      }
      console.log('点赞继续')
    }
  },
  mounted () {
    this.key = this.$route.params.key
  }
}
</script>

<style lang="less" scoped>
.result {
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
  .msgbox {
    span {
      margin-right: 10px;
    }
  }
}
</style>

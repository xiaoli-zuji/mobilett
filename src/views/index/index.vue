<template>
  <div class="index">
    <!-- 头部标题 -->
    <van-nav-bar class="mytitle" :fixed="true" title="标题" />
    <!-- 频道区域 -->
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in channelList" :key="index" :title="item.name">
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
          >
          <van-cell @click="$router.push('/detail/'+subitem.art_id)"  v-for="(subitem, subindex) in item.articleList" :key="subindex">
            <template #title>
               <!-- 标题 -->
              <h4>{{subitem.title}}</h4>
              <!-- 图片 -->
              <van-grid :border="false" v-if="subitem.cover.type !== 0" :column-num="3">
                <van-grid-item  v-for="(imgitem, imgindex) in subitem.cover.images" :key="imgindex">
                  <van-image lazy-load :src="imgitem" />
                </van-grid-item>
              </van-grid>
              <!-- 其它信息 -->
              <div class="msgbox">
                <div class="left">
                  <span>{{ subitem.aut_name }}</span>
                  <span>{{ subitem.comm_count }}评论</span>
                  <span>{{ subitem.pubdate | timefilter}}</span>
                </div>
                <div @click.stop="openmore(subitem)" class="right">
                  <van-icon name="cross" />
                </div>
              </div>
            </template>
          </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 操作按钮 -->
    <div class="process" @click="popupChannel">
      <van-icon name="bars" />
    </div>
    <!-- 弹出层 -->
    <popupChannel :show='show' :active.sync="active" :channelList="channelList"></popupChannel>
    <!-- 更多操作 -->
    <more ref="more" :autid="autid" :artid="artid" @delArt="delArt" />
  </div>
</template>

<script>
// 导入封装好的频道数据
import { apiChannel } from '../../api/channel.js'
// 导入localstrage
import { localGet } from '../../utils/mylocal.js'
// 导入获取文章数据的接口
import { apiArticle } from '../../api/article.js'
// 导入弹出层组件
import popupChannel from './com/popup.vue'
// 导入更多操作组件
import more from './com/more.vue'
export default {
  data () {
    return {
      // 频道列表
      channelList: [],
      // 频道下标
      active: 0,
      // 弹出层
      show: false,
      artid: '',
      // 文章作者id
      autid: ''
    }
  },
  components: {
    popupChannel,
    more
  },
  methods: {
    // 上拉加载
    async onLoad () {
      // console.log('onload')
      // 得到选中的频道
      const currentChannel = this.channelList[this.active]
      // 获取当前选中频道的id
      const id = currentChannel.id
      // 发送请求,获取文章数据
      const res = await apiArticle(id)
      // console.log(res)
      currentChannel.articleList = [...currentChannel.articleList, ...res.data.data.results]
      currentChannel.loading = false
      if (res.data.data.results.length === 0) {
        currentChannel.finished = true
      }
    },
    // 下拉刷新
    onRefresh () {
      console.log('refesh')
      // 得到选中的频道
      const currentChannel = this.channelList[this.active]
      // 清空文章数据
      currentChannel.isLoading = false
      currentChannel.articleList = []
      currentChannel.loading = true
      currentChannel.finished = false
      // 重新加载数据
      this.onLoad()
    },
    // 获取频道列表
    async getChannelData () {
      try {
        // 得到用户的登录信息
        const token = this.$store.state.userInfo.token
        // 判断用户是否登录
        if (token) {
          // 如果用户登录了,直接获当前用户的频带数据
          const res = await apiChannel()
          this.channelList = res.data.data.channels
          // console.log(this.channelList)
        } else {
          // 如果用户没有登录
          // 得到localstorage
          const mylist = localGet('channelList')
          if (mylist) {
            // 判断localstorage中是否存在数据
            this.channelList = mylist
          } else {
            const res = await apiChannel()
            this.channelList = res.data.data.channels
          }
        }
      } catch (error) {
        console.log('出错啦,获取不到列表数据')
      }
      // 添加额外的属性
      this.addOtherProptoliat()
    },
    addOtherProptoliat () {
      // 遍历频道列表
      this.channelList.forEach(item => {
        // 添加文章属性
        // item.articleList = []
        this.$set(item, 'articleList', [])
        // item.loading = false
        this.$set(item, 'loading', false)
        // item.isLoading = false
        this.$set(item, 'isLoading', false)
        // item.finished = false
        this.$set(item, 'finished', false)
      })
    },
    // 点出弹出层
    popupChannel () {
      this.show = true
    },
    // 打开更多操作
    openmore (item) {
      this.$refs.more.show = true
      // 记录文章 id
      this.artid = item.art_id
      // 记录作者 id
      this.autid = item.aut_id
    },
    // 删除文章
    delArt (artid) {
      // 得到当前频道数据
      const currentChannel = this.channelList[this.active]
      // 遍历删除
      currentChannel.articleList.forEach((item, index) => {
        // 判断item中的id 与artid是否相同
        if (item.art_id === artid) {
          currentChannel.articleList.splice(index, 1)
        }
      })
    }
  },
  mounted () {
    this.getChannelData()
  }
}
</script>

<style lang="less" scoped>
.index {
  margin-top: 90px;
  margin-bottom: 50px;
  .mytitle {
    background-color: #3e9df8;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
  }
  /deep/ .van-tabs__wrap{
    position: fixed;
    top: 46px;
    left: 0px;
    width: 90%;
    z-index: 999;
  }
  .process {
    position: fixed;
    top: 46px;
    right: 0px;
    z-index: 1000;
    width: 10%;
    height: 44px;
    background-color: pink;
    text-align: center;
    line-height: 44px;
    font-size: 20px;
  }
  .cellArticle{
    height: 60px;
  }
  .msgbox {
    display: flex;
    justify-content: space-between;
    .left {
      color: #999;
      span {
        margin-right: 10px;
      }
    }
    .right {
      border: 1px solid #ccc;
      width: 24px;
      height: 15px;
      text-align: center;
      line-height: 15px;
    }
  }
}
</style>

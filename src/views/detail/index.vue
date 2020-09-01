<template>
    <div class="detail">
        <!-- 头部标题 -->
        <van-nav-bar @click-left="$router.back()" left-arrow :fixed="true" class="mytitle" :title="artDetail.title" />
        <!-- 文章标题 -->
        <h4>{{artDetail.title}}</h4>
        <!-- 作者信息 -->
        <van-cell>
            <template #title>
                <div class="auth">
                    <div class="authImg">
                        <img :src="artDetail.aut_photo" alt="">
                    </div>
                    <div class="authMsg">
                        <div class="authName">{{artDetail.aut_name}}</div>
                        <div class="authTime">{{ artDetail.pubdate | timefilter }}</div>
                    </div>
                    <div class="follow">
                        <van-button @click="follow" v-if="artDetail.is_followed === false" icon="plus" type="info">关注</van-button>
                        <van-button @click="unfollow" v-else type="info">已关注</van-button>
                    </div>
                </div>
            </template>
        </van-cell>
        <!-- 文章区域 -->
        <van-cell>
            <template #title>
                <div v-html="artDetail.content"></div>
            </template>
        </van-cell>
        <!-- 点赞 & 不喜欢 -->
        <div class="btnbox">
            <div class="item">
                <van-button @click="unzan" v-if="artDetail.attitude === 1" round type="danger" plain><van-icon name="like"></van-icon>点赞</van-button>
                <van-button @click="zan" v-else round type="default" plain><van-icon name="like"></van-icon>点赞</van-button>
            </div>
            <div class="item">
                <van-button @click="undislike" v-if="artDetail.attitude === 0" round type="danger" plain><van-icon name="delete"></van-icon>不喜欢</van-button>
                <van-button @click="dislike" v-else round type="default" plain><van-icon name="delete"></van-icon>不喜欢</van-button>
            </div>
        </div>
        <!-- 评论 -->
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <commont :item="item" :isShow="true" v-for="(item, index) in commentList" :key="index" />
        </van-list>
        <!-- 发送评论 -->
        <write :isReply="true" @newComment="addComment" />
        <!-- 回复评论 -->
        <replay v-model="replayshow" />
    </div>
</template>

<script>
import commont from './com/commont'
import write from './com/write'
import { apiGetDetail, apiZan, apiUnZan, apiDislike, apiUnDislike } from '../../api/article'
import { apiFollow, apiUnFollow } from '../../api/user'
import { apiGetArtCom } from '../../api/comment'
import replay from './com/replay'
export default {
  components: {
    commont,
    write,
    replay
  },
  data () {
    return {
      loading: false,
      finished: false,
      //  文章id
      artid: '',
      //  文章详情
      artDetail: {},
      // 评论数据的偏移量
      offset: null,
      // 页码容量
      limit: 11,
      // 最后id
      endid: 0,
      // 评论结果
      commentList: [],
      // 控制回复评论面板
      replayshow: false
    }
  },
  methods: {
    // 添加新的评论
    addComment (newcom) {
      this.commentList.unshift(newcom)
    },
    // 下拉加载
    async onLoad () {
      const res = await apiGetArtCom({
        artid: this.artid,
        offset: this.offset,
        limit: this.limit
      })
      this.endid = res.data.data.end_id
      this.offset = res.data.data.last_id
      this.commentList = [...this.commentList, ...res.data.data.results]
      this.loading = false
      if (this.endid === this.offset) {
        this.finished = true
      }
    },
    // 获取文章详情
    async getArtDetail () {
      const res = await apiGetDetail(this.artid)
      // 赋值文章详情
      this.artDetail = res.data.data
    },
    // 关注用户
    async follow () {
      // 判断用户有没有登录
      if (!this.$login()) {
        return
      }
      try {
        await apiFollow(this.artDetail.aut_id)
        // 手动更改为已关注
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('用户不能关注自己')
        }
        return
      }
      this.artDetail.is_followed = true
    },
    //  取消用户关注
    async unfollow () {
      // 判断用户有没有登录
      if (!this.$login()) {
        return
      }
      this.artDetail.is_followed = false
      await apiUnFollow(this.artDetail.aut_id)
    },
    // 点赞
    async zan () {
    // 判断用户有没有登录
      if (!this.$login()) {
        return
      }
      await apiZan(this.artDetail.art_id)
      this.artDetail.attitude = 1
    },
    // 取消点赞
    async unzan () {
    // 判断用户有没有登录
      if (!this.$login()) {
        return
      }
      this.artDetail.attitude = -1
      await apiUnZan(this.artDetail.art_id)
    },
    // 对文章不喜欢
    async dislike () {
    // 判断用户有没有登录
      if (!this.$login()) {
        return
      }
      this.artDetail.attitude = 0
      await apiDislike(this.artDetail.art_id)
    },
    // 取消对文章不喜欢
    async undislike () {
    // 判断用户有没有登录
      if (!this.$login()) {
        return
      }
      this.artDetail.attitude = -1
      await apiUnDislike(this.artDetail.art_id)
    }
  },
  mounted () {
    this.artid = this.$route.params.artid
    this.getArtDetail()
  }
}
</script>

<style lang="less" scoped>
.detail {
    margin-top: 46px;
    margin-bottom: 50px;
    .mytitle {
        background-color: #3e9df8;
        /deep/ .van-nav-bar__title {
            color: #fff;
        }
        /deep/ .van-nav-bar__arrow {
            color: #fff;
        }
    }
    h4 {
        text-align: center;
        padding: 20px;
    }
    .auth {
        display: flex;
        .authImg {
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }
        .authMsg {
            margin-left: 10px;
            flex: 1;
        }
    }
    .btnbox {
        margin: 30px 0px;
        display: flex;
        .item {
            flex: 1;
            text-align: center;
        }
    }
}
</style>

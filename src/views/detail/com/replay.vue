<template>
  <div>
      <van-popup style="margin-bottom: 60px;" :value="value" @input="fn" position="bottom" :style="{ height: '70%' }" >
          <!-- 当前的评论 -->
          <van-cell title="当前评论" />
            <comment :isShow="false" :item="currentComment" />
          <!-- 回复的评论 -->
          <van-cell title="当前评论" />
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          >
            <comment :isShow="false" :item="item" v-for="(item, index) in commentReply" :key="index" />
          </van-list>
          <!-- 发送回复的评论 -->
          <write :currentComment="currentComment" @newComment="addNewComment" :isReply="false" />
      </van-popup>
  </div>
</template>

<script>
// 导入公用的bus
import comment from './commont'
import write from './write'
import bus from '../../../utils/bus'
import { apiGetCommentReply } from '../../../api/comment'
export default {
  components: {
    comment,
    write
  },
  props: ['value'],
  data () {
    return {
      loading: false,
      finished: false,
      //  当前评论
      currentComment: {},
      //  偏移量
      offset: null,
      endid: 0,
      //  页码量
      limit: 10,
      //  评论回复
      commentReply: []
    }
  },
  methods: {
    fn (e) {
      this.$emit('input', e)
    },
    async onLoad () {
      const res = await apiGetCommentReply({
        commentId: this.currentComment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      this.commentReply = [...this.commentReply, ...res.data.data.results]
      this.offset = res.data.data.last_id
      this.endid = res.data.data.end_id
      this.loading = false
      if (this.offset === this.endid) {
        this.finished = true
      }
    },
    // 添加新的评论
    addNewComment (value) {
      this.commentReply.unshift(value)
      this.currentComment.reply_count++
    }
  },
  mounted () {
    bus.$on('passitem', item => {
      this.currentComment = item
      //  重新赋值
      this.loading = false
      this.finished = false
      //  偏移量
      this.offset = null
      this.endid = 0
      //  页码量
      this.limit = 10
      //  评论回复
      this.commentReply = []
    })
  }
}
</script>

<style>

</style>

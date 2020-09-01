<template>
  <div class="write">
    <van-field
      v-model="value"
      center
      clearable
      placeholder="写评论"
      >
      <template #button>
        <van-button size="small" @click="sendMsg" type="primary">发送</van-button>
      </template>
      </van-field>
  </div>
</template>

<script>
// 导入操作发送评论的方法
import { apiAddCom, apiAddCommentReply } from '../../../api/comment'
export default {
  props: ['isReply', 'currentComment'],
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async sendMsg () {
      if (this.isReply === true) {
        if (this.value === '') {
          this.$toast.fail('输入的内容不能为空')
          return
        }
        const res = await apiAddCom({
          artid: this.$route.params.artid,
          content: this.value
        })
        const newComment = res.data.data.new_obj
        this.$emit('newComment', newComment)
        this.value = ''
      } else {
        if (this.value === '') {
          this.$toast.fail('输入的内容不能为空')
          return
        }
        const res = await apiAddCommentReply({
          commentId: this.currentComment.com_id.toString(),
          content: this.value,
          artid: this.$route.params.artid
        })
        // 得到新的评论
        const newComment = res.data.data.new_obj
        this.$emit('newComment', newComment)
        this.value = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.write{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  /deep/ .van-field__control{
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding-left: 10px;
  }
}
</style>

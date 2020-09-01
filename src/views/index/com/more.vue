<template>
  <div class="more">
    <van-popup @closed="closed" class="pop" v-model="show">
        <van-cell-group v-if="isReport ===false ">
            <van-cell icon="bill-o" @click="dislike" title="不感兴趣"  />
            <van-cell class="rubbish" @click="isReport = true" icon="warning-o" title="反馈垃圾内容" is-link />
            <van-cell icon="delete" @click="black" title="拉黑作者"  />
        </van-cell-group>
        <!-- 举报类别 -->
        <van-cell-group v-else>
          <van-cell icon="arrow-left"  @click="isReport = false"></van-cell>
          <van-cell @click="reportfn(item.id)" v-for="(item, index) in report" :key="index" :title="item.type"></van-cell>
        </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
// 对文章不喜欢 // 导入举报文章
import { apiDisLike, apiReport, apiBlack } from '@/api/article.js'
export default {
  props: ['artid', 'autid'],
  data () {
    return {
      show: false,
      // 举报类别
      report: [
        { id: 0, type: '其他问题' },
        { id: 1, type: '标题夸张' },
        { id: 2, type: '低俗色情' },
        { id: 3, type: '错别字多' },
        { id: 4, type: '旧闻重复' },
        { id: 5, type: '广告软文' },
        { id: 6, type: '内容不实' },
        { id: 7, type: '涉嫌违法犯罪' },
        { id: 8, type: '侵权' }
      ],
      // 是否显示举报详情
      isReport: false
    }
  },
  methods: {
    async dislike () {
      this.show = false
      // 判断用户有没有登录
      const token = this.$store.state.userInfo.token
      if (token) {
        this.$emit('delArt', this.artid)
        await apiDisLike(this.artid)
      } else {
        this.$toast('对不起,只有登录之后才能操作')
      }
    },
    // 举报文章
    async reportfn (typeid) {
      try {
        await apiReport({
          artid: this.artid,
          type: typeid
        })
        // 提示举报成功
        this.$toast.success('举报成功')
      } catch (error) {
        this.$toast.fail('数据异常')
      }
      // 关闭面板
      this.show = false
      // 关闭举报页面
      this.isReport = false
    },
    // 拉黑作者
    async black () {
      try {
        // 判断用户有没有登录
        const token = this.$store.state.userInfo.token
        if (token) {
          await apiBlack(this.autid)
          // 提示拉黑成功
          this.$toast.success('拉黑成功')
        } else {
          this.$toast('对不起,只有登录之后才能操作')
        }
      } catch (error) {
        this.$toast.fail(error.message)
      }
      // 关闭面板
      this.show = false
    },
    // 关闭弹出层
    closed () {
      this.isReport = false
    }
  }
}
</script>

<style lang="less" scoped>
.more{
    .pop{
        width: 90%;
    }
    .rubbish{
        border-top: 1px solid #fafafa;
        border-bottom: 1px solid #fafafa;
    }
}
</style>

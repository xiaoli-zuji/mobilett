<template>
  <van-cell>
      <template #title>
          <div class="commont" >
              <!-- 图片 -->
              <div class="picture">
                  <img :src="item.aut_photo" alt="">
              </div>
              <!-- 信息 -->
              <div class="msg">
                  <div class="autName">{{item.aut_name}}</div>
                  <div class="content">{{item.content}}</div>
                  <div class="other">
                      <span class="time">{{ item.pubdate | timefilter }}</span>
                      <span v-if="isShow" @click="replayCom" class="repeat">回复{{item.reply_count}}</span>
                  </div>
              </div>
              <!-- 喜欢 -->
              <div class="like">
                  <van-icon :color="item.is_liking ? 'red' : '#666'" name="like" />{{item.like_count}}
              </div>
          </div>
      </template>
  </van-cell>
</template>

<script>
// 导入bus
import bus from '../../../utils/bus'
export default {
  props: ['item', 'isShow'],
  methods: {
    replayCom () {
      this.$parent.$parent.replayshow = true
      // 兄弟传值
      bus.$emit('passitem', this.item)
    }
  }
}
</script>

<style lang="less" scoped>
  .commont{
      display: flex;
      .picture{
          img{
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
          }
      }
      .msg{
          flex: 1;
          .autName{
              color: skyblue;
          }
          .content{
              padding: 10px;
          }
          .other{
              .repeat{
                  padding: 8px 10px;
                  background-color: #ccc;
                  border-radius: 20px;
                  margin-left: 10px;
              }
          }
      }
  }
</style>

<template>
  <div class="popup">
    <van-popup
      :value="show"
      @input="popupShow"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <!-- 我的频道 -->
      <van-cell title="我的频道">
        <template #default>
          <van-button v-if="isshow==false" type="danger" @click="isshow=true" plain round size="mini">编辑</van-button>
          <van-button v-else type="danger" @click="isshow=false" plain round size="mini">完成</van-button>
        </template>
      </van-cell>
      <van-grid>
        <van-grid-item @click="changeChannel(index)" class="itemf" v-for="(item, index) in channelList" :key="index"  >
            <template #text>
                <span class='word' :class="{active: active === index}">{{item.name}}</span>
                <van-icon class="items" @click.stop="devChannel(item, index)" v-if="isshow && index != 0" name="clear" size="12" />
            </template>
        </van-grid-item>
      </van-grid>
      <!-- 频道推荐 -->
      <van-cell title="频道推荐" />
      <van-grid>
        <van-grid-item  @click="addChannel(item)" v-for="(item, index) in newChannel" :key="index" :text="item.name"  >
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
// 导入获取全部频道
import { apiAllChannel, apiUpdaChannel } from '@/api/channel.js'
// 导入操作local的方法
import { localSet } from '@/utils/mylocal'
export default {
  props: ['show', 'channelList', 'active'],
  data () {
    return {
      isshow: false,
      AllChannelList: []
    }
  },
  methods: {
    // 弹出层的显示与隐藏
    popupShow (v) {
      this.$parent.show = false
    },
    // 获取全部频道
    async getAllChannelList () {
      const res = await apiAllChannel()
      this.AllChannelList = res.data.data.channels
    },
    // 添加额外的频道
    addChannel (item) {
      this.channelList.push(item)
      // 方法一
      // this.$parent.addOtherProptoliat()
      // 方法二
      this.$set(item, 'articleList', [])
      this.$set(item, 'loading', false)
      this.$set(item, 'isLoading', false)
      this.$set(item, 'finished', false)
      // 保存频道数据
      this.saveChannel()
    },
    // 删除频道
    devChannel (item, index) {
      this.channelList.splice(index, 1)
      if (this.active > index) {
        this.$parent.active = this.active - 1
      }
      // 保存频道数据
      this.saveChannel()
    },
    // 封装保存频道的方法
    async saveChannel () {
      // 判断用户是否登录
      const token = this.$store.state.userInfo.token
      if (!token) {
        // 如果没有登录,保存到本地
        localSet('channelList', this.channelList)
      } else {
        // 如果登录了,保存到服务器
        var channel = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await apiUpdaChannel(channel)
      }
    },
    // 改变频道
    changeChannel (index) {
      this.$emit('update:active', index)
    }
  },
  mounted () {
    this.getAllChannelList()
  },
  computed: {
    newChannel () {
      const ids = this.channelList.map(item => {
        return item.id
      })
      const newArr = this.AllChannelList.filter(item => {
        return !ids.includes(item.id)
      })
      return newArr
    }
  }
}
</script>

<style lang="less" scoped>
.popup{
    .itemf{
        position: relative;
        .items{
            position: absolute;
            top: 0px;
            right: 0px;
        }
        .word{
            color: #646566;
            font-size: 12px;
        }
        .active{
          color: red;
        }
    }
}
</style>

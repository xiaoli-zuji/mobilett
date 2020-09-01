<template>
  <div class="search">
        <!-- 头部搜索框 -->
        <van-search @input="think" v-model="value" background="#3296fa" show-action @search="onSearch" @cancel="onCancel" />
        <!-- 联想区域 -->
        <van-cell-group v-if="thinkList.length != 0">
            <van-cell title="联想区域" />
            <van-cell icon="search" @click="onSearch(item.item)" v-for="(item, index) in thinkList" :key="index" >
              <template #title>
                <span v-html="item.newItem"></span>
              </template>
            </van-cell>
        </van-cell-group>
        <!-- 搜索历史区域 -->
        <van-cell-group v-else>
            <van-cell title="历史区域">
                <template #default>
                    <van-icon @click="delAll" name="delete" />
                </template>
            </van-cell>
            <van-cell @click="onSearch(item)" v-for="(item, index) in historyList" :key="index" icon="search" :title="item">
                <template #default>
                    <van-icon @click.stop="del(index)" name="cross" />
                </template>
            </van-cell>
        </van-cell-group>
  </div>
</template>

<script>
// 导入联想
import { apiThink } from '@/api/utils.js'
// 导入操作local的方法
import { localSet, localGet, localDev } from '../../utils/mylocal.js'
export default {
  data () {
    return {
      value: '',
      thinkList: [],
      // 定义一个定时器
      timer: null,
      // 搜索历史数据
      historyList: localGet('history') || []
    }
  },
  methods: {
    onSearch (key) {
      if (!key) {
        this.$toast.fail('搜索内容不能为空')
        return
      }
      // this.$router.push(`/searchResult?key=${key}`)
      // 动态传参
      this.$router.push(`/searchResult/${key}`)
      // 将当前的数据保存到historyList中
      this.historyList.unshift(key)
      // 数组去重
      this.historyList = [...new Set(this.historyList)]
      // 将数据保存到本地
      localSet('history', this.historyList)
    },
    onCancel () {
      console.log('dev12')
    },
    // 联想区域
    think () {
      clearTimeout(this.timer)
      // 判断,如果搜索的内容为空,不再发请求到后台,并且清空联想列表
      if (!this.value) {
        this.thinkList = []
        return
      }
      this.timer = setTimeout(async () => {
        const res = await apiThink(this.value)
        const oldArr = res.data.data.options
        this.thinkList = oldArr.map(item => {
          return {
            item: item,
            newItem: item.replace(this.value, `<span style="color:red">${this.value}</span>`)
          }
        })
      }, 300)
    },
    del (index) {
      this.historyList.splice(index, 1)
      // // 将数据保存到本地
      localSet('history', this.historyList)
    },
    delAll () {
      this.$dialog.confirm({
        title: '提示',
        message: '你确定要删除吗'
      }).then(() => {
        this.historyList = []
        // 删除本地数据
        localDev('history')
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search {
    .van-search__action {
        color: #fff;
    }
    .van-search__action:active {
        background-color: green;
    }
}
</style>

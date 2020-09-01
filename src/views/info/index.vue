<template>
  <div class="info">
      <!-- 头部标题 -->
      <van-nav-bar @click-left="$router.back()" left-arrow :fixed="true" class="mytitle" @click-right="save" right-text="保存" title="个人信息" />
      <!-- 头像,昵称,介绍 -->
      <van-cell-group class="top">
        <van-cell title="头像" @click="openPhoto"  is-link >
            <template #default>
                <img :src="info.photo" alt="">
            </template>
        </van-cell>
        <van-cell title="昵称" @click="updateName" is-link :value="info.name" />
        <van-cell title="介绍"  @click="updateIntro"  :value="info.intro" is-link />
      </van-cell-group>
      <!-- 生日,性别 -->
      <van-cell-group>
        <van-cell title="性别" @click="updateGender" is-link :value="info.gender===0?'男':'女'" />
        <van-cell title="生日" @click="birthdayshow=true" is-link :value="info.birthday" />
      </van-cell-group>
      <!-- 更改昵称弹出层 -->
      <van-popup v-model="nameShow" position="bottom" :style="{ height: '8%' }" >
        <van-field required v-model="info.name"   />
      </van-popup>
      <!-- 更改介绍弹出层 -->
      <van-popup v-model="introShow" position="bottom" :style="{ height: '8%' }" >
        <van-field required v-model="info.intro"  />
      </van-popup>
      <!-- 更改男女弹出层 -->
      <van-popup v-model="genderShow" position="bottom" :style="{ height: '50%' }" >
        <van-picker show-toolbar  @confirm="onConfirm"   :columns="columns" />
      </van-popup>
      <!-- 头像弹出层 -->
      <filePop ref="filepop" />
      <!-- 日期 -->
      <van-popup v-model="birthdayshow"  position="bottom" :style="{ height: '50%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="TimeConfirm"
          @cancel="birthdayshow = false"
        />
      </van-popup>
  </div>
</template>

<script>
import { apiGetInfoOne, apiGetInfoTwo, apiUpdateInfo } from '../../api/user'
import filePop from './com/filepop'
export default {
  components: {
    filePop
  },
  data () {
    return {
      info: {},
      nameShow: false,
      introShow: false,
      genderShow: false,
      birthdayshow: false,
      columns: ['男', '女'],
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: ''
    }
  },
  methods: {
    // 保存
    async save () {
      try {
        await apiUpdateInfo({
          name: this.info.name,
          gender: this.info.gender,
          birthday: this.info.birthday,
          intro: this.info.intro
        })
        this.$toast.success('修改成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 得到用户头像&昵称&介绍
    async getInfoOne () {
      const res = await apiGetInfoOne()
      this.$set(this.info, 'name', res.data.data.name)
      this.$set(this.info, 'photo', res.data.data.photo)
      this.$set(this.info, 'intro', res.data.data.intro)
    },
    // 得到用户性别&生日
    async getInfoTwo () {
      const res = await apiGetInfoTwo()
      this.$set(this.info, 'gender', res.data.data.gender)
      this.$set(this.info, 'birthday', res.data.data.birthday)
    },
    // 更改用户昵称
    updateName () {
      this.nameShow = true
    },
    updateIntro () {
      this.introShow = true
    },
    // 打开头像
    openPhoto () {
      this.$refs.filepop.show = true
    },
    updateGender () {
      this.genderShow = true
    },
    // 选择男女
    onConfirm (value) {
      this.info.gender = value === '男' ? 0 : 1
      this.genderShow = false
    },
    // 点击确定选择生日
    TimeConfirm () {
      const year = this.currentDate.getFullYear()
      // 月
      var month = (this.currentDate.getMonth() + 1)
      month = month < 10 ? '0' + month : month
      // 日
      var day = this.currentDate.getDate()
      day = day < 10 ? '0' + day : day
      this.currentDate = [year, month, day].join('-')
      this.info.birthday = this.currentDate
      this.birthdayshow = false
    }
  },
  mounted () {
    this.getInfoOne()
    this.getInfoTwo()
  }
}
</script>

<style lang="less" scoped>
.info{
    margin-top: 46px;
    .mytitle {
        background-color: #3e9df8;
        /deep/ .van-nav-bar__title,
        /deep/ .van-nav-bar__arrow,
        /deep/ .van-nav-bar__text{
            color: #fff;
        }
    }
    .top{
        padding-bottom: 3px;
        background-color: #f5f5f5;
        img{
            width: 24px;
            height: 24px;
            border-radius: 50%;
        }
    }
}
</style>

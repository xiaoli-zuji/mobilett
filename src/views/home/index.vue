<template>
  <div>
    <router-view></router-view>
    <van-tabbar route >
      <van-tabbar-item to="/index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style></style>

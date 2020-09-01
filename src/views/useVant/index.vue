<template>
  <div>
    <h1>使用vant</h1>
    <h3>1.0 使用 button 组件</h3>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info" @click="fn">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <h3>2.0 使用单元格</h3>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <h3>3.0 使用 icon</h3>
    <van-icon name="fire-o" />
    <van-icon name="point-gift-o" />
    <h3>4.0 插槽的使用</h3>
    <van-cell-group>
      <van-cell   >
          <template #title>
              <van-icon name="fire-o" />
              单元格
              <van-icon name="fire-o" />
          </template>
          <template #default>
              <van-icon name="point-gift-o" />
              内容
              <van-icon name="point-gift-o" />
          </template>
      </van-cell>
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  methods: {
    fn () {
      console.log('你好')
    }
  }
}
</script>

<style></style>

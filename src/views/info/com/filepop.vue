<template>
  <div class="file">
      <van-popup class="filepop" v-model="show">
          <div class="box">
              <div @click="openfile">从相册中选择</div>
              <input @change="imgchange" ref="myfile" type="file" style="display: none;">
              <div class="photo">拍照</div>
              <div>取消</div>
          </div>
      </van-popup>
  </div>
</template>

<script>
// 使用图片预览
import { ImagePreview } from 'vant'
import { apiUpdateImg } from '../../../api/user'
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    openfile () {
      this.$refs.myfile.click()
    },
    imgchange () {
      //  关闭面板
      this.show = false
      //  图片预览
      //  拿到图片预览文件
      const file = this.$refs.myfile.files[0]
      //  方法一:性能低
      //  const path = URL.createObjectURL(file)
      //  ImagePreview([path])
      //  方法二:
      //  2.1创建一个filereader对象
      const reader = new FileReader()
      //  2.2使用render对象将图片转换成url
      reader.readAsDataURL(file)
      //  2.3设置转换完成之后的逻辑代码
      reader.addEventListener('load', () => {
        // 得到转换之后的结果
        ImagePreview({
          images: [
            reader.result
          ],
          //  关闭事件
          onClose: this.closeProcess
        })
      })
    },
    // 关闭预览组件之后的逻辑
    closeProcess () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否将此图片设置为头像'
      }).then(async () => {
        //  得到图片
        const path = this.$refs.myfile.files[0]
        //  将图片传给服务器
        const res = await apiUpdateImg(path)
        // 接收图片
        const newIcon = res.data.data.photo
        // 将图片传回到页面中
        this.$parent.info.photo = newIcon
        // 提示上传成功
        this.$toast.success('上传成功')
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style lang="less" scoped>
.file{
    .filepop{
        width: 90%;
        .box{
            line-height: 40px;
            text-align: center;
            .photo{
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
            }
        }
    }
}
</style>

<template>
  <div class="add-page page">
    <Header title="添加笔记"/>
    <div class="input-box">
      <label for="title">标题</label>
      <input id="title" v-model="title" type="text">
    </div>
    <div class="input-box">
      <label for="content">内容</label>
      <textarea id="content" v-model="content"></textarea>
    </div>
    <div class="sub-btn" @click="addNote">提交笔记</div>
  </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    async addNote () {
      if (!this.title) {
        this.$toast('请输入标题')
        return
      }
      if (!this.content) {
        this.$toast('请输入内容')
        return
      }
      console.log(this.title, this.content, parseInt(new Date().getTime() / 1000))
      this.$toast.loading({
        forbidClick: true,
        message: '加载中...',
        duration: 0
      })
      let receipt = await this.$notebookContract.methods.addNote(
        this.title,
        this.content,
        parseInt(new Date().getTime() / 1000)
      ).send({
        from: this.$myAddr
      })
      console.log(receipt)
      this.$toast.clear()
      this.$toast.success({
        message: '添加成功',
        onClose: () => {
          this.$router.go(-1)
        }
      })
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
  .add-page {
    padding: 50px 10px 0;
  }
  .input-box {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    label {
      margin-right: 10px;
    }
    textarea {
      height: 100px;
    }
  }
  .sub-btn {
    margin: 20px 0;
    line-height: 40px;
    text-align: center;
    background: #333;
    color: #fff;
  }
</style>

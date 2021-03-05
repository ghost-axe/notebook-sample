<template>
  <div class="home-page page">
    <Header title="笔记列表"/>
    <div class="note-list">
      <div class="note-item" v-for="note in notes" :key="note.id">
        <div class="title">{{note.title}}</div>
        <div class="time">{{note.time | formatTime}}</div>
        <div class="content">{{note.content}}</div>
      </div>
    </div>
    <div class="add-note" @click="$router.push({name: 'Add'})">添加笔记</div>
  </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  data () {
    return {
      notes: []
    }
  },
  mounted () {
    console.log(this.$notebookContract, 'myContract...')
    this.getNotes()
  },
  methods: {
    async getNotes () {
      this.$toast.loading({
        forbidClick: true,
        message: '加载中...',
        duration: 0
      })
      let lNotes = []
      let noteIds = await this.$notebookContract.methods.getNoteIds().call()
      console.log(noteIds)
      for (let i = 0; i < noteIds.length; i++) {
        let note = await this.$notebookContract.methods.notes(noteIds[i]).call({
          from: this.$myAddr
        })
        lNotes.push(note)
      }
      console.log(lNotes, 'lNotes...')
      this.notes = lNotes
      this.$toast.clear()
    }
  },
  filters: {
    formatTime (val) {
      return new Date(val * 1000).toLocaleString()
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
  .note-list {
    padding: 10px;
    .note-item {
      margin-bottom: 10px;
      padding: 10px;
      border-bottom: 1px solid #f0f0f0;
      .title {
        font-size: 18px;
      }
      .time {
        font-size: 14px;
        color: #999;
      }
      .content {
        font-size: 16px;
      }
    }
  }
  .add-note {
    margin: 10px;
    line-height: 40px;
    text-align: center;
    background: #333;
    color: #fff;
  }
</style>

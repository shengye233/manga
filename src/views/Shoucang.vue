<template>
  <div class="shoucang">
    <div class="header">
      <div class="title">
        <span class="title-text">我的收藏</span>
      </div>
      <div class="edit" @click="toggleDel">
        <span class="edit-text">编辑</span>
      </div>
    </div>
    <div class="follow-list" >
      <ul class="list" v-if="follows.length>0">
        <li v-for="(c,index) in follows" :key="index" class="comic-item" @click="showDetail(c.i,c)">
          <img :src="'http://cdn.mangaeden.com/mangasimg/'+ c.im" class="comic-img" v-if="c.im">
          <img src="../assets/mq.png" v-if="!c.im" class="comic-img">
          <!-- <div class="icon-cross"></div> -->
          <div class="del" v-show="deleteMark" @click.stop="del(index)">删除</div>
          <span class="manga-name">{{c.t}}</span>
        </li>
      </ul>
      <div class="empty" v-if="follows.length==0">
        <img src="../assets/oo.png" class="comic-img"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shoucang",
  props: ["follows", "manga", "id","followActive"],
  data() {
    return {
      deleteMark: false
    };
  },
  methods: {
    showDetail(id,c) {
      let details = !this.detail;
      var arrIndex = Math.floor(Math.random() * this.manga.length);
      this.$emit("update-detail", { details, id, arrIndex, c });

      window.scrollTo(0, 0);
    },
    toggleDel() {
      this.deleteMark = !this.deleteMark;
    },
    del(index) {
      this.follows.splice(index, 1);
      // console.log(111)
      this.$emit("update-active",!this.followActive)
      this.$emit("update-follow", this.follows);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.shoucang {
  padding-top: 50px;
  .header {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    background: white;
    text-align: center;
    z-index: 2;
  }
  .title {
    display: inline-block;
    height: 100%;
    line-height: 49px;
    width: 120px;
    text-align: center;

    .title-text {
      vertical-align: middle;
      font-size: 15px;
      color: #1c1d1f;
    }
  }

  .edit {
    line-height: 50px;
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 12px;
    width: 50px;

    .edit-text {
      color: #969696;
    }
  }
  .follow-list {
    padding: 10px 8px 60px 8px;
    margin: 0 auto;

    .empty{
      width: 172.5px;
      height: 183px;
      margin: 120px auto;
    }
    .list {
      box-sizing: border-box;
      margin: 0 auto;
    }
    .comic-img {
      width: 100%;
      height: 100%;
    }
    .comic-item {
      display: inline-block;
      width: 33.33%;
      padding: 8px;
      box-sizing: border-box;
      height: 180px;
      position: relative;
    }
    .del {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 0;
      bottom: 0;
      width: 87%;
      height: 104%;
      text-align: center;
      line-height: 185px;
      color: white;
      background: rgba(0, 0, 0, 0.3);
    }
    .manga-name {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #222;
      margin-top: 8px;
      font-size: 13px;
      height: 15px;
    }
  }
}
</style>

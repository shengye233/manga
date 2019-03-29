<template>
  <div class="home">
    <!-- 头部 -->
    <div class="header">
      <div class="title">
        <img src="../assets/fl.png" alt class="title-img">
        <span class="title-text">咔比Manga</span>
      </div>
      <div class="search">
        <span class="search-text">首页</span>
        <span class="icon-search icon" @click="toggleFn"></span>
      </div>
    </div>
    <!-- 搜索开始 -->
    <Search :hottestManga="hottestManga" :show="show" @update-show="updateShow"></Search>
    <!-- 搜索结束 -->
    <!-- 轮播图 -->
    <div class="slide">
      <div class="slide-box">
        <ImgWrapper :imgs="imgArr" :pIndex="cunrrentIndex" @update-index="updateIndex"></ImgWrapper>
        <PageControl :imgs="imgArr" :pIndex="cunrrentIndex" @update-index="updateIndex"></PageControl>
      </div>
    </div>
    <!-- 最火漫画开始 -->
    <div class="hottest">
      <h2 class="hottest-title">
        <strong class="title-content"></strong>
        <!-- <div class="link-more"></div> -->
        <router-link tag="div" to="/manga" class="link-more"></router-link>
      </h2>
      <div class="hottest-box">
        <ul class="hottest-list">
          <li v-for="(comic,index) in hottestManga.slice(0,6)" :key="index" class="comic-item" @click="showDetail(comic.i,comic)">
            <img :src="'http://cdn.mangaeden.com/mangasimg/'+ comic.im" class="comic-img" v-if="comic.im">
            <img src="../assets/mq.png" v-if="!comic.im" class="comic-img">
            <span class="manga-name">{{comic.t}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 最火漫画结束-->
    <!-- 最新更新开始 -->
    <div class="new">
      <h2 class="new-title">
        <strong class="title-content"></strong>
        <router-link tag="div" to="/manga" class="link-more"></router-link>
      </h2>
      <div class="new-box">
        <ul class="new-list">
          <li v-for="(c,index) in newManga" :key="index" class="comic-item" @click="showDetail(c.i,c)">
            <img :src="'http://cdn.mangaeden.com/mangasimg/'+ c.im" class="comic-img" v-if="c.im">
            <img src="../assets/mq.png" v-if="!c.im" class="comic-img">
            <span class="manga-name">{{c.t}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 最新更新结束 -->
  </div>
</template>

<script>
import ImgWrapper from "../components/ImgWrapper.vue";
import PageControl from "../components/PageControl.vue";
import Search from "../components/Search.vue"

export default {
  name: "Home",
  props: ['manga','detail'],
  computed: {
    hottestManga() {
      // this.mangaList.sort(this.sortId)
      // console.log(mangaList)
      // return this.mangaList
      var mangaList = this.manga.slice();
      mangaList.sort(function(a, b) {
        var x = a.h;
        var y = b.h;
        return x > y ? -1 : x < y ? 1 : 0;
      });
      return mangaList;
    },
    newManga() {
      var mangaLists = this.manga.slice();
      mangaLists.slice().sort(function(c, d) {
        var p = c.ld;
        var q = d.ld;
        return p > q ? -1 : p < q ? 1 : 0;
      });
      return mangaLists.slice(0, 6);
    }
  },
  data() {
    return {
      cunrrentIndex: 0,
      imgArr: ["pic_01.png", "pic_02.png", "pic_03.png"],
      timer: null,
      show: false
      // mangaList: this.manga
    };
  },
  created() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.cunrrentIndex++;
    }, 3000);
  },
  methods: {
    updateIndex(num) {
      this.cunrrentIndex = num;
    },
    toggleFn() {
      this.show = !this.show;
    },
    updateShow(show){
      this.show = show
    },
    showDetail(id,c){
      let details = !this.detail
      var arrIndex = Math.floor(Math.random() * this.manga.length);
      this.$emit('update-detail',{details,id,arrIndex,c})

      window.scrollTo(0,0);
    }
  },
  components: {
    ImgWrapper,
    PageControl,
    Search
  }
};
</script>





<style lang="scss" rel="stylesheet/scss" scoped>
.home {
  padding-top: 50px;
  padding-bottom: 56px;
  .header {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    background: #fff;
    z-index: 10;
  }
  .title {
    height: 100%;
    line-height: 49px;
    width: 120px;
    padding-left: 20px;
    float: left;

    .title-img {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      vertical-align: middle;
      margin-right: 8px;
    }
    .title-text {
      vertical-align: middle;
      font-size: 15px;
      color: #1c1d1f;
    }
  }

  .search {
    float: right;
    height: 100%;
    line-height: 49px;
    padding-right: 20px;

    .search-text {
      vertical-align: middle;
      font-size: 15px;
      color: #1c1d1f;
      margin-right: 90px;
    }
    .icon {
      vertical-align: middle;
    }
  }

  

  .slide {
    padding: 15px;
    overflow: hidden;
    width: 345px;
    height: 140px;
    margin: 0 auto;

    .slide-box {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
  }
  .hottest {
    width: 100%;
    overflow: hidden;
  }
  .hottest-title {
    display: block;
    position: relative;
    height: 46px;
    padding: 0 10px;
    overflow: hidden;

    .title-content {
      background: url(../assets/title.png) no-repeat -105px 0rem;
      background-size: 410px 350px;
      width: 150px;
      height: 40px;
      display: block;
      float: left;
    }
    .link-more {
      display: block;
      background: url(../assets/title.png) no-repeat -340px -45px;
      background-size: 410px 350px;
      width: 60px;
      height: 25px;
      position: absolute;
      top: 9px;
      right: 10px;
    }
  }
  .hottest-box {
    padding: 0px 8px 20px 8px;
    margin: 0 auto;

    .hottest-list {
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
      height: 185px;
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

  .new {
    width: 100%;
    overflow: hidden;
  }
  .new-title {
    display: block;
    position: relative;
    height: 46px;
    padding: 0 10px;
    overflow: hidden;

    .title-content {
      background: url(../assets/title.png) no-repeat -105px -135px;
      background-size: 410px 350px;
      width: 150px;
      height: 40px;
      display: block;
      float: left;
    }
    .link-more {
      display: block;
      background: url(../assets/title.png) no-repeat -340px -45px;
      background-size: 410px 350px;
      width: 60px;
      height: 25px;
      position: absolute;
      top: 9px;
      right: 10px;
    }
  }
  .new-box {
    padding: 0px 8px 20px 8px;
    margin: 0 auto;

    .new-list {
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
      height: 185px;
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

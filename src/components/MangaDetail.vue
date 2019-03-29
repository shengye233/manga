<template>
  <div class="manga-detail" v-show="detail" ref="detailpage">
    <div class="detail-container">
      <!-- 头部 -->
      <div class="detail-header">
        <div class="back icon-arrow-left2" @click="closeDetail"></div>
        <span>咔比Manga</span>
      </div>
      <!-- 头部结束 -->
      <!-- 漫画详情 -->
      <div class="info">
        <!-- 漫画介绍开始 -->
        <div class="info-box">
          <div class="info-box-left">
            <img
              :src="'http://cdn.mangaeden.com/mangasimg/'+mangaDetail.image"
              class="auto-img"
              v-if="mangaDetail.image"
            >
            <img src="../assets/mq.png" v-if="!mangaDetail.image" class="auto-img">
          </div>
          <div class="info-box-right">
            <div class="info-title" v-if="mangaDetail.title">{{mangaDetail.title}}</div>
            <div class="info-title" v-if="!mangaDetail.title">加载中</div>
            <div class="info-author">{{mangaDetail.author}}</div>
            <div class="info-style">{{mangaDetail.categories+''}}</div>
            <div class="info-operation">
              <div class="info-operation-left" @click="follow(selectedManga)">
                <div class="icon-heart follow" :class="followActive?'follow-active':''"></div>
                <div class="follow-text">追漫</div>
              </div>
              <div class="info-operation-right">
                <button
                  class="info-btn"
                  @click="readManga(mangaDetail.chapters.length-1,mangaDetail.chapters)"
                >看第 1 话</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 漫画介绍结束 -->
        <!-- 选项卡开始 -->
        <div class="tab">
          <div class="tab-box tab-left active">详情</div>
          <div class="tab-box tab-right">评论</div>
        </div>
        <!-- 选项卡结束 -->
        <!-- 选项卡1 -->
        <div class="tab-content">
          <div>
            <div class="description">
              <span class="tab-text">{{mangaDetail.description}}</span>
            </div>
            <!-- <div class="description-all">[展开]</div> -->
          </div>
          <div>
            <div class="episode-header">
              <span class="episode-title">章节</span>
              <span class="episode-total">全{{mangaDetail.chapters_len}}话</span>
            </div>

            <ul class="episode-list" ref="mangalist">
              <li
                v-for="(manga,index) in mangaDetail.chapters"
                :key="index"
                class="manga-chapters"
                @click="readManga(index,mangaDetail.chapters)"
              >{{manga[0]}}</li>
            </ul>
            <div class="zk" @click="zk">展开</div>
          </div>
        </div>

        <!-- 选项卡1结束 -->
      </div>
      <!-- 漫画详情结束 -->
      <div class="random-manga">
        <div class="random-title">更多推荐</div>
        <ul class="more-mangalist">
          <li v-for="(m,i) in randomManga" :key="i" class="comic-item" @click="showDetail(m.i)">
            <img :src="'http://cdn.mangaeden.com/mangasimg/'+ m.im" v-if="m.im" class="comic-img">
            <img src="../assets/mq.png" v-if="!m.im" class="comic-img">
            <span class="manga-name">{{m.t}}</span>
          </li>
        </ul>
      </div>
    </div>

    <ReadManga :read="read" @up-read="upRead" :images="images" :count="count" @cl-images="clImages"></ReadManga>
  </div>
</template>

<script>
import ReadManga from "./ReadManga.vue";
export default {
  name: "MangaDetail",
  props: ["detail", "mangaDetail", "manga", "randomMangaNum", "selectedManga","followActive"],
  data() {
    return {
      read: false,
      images: [],
      follows: [],
      count: 0
    };
  },
  computed: {
    // var arrIndex = Math.floor(Math.random() * mangaList.length);
    randomManga() {
      var mangaList = this.manga.slice();
      //  var arrIndex = Math.floor(Math.random() * 200);
      //  console.log(arrIndex)
      mangaList.sort(function(a, b) {
        var x = a.h;
        var y = b.h;
        return x > y ? -1 : x < y ? 1 : 0;
      });
      return mangaList.slice(this.randomMangaNum, this.randomMangaNum + 9);
    }
  },
  methods: {
    closeDetail() {
      this.$refs.mangalist.style.webkitLineClamp = "3";
      this.$emit("update-details", !this.detail);
    },
    showDetail(id) {
      let details = true;
      var arrIndex = Math.floor(Math.random() * 500);
      this.$emit("update-detail", { details, id, arrIndex });

      window.scrollTo(0, 0);
    },
    // n为第n话，chapters为漫画详情中的章节
    readManga(n, chapters) {
      // console.log(chapters[n][3])
      let chaptersURL = `https://www.mangaeden.com/api/chapter/${
        chapters[n][3]
      }`;
      this.axios(chaptersURL).then(
        response => {
          this.images = response.data.images;
          // console.log(this.images);
        },
        err => {
          alert(err);
        }
      );
      window.scrollTo(0, 0);
      this.count = chapters[n][0];
      this.read = !this.read;
    },
    upRead(read) {
      this.read = read;
    },
    clImages(a) {
      this.images = a;
    },
    zk() {
      let ul = this.$refs.mangalist;
      // console.log(ul)
      ul.style.webkitLineClamp = "unset";
    },
    follow(selectedManga) {
      // console.log(selectedManga);
      if (this.follows.length > 0) {
        for (let j = 0; j < this.follows.length; j++) {
          if (this.follows[j].i == selectedManga.i) {
            return;
          } else {
            this.follows.push(selectedManga);
            // console.log(this.follows);
          }
        }
      }else{
        this.follows.push(selectedManga);
      }
      // this.followActive = !this.followActive
      // console.log(this.follows)
      this.$emit("update-active",!this.followActive)
      this.$emit("update-follows", this.follows);
    }
  },
  components: {
    ReadManga
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.auto-img {
  width: 100%;
  height: 100%;
}
.manga-detail {
  width: 100%;
  // height: 100%;
  position: absolute;
  top: 0;
  background: white;
  z-index: 10;
}
.detail-container {
  padding-top: 46px;
  width: 100%;
  height: 100%;

  .detail-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #ddd;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    text-align: center;
    background: #fff;
    z-index: 50;

    .back {
      width: 24px;
      height: 24px;
      margin: 12px;
      line-height: 24px;
      position: absolute;
    }
  }
  .info {
    margin: 16px;
    background: white;
  }
  .info-box {
    display: flex;

    .info-box-left {
      flex: 0 0 110px;
      width: 110px;
      white-space: nowrap;
    }
    .info-box-right {
      flex: 1;
      padding-left: 12px;
      color: #999;
      font-size: 12px;
      line-height: 20px;
      position: relative;
    }
    .info-title {
      font-size: 17px;
      color: #212121;
      margin-bottom: 8px;
      line-height: 24px;
      word-break: break-all;
      white-space: normal;
    }
    .info-style {
      word-break: break-all;
      white-space: normal;
    }
  }
  .info-operation {
    font-size: 12px;
    width: 100%;
    margin-top: 40px;

    .info-operation-left {
      padding: 6px 6px 6px 0;
      float: left;

      .follow {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 6px;
        text-align: center;
      }
      .follow-text {
        display: inline-block;
        color: #212121;
        line-height: 24px;
        font-size: 16px;
      }
    }
    .follow-active{
      color: red;
    }
    .info-operation-right {
      float: right;
      display: block;

      .info-btn {
        width: 128px;
        height: 36px;
        background-color: #fb7299;
        color: #fff;
        border-radius: 18px;
        text-align: center;
        font-size: 14px;
        border: 0;
      }
    }
  }
  .tab {
    border-bottom: 1px solid #eee;
    box-shadow: inset 0 0 0 0 #e7e7e7;
    text-align: center;

    .tab-box {
      display: inline-block;
      margin: 0 50px;
      font-size: 14px;
      line-height: 40px;
      color: #999;
      vertical-align: middle;
    }
    .active {
      color: #fb7299;
      border-bottom: 2px solid #fb7299;
    }
  }
  .tab-content {
    padding-top: 16px;
    padding-bottom: 46px;
  }
  .description {
    color: #999;
    font-size: 12px;
    line-height: 17px;
    margin-bottom: 15px;
    height: 50px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /*超出4行显示省略号*/
    overflow: hidden;
  }
  .description-all {
    color: #999;
    font-size: 12px;
    line-height: 17px;
    float: right;
    margin-top: -30px;
  }
  .episode-header {
    margin: 23px 0 8px;
    .episode-title {
      color: #212121;
      font-size: 16px;
    }
    .episode-total {
      color: #999;
      font-size: 12px;
      margin-left: 4px;
    }
  }
  .episode-list {
    display: block;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /*超出4行显示省略号*/
    overflow: hidden;

    .manga-chapters {
      display: inline-block;
      width: 23%;
      margin: 3px;
      padding: 3px;
      overflow: hidden;
      font-size: 14px;
      color: #212121;
      text-align: center;
      line-height: 36px;
      box-sizing: border-box;
      border-radius: 3px;
      border: 1px solid #ccc;
    }
  }
  .zk {
    width: 23%;
    margin: 3px;
    padding: 3px;
    overflow: hidden;
    font-size: 14px;
    color: #212121;
    text-align: center;
    line-height: 36px;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px solid #ccc;
    float: right;
  }

  .random-manga {
    margin: 16px;
  }
  .more-mangalist {
    display: block;

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

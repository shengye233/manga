<template>
  <div class="manga">
    <div class="header">
      <div class="title">
        <img src="../assets/fl.png" alt class="title-img">
        <span class="title-text">咔比Manga</span>
      </div>
      <div class="search">
        <span class="search-text">漫画</span>
        <span class="icon-search icon" @click="toggleFn"></span>
      </div>
    </div>
    <div class="genres">
      <div class="genres-list">
        <div class="lable-row">
          <div class="first-label">
            <div class="classify-label selected" @click="selectALL">全部</div>
          </div>
          <ul class="rest-labels">
            <li
              v-for="(g,i) in genres"
              :key="i"
              class="classify-label"
              :class="{selected:i==current}"
              @click="select(i,g)"
            >{{g}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="all-list">
      <ul class="list" v-show="mangas.length<=0">
        <li
          v-for="(c,index) in sliceIndexList"
          :key="index"
          class="comic-item"
          @click="showDetail(c.i,c)"
        >
          <img :src="'http://cdn.mangaeden.com/mangasimg/'+ c.im" class="comic-img" v-if="c.im">
          <img src="../assets/mq.png" v-if="!c.im" class="comic-img">
          <span class="manga-name">{{c.t}}</span>
        </li>
      </ul>

      <ul class="list" v-show="mangas.length>0">
        <li
          v-for="(c,index) in sliceIndexLists"
          :key="index"
          class="comic-item"
          @click="showDetail(c.i,c)"
        >
          <img :src="'http://cdn.mangaeden.com/mangasimg/'+ c.im" class="comic-img" v-if="c.im">
          <img src="../assets/mq.png" v-if="!c.im" class="comic-img">
          <span class="manga-name">{{c.t}}</span>
        </li>
      </ul>

      <div class="pagec">
        <button @click="prvePage" class="prve page">上一页</button>
        <button @click="nextPage" class="next page">下一页</button>
      </div>
    </div>
    <Search :hottestManga="hottestManga" :show="show" @update-show="updateShow"></Search>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
export default {
  name: "Manga",
  props: ["manga", "detail"],
  data() {
    return {
      show: false,
      current: -1,
      sliceIndex: 0,
      mangas: [],
      genres: [
        "Action",
        "Adult",
        "Adventure",
        "Comedy",
        "Doujinshi",
        "Drama",
        "Ecchi",
        "Fantasy",
        "Gender Bender",
        "Harem",
        "Historical",
        "Horror",
        "Josei",
        "Martial Arts",
        "Mature",
        "Mecha",
        "Mystery",
        "One Shot",
        "Psychological",
        "Romance",
        "School Life",
        "Sci-fi",
        "Seinen",
        "Shoujo",
        "Shounen",
        "Slice of Life",
        "Smut",
        "Sports",
        "Supernatural",
        "Tragedy",
        "Webtoons",
        "Yaoi",
        "Yuri"
      ]
    };
  },
  computed: {
    hottestManga() {
      var mangaList = this.manga.slice();
      mangaList.sort(function(a, b) {
        var x = a.h;
        var y = b.h;
        return x > y ? -1 : x < y ? 1 : 0;
      });
      // this.mangaLists = mangaList;
      return mangaList;

      // get: function() {
      //   var mangaList = this.manga.slice();
      //   mangaList.sort(function(a, b) {
      //     var x = a.h;
      //     var y = b.h;
      //     return x > y ? -1 : x < y ? 1 : 0;
      //   });
      //   // this.mangaLists = mangaList;
      //   return mangaList;
      // },
      // set: function(newValue) {
      //   this.$state.hottestManga = newValue;
      // }
    },
    sliceIndexList() {
      return this.hottestManga.slice(this.sliceIndex, this.sliceIndex + 12);
    },
    sliceIndexLists() {
      return this.mangas.slice(this.sliceIndex, this.sliceIndex + 12);
    }
  },
  methods: {
    toggleFn() {
      this.show = !this.show;
    },
    updateShow(show) {
      this.show = show;
    },
    select(i, g) {
      let newgroup = [];
      this.current = i;
      for (var j = 0; j < this.hottestManga.length; j++) {
        for (var k = 0; k < this.hottestManga[j].c.length; k++) {
          if (this.hottestManga[j].c[k].search(g) != -1) {
            newgroup.push(this.hottestManga[j]);
            // console.log(newgroup)
          }
        }
      }

      // console.log(this.hottestManga);
      // console.log(newgroup);

      this.mangas = newgroup;
    },
    prvePage() {
      if (this.sliceIndex <= 0) {
        return;
      }
      this.sliceIndex -= 12;
    },
    nextPage() {
      // if (this.sliceIndex >= this.mangas.length) {
      //   return;
      // }
      this.sliceIndex += 12;
    },
    showDetail(id,c) {
      let details = !this.detail;
      var arrIndex = Math.floor(Math.random() * this.manga.length);
      this.$emit("update-detail", { details, id, arrIndex ,c});

      window.scrollTo(0, 0);
    },
    selectALL(){
      this.current = -1;
      this.mangas = []
    }
  },
  components: {
    Search
  }
};
</script>



<style lang="scss" rel="stylesheet/scss" scoped>
.manga {
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

  .genres-list {
    padding: 16px;
  }
  .lable-row {
    white-space: nowrap;
  }
  .first-label {
    display: inline-block;
    vertical-align: top;
  }
  .classify-label {
    display: inline-block;
    padding: 2px 9px;
    margin: 6px 0;
    font-size: 12px;
  }
  .selected {
    background-color: #f4f4f4;
    color: #fb7299;
  }
  .rest-labels {
    white-space: pre-wrap;
    display: block;
  }
  .divider {
    width: calc(100% - 32px);
    height: 1px;
    margin: 0 auto;
    background-color: #eee;
  }
  .all-list {
    padding: 10px 8px 50px 8px;
    margin: 0 auto;

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
  .pagec {
    width: 60%;
    margin: 20px auto;
  }
  .page {
    width: 60px;
    height: 30px;
    background-color: #00aeff;
    color: #fff;
    border: 0;
  }
  .next {
    float: right;
  }
}
</style>

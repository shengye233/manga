<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
      <keep-alive>
        <router-view
          :manga="manga"
          :detail="detail"
          @update-detail="updateDetail"
          :follows="follows"
          @update-follow="updateFollow"
          :followActive="followActive"
          @update-active="updateActive"
          :isLogin="isLogin"
          @isLogin="isLogin = true"
        />
      </keep-alive>

      <div class="tabbar">
        <router-link tag="div" to="/" class="tab-item" exact>
          <span class="icon icon-home"></span>
          <span class="text">首页</span>
        </router-link>
        <router-link tag="div" to="/manga" class="tab-item">
          <span class="icon icon-book"></span>
          <span class="text">漫画</span>
        </router-link>
        <router-link tag="div" to="/shoucang" class="tab-item">
          <span class="icon icon-books"></span>
          <span class="text">收藏</span>
        </router-link>
        <router-link tag="div" to="/mine" class="tab-item">
          <span class="icon icon-tv"></span>
          <span class="text">我的</span>
        </router-link>
      </div>
    </div>
    <MangaDetail
      :detail="detail"
      :mangaDetail="mangaDetail"
      @update-details="updateB"
      :manga="manga"
      :randomMangaNum="randomMangaNum"
      @update-detail="updateDetail"
      :followActive="followActive"
      :selectedManga="selectedManga"
      @update-follows="updateFollows"
      @update-active="updateActive"
    ></MangaDetail>
    <!-- <router-view/> -->
  </div>
</template>

/* 
  https://www.mangaeden.com/api/list/0/   所有漫画
  https://www.mangaeden.com/api/list/0/?p=0&l=25   从0开始25本漫画
*/


<script>
import MangaDetail from "./components/MangaDetail.vue";
const url = "https://www.mangaeden.com/api/list/0/";
export default {
  name: "app",
  data() {
    return {
      manga: [],
      detail: false,
      id: null,
      mangaDetail: [],
      follows: [],
      randomMangaNum: null,
      selectedManga: null,
      followActive: false,
      isLogin: false
    };
  },
  computed: {},
  created() {
    this.axios(url).then(
      response => {
        this.manga = response.data.manga;
      },
      err => {
        alert(err);
      }
    );
  },
  methods: {
    updateDetail(r) {
      // console.log(r)
      this.detail = r.details;
      this.id = r.id;
      this.randomMangaNum = r.arrIndex;
      this.selectedManga = r.c;
      // console.log(this.selectedManga);
      let mangaURL = `https://www.mangaeden.com/api/manga/${this.id}`;
      this.axios(mangaURL).then(
        response => {
          this.mangaDetail = response.data;
          // console.log(this.mangaDetail);
        },
        err => {
          alert(err);
        }
      );
    },
    updateB(b) {
      this.detail = b;
    },
    updateFollow(follows) {
      this.follows = follows;
      // console.log(this.follows);
    },
    updateFollows(follows) {
      this.follows = follows;
      // console.log(this.follows);
    },
    updateActive(active) {
      this.followActive = active;
    }
  },
  components: {
    MangaDetail
  }
};
</script>


<style lang="scss" rel="stylesheet/scss">
.tabbar {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: white;
  border-top: 1px solid #eee;
  padding-top: 5px;

  .tab-item {
    flex: 1;
    height: 100%;
    color: #969696;

    .icon {
      display: inline-block;
      width: 100%;
      height: 25px;
      line-height: 30px;
      font-size: 25px;
      text-align: center;
    }

    .text {
      display: inline-block;
      height: 12px;
      width: 100%;
      font-size: 13px;
      text-align: center;
    }
  }
  .active {
    color: #00aeff;
  }
}
</style>

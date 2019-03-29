<template>
  <div class="read" v-show="read">
    <transition name="read">
      <div v-show="ctrlShow" class="read-bar">
        <div class="back icon-arrow-left2" @click="back"></div>
        <span class="num">第 {{count}} 话</span>
      </div>
    </transition>

    <div class="imglist">
      <ul class="container">
        <!-- v-show="index===currentIndex" -->
        <li class="item" v-for="(path,index) in image" :key="index" v-show="index===currentIndex">
          <img class="item-img" :src="'http://cdn.mangaeden.com/mangasimg/'+path[1]">
        </li>
      </ul>
    </div>
    <span class="read-count">{{currentIndex+1}} / {{image.length}} 第 {{count}} 话</span>
    <div @click.stop="ctrl" class="ctrl"></div>
    <div @click.stop="prve" class="prve"></div>
    <div @click.stop="next" class="next"></div>
  </div>
</template>
<script>
export default {
  name: "read",
  props: ["read", "images", "count"],
  data() {
    return {
      currentIndex: 0,
      ctrlShow: false
    };
  },
  computed: {
    image() {
      return this.images.slice().reverse();
    }
  },
  methods: {
    back() {
      this.currentIndex = 0;
      let oldImages = [];
      this.$emit("up-read", !this.read);
      this.$emit("cl-images", oldImages);
    },
    next() {
      if (this.currentIndex >= this.image.length - 1) {
        return;
      }
      this.currentIndex++;
      // console.log(this.currentIndex);
    },
    prve() {
      if (this.currentIndex <= 0) {
        return;
      }
      this.currentIndex--;
      // console.log(this.currentIndex);
    },
    ctrl() {
      this.ctrlShow = !this.ctrlShow;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.read-enter-active,
.read-leave-active {
  transition: all .4s cubic-bezier(.22,.58,.12,.98);
}

.read-enter,
.read-leave-to {
  /*进入动画的第一帧*/
  transform: translateY(-100%);
}

.read-enter-to,
.read-leave {
  /*进入动画的第一帧*/
  transform: translateY(0);
}
.read {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: #393939;
  z-index: 100;

  .read-bar {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #1e212c;
    position: absolute;
    z-index: 102;

    .back {
      color: white;
      height: 24px;
      width: 24px;
      text-align: center;
      line-height: 30px;
      display: inline-block;
    }
    .num {
      color: white;
      margin-left: 15px;
    }
  }
  .imglist {
    width: 100%;
    overflow: hidden;
  }
  .container {
    // width: 1000%;
    position: relative;
    height: 600px;
    margin-top: 30px;
    // transform: translateX(0);

    .item {
      //   width: 10%;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      display: inline-block;
    }
    .item-img {
      width: 100%;
      height: 100%;
    }
  }
  .ctrl {
    width: 180px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 27%;
  }
  .next {
    width: 20%;
    height: 100%;
    top: 0;
    position: absolute;
    right: 0;
    z-index: 101;
  }
  .prve {
    width: 20%;
    height: 100%;
    top: 0;
    position: absolute;
    left: 0;
    z-index: 101;
  }
  .read-count {
    position: fixed;
    right: 0;
    bottom: 0;
    color: white;
    font-size: 12px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 2px 9px;
    border-radius: 5px 0 0 0;
  }
}
</style>

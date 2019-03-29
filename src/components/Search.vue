<template>
  <transition name="an">
    <div class="find" v-show="show">
      <form action class="find-form">
        <div class="find-back icon-arrow-left2" @click="toggleFn"></div>
        <div class="find-text">
          <input type="text" class="text-input">
        </div>
        <div class="find-btn icon-search"></div>
      </form>
      <div class="find-hot-npc">
        <i class="npc-avatar"></i>
        <span class="npc-dialog"></span>
      </div>
      <ul class="find-hot-list">
        <li class="find-item" v-for="(n,i) in hottestManga.slice(0, 6)" :key="i">{{n.t}}</li>
      </ul>
    </div>
  </transition>
</template>



<script>
export default {
  name: "app",
  props: ["hottestManga", "show"],
  methods: {
    toggleFn() {
      this.$emit("update-show", !this.show);
    }
  }
};
</script>


<style lang="scss" rel="stylesheet/scss">
.an-enter-active,
.an-leave-active {
  transition: all .4s cubic-bezier(.22,.58,.12,.98);
}

.an-enter,
.an-leave-to {
  /*进入动画的第一帧*/
  transform: translateX(100%);
}

.an-enter-to,
.an-leave {
  /*进入动画的第一帧*/
  transform: translateX(0);
}
.find {

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: white;
  z-index: 20;
}
.find-form {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  height: 50px;
  background-color: #00aeff;

  .find-back {
    padding: 7.5px 10px;
  }
  .find-text {
    flex: 1;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    background-color: white;
    margin-left: 3px;
    height: 33px;
    border-radius: 2px;

    .text-input {
      width: 100%;
      height: 100%;
      border: 0;
      font-size: 15px;
      padding: 0 10px;
    }
  }
  .find-btn {
    padding: 10px 15px;
  }
}
.find-hot-npc {
  display: flex;
  align-items: center;
  height: 60px;
  margin: 0 10px;
  border-bottom: 1px solid #c5c5c5;

  .npc-avatar {
    display: block;
    background: url(../assets/sc_img_search.png) no-repeat 0 -35px;
    background-size: 102px 85.5px;
    width: 38px;
    height: 29.5px;
  }

  .npc-dialog {
    display: block;
    background: url(../assets/sc_img_search.png) no-repeat 0 0;
    background-size: 102px 85.5px;
    width: 102px;
    height: 30px;
  }
}

.find-hot-list {
  padding: 15px 10px;
}
.find-item {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 15px 20px;
  border-radius: 45px;
  background-color: white;
  border: 1px solid #c5c5c5;
  color: #535252;
  font-size: 15px;
}
</style>

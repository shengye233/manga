<template>
  <div class="page-control">
    <span
      class="page"
      v-for="(p,i) in imgs"
      :key="p"
      :class="{active:i===myIndex}"
      @click="changePage(i)"
    ></span>
  </div>
</template>

<script>
export default {
  name: "PageControl",
  props: ["pIndex", "imgs"],
  computed: {
    /*解决边界图片 page不能第一时间高亮问题*/
    myIndex() {
      let result = this.pIndex;
      if (result >= this.imgs.length) {
        result = 0;
      }
      if (result < 0) {
        result = this.imgs.length - 1;
      }
      return result;
    }
  },
  methods: {
    changePage(num) {
      this.$emit("update-index", num);
    }
  }
}
</script>


<style scoped>
.page-control {
  position: absolute;
  bottom: 2px;
  left: 50%;
  padding: 2px 10px;
  display: inline-block;
  transform: translateX(-50%);
  /* background: rgba(7, 17, 27, 0.5); */
}

.page-control .page {
  margin: 0 5px;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  opacity: 0.5;
}

.page.active {
  /* background: #fc0; */
  opacity: 1;
}
</style>


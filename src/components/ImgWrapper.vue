<template>
  <ul class="container" ref="ul" @transitionend="transitionEndfunc">
    <li class="item" v-for="(img,i) in myImgArr" :key="i">
      <img style="width: 100%;height: 100%" :src="publicPath+'img/'+img">
    </li>
  </ul>
</template>

<script>
  export default {
    name: "ImgWrapper",
    props: {
      imgs: {
        type: Array,
        required: true
      },
      pIndex: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        publicPath: process.env.BASE_URL,
      }
    },
    computed: {
      myImgArr() {
        let arr = this.imgs
        return [arr[arr.length - 1], ...arr, arr[0]]
      }
    },
    watch: {
      pIndex(newValue, oldValue) {
        // console.log('newValue:' + newValue + ',oldvalue:' + oldValue)
        if (oldValue === -1 || oldValue === this.imgs.length) { //避免最后一张有动画效果的回到第一张
          return
        }
        let ul = this.$refs.ul
        // 监听过渡动画结束 直接将transitionend方法绑定到了ul元素内部
        ul.style.transition = 'all .4s cubic-bezier(.22,.58,.12,.98)'
        let offsetX = -(newValue + 1) * 345
        ul.style.transform = `translateX(${offsetX}px)`
      }
    },
    methods:{
      transitionEndfunc() {
        let maxPage = this.imgs.length
        // 判断是否已经到最后一张
        if (this.pIndex >= maxPage) {
          this.$refs.ul.style.transition = 'none'
          this.$refs.ul.style.transform = `translateX(-10%)`
          // 反向传值 修改currentIndex,让该值为0
          this.$emit('update-index', 0)
        }

        if (this.pIndex < 0) {
          this.$refs.ul.style.transition = 'none'

          this.$refs.ul.style.transform = `translateX(${-maxPage * 345}px)`
          // 反向传值 修改currentIndex,让该值为0
          this.$emit('update-index', maxPage - 1)
        }
      }
    }
  }
  
</script>

<style scoped>
  .container {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 1000%;
    height: 100%;
    transform: translateX(-10%);
  }

  .container .item {
    padding: 0;
    width: 10%;
    height: 100%;
    display: inline-block;
  }

</style>

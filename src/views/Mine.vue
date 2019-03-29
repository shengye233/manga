<template>
  <div class="mine">
    <div class="header">
      <div class="title">
        <span class="title-text">个人中心</span>
      </div>
    </div>
    <div class="u-box">
      <div class="u-detail">
        <div class="u-ava">
          <img src="../assets/p0.png" alt class="auto-img">
        </div>
        <div class="u-name">Name</div>
      </div>
    </div>
    <div class="center">
      <div class="action-item">
        <i class="item-1 item"></i>
        <span>我的VIP</span>
      </div>
      <div class="action-item">
        <i class="item-2 item"></i>
        <span>消费记录</span>
      </div>
      <div class="action-item">
        <i class="item-3 item"></i>
        <span>设置</span>
      </div>
      <div class="action-item">
        <i class="item-4 item"></i>
        <span>建议反馈</span>
      </div>
      <div class="action-item">
        <i class="item-5 item"></i>
        <span>联系客服</span>
      </div>
      <div class="action-item">
        <i class="item-6 item"></i>
        <span>评分</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mine",
  props: ["isLogin", "manga"],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isLogin) {
        //还未登陆
        vm.$router.replace("/login");
      }
    });
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.auto-img {
  width: 100%;
}
.mine {
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
  .u-box {
    padding-top: 20px;
  }
  .u-detail {
    text-align: center;
  }
  .u-ava {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #00aeff;
    margin: 0 auto;
  }
  .u-name {
    margin-top: 5px;
  }
  .center {
    padding-top: 20px;
    .action-item {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #333;
      border-bottom: solid 1px #ebebeb;
      padding: 0 15px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }
  }
  .item {
    margin-right: 5px;
    display: inline-block;
    background-size: 25px 25px;
    background-repeat: no-repeat;
    width: 25px;
    height: 25px;
  }
  .item-1{
    background-image: url(../assets/vn.png);
  }
  .item-2{
    background-image: url(../assets/ve.png);
  }
  .item-3{
    background-image: url(../assets/vm.png);
  }
  .item-4{
    background-image: url(../assets/vj.png);
  }
  .item-5{
    background-image: url(../assets/vi.png);
  }
  .item-6{
    background-image: url(../assets/vo.png);
  }
}
</style>
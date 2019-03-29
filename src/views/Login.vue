<template>
  <div class="login">
    <div class="login-box">
      <div class="logo-box">
        <img src="../assets/qh.png" alt class="logo">
      </div>
      <div class="login-input">
        <ul class="list">
          <li class="list-u">
            <input type="text" class="inputstyle" placeholder="账号">
          </li>
          <li class="list-p">
            <input type="password" class="inputstyle" placeholder="密码">
          </li>
        </ul>
        
      </div>
      <div class="btn" @click="login">登 陆</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: ["manga"],
  data() {
    return { from: null };
  },
  methods: {
    login() {
      this.$emit("isLogin");
      // 路由跳转
      if (this.from) {
        // console.log(this.from.path)
        this.$router.replace(this.from.path);
      } else {
        this.$router.replace("/mine");
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.from = from;
    });
  },
  beforeRouteLeave(to, from, next) {
    this.from = null;
    next();
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 100;

  .login-box {
    margin: 0 auto;
    width: 320px;
    height: 500px;
    position: relative;
    padding-top: 10px;
    .logo-box {
      padding: 50px;
    }

    .logo {
      width: 100%;
      height: 100%;
    }

    .login-input {
      width: 290px;
      margin: 0 auto;
      box-shadow: 6px 6px 5px #888888;
    }

    .list {
      background: #fff;
      height: 89px;
      border-radius: 4px;
    }
    .list-u {
      border-bottom: 1px solid #eaeaea;
    }
    .inputstyle {
      width: 273px;
      height: 44px;
      color: #000;
      border: none;
      background: 0 0;
      padding-left: 15px;
      font-size: 16px;
    }

    .btn {
      width: 290px;
      height: 44px;
      line-height: 44px;
      background: #146fdf;
      border: none;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      margin: 50px auto;
      display: block;
      text-align: center;
    }
  }
}
</style>
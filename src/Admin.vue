<template>
    <div id="admin">
        <router-view></router-view>
    </div>

</template>
<script>
import "./assets/css/index.css";

export default {
  mounted() {
    if (this.$route.path === "/") {
      this.$router.replace({
        name: "login"
      });
    }
    console.log(
      "这代码是我写的\r\n 你居然还要扒开了看\r\n丑代码也要见公婆\r\n 这边请吧：\r\n\r\n\r\n%cfollow me %c https://github.com/geekzhanglei/blog",
      "color:red",
      "color:green"
    );
    document.addEventListener("visibilitychange", function() {
      if (document.visibilityState == "hidden") {
        document.title = "404 not found";
      } else {
        document.title = "欢迎回到博客";
      }
    });
  }
};
</script>



<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="help-info">
      <div class="frame">
        <p class="explain_text">
          欢迎使用点点乐多渠道管理系统, 如有疑问请点击
          <a
            href="http://test2.ddianle.com:88/api/index.php/%E9%A6%96%E9%A1%B5"
            target="_blank"
          >这里</a>进行查看
        </p>
        <a href="http://test2.ddianle.com:88/api/index.php/%E9%A6%96%E9%A1%B5" target="_blank">
          <img src="../assets/img/wiki.png">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
export default {
  components: {
    headTop
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.help-info {
  width: 95%;
  padding: 30px;
}
.frame {
  padding: 20px;
  padding-bottom: 0;
  border: 1px solid gray;
  text-align: center;
}
.frame p a {
  color: #0080c0;
  font-weight: bold;
  padding-right: 3px;
}
.explain_text {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
  font-size: 18px;
}
</style>

<template>
  <div class="navbar">
    <div class="left" @click="leftClick" :style="left?'':'display:none'">
      <van-icon name="arrow-left" color="white"/>
      <!--<span>返回</span>-->
    </div>
    <div class="center">{{ title }}</div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {};
  },
  props: {
    left: {
      default: true
    },
    title: ''
  },
  components: {},
  methods: {
    leftClick() {
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.navbar {
  position: sticky;
  background: #ff7f00;
  color: white;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  line-height: 48px;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
}

.right {
  right: 16px;
  top: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.center {
  top: 0;
  bottom: 0;
  position: absolute;
  left: 0;
  right: 0;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
}

.left {
  left: 16px;
  top: 0;
  bottom: 0;
  z-index: 101;
  position: absolute;
  display: flex;
  align-items: center;
  color: white;
}

img {
  width: 1.3em;
  height: 1.3em;
}
</style>

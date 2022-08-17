<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="tabLayout">
      <div :style="active===index?'color:#ff7f00;font-weight:bolder;':''" v-for="(tab,index) in tabRows"
           @click="clickTab(tab,index)">{{ tab.name }}
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";

export default {
  name: "Main",
  components: {Navbar},
  data() {
    return {
      active: 0,
      tabRows: [
        {name: '首页', url: '/main/home'},
        {name: '购物车', url: '/main/car'},
        {name: '我的', url: '/main/mine'},
      ]
    }
  },
  methods: {
    clickTab(tab, index) {
      this.active = index
      if (this.$route.path !== tab.url)
        this.$router.replace(tab.url)
    }
  },
  created() {
    let i = 0
    this.tabRows.forEach(item => {
      if (this.$route.path === item.url) {
        this.active = i
      }
      i++
    })
  }
}
</script>

<style scoped>
.tabLayout {
  justify-content: space-around;
  display: flex;
  position: fixed;
  bottom: 0;
  height: 44px;
  width: 100%;
  line-height: 44px;
  background: white;
  z-index: 99;
}
</style>

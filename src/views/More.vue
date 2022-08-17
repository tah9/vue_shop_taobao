<template>
  <div>
<!--    <BackBtn></BackBtn>-->
    <navbar title="商品详情"></navbar>
    <van-goods-action style="z-index: 999">
      <van-stepper style="margin-left: 10%" v-model="more.num" theme="round" button-size="22"
                   disable-input/>
      <!--      <van-goods-action-button -->
      <!--                               style="margin-left: 15%" color="#be99ff" type="warning" text="加入购物车"/>-->
      <van-goods-action-button color="#ff7f00" style="margin-left: 15%"
                               type="danger" @click="addCar()"
                               text="加入购物车"
      />
    </van-goods-action>
    <van-swipe @change="onChange" style="">
      <van-swipe-item v-for="item in more.picList">
        <img style="width: 100%;height: auto;object-fit: cover" :src="item">
      </van-swipe-item>
    </van-swipe>
    <div class="main">
      <div style="box-sizing: content-box;padding: 12px;font-weight: bold">{{ more.name }}</div>
      <div style="display: flex;color: RED">
        <span style="line-height: 2em;font-size: 1.3em">￥</span>
        <div style="font-size: 2em">{{ more.price.toFixed(2) }}</div>
      </div>
    </div>
    <div class="main">
      <!--      <div style="text-align: center;font-weight: bold;justify-content:center;padding-top: 5px;display: flex">-->
      <!--        <div style="border-bottom: red solid 3px;width: auto;margin-bottom: 3px">商品介绍</div>-->
      <!--      </div>-->
      <img v-for="url in more.moreList" :src="url" style="width: 100%;display: block">
    </div>
  </div>
</template>

<script>
import BackBtn from "@/components/BackBtn";
import Navbar from "@/components/navbar";

export default {
  name: "More",
  components: {Navbar, BackBtn},
  methods: {
    addCar() {
      let list = localStorage.getItem('list') === null ? [] : JSON.parse(localStorage.getItem('list'))
      for (let temp of list) {
        if (temp.name === this.more.name) {
          this.more = temp
          list.splice(list.indexOf(temp), 1)
          break
        }
      }
      // this.more.num++
      list.push(this.more)
      console.log(list);
      localStorage.setItem('list', JSON.stringify(list))
      this.$router.replace('/main/car')
    },
    onChange(index) {
      this.current = index;
    },
  },
  data() {
    return {
      more: JSON.parse(localStorage.getItem("thing")),
      current: 0,
    }
  },
  mounted() {
    // console.log(this.more)
  }
}
</script>

<style scoped>
.main {
  position: relative;
  width: calc(100% - 16px);
  border-radius: 8px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 0 3px rgba(0, 0, 0, 0.1) inset;
  margin: 8px;
}

.main:before, .main:after {
  position: absolute;
  content: "";
  top: 8px;
  bottom: 8px;
  left: 0;
  right: 0;
  /*box-shadow: 0 0 2px 15px #548E7F;*/
  border-radius: 100px/10px;
  z-index: -1;
}

.custom-indicator {
  position: absolute;
  right: 8px;
  bottom: 15px;
  padding: 2px 5px;
  color: white;
  border-radius: 50px;
  transform: scale(1.3);
  font-size: 12px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
}
</style>

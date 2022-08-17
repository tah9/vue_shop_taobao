<template>
  <div style="background:white;border-radius:6px;
             margin: 12px;padding: 12px" v-if="item">
    <div style="display: flex;justify-content: center;align-items: center">
      <van-icon v-if="item.state===2" name="success"/>
      <van-icon v-else name="clock-o"/>
      <div style="flex: 1;margin-left: 0.2em">{{ getLocalTime(item.date / 1000) }}</div>
      <div v-if="item.state===2">已完成</div>
      <div v-if="item.state===1">待收货</div>
      <div v-if="item.state===0">待付款</div>
    </div>
    <div @click="toOrderInfo(item)" style="display: flex;margin-top: 0.2em;align-items: center">
      <div v-for="(thing,index) in JSON.parse(item.things)" style="display: flex">
        <div style="display: flex;" v-if="index<2">
          <img style="width: 5em;height: 5em;border-radius: 4px"
               :src="JSON.parse(thing.pics)[0]">
          <div style="padding: 0.5em;line-height:4em">×{{ thing.num }}</div>
        </div>
        <div v-else>
          <van-icon name="weapp-nav" style="transform: rotate(90deg)"/>
        </div>
      </div>
      <div style="margin-left: auto">
        <div><span>￥</span>{{ item.price.toFixed(2) }}</div>
        <div style="text-align: center">共{{ getThingSum(item) }}件</div>
      </div>

    </div>
    <div style="margin-top: 0.3em;display: flex;justify-content: end">
      <div v-if="item.state===0" @click="toPay(item.id)">
        <van-tag round type="primary" size="medium">付款</van-tag>
      </div>
      <div v-if="item.state===1" @click="shou(item.id)">
        <van-tag round type="primary" size="medium">确认收货</van-tag>
      </div>
    </div>

  </div>
</template>

<script>
import request from "@/until/req";
import {Toast} from "vant";

export default {
  name: "OrderList",
  props: {
    item: null
  },
  methods: {
    toOrderInfo(item) {
      localStorage.setItem('orderId', item.id);
      if (item.state === 0) {
        this.$router.replace('/DaiFu')
      } else if (item.state === 1) {
        this.$router.replace('/ShouHuo')
      } else {
        this.$router.replace('/Wan')
      }
    },
    toggleAndUpdate(id, state, str) {
      request.post('/updateOrder', {
        id: id,
        state: state
      }).then(res => {
        console.log(res)
        Toast.success(str);
        this.$emit('update')
      })
    },
    toPay(id) {
      this.toggleAndUpdate(id, 1, '支付成功')
    },
    shou(id) {
      this.toggleAndUpdate(id, 2, '收货成功')
    },
    getThingSum(item) {
      let things = JSON.parse(item.things);
      let sum = 0;
      for (let thing of things) {
        sum += thing.num
      }
      return sum
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }
  },
}
</script>

<style scoped>

</style>

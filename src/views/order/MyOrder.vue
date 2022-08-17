<template>
  <div style="background: #f1f2f6">
    <navbar title="我的订单"></navbar>
    <van-tabs v-model="active" color="#ff7f00" @click="clickTab()">
      <van-tab style="overflow: scroll;"
          :title="mt" v-for="(mt,index) in ['全部','待付款','待收货','已完成']" >
        <OrderItem @update="clickTab" v-for="mitem in rows" :item="mitem"></OrderItem>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import request from "@/until/req";
import OrderItem from "@/views/order/OrderItem";

export default {
  name: "MyOrder",
  components: {Navbar, OrderItem},
  methods: {
    clickTab() {
      let index=this.active
      let state = null
      if (index === 0) {
      } else if (index === 1) {
        state=0
      }else if (index===2){
        state=1
      }else {
        state=2
      }
      request.post('/getOrder', {
        uid: JSON.parse(localStorage.getItem('user')).id,
        state: state
      }).then(res => {
        console.log(res);
        this.rows = res.rows
      })
    }
  },
  data() {
    return {
      active: 0,
      rows: null
    }
  },
  created() {
    this.clickTab()
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <navbar title="待付款"></navbar>

    <van-steps active="0">
      <van-step>买家下单</van-step>
      <van-step>买家付款</van-step>
      <van-step>买家收货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>

    <van-cell-group>
      <van-cell title="收货地址" value="常州信息职业技术学院" />
    </van-cell-group>

    <van-card v-for="item in resultList"
              :price="item.price"
              :title="item.name"
              :thumb="item.picList[0]">
    </van-card>

    <van-submit-bar :price="this.priceSum*100" button-text="确认付款" @submit="onSubmit" />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import request from "@/until/req";
import {Toast} from "vant";
export default {
  name: "DaiFu",
  components: {Navbar},
  data(){
    return{
      priceSum:null,
      resultList:null,
      id:localStorage.getItem('orderId'),
    }
  },
  created() {
    request.post('/getOrder',{
      uid: JSON.parse(localStorage.getItem('user')).id,
      id:this.id
    }).then(res=>{
      console.log(res);
      this.resultList=JSON.parse(res.rows[0].things)
      this.priceSum=res.rows[0].price
    })
  },
  methods:{
    onSubmit(){
      request.post('/updateOrder', {
        id:this.id,
        state:1
      }).then(res => {
        console.log(res)
        Toast.success('支付成功');
        let user = JSON.parse(localStorage.getItem('user'));
        user.money=user.money-this.priceSum
        localStorage.setItem('user',JSON.stringify(user))
        this.$router.replace('/MyOrder')
      })
    }
  }
}
</script>

<style scoped>

</style>

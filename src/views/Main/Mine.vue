<template>
  <div>
    <div class="top">
      <div style="margin-bottom:2em;display: flex;justify-content: flex-end;padding-top: 1em">
<!--        <van-icon name="edit" color="white" size="25" style="margin-right: 0.5em" @click="$router.push('/editMess')"/>-->
<!--        <van-icon name="cross" color="white" size="25" style="margin-right: 1em" @click="$router.replace('/login')"/>-->
      </div>
      <div style="display: flex;flex-direction:column;align-items: center;justify-content:center;">
        <img
            src="	https://img10.360buyimg.com/n1/s450x450_jfs/t1/199689/15/24944/162951/628ed459Ec468e3c7/906f2562fccda18c.jpg"
            class="ava">
        <div v-text="user.username" style="color: white;margin-top: 1em;margin-bottom:1em;font-size:1.2em;font-weight: bold"></div>
      </div>
    </div>
    <van-grid style="border-radius: 8px;margin-top: 15%" :column-num="4">
      <van-grid-item v-for="(item,index) in typeRows" @click="clickOrder(index)"
                     :icon="item.url" :text="item.name"/>
    </van-grid>

    <van-cell-group inset style="margin-top: 3em">
      <van-cell title="账户余额" :value="user.money.toFixed(2)" />
<!--      <van-cell title="账户管理" value="修改密码" @click="$router.push('/editPwd')" />-->
      <van-cell @click="toggleUser()" title="更多" value="切换账号"  />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "Mine",
  data() {
    return {
      typeRows: [
        {url: require('../../../public/dai.png'), name: '待付款',},
        {url: require('../../../public/shou.png'), name: '待收货',},
        {url: require('../../../public/wan.png'), name: '已完成',},
        {url: require('../../../public/ding.png'), name: '我的订单',},
      ],
      user:JSON.parse(localStorage.getItem('user'))
    }
  },
  methods:{
    toggleUser() {
      localStorage.clear()
      this.$router.replace('/login')
    },
    clickOrder(index){
      // localStorage.setItem('orderType',index)
      this.$router.push('/MyOrder')
    }
  }
}
</script>

<style scoped>
.ava {
  object-fit: cover;
  width: 4em;
  height: 4em;
  border-radius: 50%;
}

.top {
  background: #ff7f00;
}
</style>

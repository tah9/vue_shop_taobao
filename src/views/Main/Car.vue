<template>
  <div>
    <navbar title="购物车" :left="false"></navbar>
    <div style="position: relative;" v-for="item in list">
      <van-card @click="clickThing($event,item)" style="margin-left: 1em"
                :price="item.price" tag="×"
                :title="item.name"
                :thumb="item.picList[0]">
        <template #footer>
          <van-stepper @overlimit="removeThing(item)" @change="updateList()"
                       v-model="item.num" theme="round" button-size="22" disable-input/>
        </template>
      </van-card>
    </div>
    <van-submit-bar
                    style="margin-bottom: 50px" :price="priceSum" @submit="submit()"
                    button-text="提交订单">
    </van-submit-bar>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import request from "@/until/req";

export default {
  name: "Car",
  components: {Navbar},
  methods: {
    removeThing(item) {
      for (let temp of this.list) {
        if (temp.name === item.name) {
          this.list.splice(this.list.indexOf(temp), 1);
          break
        }
      }
    },
    updateList() {
      this.priceSum = 0
      for (let item of this.list) {
        this.priceSum += item.price * item.num
        this.result.push(item)
      }
      this.priceSum = this.priceSum * 100
    },
    submit() {
      let tempSum = 0
      let tempList = []
      this.result = []
      for (let item of this.list) {
        if (item.check) {
          tempSum += item.price * item.num
          this.result.push(item)
        } else {
          tempList.push(item)
        }
      }
      this.list = tempList

      request.post('/insertOrder', {
        uid: JSON.parse(localStorage.getItem('user')).id,
        things: JSON.stringify(this.result),
        price: tempSum
      }).then(res => {
        console.log(res);
        localStorage.setItem('orderId', res.orderId)
        this.priceSum = 0
        this.updateData()
        this.$router.push('/DaiFu')
      })


    },
    clickThing(e, item) {
      if (e.srcElement.className === 'van-tag van-tag--mark van-tag--danger') {
        this.removeThing(item)
      }
    },
    updateData() {
      //保存数据变化
      localStorage.setItem('list', JSON.stringify(this.list))
    }
  },
  data() {
    return {
      priceSum: 0,
      result: [],
      allCheckBtn: true,
      list: localStorage.getItem('list') === null ? [] : JSON.parse(localStorage.getItem('list')).map(item => {
        item.check = true
        return item
      })
    }
  },
  deactivated() {
    this.updateData()
  }
}
</script>

<style scoped>

</style>

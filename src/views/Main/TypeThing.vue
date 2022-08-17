<template>
  <div>
    <navbar :title="type.name">
      <van-dropdown-menu>
        <van-dropdown-item v-model="curOption" @change="changeMenu" :options="option"/>
      </van-dropdown-menu>
    </navbar>
    <div class="list">
      <div class="list-item" @click="toMore(item)" v-for="item in Rows">
        <img :src="item.picList[0]">
        <div style="box-sizing: content-box;padding: 8px">
          <div class="text">{{ item.name }}</div>
          <div style="display: flex;margin-top:6px;justify-content: space-between">
            <span style="color: red;">￥</span>
            <div style="font-size: 1.2em;color: red;margin-right: auto">{{ item.price }}</div>
            <div style="color: #757575;margin-left: 8px">原价:
              <span style="text-decoration:line-through;">￥{{ (item.price * 1.2).toFixed(1) }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/until/req";
import Navbar from "@/components/navbar";

export default {
  name: "TypeThing",
  components: {Navbar},
  methods: {
    changeMenu(v) {
      if (v === 1) {
        this.Rows.sort((a, b) => {
          return a.price - b.price
        })
      } else if (v === 0) {
        this.Rows.sort((a, b) => {
          return a.id - b.id
        })
      } else {
        this.Rows.sort((a, b) => {
          return b.price - a.price
        })
      }
    },
    toMore(item) {
      item.moreList = JSON.parse(item.more)
      localStorage.setItem("thing", JSON.stringify(item))
      this.$router.push('/more')
    }
  },
  data() {
    return {
      curOption: 0,
      option: [
        {text: '默认排序', value: 0},
        {text: '价格升序', value: 1},
        {text: '价格降序', value: 2},
      ],
      Rows: null,
      type: JSON.parse(localStorage.getItem('type'))
    }
  },
  created() {
    request.post('/searchThing', {
      'name': this.type.type
    }).then(res => {
      res.rows.map(item => {
        item.picList = JSON.parse(item.pics)
        return item
      })
      this.Rows = res.rows
    })
  }
}
</script>

<style scoped>
.list {
  background: #f2f2f2;
  padding-bottom: 60px;
  box-sizing: content-box;
  padding-right: 12px;
}
.list-item {
  margin: 8px;
  width: calc(100% - 8px);
  background: white;
  display: flex;
}

.list-item img {
  width: 85px;
}
</style>

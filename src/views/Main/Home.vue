<template>
  <div class="root">
    <van-search @search="search()"
                v-model="searchValue"
                background="#ff7f00"
                placeholder="搜索"
    />
    <div class="plate">
      <div class="plate-item" @click="toType({name:'热卖',type:'新生'})">
        <img src="../../../public/hot.png">
        <div>热卖</div>
      </div>
      <div class="plate-item" @click="toType({name:'新品',type:'玩具'})">
        <img src="../../../public/new.png">
        <div>新品</div>
      </div>
    </div>
    <van-tabs @click="update" v-model="active" color="#ff7f00" title-active-color="#ff7f00">
      <van-tab :title="type" v-for="type in typeRows"></van-tab>
    </van-tabs>
    <div class="sortMenu">
      <div :style="index===curSortIndex?'color:#ff7f00;':''" @click="clickSort(index)"
           v-for="(name,index) in ['默认排序','价格升序','价格降序']">{{ name }}
      </div>
    </div>
    <div class="list">
      <div class="list-item" @click="toMore(item)" v-for="item in HomeData">
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
import TabLayout from "@/components/TabLayout";

export default {
  name: "Home",
  components: {TabLayout},
  data() {
    return {
      curSortIndex: 0,
      active: 0,
      swipeData: null,
      HomeData: null,
      searchValue: '',
      typeRows: '奶粉 护肤 湿巾 洗护 纸尿裤 婴儿车 吸奶器 玩具'.split(' ')
    }
  },
  methods: {
    clickSort(v) {
      this.curSortIndex = v
      if (v === 1) {
        this.HomeData.sort((a, b) => {
          return a.price - b.price
        })
      } else if (v === 0) {
        this.HomeData.sort((a, b) => {
          return a.id - b.id
        })
      } else {
        this.HomeData.sort((a, b) => {
          return b.price - a.price
        })
      }
    },
    search() {
      localStorage.setItem('search', this.searchValue === '' ? '吸奶器' : this.searchValue);
      this.$router.push('/search')
    },
    toType(item) {
      localStorage.setItem("type", JSON.stringify(item))
      this.$router.push('/type')
    },
    toMore(item) {
      item.moreList = JSON.parse(item.more)
      localStorage.setItem("thing", JSON.stringify(item))
      this.$router.push('/more')
    },
    update() {
      request.post('/searchThing', {
        'name': this.typeRows[this.active]
      }).then(res => {
        res.rows.map(item => {
          item.picList = JSON.parse(item.pics)
          return item
        })
        this.HomeData = res.rows
      })
    }
  },
  created() {
    this.update()
  },
}
</script>

<style scoped>
.plate {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plate-item {
  position: relative;
  border-radius: 4px;
  margin: 1vw;
  width: 95vw;
  height: 120px;
  overflow: hidden;
}

.plate-item img {
  width: 100%;
}

.plate-item div {
  position: absolute;
  font-size: 1.3em;
  top: 1em;
  font-weight: bold;
  left: 1em;
  color: white;
}

.list {
  background: #f2f2f2;
  padding-bottom: 60px;
  box-sizing: content-box;
  padding-right: 12px;
}

.sortMenu {
  display: flex;
  justify-content: space-evenly;
  line-height: 30px;
  font-size: 13px;
}

.sortMenu > div {
  flex: 1;
  margin-top: 5px;
  text-align: center;
  line-height: 35px;
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


.my-swipe {
  color: #fff;
  font-size: 20px;
  text-align: center;
}



</style>

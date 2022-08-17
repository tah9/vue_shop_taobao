<template>
  <div>
    <navbar title="搜索结果"></navbar>
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
  name: "search",
  components: {Navbar},
  methods:{
    toMore(item){
      item.moreList=JSON.parse(item.more)
      localStorage.setItem("thing",JSON.stringify(item))
      this.$router.push('/more')
    }
  },
  data(){
    return{
      Rows:null,
      type:localStorage.getItem('search')
    }
  },
  created() {
    console.log(this.type);
    request.post('/searchThing',{
      'name':this.type
    }).then(res=>{
      console.log(res);
      res.rows.map(item=>{
        item.picList=JSON.parse(item.pics)
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

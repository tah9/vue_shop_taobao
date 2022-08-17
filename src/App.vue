<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import BackBtn from "@/components/BackBtn";
import {Toast} from "vant";
import request from "@/until/req";

export default {
  name: "Home",
  components: {BackBtn},
  data() {
    return {
    }
  },
  methods: {

  },
  mounted() {
  }
}
</script>
<style>
.text {
  overflow: hidden;

  text-overflow: ellipsis;

  display: -webkit-box;

  -webkit-line-clamp: 2;

  overflow: hidden;

  /*! autoprefixer: off */

  -webkit-box-orient: vertical;
}
.van-dropdown-menu__item{
  background-color: #ff7f00;
}
.van-ellipsis{
  color: white;
}
.van-submit-bar__button--danger{
  background: #ff7f00 !important;
}
#app {
  overflow-x: auto;
}

#app::-webkit-scrollbar {
  width: 0
}
/*.van-tab--active{*/
/*  font-weight: bold;*/
/*  color:#ff7f00 !important;*/
/*}*/
.van-stepper__plus{
  background: #ff7f00 !important;
}
</style>

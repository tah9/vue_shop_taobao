<template>
  <div>
    <div class="top">
      <div style="font-size: 1.5em;font-weight: bold">母婴购物平台</div>
      <img src="../../../public/logo.png" style="width: 70vw;margin-bottom: 1em">
      <van-cell-group>
        <van-field v-model="username" label="用户名" placeholder="请输入用户名"/>
        <van-field v-model="password" type="password" label="密码" placeholder="请输入用户名"/>
      </van-cell-group>
    </div>
    <div class="btn" @click="clickBtn()"
         :style="'background:' +((username===''||password==='')?'#eeeff3':'#ff7f00')+';'+
        'color:'+((username===''||password==='')?'black':'white')+';'">登录
    </div>
    <div class="reg" @click="$router.push('/register')">注册账号</div>
  </div>
</template>

<script>
import request from "@/until/req";
import {Toast} from 'vant'

export default {
  name: "Login",
  data() {
    return {
      username: '张三',
      password: '123456789'
    }
  },
  methods: {
    clickBtn() {
      let _this = this
      if (this.username === '' || this.password === '') {
        return
      }
      request.post('/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          console.log(res);
          localStorage.removeItem('car')
          localStorage.setItem('user', JSON.stringify(res.user))
          _this.$router.replace('/main/home')
        } else {
          Toast.fail('账号或密码错误')
        }
      })
    }
  }
}
</script>

<style scoped>
.top {
  display: flex;
  padding: 40px;
  margin-top: 10px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
}

.btn {
  border-radius: 50px;
  line-height: 50px;
  height: 50px;
  background: #eeeff3;
  margin: 0 30px;
  text-align: center;
}

input {
  border-bottom: 1px solid rgba(0, 0, 0, .05);
  border-top: none;
  border-left: none;
  border-right: none;
  width: 100%;
  height: 55px;

}

.reg {
  color: #757575;
  margin: 30px;
}
</style>

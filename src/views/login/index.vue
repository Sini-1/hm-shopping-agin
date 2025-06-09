<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)"/>
    <div class="container">
      <!-- 设置标题 -->
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <!-- 设置表单 -->
       <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" maxlength="6" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{second === totalSecond? '获取验证码' : second+'秒后重新发送'}}</button>
        </div>
       </div>

       <!-- 登录 -->
     <div class="login-btn" @click="mobilelogin">登录</div>
    </div>
</div>
</template>

<script>
import { getPicCode, getSmsCode, codeLogin } from '@/api/getloginApi.js'

export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '', // 图形验证码
      picKey: '', // 图片的唯一标识
      picUrl: '', // 图片的64位 转换过来就是地址
      totalSecond: 60,
      second: 60,
      timer: null,
      mobile: '', // 手机号
      msgCode: '' // 手机验证码
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    async getPicCode () {
      // const res = await request.get('/captcha/image')
      const { data: { base64, key } } = await getPicCode()
      // console.log(res)
      this.picUrl = base64
      this.picKey = key
      this.$toast('nihao1')
    },
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        // \d  0-9之间一个任意数字，相当于[0-9]
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    async getCode () {
      if (!this.validFn()) {
        // 通过校验就继续往下执行，没通过就return
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求，获取验证码
        const obj = {
          chuanPicCode: this.picCode,
          chuanPicKey: this.picKey,
          chuanMobile: this.mobile
        }
        await getSmsCode(obj)
        this.$toast('发送成功，请注意查收')
        // 如果符合条件就开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second < 1) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
        // 发送请求成功，获取验证码
        this.$toast('发送成功，请注意查收')
      }
    },
    async mobilelogin () {
      // 再来一遍校验
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      await codeLogin(this.mobile, this.msgCode)
      this.$router.push('/')
      this.$toast('登录成功')
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container{
  padding:49px 29px;
  background-color: pink;
  .title{
    margin-bottom: 20px;
    h3{
      font-size: 26px;
      font-weight: normal;
    }
    p{
      line-height: 40px;
      font-size: 14px;
      color:#448c27;
    }
  }
  .form-item{
    border-bottom:1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    background-color: blue;
    display: flex;
    align-items: center;
    // 使内部元素在交叉轴上居中对齐
    .inp{
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
      // ,flex: 1和flex: auto都是用于控制 flex 项目如何分配剩余空间的简写属性
    }
    img{
      width: 94px;
      height: 31px;
    }
    button{
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }
  .login-btn{
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    // 控制子元素在主轴方向上居中对齐的属性值
    align-items: center;
  }
}
</style>

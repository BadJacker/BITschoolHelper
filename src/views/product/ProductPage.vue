<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import noPic from '@/assets/img/noPic.png'

const route = useRoute()
const productID = route.params.id

const product = ref('')

var myHeaders = new Headers()
myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)')

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
}

fetch(`http://dev.bit101.flwfdd.xyz:8081/goods/${productID}`, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    product.value = data
    console.log(data)
  })
  .catch((error) => console.log('error', error))

//返回功能
const onClick = () => history.back()

//联系卖家按钮
const onClickButton = () => {
  console.log('联系卖家')
}
</script>

<template>
  <van-button
    icon="arrow-left"
    color="rgba(0,0,0,0.2)"
    @click="onClick"
    round
    size="small"
    class="backButton"
    hairline
  />
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-if="product.images && product.images.length"
        v-for="(image, index) in product.images"
        :key="index"
      >
        <img :src="image.url" alt="Image" class="swipe-image" />
      </van-swipe-item>
      <van-swipe-item v-else>
        <img :src="noPic" alt="Default Image" class="swipe-image" />
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell :label="'剩余数量：' + product.num">
        <template #title>
          <div class="price">
            <span class="money">￥</span>{{ product.price }}
          </div>
          <div class="title">
            {{ product.title }}
          </div>
        </template>
      </van-cell>
      <van-cell icon="contact" center>
        <template #title>
          <div class="contactText">昵称：{{ product.user?.nickname }}</div>
          <div class="contactText">电话：{{ product.user?.phone }}</div>
        </template>
      </van-cell>
      <van-cell center title="物品详情" :label="product.intro" />
    </van-cell-group>
    <div class="fake"></div>
  </div>
  <span class="contact"
    ><van-button
      @click="onClickButton"
      round
      text="联系卖家"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      class="contactButton"
  /></span>
</template>

<style lang="less" scoped>
//返回按钮
.backButton {
  top: 10px;
  height: 26px;
  left: 10px;
  width: 26px;
  z-index: 999;
  position: fixed;
}
//轮播图
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #ffffff;
}
.swipe-image {
  width: 100%;
  object-fit: cover;
}
//价格行
.price {
  height: 27px;
  width: 100vw;
  position: relative;
  font: 1.4em sans-serif;
  font-weight: 600;
  color: #ff3e34;
  background-color: #fff;
  padding-bottom: 3px;
  .money {
    font: 0.7em sans-serif;
    font-weight: 550;
  }
}
//标题行
.title {
  width: 97vw;
}
.contactText {
  font: 0.9em sans-serif;
}
.fake {
  height: 50px;
  width: 100vw;
}
//联系卖家
.contact {
  bottom: 0px;
  height: 50px;
  width: 100vw;
  position: fixed;
  background-color: var(--van-background-2);
  z-index: 999;
  .contactButton {
    top: 5px;
    height: 40px;
    width: 49vw;
    left: 50vw;
  }
}
</style>

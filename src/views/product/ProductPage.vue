<script setup>
import { ref } from 'vue'
//返回功能
const onClick = () => history.back()
//价格
const price = ref(520)
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
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell label="剩余数量: 2">
        <template #title>
          <div class="price"><span class="money">￥</span>{{ price }}</div>
          <div class="title">
            我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题
          </div>
        </template>
      </van-cell>
      <van-cell title="我是发货地址" icon="location-o" />
      <van-cell icon="contact" center>
        <template #title>
          <div class="contactText">姓名：张三</div>
          <div class="contactText">电话：12345678910</div>
        </template>
      </van-cell>
      <van-cell
        center
        title="物品详情"
        label="描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
      />
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
  line-height: 240px;
  text-align: center;
  background-color: #39a9ed;
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

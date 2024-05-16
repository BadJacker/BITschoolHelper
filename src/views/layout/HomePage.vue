<script setup>
import { ref } from 'vue'

const value = ref('')
const active = ref(0)
</script>

<template>
  <div>
    <van-sticky>
      <van-search
        v-model="value"
        shape="round"
        show-action
        action-text="搜索"
        background="#4fc08d"
        placeholder="请输入搜索关键词"
        @search="$router.push('/search')"
        @cancel="$router.push('/search')"
      />
    </van-sticky>
    <van-tabs
      v-model:active="active"
      offset-top="54px"
      sticky
      swipeable
      lazy-render
    >
      <van-tab title="推荐">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>1</van-swipe-item>
          <van-swipe-item>2</van-swipe-item>
          <van-swipe-item>3</van-swipe-item>
          <van-swipe-item>4</van-swipe-item>
        </van-swipe>
        <van-card
          v-for="item in 10"
          :key="item"
          num="2"
          price="2.00"
          tag="标签"
          desc="描述信息"
          title="商品标题"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
          origin-price="10.00"
          @click="$router.push('/product')"
        />
      </van-tab>
      <van-tab title="模块1">内容 2</van-tab>
      <van-tab title="模块2">内容 3</van-tab>
      <van-tab title="模块3">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<style lang="less" scoped>
.search {
  position: sticky;
  top: 0;
  z-index: 999;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>

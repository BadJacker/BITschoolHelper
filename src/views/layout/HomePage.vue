<script setup>
import { ref } from 'vue'

//搜索值
const value = ref('')
//轮播图
const active = ref(0)
//下拉刷新
const isLoading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    isLoading.value = false
    console.log('success')
  }, 1000)
}
//列表
let count = ref(5)
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    count.value += 5

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (count.value >= 40) {
      finished.value = true
    }
  }, 1000)
}
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
    <van-tabs v-model:active="active" offset-top="54px" sticky lazy-render>
      <van-tab title="推荐">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>1</van-swipe-item>
          <van-swipe-item>2</van-swipe-item>
          <van-swipe-item>3</van-swipe-item>
          <van-swipe-item>4</van-swipe-item>
        </van-swipe>
        <van-pull-refresh
          v-model="isLoading"
          success-text="刷新成功"
          @refresh="onRefresh"
        >
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <span v-for="item in count" :key="item">
              <van-swipe-cell>
                <van-card
                  class="goods-card"
                  num="2"
                  price="2.00"
                  tag="标签"
                  desc="描述信息"
                  title="商品标题"
                  thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
                  origin-price="10.00"
                  @click="$router.push('/product')"
                >
                  <template #footer>
                    <van-button size="mini" round>删除</van-button>
                  </template>
                </van-card>
                <template #right>
                  <van-button
                    square
                    text="删除"
                    type="danger"
                    class="delete-button"
                  />
                </template>
              </van-swipe-cell>
            </span>
          </van-list>
        </van-pull-refresh>
        <van-back-top right="10vw" bottom="12vh" />
      </van-tab>
      <van-tab title="模块1">内容 2</van-tab>
      <van-tab title="模块2">内容 3</van-tab>
      <van-tab title="模块3">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<style lang="less" scoped>
//搜索
.search {
  position: sticky;
  top: 0;
  z-index: 999;
}
// 轮播
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 200px;
  text-align: center;
  background-color: #39a9ed;
}
// 商品
.goods-card {
  width: 101vw;
  margin: 0;
}
// 侧边按钮
.delete-button {
  height: 100%;
}
</style>

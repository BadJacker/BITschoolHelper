<script setup></script>

<template>
  <div>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >主页</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/message" icon="chat-o"
        >消息</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/cart" icon="cart-o"
        >订单</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/user" icon="user-circle-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<style scoped></style>

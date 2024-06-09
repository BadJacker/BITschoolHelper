<template>
  <div class="order-detail-box">
    <div class="order-header">
      <span @click="goBack" class="back-icon">&lt;</span>
      <span class="order-title">订单评价</span>
    </div>
    <div class="order-tabs">
      <van-tabs v-model="active" type="card">
        <van-tab title="订单状态" name="1"></van-tab>
      </van-tabs>
    </div>
    <div class="order-content">
      <div class="order-info">
        <div class="order-image">
          <img :src="order.image" alt="商品图片" />
        </div>
        <div class="order-details">
          <p><strong>商品名称:</strong> {{ order.title }}</p>
          <p><strong>商品描述信息:</strong> {{ order.intro }}</p>
          <p><strong>购买数量:</strong> {{ order.num }}</p>
          <p><strong>总价格:</strong> {{ order.price }}</p>
        </div>
      </div>
      <div class="order-meta">
        <p><strong>订单编号:</strong> {{ order.id }}</p>
        <p><strong>订单类型:</strong> {{ getTagName(order.type) }}</p>
        <p><strong>订单创建时间:</strong> {{ order.time }}</p>
        <p><strong>发布用户:</strong> {{ order.user.name }}</p>
        <p><strong>接受用户:</strong> 我</p>
      </div>
    </div>
  </div>
  <div class="">
    <div class="mark-box">
      <p>
        <strong>评分：<van-rate v-model="star" /></strong>
      </p>
    </div>
    <div class="comment-box">
      <p><strong>评论：</strong></p>
      <textarea v-model="content" rows="4" cols="50"></textarea>
    </div>
    <button @click="submit">提交</button>
  </div>
</template>

<script setup>
//import { ref } from 'vue'
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Tabs, Tab, Dialog, Rate } from 'vant'

const router = useRouter()
const route = useRoute()

const order = reactive({
  id: '',
  title: '',
  intro: '',
  num: '',
  price: '',
  time: '',
  type: '',
  user: { name: '' },
  image: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' // 示例图片地址
})

const showRating = ref(false)
const rating = ref(0)

const fetchOrderDetail = (id) => {
  // 模拟获取订单详情
  const orderDetail = {
    id: 1,
    title: '商品1',
    intro: '商品简介1',
    num: 10,
    price: 100,
    time: '2024-06-01 12:00:00',
    type: 2,
    user: { name: '用户1' }
  }
  Object.assign(order, orderDetail)
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  const orderId = route.query.id
  fetchOrderDetail(orderId)
})

const getTagName = (type) => {
  switch (type) {
    case 1:
      return '事务求助'
    case 2:
      return '二手交易'
    case 3:
      return '活动招募'
    default:
      return ''
  }
}

const star = ref(0)
const content = ref('')
//TODO
const orderId = ref(1)

const submit = () => {
  console.log('评分:', star.value)
  console.log('评论:', content.value)

  var myHeaders = new Headers()
  myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)')
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append(
    'Fake-Cookie',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJleHAiOjE3MTk4MjYwMTgsImFkbWluIjpmYWxzZX0.kXlzy4EjJfCB-ViANhdRMRrp_lM5_ICXGg-y090g1Ho'
  )

  var raw = JSON.stringify({
    star: star.value,
    content: content.value
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch(
    `http://dev.bit101.flwfdd.xyz:8081/orders/review/${orderId.value}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error))
}
</script>

<style>
.order-detail-box {
  padding: 16px;
  .order-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .back-icon {
      cursor: pointer;
    }
    .order-title {
      flex: 1;
      text-align: center;
      font-size: 18px;
    }
  }
  .order-tabs {
    margin-bottom: 16px;
  }
  .order-content {
    font-size: 14px;
    .order-info {
      display: flex;
      margin-bottom: 16px;
      .order-image {
        width: 100px;
        height: 100px;
        background-color: #f9f9f9;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .order-details {
        flex: 1;
        margin-left: 16px;
        p {
          margin: 8px 0;
        }
      }
    }
    .order-meta {
      p {
        margin: 8px 0;
      }
    }
    .order-actions {
      display: flex;
      justify-content: space-between;
      button {
        flex: 1;
        margin: 0 8px;
      }
    }
  }
}
.mark-box {
  p {
    margin: 8px 0;
  }
  display: flex;
  align-items: center;
}
</style>

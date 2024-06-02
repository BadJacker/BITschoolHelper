<script setup>
import { showToast } from 'vant'
import 'vant/es/toast/style'
import { computed, nextTick, ref } from 'vue'
import userPic1 from '@/assets/img/userPic1.jpg'
import userPic2 from '@/assets/img/userPic2.jpeg'
import userPic3 from '@/assets/img/userPic3.jpg'
import userPic4 from '@/assets/img/userPic4.jpg'
import userPic5 from '@/assets/img/userPic5.jpg'
import userPic6 from '@/assets/img/userPic6.jpg'
import userPic7 from '@/assets/img/userPic7.jpeg'
import userPic8 from '@/assets/img/userPic8.jpg'
import userPic9 from '@/assets/img/userPic9.png'
import userPic10 from '@/assets/img/userPic10.jpg'
// 修改头像
const showPopover = ref(false)
const src = ref(userPic1)
const srcs = ref([
  { src: userPic1 },
  { src: userPic2 },
  { src: userPic3 },
  { src: userPic4 },
  { src: userPic5 },
  { src: userPic6 },
  { src: userPic7 },
  { src: userPic8 },
  { src: userPic9 },
  { src: userPic10 }
])
const changePic = (Src) => {
  showPopover.value = false
  src.value = Src
  showToast('修改成功')
}
// 修改昵称
const notChangeName = ref(true)
const nameInput = ref(null)
const nameValue = ref('昵称')
const toChangeName = async () => {
  notChangeName.value = false
  await nextTick()
  nameInput.value.focus()
}
const changeName = () => {
  notChangeName.value = true
  showToast('修改成功')
}
// 修改电话
const notChangeTel = ref(true)
const telInput = ref(null)
const telValue = ref(12345678910)
const toChangeTel = async () => {
  notChangeTel.value = false
  await nextTick()
  telInput.value.focus()
}
const changeTel = () => {
  notChangeTel.value = true
  showToast('修改成功')
}
// 修改简介
const notChangeDes = ref(true)
const desInput = ref(null)
const desValue = ref(
  '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介'
)
const desText = computed(() => {
  return '简介：' + desValue.value
})
const toChangeDes = async () => {
  notChangeDes.value = false
  await nextTick()
  desInput.value.focus()
}
const changeDes = () => {
  notChangeDes.value = true
  showToast('修改成功')
}
// 信用分
const currentRate = ref(0)
const gradientColor = {
  '0%': '#3fecff',
  '100%': '#6149f6'
}
const rate = ref(75)
//评论评分
const value = ref(3)
// 列表下拉加载
const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    finished.value = true
  }, 1000)
}
</script>

<template>
  <div>
    <van-row class="self">
      <van-col span="5">
        <van-popover
          v-model:show="showPopover"
          placement="bottom-start"
          :offset="[18, 10]"
        >
          <van-grid
            square
            clickable
            :border="false"
            column-num="5"
            iconsize="12vw"
            :style="{
              width: '90vw'
            }"
          >
            <van-grid-item
              v-for="(item, index) in srcs"
              :key="index"
              @click="changePic(item.src)"
            >
              <van-image
                round
                width="12vw"
                height="12vw"
                lazy-load
                :src="item.src"
              />
            </van-grid-item>
          </van-grid>
          <template #reference>
            <van-image
              round
              width="16vw"
              height="16vw"
              lazy-load
              class="img"
              :src="src"
            />
          </template>
        </van-popover>
      </van-col>
      <van-col span="13">
        <div v-if="notChangeName" @click="toChangeName" class="name">
          {{ nameValue }}
        </div>
        <input
          v-else
          ref="nameInput"
          v-model="nameValue"
          type="text"
          class="nameInput"
          placeholder="请输入昵称"
          @blur="changeName"
        />
        <div class="tel" v-if="notChangeTel" @click="toChangeTel">
          电话：{{ telValue }}
        </div>
        <input
          v-else
          ref="telInput"
          v-model="telValue"
          type="number"
          class="nameInput tel"
          placeholder="请输入电话"
          @blur="changeTel"
        />
        <div class="tel des" v-if="notChangeDes">
          <van-text-ellipsis
            :content="desText"
            expand-text="展开"
            collapse-text="收起"
          />
        </div>
        <input
          v-else
          ref="desInput"
          v-model="desValue"
          type="text"
          class="nameInput tel"
          placeholder="请输入简介"
          @blur="changeDes"
        />
      </van-col>
      <van-col span="1"
        ><van-icon name="edit" class="edit" size="15px" @click="toChangeName" />
        <van-icon
          name="edit"
          class="edit"
          :class="{ edit2: notChangeTel }"
          size="15px"
          @click="toChangeTel"
        />
        <van-icon
          name="edit"
          class="edit"
          :class="{ edit3: notChangeDes }"
          size="15px"
          @click="toChangeDes"
        />
      </van-col>
      <van-col span="5">
        <van-circle
          v-model:current-rate="currentRate"
          :rate="rate"
          :color="gradientColor"
          layer-color="#ebedf0"
          size="16vw"
          :text="rate"
          :stroke-width="70"
          class="credit"
          start-position="right"
        />
      </van-col>
    </van-row>
    <div class="order">
      <van-row>
        <van-col span="6" class="title">我的订单</van-col>
        <van-col
          span="3"
          offset="15"
          class="all"
          @click="$router.push('/layout/order')"
          >全部<van-icon name="arrow"
        /></van-col>
      </van-row>
      <van-row>
        <van-col span="6" class="iconCol" @click="$router.push('/layout/order')"
          ><van-icon name="credit-pay" size="25px" class="icon" />
          <div class="iconText">待付款</div></van-col
        >
        <van-col span="6" class="iconCol" @click="$router.push('/layout/order')"
          ><van-icon name="records-o" size="25px" class="icon" />
          <div class="iconText">待处理</div></van-col
        >
        <van-col span="6" class="iconCol" @click="$router.push('/layout/order')"
          ><van-icon name="chat-o" size="25px" class="icon" />
          <div class="iconText">待评价</div></van-col
        >
        <van-col span="6" class="iconCol" @click="$router.push('/layout/order')"
          ><van-icon name="after-sale" size="25px" class="icon" />
          <div class="iconText2">异常订单</div></van-col
        >
      </van-row>
    </div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in srcs" :key="index" class="comment">
        <van-row class="header">
          <van-col span="3"
            ><van-image
              round
              width="10vw"
              height="10vw"
              lazy-load
              class="img"
              :src="item.src"
          /></van-col>
          <van-col span="20"
            ><div class="username">评论人</div>
            <div class="time">2024.5.20</div>
          </van-col>
        </van-row>
        <van-rate
          v-model="value"
          :size="14"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
          class="rate"
          gutter="0"
          readonly
        />
        <div class="commentText">我是评论</div>
        <van-divider />
      </div>
    </van-list>
  </div>
</template>

<style lang="less" scoped>
//用户模块
.self {
  margin-top: 30px;
  font-size: larger;
  color: var(--van-text-color);
  line-height: var(--van-line-height-md);
  // background-color: #fff;
  .img {
    margin-left: 10px;
  }
  .name {
    font-weight: 550;
    padding-bottom: 2px;
    // background-color: aqua;
  }
  .nameInput {
    font-size: medium;
    font-weight: 400;
  }
  .tel {
    width: 52vw;
    padding: 2px;
    margin-top: 0.5vw;
    font-size: var(--van-font-size-sm);
    color: var(--van-text-color-2);
    line-height: var(--van-line-height-sm);
  }
  .des {
    margin-top: -0.5vw;
  }
  .edit {
    padding: 2px;
    margin-top: 0.5vw;
    font-size: var(--van-font-size-sm);
    color: var(--van-text-color-2);
    line-height: var(--van-line-height-sm);
  }
  .edit2 {
    padding-top: 0px;
  }
  .edit3 {
    padding-top: 0px;
    top: -3px;
  }
  .credit {
    margin-left: 10px;
  }
}
// 订单模块
.order {
  height: 105px;
  width: 96vw;
  // background-color: #fff;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin: 10px 2vw 0;
  .title {
    padding-top: 10px;
    padding-left: 3vw;
    font-size: 0.9rem;
    color: var(--van-text-color);
    line-height: var(--van-line-height-md);
  }
  .all {
    padding-top: 10px;
    font-size: var(--van-font-size-sm);
    color: var(--van-text-color-2);
  }
  .iconCol {
    padding-left: 5vw;
    padding-top: 5px;
    .icon {
      padding: 5px 0;
      padding-left: 3vw;
    }
    .iconText {
      padding-top: 2px;
      padding-left: 1.4vw;
      font-size: var(--van-font-size-sm);
    }
    .iconText2 {
      padding-top: 2px;
      font-size: var(--van-font-size-sm);
    }
  }
}
// 评论模块
.comment {
  width: 100vw;
  .header {
    padding-left: 10px;
    padding-top: 10px;
  }
  .username {
    padding-top: 2px;
    font-size: 0.8rem;
    font-weight: 550;
    color: var(--van-text-color);
    line-height: var(--van-line-height-md);
  }
  .time {
    font-size: var(--van-font-size-sm);
    color: var(--van-text-color-2);
    line-height: var(--van-line-height-sm);
  }
  .rate {
    padding-top: 5px;
    padding-left: 10px;
  }
  .commentText {
    padding-top: 10px;
    padding-left: 10px;
    font-size: 0.8rem;
    color: var(--van-text-color);
    line-height: var(--van-line-height-md);
  }
}
</style>
<style>
:root {
  --van-grid-item-content-padding: 0 0;
}
</style>

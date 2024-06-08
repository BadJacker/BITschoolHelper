<template>
  <div class="order-box">
    <div class="order-header">
      <span class="order-name">我的订单</span>
    </div>
    <van-tabs :color="'#1baeae'" :title-active-color="'#1baeae'" class="order-tab" v-model="state.status" @change="onChangeTab">
      <van-tab title="进行中" name="1"></van-tab>
      <van-tab title="已完成" name="2"></van-tab>
      <van-tab title="已撤销" name="3"></van-tab>
      <van-tab title="全部" name="0"></van-tab>
    </van-tabs>
    <div class="content">
      <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" class="order-list-refresh">
        <van-list
          v-model:loading="state.loading"
          :finished="state.finished"
          finished-text="没有更多了"
          @load="onLoad"
          :offset="10"
        >
        <div v-for="(item, index) in filteredList" :key="index" class="order-item-box">
          <div class="order-item-header">
            <span>{{ getTagName(item[1].type) }}</span>
          </div>
          <div class="order-item-content" @click="goTo(item[1].id)">
            <img class="order-item-image" :src="'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg'" alt="商品图片" />
            <div class="order-item-info">
              <div class="order-item-title">{{ item[1].title }}</div>
              <div class="order-item-details">购买数量: {{ item[1].num }} 总价格: {{ item[1].price }}</div>
              <div class="order-item-buttons" v-if="item[0] === 1">
                <van-button type="primary" size="small" @click.stop="showRatingDialog(item)">确认完成</van-button>
                <van-button type="default" size="small">取消订单</van-button>
              </div>
            </div>
          </div>
        </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
  <van-dialog v-model:show="showRating" title="请评价" show-cancel-button show-confirm-button @confirm="onRateConfirm">
    <van-rate v-model="rating" />
  </van-dialog>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

class Goods {
  constructor(id, intro, num, price, time, title, type, user) {
    this.id = id;
    this.intro = intro;
    this.num = num;
    this.price = price;
    this.time = time;
    this.title = title;
    this.type = type;
    this.user = user;
  }
}

const router = useRouter();
const state = reactive({
  status: '1',
  loading: false,
  finished: false,
  refreshing: false,
  list: [],
  page: 1,
  totalPage: 1 // 假设总页数为 1，需根据实际情况调整
});
const filteredList = ref([]);

const showRating = ref(false);
const rating = ref(0);
let currentItem = null;

const loadData = async () => {
  // 模拟固定的订单列表数据
  const fixedList = [
    [1, new Goods(1, '商品简介1', 10, 100, '2024-06-01 12:00:00', '商品1', 2, { name: '用户1' })],
    [1, new Goods(2, '商品简介2', 5, 200, '2024-06-02 14:30:00', '商品2', 1, { name: '用户2' })],
    [3, new Goods(3, '商品简介3', 1, 10, '2024-06-03 14:30:00', '商品3', 3, { name: '用户3' })],
    [2, new Goods(4, '商品简介4', 50, 2, '2024-06-04 14:30:00', '商品4', 2, { name: '用户4' })]
  ];

  // 初始化订单列表
  state.list = fixedList;

  // 根据当前状态过滤订单列表
  filterList();

  state.loading = false;
  if (state.page >= state.totalPage) {
    state.finished = true;
  }
};

const onChangeTab = (name) => {
  state.status = name;
  filterList();
};

const filterList = () => {
  if (state.status === '0') {
    filteredList.value = state.list;
  } else {
    filteredList.value = state.list.filter(item => item[0] === parseInt(state.status));
  }
};

const goTo = (id) => {
  router.push({ path: '/order', query: { id } });
};

const onLoad = () => {
  if (state.page < state.totalPage) {
    state.page += 1;
    loadData();
  }
};

const onRefresh = () => {
  state.refreshing = true;
  state.finished = false;
  state.loading = true;
  state.page = 1;
  loadData().then(() => {
    state.refreshing = false;
  });
};

const getTagName = (type) => {
  switch (type) {
    case 1:
      return '事务求助';
    case 2:
      return '二手交易';
    case 3:
      return '活动招募';
    default:
      return '';
  }
};

const showRatingDialog = (item) => {
  currentItem = item;
  showRating.value = true;
};

const onRateConfirm = () => {
  // 处理评分逻辑，这里可以根据 rating 的值做相应的处理
  // 关闭弹窗
  showRating.value = false;
};

// 在组件加载时调用 loadData 函数
onMounted(() => {
  loadData();
});

// 监听 status 变化并过滤列表
watch(() => state.status, filterList);
</script>

<style lang="less" scoped>
.order-box {
  .order-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    box-sizing: border-box;
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    display: flex;
    align-items: center;
    .order-name {
      font-size: 14px;
      flex: 1;
      text-align: center;
    }
  }
  .order-tab {
    position: fixed;
    top: 44px; // 使 tab 紧接 header 下方
    left: 0;
    z-index: 1000;
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
  }
  .skeleton {
    margin-top: 60px;
  }
  .content {
    height: calc(100vh - 88px); // 减去 header 和 tab 的高度
    overflow: hidden;
    overflow-y: scroll;
    margin-top: 88px; // 使内容区域在 header 和 tab 下面
  }
  .order-list-refresh {
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }
    .order-item-box {
      margin: 20px 10px;
      background-color: #fff;
      border: 1px solid #dcdcdc;
      .order-item-header {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e9e9e9;
        background-color: #f7f7f7;
      }
      .order-item-content {
        display: flex;
        padding: 10px;
      }
      .order-item-image {
        width: 100px;
        height: 100px;
        margin-right: 10px;
        background-color: #e9e9e9;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .order-item-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .order-item-title {
        font-size: 16px;
        font-weight: bold;
      }
      .order-item-details {
        margin-top: 5px;
        color: #999;
      }
      .order-item-buttons {
        display: flex;
        justify-content: flex-start;
        gap: 10px;
        margin-top: 10px;
      }
    }
  }
}
</style>

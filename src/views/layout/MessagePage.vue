<template>
  <div class="wrap">
    <div class="title">
      <div>
        <van-icon
          name="arrow-left"
          size="20"
          style="margin-left: 10px"
          @click="onClickLeft"
        />
      </div>
      <strong>{{ userName }}</strong>
      <div>
        <van-icon
          name="ellipsis"
          size="22"
          style="margin-right: 10px"
          @click="onClickRight"
        />
      </div>
    </div>
    <div class="content_box" id="box" ref="scrollBox">
      <div class="timer">2024-06-04 11:08:07</div>
      <div
        :class="item.position == 'left' ? 'userbox2' : 'userbox'"
        v-for="(item, index) in chatList"
        :key="index"
      >
        <div :class="item.position == 'left' ? 'nameInfo2' : 'nameInfo'">
          <div style="font-size: 14px">{{ item.username }}</div>
          <div
            :class="item.position == 'left' ? 'contentText2' : 'contentText'"
          >
            {{ item.content }}
          </div>
        </div>
        <div>
          <van-image round width="50px" height="50px" :src="item.url" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-field
        v-model="inputValue"
        center
        type="textarea"
        :autosize="{ maxHeight: 100, minHeight: 25 }"
        placeholder="请输入内容"
        rows="1"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sendOut">发送</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import userPic1 from '@/assets/img/userPic1.jpg';
import userPic2 from '@/assets/img/userPic2.jpeg';

export default {
  data() {
    return {
      chatList: [
        {
          url: userPic2,
          username: "客户",
          content: "23333·123233331232333312323333123",
          position: "left",
        },
        {
          url: userPic1,
          username: "我",
          content: "2333312323333123233331232333312323333123",
          position: "right",
        },
        {
          url: userPic2,
          username: "客户",
          content: "23333123",
          position: "left",
        },
        {
          url: userPic1,
          username: "我",
          content: "2333312323333",
          position: "right",
        },
        {
          url: userPic1,
          username: "我",
          content: "2333312323333",
          position: "right",
        },
        {
          url: userPic2,
          username: "客户",
          content: "23333123",
          position: "left",
        },
        {
          url: userPic1,
          username: "我",
          content: "2333312323333",
          position: "right",
        },
        {
          url: userPic2,
          username: "客户",
          content: "23333123",
          position: "left",
        },
        {
          url: userPic1,
          username: "我",
          content: "2333312323333",
          position: "right",
        },
        {
          url: userPic2,
          username: "客户",
          content: "23333123",
          position: "left",
        },
        {
          url: userPic1,
          username: "我",
          content: "2333312323333",
          position: "right",
        },
        {
          url: userPic2,
          username: "客户",
          content: "23333123",
          position: "left",
        },
        {
          url: userPic1,
          username: "我",
          content: "2333312323333",
          position: "right",
        },
      ],
      userName: "客户",
      inputValue: "",
      scrollTop: 0
    };
  },
  mounted() {
    this.setPageScrollTo();
    this.$refs.scrollBox.addEventListener('scroll', this.srTop);
  },
  methods: {
    onClickLeft() {
      console.log("返回");
    },
    onClickRight() {
      console.log("按钮");
    },
    setPageScrollTo() {
      this.scrollTop = this.$refs.scrollBox.scrollHeight;
      setTimeout(() => {
        if (this.scrollTop != this.$refs.scrollBox.scrollHeight) {
          this.scrollTop = this.$refs.scrollBox.scrollHeight;
        }
      }, 100);
      this.$refs.scrollBox.scrollTop = this.scrollTop;
    },
    srTop() {
      if (this.$refs.scrollBox.scrollTop == 0) {
        console.log('到顶了，滚动条位置 :', this.$refs.scrollBox.scrollTop);
      }
    },
    sendOut() {
      if (this.inputValue.trim() !== "") {
        const newMessage = {
          url: userPic1,
          username: "我",
          content: this.inputValue.trim(),
          position: "right"
        };
        this.chatList.push(newMessage);
        this.inputValue = "";
        this.$nextTick(() => {
          this.scrollTop = this.$refs.scrollBox.scrollHeight;
          this.$refs.scrollBox.scrollTop = this.scrollTop;
        });
        console.log('发送成功');
      }
    }
  }
};
</script>

<style scoped>
html, body {
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
}

.wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.title {
  height: 40px;
  width: 100%;
  background-color: #4fc08d;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom {
  height: 50px;
  width: 100%;
  border-top: 1px solid #eaeaea;
  background-color: white;
  position: sticky;
  bottom: 0;
  padding: 10px;
  box-sizing: border-box;
}

.content_box {
  flex: 1;
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
}

.timer {
  text-align: center;
  color: #c2c2c2;
}

.userbox {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
}

.nameInfo {
  flex: 1;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.contentText {
  background-color: #39a9ed;
  display: inline-block;
  border-top-left-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  max-width: 61%;
  padding: 5px 10px;
  white-space: normal;
  word-break: break-all;
  margin-top: 3px;
  font-size: 14px;
}

.userbox2 {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 10px;
}

.nameInfo2 {
  flex: 1;
  margin-left: 10px;
}

.contentText2 {
  background-color: #e4e7e9;
  display: inline-block;
  border-top-left-radius: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  max-width: 61%;
  padding: 5px 10px;
  white-space: normal;
  word-break: break-all;
  margin-top: 3px;
  font-size: 14px;
}
</style>

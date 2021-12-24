<template>
  <div class="home">
    <div class="btn-list">
      <button @click="handleJump(1)">选择元素</button>
      <button @click="handleJump(2)">更新</button>
      <button @click="handleJump(3)">绘制矩形</button>
      <button @click="handleJump(4)">布局</button>
      <button @click="handleJump(5)">环形图</button>
      <button @click="handleJump(6)">柱状图</button>
      <button @click="handleJump(7)">测试过渡</button>
    </div>
    <hr style="background-color: #fff" />
    <router-view></router-view>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  async mounted() {},
  setup() {
    const router = useRouter();

    const handleJump = (item) => {
      switch (item) {
        case 1:
          router.push('/select');
          break;
        case 2:
          router.push('/up-en-ex');
          break;
        case 3:
          router.push('/draw-rect');
          break;
        case 4:
          router.push('/layout-concepts');
          break;
        case 5:
          router.push('/doughnut-chart');
          break;
        case 6:
          router.push('/bar-chart');
          break;
        case 7:
          router.push('/bar-chart-transition');
      }
    };

    return {
      handleJump
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 1920px;
  height: 1080px;
  overflow: auto;
  background-color: #000312;
  margin: 0 auto;
  color: #fff;
  &::-webkit-scrollbar {
    display: none;
  }
  .btn-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    button {
      margin-right: 24px;
    }
  }
}
</style>

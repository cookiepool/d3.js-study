<template>
  <div id="bar" class="echarts-bar"></div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'EchartsBar',
  setup() {
    onMounted(() => {
      console.log('------------------------------');
    });

    const drawBar = () => {
      let bar = echart.init(document.getElementById('bar'), null, {
        render: 'svg'
      });

      let options = {
        title: {
          id: 'bar',
          show: true,
          text: 'Echarts 柱状图展示',
          subtext: 'Echarts Show'
        }
      };
    };
  }
});
</script>

<style lang="scss">
.echarts-bar {
  width: 1000px;
  height: 500px;
}
</style>

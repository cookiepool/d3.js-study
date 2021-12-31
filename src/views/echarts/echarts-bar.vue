<template>
  <div id="eBar" class="echarts-bar"></div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';

const data = [
  { name: '<5', value: 1000 },
  { name: '5-9', value: 1500 },
  { name: '10-14', value: 2001 },
  { name: '15-19', value: 4481 },
  { name: '20-24', value: 4232 },
  { name: '25-29', value: 8010 },
  { name: '30-34', value: 3639 },
  { name: '35-39', value: 5782 },
  { name: '40-44', value: 6128 },
  { name: '45-49', value: 2137 },
  { name: '50-54', value: 5490 },
  { name: '55-59', value: 1947 },
  { name: '60-64', value: 5681 },
  { name: '65-69', value: 7446 },
  { name: '70-74', value: 7721 },
  { name: '75-79', value: 7012 },
  { name: '80-84', value: 5429 },
  { name: '≥85', value: 9852 }
];
let X = [];
let Y = [];
data.forEach((item) => {
  X.push(item.name);
  Y.push(item.value);
});
console.log(X, Y);

export default defineComponent({
  name: 'EchartsBar',
  setup() {
    const drawBar = () => {
      let bar = echarts.init(document.getElementById('eBar'), null, {
        renderer: 'svg'
      });

      let options = {
        // 配置标题
        title: {
          id: 'bar',
          show: true,
          text: 'Echarts 柱状图展示',
          subtext: 'Echarts Show'
        },
        // 配置图例图标
        legend: {
          show: true,
          data: [{ name: '2020' }]
        },
        // 配置提示框
        tooltip: {
          show: true
        },
        xAxis: {
          type: 'category',
          data: X
        },
        yAxis: {},
        series: [
          {
            name: '2020',
            type: 'bar',
            data: Y
          }
        ]
      };

      bar.setOption(options);
    };

    onMounted(() => {
      console.log('---------------Echarts-Draw-Bar---------------');
      drawBar();
    });
  }
});
</script>

<style lang="scss">
.echarts-bar {
  width: 1000px;
  height: 500px;
  background-color: #fff;
}
</style>

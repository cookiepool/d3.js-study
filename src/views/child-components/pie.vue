<template>
  <div class="svg">
    <svg
      id="pie"
      width="1000"
      height="500"
      style="background-color: #fff"
    ></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
const data = [
  { name: '<5', value: 19912018 },
  { name: '5-9', value: 20501982 },
  { name: '10-14', value: 20679786 },
  { name: '15-19', value: 21354481 },
  { name: '20-24', value: 22604232 },
  { name: '25-29', value: 21698010 },
  { name: '30-34', value: 21183639 },
  { name: '35-39', value: 19855782 },
  { name: '40-44', value: 20796128 },
  { name: '45-49', value: 21370368 },
  { name: '50-54', value: 22525490 },
  { name: '55-59', value: 21001947 },
  { name: '60-64', value: 18415681 },
  { name: '65-69', value: 14547446 },
  { name: '70-74', value: 10587721 },
  { name: '75-79', value: 7730129 },
  { name: '80-84', value: 5811429 },
  { name: '≥85', value: 5938752 }
];

export default {
  name: 'Select',
  async mounted() {
    this.drawPie();
  },
  setup() {
    const drawPie = () => {
      // 处理数据
      // 取出名字数据
      let N = d3.map(data, (item) => item.name);
      console.log(N);
      // 取出数值
      let V = d3.map(data, (item) => item.value);
      console.log(V);
      // 范围值，并且过滤掉value不是number类型的值
      let R = d3.range(N.length).filter((i) => !isNaN(V[i]));
      console.log(R);
      // 定义颜色
      let colorDomain = N;
      let colorRange = d3.schemeSpectral[10];
      console.log(colorRange);
      let colorScale = d3.scaleOrdinal(colorDomain, colorRange);
      console.log(colorScale);
      // 生成标题
      const formatValue = d3.format(','); // 数字千分符
      let title = (i) => `${N[i]}\n${formatValue(V[i])}`;

      // 构建饼图
      const innerRadius = 500 / 3; // 画布高度的1/3
      const outerRadius = 500 / 2; // 画布高度的一半
      const labelRadius = (innerRadius + outerRadius) / 2;
      // 饼图数据
      const pieOrigin = d3
        .pie()
        .padAngle(1 / outerRadius)
        .sort(null)
        .value((i) => V[i])(R);
      console.log(pieOrigin);
      // 弧度数据
      const arcOrigin = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
      // 鼠标悬浮放大弧度数据
      const arcHoverOrigin = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius + 20);
      // 文本标签的弧度数据
      const labelArcOrigin = d3
        .arc()
        .innerRadius(labelRadius)
        .outerRadius(labelRadius);

      // 开始绘图
      let g = d3
        .select('#pie')
        .append('g')
        .attr('transform', 'translate(500, 250)');
      // 绘制文本
      g.selectAll('text')
        .data(pieOrigin)
        .join('text')
        .attr('dx', '-10')
        .text((item) => N[item.data]);
      // 绘制环形图
      let paths = g.selectAll('path').data(pieOrigin).join('path');

      // 填充数据
      paths
        .attr('fill', (item) => colorScale(N[item.data])) // 前面颜色的比例尺的domian参数使用的name，所以这儿也要取name
        .attr('d', arcOrigin)
        .append('title')
        .text((item) => title(item.data)); // 当鼠标悬浮在饼上时可以展示一个悬浮提示。

      // 绑定事件
      paths.on('mouseover', function (e) {
        console.log(this);
        // 添加过渡和新的值
        d3.select(this)
          .transition()
          .duration(200)
          .delay(0)
          .attr('fill-opacity', '0.6')
          .attr('d', arcHoverOrigin);
      });
      paths.on('mouseout', function (e) {
        d3.select(this)
          .transition()
          .duration(200)
          .delay(0)
          .attr('fill-opacity', '1')
          .attr('d', arcOrigin);
      });
    };

    return {
      drawPie
    };
  }
};
</script>

<style lang="scss" scoped>
.svg {
  font-size: 42px;
  color: #fff;
}
</style>

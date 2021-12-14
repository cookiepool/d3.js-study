<template>
  <div class="svg">
    <svg id="svgPie" class="svg-histogram" width="1920" height="400"></svg>

    <svg width="10rem" height="5rem" style="background-color: #fff">
      <rect width="3rem" height="1rem" fill="#008d46" />
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'Select',
  async mounted() {
    this.drawPie();
  },
  setup() {
    const drawPie = () => {
      let marge = { top: 60, bottom: 60, left: 60, right: 60 };
      let svg = d3.select('#svgPie');
      let width = svg.attr('width');
      let height = svg.attr('height');
      let g = svg
        .append('g')
        .attr('transform', `translate(${marge.top}, ${marge.left})`);

      let dataset = [30, 10, 43, 55, 8];

      console.log(d3.schemeCategory10);
      // 定义线性颜色
      let colorScale = d3
        .scaleOrdinal()
        .domain(d3.range(dataset.length))
        .range(d3.schemeCategory10);
      // 新建一个饼状图
      let pie = d3.pie();
      // 新建一个弧形生成器
      let arcGenerator = d3.arc().innerRadius(0).outerRadius(100);
      // 原始数据转换成可以绘制饼状图的数据
      let pieData = pie(dataset);
      console.log(pieData);
      // 新建绘制区域
      let gs = g
        .selectAll('g')
        .data(pieData)
        .enter()
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
      // 绘制扇形
      gs.append('path')
        .attr('d', (item) => {
          return arcGenerator(item);
        })
        .attr('fill', (item, idx) => {
          return colorScale(idx);
        });
      // 绘制文本
      gs.append('text')
        .attr('transform', function (d) {
          //位置设在中心处
          return 'translate(' + arcGenerator.centroid(d) + ')';
        })
        .attr('text-anchor', 'middle')
        .text(function (d) {
          return d.data;
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
  .svg-demo {
    width: 100%;
    height: 300px;
  }
}
</style>

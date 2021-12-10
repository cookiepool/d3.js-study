<template>
  <div class="svg">
    <svg id="svgDemo" class="svg-demo"></svg>

    <svg
      id="svgHistogram"
      class="svg-histogram"
      width="1920"
      height="400"
    ></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'Select',
  async mounted() {
    this.drawSimpleCharts();
    this.drawHistogram();
  },
  setup() {
    const drawSimpleCharts = () => {
      let marge = { top: 60, bottom: 60, left: 60, right: 60 }; //设置边距
      let dataset = [1.5, 2.1, 1.7, 1.3, 0.9]; //数据（表示矩形的宽度）
      let svgInstance = d3.select('#svgDemo'); // 获取svg元素

      // 定义比例尺
      let scaleLinear = d3.scaleLinear().domain([0, 3]).range([0, 300]);

      let g = svgInstance
        .append('g') //定义一个用来装整个图表的一个分组，并设置他的位置
        .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');

      let rectHeight = 30; //设置每一个矩形的高度
      let a = g
        .selectAll('rect')
        .data(dataset) // dataset里面有5个数据，根据enter()不足补足的原则，这儿会补足5个react元素
        .enter()
        .append('rect')
        .attr('x', 20) //设置左上点的x
        .attr('y', function (d, i) {
          //设置左上点的y
          return i * rectHeight;
        })
        .attr('width', function (d) {
          //设置宽
          return scaleLinear(d);
        })
        .attr('height', rectHeight - 5) //设置长
        .attr('fill', 'red'); //颜色填充
      a.on('mouseover', function (e) {
        console.log('mouseover');
        console.log(this);
      });
      // 增加一个X轴
      // 比例尺
      let xScale = d3.scaleLinear().domain([0, 3]).range([0, 300]);
      // 定义坐标轴
      let xAxis = d3.axisBottom(xScale).ticks(7);
      g.append('g')
        .attr(
          'transform',
          'translate(' + 20 + ',' + dataset.length * rectHeight + ')'
        )
        .call(xAxis);
    };

    const drawHistogram = () => {
      let marge = { top: 60, bottom: 60, left: 60, right: 60 };
      let svg = d3.select('#svgHistogram'); //得到SVG画布
      let width = svg.attr('width'); //得到画布的宽
      let height = svg.attr('height'); //得到画布的长
      let g = svg
        .append('g')
        .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');
      console.log(g);

      let dataset = [10, 20, 30, 23, 13, 40, 27, 35, 20];

      let xScale = d3
        .scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, width - marge.left - marge.right]);
      // let xAxis = d3.axisBottom(xScale);

      let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([height - marge.top - marge.bottom, 0]);
      // let yAxis = d3.axisLeft(yScale);

      let gs = g.selectAll('rect').data(dataset).enter().append('g');

      let rectPadding = 20;

      // 绘制矩形
      gs.append('rect')
        .attr('x', (item, idx) => {
          return xScale(idx) + rectPadding / 2;
        })
        .attr('y', (item) => {
          return yScale(yScale.domain()[0]);
        })
        .attr('width', () => {
          return xScale.step() - rectPadding;
        })
        .attr('fill', '#6CAE75')
        // 增加动画效果
        .transition()
        .duration(800)
        .delay((item, idx) => {
          // return idx * 200;
          return 0;
        })
        .attr('height', 0)
        .attr('y', (item) => {
          return yScale(item);
        })
        .attr('height', (item) => {
          return height - marge.top - marge.bottom - yScale(item);
        });

      gs.on('mouseover', (e) => {
        console.log('mouse');
        console.log(this);
      });

      // 绘制文字
      gs.append('text')
        .attr('x', (item, idx) => {
          return xScale(idx) + rectPadding / 2;
        })
        .attr('y', () => {
          return yScale(yScale.domain()[0]);
        })
        // dx dy表示设置偏移量
        .attr('dx', () => {
          return (xScale.step() - rectPadding) / 2;
        })
        .attr('dy', () => {
          return -10;
        })
        .attr('transform', 'translate(-10, 0)')
        .text((item) => {
          return item;
        })
        .style('fill', 'white')
        .transition()
        .duration(800)
        .delay((item, idx) => {
          // return idx * 200;
          return 0;
        })
        .attr('y', (item) => {
          return yScale(item);
        });
    };

    return {
      drawSimpleCharts,
      drawHistogram
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
  // .svg-histogram {
  //   width: 100%;
  //   height: 400px;
  // }
}
</style>

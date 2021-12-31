/****柱状图，参考Demo：https://observablehq.com/@d3/bar-chart***/
<template>
  <div class="svg">
    <svg
      id="bar"
      width="1000"
      height="500"
      style="background-color: #fff"
    ></svg>
  </div>

  <div class="echarts-bar-wraper">
    <echarts-bar></echarts-bar>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { onMounted } from 'vue';

import EchartsBar from '@/views/echarts/echarts-bar';

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

export default {
  name: 'Bar',
  components: {
    EchartsBar
  },
  setup() {
    const drawBar = () => {
      // 定义边距
      const marge = {
        left: 50,
        top: 30,
        right: 50,
        bottom: 30
      };
      // 处理数据
      const X = d3.map(data, (d) => d.name);
      const Y = d3.map(data, (d) => d.value);

      let xDomain = X;
      let yDomain = [0, d3.max(Y)];

      let I = d3.range(X.length);

      // 处理X轴和Y轴的数据
      let xScale = d3
        .scaleBand()
        .domain(xDomain)
        .rangeRound([marge.left, 1000 - marge.right])
        .paddingOuter(0)
        .paddingInner(0.2);
      let yScale = d3
        .scaleLinear()
        .domain(yDomain)
        .range([500 - marge.bottom, marge.top]);

      // 建立坐标轴
      let xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
      let yAxis = d3.axisLeft(yScale).ticks(10);
      // 生成标题
      const formatValue = d3.format(','); // 数字千分符
      // let title = (i) => `${X[i]}\n${formatValue(Y[i])}`;
      let title = (i) => `${formatValue(Y[i])}`;
      // 定义渐变
      let linearGradient = d3
        .select('#bar')
        .append('defs')
        .append('linearGradient')
        .attr('id', 'myLinearGradient')
        .attr('x1', '50%')
        .attr('y1', '0%')
        .attr('x2', '50%')
        .attr('y2', '100%');
      linearGradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#8BEDFF');
      linearGradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#0F81FF');
      // 绘制柱状图
      let rectSets = d3
        .select('#bar')
        .append('g')
        .selectAll('rect')
        .data(I)
        .join('rect')
        .attr('fill', 'url(#myLinearGradient)')
        .attr('x', (i) => xScale(X[i]))
        .attr('y', yScale(0))
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .attr('style', 'cursor:pointer');

      // 增加加载时动画效果
      rectSets
        .transition()
        .duration(800)
        .delay(function (d, i) {
          return i * 200;
        })
        .ease(d3.easeLinear)
        .on('end', function (d, i) {
          // console.log(d);
        })
        .attr('y', (i) => yScale(Y[i]))
        .attr('height', (i) => yScale(0) - yScale(Y[i]));

      // 增加悬浮文本提示（一般提示）
      // rectSets.append('title').text(title);
      // 自定义提示（自定义ToolTip）
      let toolTips = d3
        .select('body')
        .append('div')
        .attr('class', 'bar-tooltips');
      toolTips.append('p').attr('class', 'title');
      toolTips
        .append('div')
        .attr('class', 'content')
        .call((d) => d.append('span').attr('class', 'point'))
        .call((d) => d.append('span').attr('class', 'detail'));

      // 增加悬浮效果
      rectSets
        .on('mouseover', function (e, d) {
          console.log(e);
          console.log(d);
          d3.select(this)
            .transition()
            .duration(200)
            .delay(0)
            .attr('opacity', '0.7');

          // Tooltips悬浮提示
          toolTips.select('.title').text(X[d]);
          toolTips.select('.detail').text(title(d));
          toolTips
            .style('visibility', 'visible')
            .style('opacity', '1')
            .style('transform', `translate(${e.clientX}px, ${e.clientY}px)`);
          // .style('left', `${e.clientX}px`)
          // .style('top', `${e.clientY}px`);
        })
        .on('mousemove', function (e) {
          toolTips.style(
            'transform',
            `translate(${e.clientX}px, ${e.clientY}px)`
          );
          // .style('left', `${e.clientX}px`)
          // .style('top', `${e.clientY}px`);
        });
      rectSets.on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .delay(0)
          .attr('opacity', '1');

        toolTips.style('visibility', 'hidden').style('opacity', '0');
      });

      /***
       * 绘制坐标轴
       * ***/
      // 添加x轴
      d3.select('#bar')
        .append('g')
        .attr('transform', `translate(0, ${500 - marge.bottom})`)
        .call(xAxis)
        .attr('style', 'color: #7776BC;font-size:12px');
      // 添加y轴
      d3.select('#bar')
        .append('g')
        .attr('transform', `translate(${marge.left}, 0)`)
        .call(yAxis)
        .attr('style', 'color: #7776BC;font-size:12px');
    };

    onMounted(() => {
      console.log('+++++++++++D3-Drwa-Bar++++++++++++');
      drawBar();
    });
  }
};
</script>

<style lang="scss">
.bar-tooltips {
  box-sizing: border-box;
  position: absolute;
  display: block;
  border-style: solid;
  white-space: nowrap;
  z-index: 9999999;
  box-shadow: rgb(0 0 0 / 20%) 1px 2px 10px;
  transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.2s,
    visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0.2s,
    transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s,
    left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s,
    top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
  background-color: rgb(255, 255, 255);
  border-width: 1px;
  border-radius: 4px;
  color: rgb(102, 102, 102);
  font: 14px / 21px 'Microsoft YaHei';
  padding: 10px;
  top: 0px;
  left: 0px;
  border-color: rgb(255, 255, 255);
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  .title {
    font-size: 16px;
    color: #666;
    font-weight: 400;
    line-height: 1;
  }
  .content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
  }
  .point {
    margin-right: 4px;
    border-radius: 10px;
    width: 10px;
    height: 10px;
    background-color: #5470c6;
  }
  .detail {
    margin-left: 10px;
    font-size: 14px;
    color: #666;
    font-weight: 900;
  }
}
</style>

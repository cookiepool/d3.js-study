<template>
  <div class="select">
    <p id="text">Hello World</p>

    <p class="hello">Hello D3.js!!!</p>
    <p class="hello">Hello D3.js!!!</p>
    <p class="hello">Hello D3.js!!!</p>

    <div class="fruits"></div>

    <div class="num"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import data from '../test.json';
export default {
  name: 'Select',
  async mounted() {
    d3.select('#text').style('color', 'red');

    d3.selectAll('.hello').style('color', 'blue');

    d3.select('.fruits')
      .selectAll('p')
      .data(data.data)
      .join('p')
      .text((item) => item);

    d3.select('.num')
      .selectAll('p')
      .data(data.data)
      .enter()
      .append('p')
      .text((item) => item);
  },
  setup() {}
};
</script>

<style lang="scss" scoped>
.select {
  font-size: 42px;
}
</style>

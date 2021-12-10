<template>
  <div class="select">
    <ul id="list">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <ul id="enter">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <ul id="exit">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'Select',
  async mounted() {
    d3.select('#list')
      .selectAll('li')
      .data([1, 2, 3, 4])
      .text((item) => {
        return item;
      });

    d3.select('#enter')
      .selectAll('li')
      .data([1, 2, 3, 4, 5])
      .text((item) => {
        return item;
      })
      .enter()
      .append('li')
      .text((item) => {
        return item;
      });

    d3.select('#exit')
      .selectAll('li')
      .data([1, 2, 3, 4, 5])
      .text((item) => {
        return item;
      })
      .exit()
      .remove('li')
      .text((item) => {
        return item;
      });
  },
  setup() {}
};
</script>

<style lang="scss" scoped>
.select {
  font-size: 42px;
  color: #fff;
}
</style>

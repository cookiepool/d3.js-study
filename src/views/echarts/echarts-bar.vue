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
  { name: '≥85', value: 10000 }
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
        renderer: 'canvas'
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
          show: true,
          trigger: 'axis', // 参数有：item axis none
          axisPointer: {
            // 设置坐标轴指示器，参数：line shadow none cross
            type: 'cross'
          },
          // 是否显示提示框浮层，默认显示。只需tooltip触发事件或显示axisPointer而不需要显示内容时可配置该项为false。
          showContent: true,
          // 是否永远显示提示框内容，默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容。
          alwaysShowContent: false,
          // 参数：mousemove click none。none的时候可以通过API action 去触发
          triggerOn: 'mousemove|click',
          // 浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
          showDelay: 0,
          // 浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效。
          hideDelay: 1000,
          // 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
          // 这个最好不要结合mousemove使用，你会发现你很难把鼠标移到提示浮层的框里面。
          enterable: true,
          // 浮层的渲染模式，默认以 'html 即额外的 DOM 节点展示 tooltip；此外还可以设置为 'richText' 表示以富文本的形式渲染，
          // 渲染的结果在图表对应的 Canvas 中（目前 SVG 尚未支持富文本），这对于一些没有 DOM 的环境（如微信小程序）有更好的支持。
          renderMode: 'html',
          // 是否将 tooltip 框限制在图表的区域内。
          // 当图表外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
          confine: true,
          // 是否将 tooltip 的 DOM 节点添加为 HTML 的 <body> 的子节点。只有当 renderMode 为 'html' 是有意义的。
          appendToBody: false,
          // 指定 tooltip 的 DOM 节点的 CSS 类。（只在 html 模式下生效）。
          className: '',
          // 提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
          transitionDuration: 0.6,
          // 自定义提示框浮层的位置，string array function
          position: '',
          // 自定义提示框浮层的内容，string function
          formatter: '',
          // 额外附加到浮层的 css 样式。
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
        },
        xAxis: {
          // 设置类型
          type: 'category',
          // 坐标轴名称
          name: '年龄分布',
          // 坐标轴名称显示位置，start middle center end
          nameLocation: 'end',
          // 设置数据
          data: X,
          show: true,
          // x 轴所在的 grid 的索引，默认位于第一个 grid。如果你的grid配置了多个，则需要知道index；
          // 参考这个示例：https://echarts.apache.org/examples/zh/editor.html?c=scatter-anscombe-quartet
          gridIndex: 0,
          // x轴的位置，参数：top bottom
          position: 'bottom',
          // x轴相对于默认位置的偏移，在相同的 position 上有多个 X 轴的时候有用。
          offset: 0,
          // 用于制作动态排序柱状图。设为 true 时，表示 X 轴开启实时排序效果，仅当 X 轴的 type 是 'value' 时有效。
          realtimeSort: false,
          // 动态排序柱状图用于排序的系列 id。目前只支持一个系列的柱状图排序效果，所以这个值只能取 0。
          // 仅当 X 轴 realtimeSort 为 true 并且 type 是 'value' 时有效。
          sortSeriesIndex: 0,
          // 是否是反向坐标轴。
          inverse: false,
          // 针对类目轴，设置为false的话，轴上的点在柱状图的中间，设置为true，柱状图在轴上的点与点之间。
          boundaryGap: true,
          // 坐标轴刻度最小值。
          min: 0,
          // 坐标轴刻度最大值。
          max: 17,
          // 只在数值轴中（type: 'value'）有效。
          scale: false,
          // 在类目轴中无效。
          splitNumber: 5,
          // 以下三个参数用来设置坐标轴分割间隔。只在数值轴或时间轴中（type: 'value' 或 'time'）有效。
          minInterval: 0,
          maxInterval: 0,
          interval: 0,
          // 对数轴的底数，只在对数轴中（type: 'log'）有效。
          logBase: 10,
          // 坐标轴是否是静态无法交互。
          slient: false,
          // 坐标轴的标签是否响应和触发鼠标事件，默认不响应。
          triggerEvent: true,
          // 坐标轴轴线相关设置
          axisLine: {
            show: true,
            // X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效。
            onZero: false,
            // 轴线两边的箭头。可以是字符串，表示两端使用同样的箭头；或者长度为 2 的字符串数组，分别表示两端的箭头。
            // 默认不显示箭头，即 'none'。两端都显示箭头可以设置为 'arrow'，只在末端显示箭头可以设置为 ['none', 'arrow']。
            symbol: ['none', 'arrow'],
            // 轴线两边的箭头的大小，第一个数字表示宽度（垂直坐标轴方向），第二个数字表示高度（平行坐标轴方向）。
            symbolSize: [10, 15],
            // 轴线两边的箭头的偏移，如果是数组，第一个数字表示起始箭头的偏移，第二个数字表示末端箭头的偏移；
            // 如果是数字，表示这两个箭头使用同样的偏移。
            symbolOffset: [0, 12]
          },
          // 坐标轴刻度相关设置。
          axisTick: {
            show: true,
            // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。
            alignWithLabel: true,
            // 坐标轴刻度的显示间隔，在类目轴中有效。默认同 axisLabel.interval 一样。
            interval: 'auto',
            // 坐标轴刻度是否朝内，默认朝外。
            inside: false,
            // 坐标轴刻度的长度。
            length: 5
          },
          // 坐标轴次刻度线相关设置。次刻度线无法在类目轴（type: 'category'）中使用。
          minorTick: {},
          // 坐标轴刻度标签（就X轴下面显示的类目名称）的相关设置。
          axisLabel: {
            show: true,
            // 坐标轴刻度标签的显示间隔，在类目轴中有效。
            interval: 'auto',
            // 刻度标签是否朝内，默认朝外。
            inside: false,
            // 刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。
            rotate: 45,
            // 刻度标签与轴线之间的距离。
            margin: 10,
            // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
            formatter: '{value} 岁',
            // 是否显示最小 tick 的 label。可取值 true, false, null。默认自动判定（即如果标签重叠，不会显示最小 tick 的 label）。
            showMinLabel: false,
            // 是否显示最大 tick 的 label。可取值 true, false, null。默认自动判定（即如果标签重叠，不会显示最大 tick 的 label）。
            showMaxLabel: false,
            // 是否隐藏重叠的标签
            hideOverlap: false
          },
          // 坐标轴在 grid 区域中的分隔线。（就坐标轴刻度以上会绘制一条分割线）
          splitLine: {
            show: false,
            interval: 'auto'
          },
          // 坐标轴在 grid 区域中的次分隔线。次分割线会对齐次刻度线 minorTick
          minorSplitLine: {},
          // 坐标轴在 grid 区域中的分隔区域，默认不显示
          splitArea: {
            show: false
          },
          // 坐标轴指示器配置项。
          axisPointer: {},
          // X 轴所有图形的 zlevel 值。
          zLevel: 0,
          // X 轴组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
          z: 0
        },
        yAxis: {
          show: true,
          // x 轴所在的 grid 的索引，默认位于第一个 grid。如果你的grid配置了多个，则需要知道index；
          // 参考这个示例：https://echarts.apache.org/examples/zh/editor.html?c=scatter-anscombe-quartet
          gridIndex: 0,
          // 坐标轴名称
          name: '数值',
          // 坐标轴名称显示位置，start middle center end
          nameLocation: 'end',
          position: 'bottom',
          // y轴相对于默认位置的偏移，在相同的 position 上有多个 y 轴的时候有用。
          offset: 0,
          // 用于制作动态排序柱状图。设为 true 时，表示 y 轴开启实时排序效果，仅当 X 轴的 type 是 'value' 时有效。
          realtimeSort: false,
          // 动态排序柱状图用于排序的系列 id。目前只支持一个系列的柱状图排序效果，所以这个值只能取 0。
          // 仅当 y 轴 realtimeSort 为 true 并且 type 是 'value' 时有效。
          sortSeriesIndex: 0,
          // 坐标轴在 grid 区域中的分隔线。（就坐标轴刻度以上会绘制一条分割线）
          splitLine: {
            show: true,
            interval: 'auto'
          },
          axisLine: {
            show: true,
            symbol: ['none', 'arrow'],
            symbolOffset: [0, 12]
          }
        },
        series: [
          {
            name: '2020',
            type: 'bar',
            data: Y
          }
        ],
        // 整个画布背景色
        backgroundColor: '#C7D9B7',
        // 全局文本样式
        textStyle: {},
        // 是否开启动画
        animation: true,
        animationThreshold: 2000,
        animationDuration: 1000,
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return idx * 100;
        },
        animationDurationUpdate: 1000
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

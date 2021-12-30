// import pxtorem from "postcss-pxtorem";

module.exports = () => {
  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue: 100,
        propList: ['*'],
        selectorBlackList: ['echarts']
      }
    }
  };
};

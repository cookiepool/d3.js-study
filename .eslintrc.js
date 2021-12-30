module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    echart: 'readonly'
  },
  rules: {
    // prettier报错规则
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // 使用单引号
        arrowParens: 'always', // 箭头函数始终包含圆括号
        endOfLine: 'auto', // 自动识别换行是LF还是CRLF，默认prettier是LF
        trailingComma: 'none' // 最后不需要逗号
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 0
  }
};

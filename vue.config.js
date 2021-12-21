module.exports = {
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  css: { extract: false },
  chainWebpack: (conf) => {
    if (process.env.NODE_ENV === 'production') {
      conf.externals({
        vue: 'vue',
        'element-plus': 'element-plus',
      });
    }
  },
};

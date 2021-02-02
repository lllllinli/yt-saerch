const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  webpack: {
    plugins: [
      // node_module 分析工具
      new BundleAnalyzerPlugin(),
    ]
  }
};
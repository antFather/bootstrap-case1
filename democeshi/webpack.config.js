//引入node 路径模块
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('css/main.css');
const extractLESS = new ExtractTextPlugin('css/bootstrap.css');

module.exports = {
  //入口文件的配置  
  entry: './src/index.js',
  //输出文件
  output: {
     filename: 'js/main.js',
    //输出路径配置
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
     contentBase: './dist'
   }, 
  //模块
  module: {
     //规则
     rules: [
     {
        test: /\.css$/,
        use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract([ 'css-loader', 'less-loader' ])
      },
      {
         test: /\.(png|jpg|gif)$/,
         loader: 'url-loader',
         options: {
            outputPath: 'css/images/'
          }  
       },
       {
         test: /\.(png|jpg|gif)$/,
         loader: 'image-webpack-loader' 
       },
      {
          test: /.woff|.woff2|.svg|.eot|.ttf/,
          loader: 'file-loader',
          options:{
              //公共访问路径.如果写错,请求图片会报404错误.可以直接打开dist目录中的html文件.看路径是怎样的,再决定如何修改
              publicPath: '../fonts/',
              //输出目录(重要),如果写了完整的输出目录就不用配置name中的[path],否则重复配置
              outputPath: 'fonts/',
              //name包含三个配置.[path]路径 [hash]哈希,一般作为图片名 ,[ext]文件后缀
              name:'[hash].[ext]'
              //bootstrap.css 调用字体图标的路径在less文件中配置.
              //variables.less 设置  @icon-font-path:          "../fonts/";
          }
       }
     ]
   },
  plugins: [
    extractCSS,
    extractLESS
  ]
};


const path = require('path'); //引入node 的路径
//const HtmlWebpackPlugin = require('html-webpack-plugin'); //html扩展包
//const CleanWebpackPlugin = require('clean-webpack-plugin'); //清理dist文件夹插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Create multiple instances
const extractCSS = new ExtractTextPlugin('css/main.css');
const extractLESS = new ExtractTextPlugin('css/bootstrap.css');
module.exports = {

    entry: './src/index.js', // 入口文件配置，理解为菜单，需要的东西

    // entry: { //两个入口
    //     app: './src/index.js',
    //     print: './src/print.js'
    // },

    devtool: 'inline-source-map', //资源地图

    devServer: {
        contentBase: './dist'
    },

    output: { //输出文件配置

        filename: 'js/main.js', //输出文件的名字

        //filename: '[name].bundle.js', //name对应的是入口文件

        path: path.resolve(__dirname, 'dist') //输出路径， 输出到哪儿
    },

    module: { //模块

        rules: [ //规则

             {
                 test: /\.css$/,
                 use: extractCSS.extract(['css-loader', 'postcss-loader'])
             }, 
             {
                 test: /\.less$/i,
                 use: extractLESS.extract(['css-loader', 'less-loader'])
             },
             {
                 test: /\.(png|jpg|gif)$/,
                 loader: 'url-loader',
                 options: {
                     outputPath: 'css/image/'
                 }
             }, 
            //  {
            //      test: /\.(png|jpg|gif)$/,
            //      loader: 'image-webpack-loader'
            //  },

            // {
            //     test: /\.css$/, //匹配以 .css 结尾的文件

            //     use: [ //使用什么加载器

            //         'style-loader',
            //         'css-loader',
            //         'postcss-loader'
            //     ]
            // },
            // {
            //     test: /\.less$/,
            //     use: [{
            //         loader: 'style-loader' // creates style nodes from JS strings
            //     }, {
            //         loader: 'css-loader' // translates CSS into CommonJS
            //     }, {
            //         loader: 'less-loader' // compiles Less to CSS
            //     }, {
            //         loader: 'postcss-loader'
            //     }]
            // },
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/,
            //     use: [
            //         'file-loader'
            //     ]
            // },
            // {
            //     test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     use: [
            //         'url-loader?limit=10000&mimetype=application/font-woff',
            //     ]
            // },
            // {
            //     test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     use: [
            //         'file-loader'
            //     ]
            // },

            {
                test: /.woff|.woff2|.svg|.eot|.ttf/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    //公共访问路径.如果写错,请求图片会报404错误.可以直接打开dist目录中的html文件.看路径是怎样的,再决定如何修改
                    publicPath: '../fonts/',
                    //输出目录(重要),如果写了完整的输出目录就不用配置name中的[path],否则重复配置
                    outputPath: 'fonts/',
                    //name包含三个配置.[path]路径 [hash]哈希,一般作为图片名 ,[ext]文件后缀
                    name: '[hash].[ext]'
                    //bootstrap.css 调用字体图标的路径在less文件中配置.
                    //variables.less 设置  @icon-font-path:          "../fonts/";
                }
            },

            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    plugins: [ //扩展插件，可有可无；
        //new CleanWebpackPlugin(['dist']), //清理dist文件夹，注意
        // new HtmlWebpackPlugin({
        //     title: '环境配置 下' //设置title，也可以设置其他标签，具体百度；
        // }),
        extractCSS,
        extractLESS
    ]
};
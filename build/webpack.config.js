// build/webpack.config.js
const path=require('path')
const webpack=require('webpack')
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports={
    mode:'development',// 指定打包模式
    entry:{ //配置入口文件
        main:["@babel/polyfill",path.resolve(__dirname,'../src/main.js')] //对应指定目录 可以修改
    },
    output:{//配置打包文件输出目录
        path:path.resolve(__dirname,'../dist'),//对应dist目录 可以修改
        filename:'js/[name].[hash:8].js', //生成的js文件名字 hash
        chunkFilename:'js/[name].[hash:8].js', //生成的chunk表--分包表
        publicPath:'./' //资源引用路径 --静态文件
    },
    devServer:{ //热更新配置
        hot:true,
        port:3000,
        contentBase:'./dist'
    },
    resolve: { // resolve功能 寻找模块所需要依赖的文件
        alias: { //配置文件别名把原来导入路径映射成一个新的导入路径
            vue$: 'vue/dist/vue.runtime.esm.js' 
        },
    },
    module:{
        rules:[ 
            {   //增加js语法转换文件编译规则
                test: /\.jsx?$/, //校验文件 可以使用正则匹配
                exclude: /node_modules/, //校验规则目录
                use:[
                    {
                        loader:'babel-loader' //转换loader
                    }
                ]
            },
            {   //增加less sass 转换css 规则
                test: /\.(scss|sass)$/,
                use:[
                    {
                        loader:'style-loader' //将css解析到html的style中
                    },
                    {
                        loader:'css-loader', //解析css文件
                        options:{
                            importLoaders:2 //+
                        }
                    },
                    {
                        loader:'sass-loader', //less sass 转换成 普通css
                        options:{
                            implementation:require('dart-sass')
                        }
                    },
                    {
                        loader:'postcss-loader' //配置css3自动添加前缀规则 +
                    }
                ]
            },
            {   //转换解析图片
                test:/\.(jpe?g|png|gif)$/i,
                use:[{
                        loader:'url-loader',
                        options:{
                            limit:4096,
                            fallback:{
                                loader:'file-loader',
                                options:{
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {   //转换解析音频
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use:[{
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {   //转换解析文件
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use:[{
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {   //配置解析vue文件
                test: /\.vue$/,
                use: [
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            },
                        }
                    }
                ]
              },
            {   //配置解析vue文件 支持jsx语法
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
        ]
    },
    plugins:[ //插件
        new VueLoaderPlugin(), //编译vue文件插件
        new HtmlWebpackPlugin({ 
            template:path.resolve(__dirname,'../public/index.html') //指定生成的文件依赖那一个html文件模板
        }),
        new webpack.NamedModulesPlugin(), //热更新插件
        new webpack.HotModuleReplacementPlugin(), //热更新插件
    ]
}
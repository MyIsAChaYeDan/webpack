// babel.config.js
module.exports={
    presets:[
        // "@babel/preset-env"
        ["@babel/preset-env",{
            "useBuiltIns":"usage", //按需加载polyfill 减少打包体积
            corejs: 3,
        }]
    ]
}
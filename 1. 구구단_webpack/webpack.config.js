const path = require('path');
const webpack = require('webpack');

module.exports = {
  name : 'GuGuDan',//name 은 안써도 됨
  mode : 'development',
  devtool : 'eval',

  resolve : {
    extensions : ['.js', '.jsx']
  },

  entry : {
    app : ['./client']
  },

  module : {
    rules : [{
      test : /\.jsx?/, 
      loader : 'babel-loader',
      options : { 
        presets : [
          ['@babel/preset-env', {  //preset-env : 옛날 브라우저들 자동으로 지원해줌
            targets : {
              browsers : ['> 5% in KR'], //원하는 브라우저에만 맞춰서 호환해주기
              //현재 버전 기준 역으로 거슬러69 버전, 70버전만 호환되게..
            }
          }],
          '@babel/preset-react',
        ]
      }
    }],
  },
  //plugins : 확장 프로그램
  plugins : [
    new webpack.LoaderOptionsPlugin({debug : true}),
  ],
  output : {
    path : path.join(__dirname, 'dist'),
    filename : 'app.js'
  },
}
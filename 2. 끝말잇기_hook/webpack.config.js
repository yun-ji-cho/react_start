const path = require('path'); //외우기 (노드에서 경로 쉽게 조작하도록 해주는것 가져오기)
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name : 'word-relay-setting',
  mode : 'development', //실서비스에서는 mode : 'production' 로 바꾼다.
  devtool : 'eval',//빠르게 하겠다는 의미

  resolve : {
    //확장자 쓰고 싶지 않다면!
    extensions : ['.js', '.jsx'] //알아서 client.js 나 client.jsx 가 있는지 확인을 한다.
  },

  //여기부터 중요!!!
  entry : {
    // app : ['./client.jsx', './WordRelay.jsx'] //다른파일이 불러오는 파일은 적어줄 필요가 없다. (client.jsx 에서 WordRelay.jsx를 불러오고 있음 웹팩에서 알아서 WordRelay.jsx 까지 불러와준다)
    app : ['./client'] 
  }, //입력

  module : {
    rules : [{
      test : /\.jsx?/, //jsx 나 js 파일에 babel-loader를 적용해서 최신이나 실험적인 문법들을 옛날 브라우저에서도 돌아가는 문법으로 바꿔주겠다
      loader : 'babel-loader',
      options : { //알아서 jsx 나 js 파일을 변환해줌
        presets : [
          ['@babel/preset-env', {  //preset-env : 옛날 브라우저들 자동으로 지원해줌
            targets : {
              browsers : ['> 5% in KR'], //원하는 브라우저에만 맞춰서 호환해주기
              //현재 버전 기준 역으로 거슬러69 버전, 70버전만 호환되게..
            }
          }],
          '@babel/preset-react',
        ],
        plugins : [ //babel-loader 에 플러그인 넣어주기 --> 핫리로드 기능 추가됨
          'react-refresh/babel',
        ],
      }
    }],
  }, //entry 에 있는 파일을 읽고 거기에 있는 모듈을 적용한 후 output에 뺀다.
  plugins : [
    new RefreshWebpackPlugin()
  ],
  output : {
    path : path.join(__dirname, 'dist'), //path.join 는 경로를 알아서 합쳐준다. __dirname 는 현재 폴더 경로를 가리킨다.(2. 끝말잇기) --> 즉, 현재 폴더 안에 'dist'를 자동으로 만들어줌
    filename : 'app.js', //원하는 것
    publicPath : '/dist/',
  }, //출력
  //프론트 앤드 개발을 위한 서버 : 
  devServer : {
    devMiddleware : {publicPath : '/dist'},
    static : {directory : path.resolve(__dirname)},
    hot : true,
  }
}
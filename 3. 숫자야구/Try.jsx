// const React = require('react');
// const { Component } = React;

// class Try extends Component {
//   render () {
//     const {tryInfo} = this.props;
//     return (
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//       </li>
//     )
//   }
// }

// module.exports = Try;


//PureComponent 이용하기
const React = require('react');
const { PureComponent } = React;

class Try extends PureComponent {
  render () {
    const {tryInfo} = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    )
  }
}

module.exports = Try;
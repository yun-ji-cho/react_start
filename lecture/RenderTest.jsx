import React,  {Component} from 'react';

class Test extends Component {
  state = {
    counter : 0,
  };
  shouldComponentUpdate(nextProps, nextState, nextContext){
    if(this.state.counter !== nextState.counter){ //현재의 값과 과거의 값이 다르면
      return true; //랜더링 해
    }
    return false; //렌더링 안 하는거
  }

  onclick = () => {
    this.setState({});
  };
  
  render() {
    console.log('렌더링', this.state);
    return (
    <div>
      <button onclick={this.onClick}>클릭</button>
    </div>
    )
  }
}

//노드의 모듈 시스템을 이용해서 npm에 설치했던 것을 불러올 수 있다.
import React,  {PureComponent} from 'react';

class Test extends PureComponent {
  state = {
    counter : 0,
    string : 'hello',
    number : 1,
    boolean : true,
    object : {},
    array : [],
  };

  onclick = () => {
    const array = this.state.array;
    array.push(1);
    this.setState({
      array : array, //이런 식으로 했을 때는 PureComponent가 바뀐것을 감지 하지 못한다.
    });
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

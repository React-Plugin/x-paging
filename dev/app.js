import React from 'react';
import ReactDOM from 'react-dom';
import Paging from '../src/index';
import '../src/_index';

var appElement = document.getElementById('example');
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  callback(v) {
    console.log('当前页码：',v)
  }
  render() {
    return (
      <div>
       <Paging total="60" pagesize="5" callback={this.callback.bind(this)}/>
      </div>
    )
  }
}
ReactDOM.render(<App />, appElement);
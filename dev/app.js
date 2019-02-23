import React from 'react';
import ReactDOM from 'react-dom';
import Paging from '../src/index';
import '../src/_index';

import en from '../src/local/en';
import local from 'x-i18n/lib/components/en';

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
       <Paging local={{...local.Paging,...en}} total="60" pagesize="5" current="2" callback={this.callback.bind(this)}/>
       <Paging total="60" pagesize="5" current="2" callback={this.callback.bind(this)}/>
      </div>
    )
  }
}
ReactDOM.render(<App />, appElement);
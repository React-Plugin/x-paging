/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2018-11-29 15:13:24
 * @LastEditTime: 2020-07-15 18:56:45
 * @github: https://github.com/tianxiangbing
 */
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
  callback(v,pagesize) {
    console.log('当前页码：',v,pagesize)
  }
  goFirst=()=>{
    let ps= document.getElementsByClassName('x-paging');
    ps[0].dispatchEvent(new Event('goFirst'))
  }
  render() {
    return (
      <div>
        <button onClick={this.goFirst}>到第一页</button>
       <Paging local={{...local.Paging,...en}} total={60} pagesize={5} current={1} callback={this.callback.bind(this)}/>
       <Paging pageSizeOptions={[10,20,40]} total={60} pagesize={5} current={2} callback={this.callback.bind(this)}/>
      </div>
    )
  }
}
ReactDOM.render(<App />, appElement);
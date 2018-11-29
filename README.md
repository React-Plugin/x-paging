# x-paging
react分页组件x-paging，它依赖于x-input组件，主要是页码限定为正整数.
# npm
npm install --save x-paging
# 使用方式
```
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
```
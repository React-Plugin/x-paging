# x-paging
react分页组件x-paging，它依赖于x-input组件，主要是页码限定为正整数.
# npm
    npm install --save x-paging
# 效果图
![x-paging](../examples/x-paging.png)
# 使用方式
```
  callback(v) {
    console.log('当前页码：',v)
  }
  render() {
    return (
      <div>
       <Paging total="60" pagesize="5" current="1" callback={this.callback.bind(this)}/>
      </div>
    )
  }
```

# API
## total
总条数
## pagesize
每一页条数
## current
当前页码，默认为1
## callback
翻页时的回调方法
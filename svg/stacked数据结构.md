```javascript
var data = [
      { month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400 },
      { month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400 },
      { month: new Date(2015, 2, 1), apples: 640, bananas: 960, cherries: 640, dates: 400 },
      { month: new Date(2015, 3, 1), apples: 320, bananas: 480, cherries: 640, dates: 400 }
    ]

    var stack = d3.stack()
      .keys(['apples', 'bananas', 'cherries', 'dates'])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone)

    var series = stack(data)
    console.log(series)
```

console的结果：

```javascript
[
  [[   0, 3840], [   0, 1600], [   0,  640], [   0,  320]], // index: 0,key: "apples" 
  [[3840, 5760], [1600, 3040], [ 640, 1600], [ 320,  800]], // index: 1,key: "bananas" 
  [[5760, 6720], [3040, 4000], [1600, 2240], [ 800, 1440]], // index: 2,key: "cherries" 
  [[6720, 7120], [4000, 4400], [2240, 2640], [1440, 1840]], // index: 3,key: "dates"
]



```

还有额外的数据信息需要打印出来查看。

理解：

1.series = stack(data) 原始数据data 会按照 key的每一项进行分组
.. 只能意会 需要自己去理解
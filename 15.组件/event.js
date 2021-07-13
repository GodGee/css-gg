export default class popEvent {
  constructor(option) {
    // 接受四个参数
    // 1.对象的this
    // 2.要监听的元素，不传则为对象的this
    // 3.要监听的事件，默认监听点击事件
    // 4.是否冒泡，默认冒泡
    this.eventObj = option.obj
    this.target = option.target || this.eventObj
    this.eventType = option.eventType || 'click'
    this.popup = option.popup || false
    this.bindEvent()
  }
  bindEvent() {
    let _this = this
    _this.target.addEventListener(_this.eventType, function (ev) {
      let target = ev.target
      let dataset, parent, num, b
      popup(target)
      function popup(obj) {
        if (obj === document) {
          return false
        }
        dataset = obj.dataset
        console.log('dataset: ', dataset) //自定义属性 data-
        num = Object.keys(dataset).length
        parent = obj.parentNode
        if (num < 1) {
          popup(parent)
          num = 0
        } else {
          for (b in dataset) {
            if (_this.eventObj.__proto__[b]) {
              //执行原型链对应的方法
              _this.eventObj.__proto__[b].call(_this.eventObj, { obj: obj, ev: ev, target: dataset[b], data: _this.eventObj })
            }
          }
          _this.popup && popup(parent)
        }
      }
    })
  }
}

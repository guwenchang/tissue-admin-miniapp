// components/deviceItem/deviceItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (e) {
      var myEventDetail = e.detail.value // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles: true
      } // 触发事件的选项
      this.triggerEvent('onclick', myEventDetail, myEventOption)
    }
  }
})

export default {
  name: 'AuthButton',
  props: {
    label: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'mini'
    },
    // type: {
    //   type: String,
    //   default: 'text'
    // },
    category: {
      type: String,
      default: 'operation'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    },
    accept: {
      type: String,
      default: null
    },
    mapping: {
      type: Object,
      default: null
    },
    data: Object
  },
  functional: true, // 开启函数化组件
  render: (h, ctx) => {
    const _this = ctx.parent // 获取 vue  this 实例
    // console.log(ctx);
    /**
     * 获取传入参数
     * category 非必填  button 类别  暂时两种 1 表格操作:operation ,2 Button 按钮: action  默认 operation ----- route 中不标明 视为默认值 operation
     * data  点击按钮时 需要得到的参数  比如 table 中的 当前行数据 row
     * mapping 非必填  但: 当列表中的操作选项 根据 某个字段 变化的话 必填 且 必须 注明 field: 字段名
     * label 当传入label 字段时 标识明确指定渲染该label 的按钮
     */
    const { category, data, mapping, label } = ctx.props
    let curBtns = []
    /**
     * 判断一个按钮(btn)是否存在与当前行(data) 的映射关系(mapping)中
     * @param {*} btn
     */
    const filter = btn => mapping ? mapping[data[mapping['field']]].includes(btn.label) : true
    const $store = _this.$store.getters['d2admin/auth/curBtns']
    if (!$store) return h('div')
    if (label) { // 指定label
      const __item = $store.find(btn => (btn.label === label) && filter(btn))
      __item && curBtns.push(__item)
    } else {
      /**
       * 拿到当前模块(页面) 所拥有按钮列表 过滤type属性 与 映射关系 返回需要显示的按钮列表
       */
      curBtns = $store.filter(btn => {
        if (category === 'operation') {
          return (btn.category === 'operation' || !btn.category) && filter(btn)
        } else if (!category) { // 未指定类别
          return !btn.category && filter(btn)
        }
        return (btn.category === category) && filter(btn)
      })
    }
    if (curBtns.length === 0) return h('div')
    const __aBtns = []
    /**
     * 循环最终显示的按钮列表
     * 并渲染到页面
     */
    curBtns.forEach(btn =>
      __aBtns.push(h('el-button', {
        props: {
          type: btn.type || 'text',
          icon: btn.icon ? `el-icon-${btn.icon}` : ''
        },
        style: {
          color: btn.color
        },
        on: {
          click: (e) => btn.handle && _this[btn.handle](data, e)
        }
      }, [btn.label])))
    return h('div', {}, [...__aBtns, ctx.children])
  }
}

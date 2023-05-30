# React受控与非受控组件

## 1.受控组件

### ## 在React中，表单元素的value被保存在组件内的state属性中，并且只能通过使用setState()来更新，state与setState结合起来。

### ## 表单元素的value由state绑定，state成为“唯一数据源”，渲染表单的React组件还控制用户输入过程中表单发生的操作。以这种方式控制取值的表单输入元素就是“受控组件”。

## 2.非受控组件

### ## 不在让表按数据由React组件管理，表单数据交由DOM节点来处理，称为“非受控组件”。

### ## 使用ref从DOM节点中获取表单数据。

### ## 在React中，defaultValue属性可以为表单元素赋予一个 初始值，但是不会去控制后续的更新。

- ###  `<input type="checkbox">` 和 `<input type="radio">` 支持 `defaultChecked`，

- ###  `<select>` 和 `<textarea>` 支持 `defaultValue`。

## <a src="https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/">关于受控与非受控组件的文章</a>


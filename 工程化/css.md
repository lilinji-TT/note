### CSS in JS

"CSS in JS" 是一种在 JavaScript 文件中编写 CSS 的模式，特别是在使用 JavaScript 框架（如 React）构建组件化应用时。这种方式允许开发者将样式与组件的逻辑和结构直接绑定在一起，从而实现更高的模块化和封装。

#### 特点:
- **局部作用域**：默认情况下，样式仅适用于定义它们的组件，解决了全局 CSS 带来的命名冲突问题。
- **动态样式**：可以根据组件的状态或属性动态改变样式。
- **依赖管理**：组件和它们的样式可以一起打包和分发，简化了依赖管理。
- **组件库共享**：便于在不同项目之间共享组件，因为样式与组件紧密绑定。

#### 示例:
在 React 应用中使用 CSS in JS 的一个例子：

```javascript
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
`;

function App() {
  return <Button primary>Click Me</Button>;
}
```

在这个例子中，我们使用了 `styled-components` 库来创建一个具有特定样式的 `Button` 组件，样式可以根据组件的属性动态改变。

### CSS 预编译

CSS 预编译是指使用一种特殊的编程语言编写样式，然后通过编译器转换为普通的 CSS。这些语言（如 Sass、LESS、Stylus）提供了 CSS 所缺乏的特性，如变量、混合（Mixins）、函数、条件语句和循环等。

#### 特点:
- **变量**：支持使用变量定义颜色、字体大小等，便于全局管理和修改。
- **嵌套规则**：允许嵌套 CSS 规则，使得结构更加清晰和紧凑。
- **混合**：可重用的代码块，可以在多个地方使用。
- **函数和运算**：进行颜色处理或数学计算等操作。
- **模块化**：可以分割成多个文件，便于维护和共享。

#### 示例:
使用 Sass 编写样式的一个例子：

```scss
$primary-color: blue;

.button {
  background-color: $primary-color;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
```

在这个例子中，`.button` 类使用了一个变量 `$primary-color`，并且有一个嵌套的 `:hover` 状态规则。

总结来说，"CSS in JS" 和 CSS 预编译都是现代前端开发中用于提高 CSS 编写效率和可维护性的技术。选择使用哪一种取决于项目的具体需求和团队的偏好。
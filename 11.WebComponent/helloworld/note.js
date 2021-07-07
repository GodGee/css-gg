得益于技术的发展，目前三大框架在构建工具（例如 webpack、vite...）的配合下都可以很好的实现组件化。例如 Vue，使用 *.vue 文件就可以把 template、script、style 写在一起，一个 *.vue 文件就是一个组件。

            <template>
                <div>
                    {{ msg }}
                </div>
            </template>

            <script>
            export default {
                data() {
                    return {
                        msg: 'Hello World!'
                    }
                }
            }
            </script>

            <style>
            body {
                font-size: 14px;
            }
            </style>
如果不使用框架和构建工具，还能实现组件化吗？

答案是可以的，组件化是前端未来的发展方向，Web Components 就是浏览器原生支持的组件化标准。使用 Web Components API，浏览器可以在不引入第三方代码的情况下实现组件化。

 
现在我们来创建一个 Web Components 按钮组件，点击它将会弹出一个消息 Hello World!。点击这可以看到 DEMO 效果。

Custom elements（自定义元素）

浏览器提供了一个 customElements.define() 方法，允许我们定义一个自定义元素和它的行为，然后在页面中使用。

class CustomButton extends HTMLElement {
    constructor() {
        // 必须首先调用 super方法 
        super()

        // 元素的功能代码写在这里
        const templateContent = document.getElementById('custom-button').content
        const shadowRoot = this.attachShadow({ mode: 'open' })

        shadowRoot.appendChild(templateContent.cloneNode(true))

        shadowRoot.querySelector('button').onclick = () => {
            alert('Hello World!')
        }
    }

    connectedCallback() {
        console.log('connected')
    }
}

customElements.define('custom-button', CustomButton)

上面的代码使用 customElements.define() 方法注册了一个新的元素，并向其传递了元素的名称 custom-button、指定元素功能的类 CustomButton。然后我们可以在页面中这样使用：

<custom-button></custom-button>
这个自定义元素继承自 HTMLElement（HTMLElement 接口表示所有的 HTML 元素），表明这个自定义元素具有 HTML 元素的特性。

使用 <template> 设置自定义元素内容
<template id="custom-button">
    <button>自定义按钮</button>
    <style>
        button {
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            text-align: center;
            box-sizing: border-box;
            outline: none;
            margin: 0;
            transition: .1s;
            font-weight: 500;
            padding: 12px 20px;
            font-size: 14px;
            border-radius: 4px;
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
            border: 0;
        }

        button:active {
            background: #3a8ee6;
            border-color: #3a8ee6;
            color: #fff;
        }
      </style>
</template>
从上面的代码可以发现，我们为这个自定义元素设置了内容 <button>自定义按钮</button> 以及样式，样式放在 <style> 标签里。可以说 <template> 其实就是一个 HTML 模板。

Shadow DOM（影子DOM）
设置了自定义元素的名称、内容以及样式，现在就差最后一步了：将内容、样式挂载到自定义元素上。

// 元素的功能代码写在这里
const templateContent = document.getElementById('custom-button').content
const shadowRoot = this.attachShadow({ mode: 'open' })

shadowRoot.appendChild(templateContent.cloneNode(true))

shadowRoot.querySelector('button').onclick = () => {
    alert('Hello World!')
}
元素的功能代码中有一个 attachShadow() 方法，它的作用是将影子 DOM 挂到自定义元素上。DOM 我们知道是什么意思，就是指页面元素。那“影子”是什么意思呢？“影子”的意思就是附加到自定义元素上的 DOM 功能是私有的，不会与页面其他元素发生冲突。

attachShadow() 方法还有一个参数 mode，它有两个值：

open 代表可以从外部访问影子 DOM。
closed 代表不可以从外部访问影子 DOM。
// open，返回 shadowRoot
document.querySelector('custom-button').shadowRoot
// closed，返回 null
document.querySelector('custom-button').shadowRoot
生命周期
自定义元素有四个生命周期：

connectedCallback: 当自定义元素第一次被连接到文档 DOM 时被调用。
disconnectedCallback: 当自定义元素与文档 DOM 断开连接时被调用。
adoptedCallback: 当自定义元素被移动到新文档时被调用。
attributeChangedCallback: 当自定义元素的一个属性被增加、移除或更改时被调用。
生命周期在触发时会自动调用对应的回调函数，例如本次示例中就设置了 connectedCallback() 钩子。

 
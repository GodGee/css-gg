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

// 浏览器提供了一个 customElements.define() 方法，允许我们定义一个自定义元素和它的行为，然后在页面中使用。
customElements.define('custom-button', CustomButton)

// 上面的代码使用 customElements.define() 方法注册了一个新的元素，并向其传递了元素的名称 custom-button、指定元素功能的类 CustomButton。然后我们可以在页面中这样使用：
// <custom-button></custom-button>
// 这个自定义元素继承自 HTMLElement（HTMLElement 接口表示所有的 HTML 元素），表明这个自定义元素具有 HTML 元素的特性。

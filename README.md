# miniReact
Learning the back of React 

## 实现points

- 虚拟dom; 继承Element元素的处理
- dom中type, props, children处理
- 渲染render时虚实dom挂载到父节点 -> mountTo
- 状态管理state && setState
- 虚拟dom的diff算法，并进行dom更新 -> update


## 工程实现
- 解析自定义jsx: @babel/plugin-transform-react-jsx
- webpack-dev-server
- 测试jest

## 启动
- npm install
- npm run dev
- npm run test


## 待完成的扩展

- renderComponent方法用来渲染组件，setState方法中会直接调用这个方法进行重新渲染，在这个方法里可以实现componentWillUpdate，componentDidUpdate，componentDidMount几个生命周期方法


- dom diff改进: 分别表示文本、原生DOM节点以及组件的虚拟dom
- 对比文本节点：直接更新内容，否则就新建一个文本节点，并移除掉原来的DOM。
- 对比非文本的DOM节点：那就要分两种情况了：
    - 情况一：如果真实DOM不存在，表示此节点是新增的，或者新旧两个节点的类型不一样，那么就新建一个DOM元素，并将原来的子节点（如果有的话）移动到新建的DOM节点下。
    - 情况二：如果真实DOM存在，并且和虚拟DOM是同一类型的，那我们暂时不需要做别的，只需要等待后面对比属性和对比子节点。
- 对比属性：原来的属性不在新的属性当中，则将其移除掉;更新新的属性值
- 对比子节点: 给节点设一个key值，重新渲染时对比key值相同的节点
- 对比组件：如果组件类型没有变化，则重新set props；如果组件类型变化，则移除掉原来组件，并渲染新的组件


- 异步更新state，将短时间内的多个setState合并成一个
- 为了解决异步更新导致的问题，增加另一种形式的setState：接受一个函数作为参数，在函数中可以得到前一个状态并返回下一个状态

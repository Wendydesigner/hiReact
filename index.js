import {ToyReact} from './toyReact.js';

const originDom = (
    <div class="c-title">
        <span>123</span>
        <span class="c-span">123</span>
    </div>
)
ToyReact.render(originDom, document.body);
console.log(originDom);

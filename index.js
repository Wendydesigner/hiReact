import { HiReact,HiComponent } from './hiReact.js';

// function HiComponent(){
//     return (
//         <div class="c-component">I am HiComponent</div>
//     )
// }

class HiComponentMore extends HiComponent{
    render() {
        return (
            <div hiProps={this.props} class="c-component">
                <span class="c-component-slot"> I am HiComponent {true} 
                </span>
                {this.children}
            </div>
        )
    }
}

const originDom = (
    <div class="c-title">
        <span> 123</span>
        <span class="c-span"> 123</span>
        {/* <HiComponent></HiComponent> */}
        <HiComponentMore class="c-component-parent">
        <div class="c-component-inner"> i am slot</div></HiComponentMore>
    </div>
)
// HiReact.render(originDom, document.body);
console.log(originDom);

import {HiReact, HiComponent} from '../hiReact.js';

describe('should origin dom ok', ()=> {
    it('vdom parse ok', () => {
        class HiTest extends HiComponent {
            render() {
                return (<div>123</div>)
            }
        }
        let element = (<HiTest/>)
        expect(HiReact.render(element, document.createElement('div')).innerHTML).toContain('123'); 
    });

})

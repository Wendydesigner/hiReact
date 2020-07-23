import {HiReact, HiComponent} from '../hiReact.js';

describe('should origin dom ok', ()=> {
    it('orgin dom without childrenNode', () => {
        let element = HiReact.createElement('div', {
            class: 'c-title'
        }, "123");
        expect(HiReact.render(element, document.createElement('div')).innerHTML).toContain('123');
    });
    
    it('orgin dom with childrenNode', () => {
        let element = (
            <div class="c-title">
                <span>123</span>
                <span class="c-span">123</span>
            </div>
        );
        expect(HiReact.render(element, document.createElement('div')).innerHTML).toContain('123');
    })
})
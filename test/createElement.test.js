import {ToyReact} from '../toyReact.js';

test('should origin dom render ok', () => {
    let element = ToyReact.createElement('div', {
        class: 'c-title'
    }, "123");
    expect(element.innerHTML).toBe('123');
});

test('should origin dom parse ok', () => {
    let element = (
        <div class="c-title">
            <span>123</span>
            <span class="c-span">123</span>
        </div>
    );
    expect(element.children.length).toBe(2);
})


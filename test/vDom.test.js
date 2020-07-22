import {HiReact, HiComponent} from '../hiReact.js';
// import { shallow } from 'enzyme';

describe('should origin dom ok', ()=> {
    it('vdom parse ok', () => {
        class HiTest extends HiComponent {
            render() {
                return (<div>123</div>)
            }
        }
        let element = (<div><HiTest/></div>)
        expect(element.root.innerHTML).toContain('123'); 
    });

    // it('vdom tag render ok', () => {
    //     const mockCallBack = jest.fn();
    //     let renderElement = shallow(<div><span id="test" onClick={mockCallBack}></span></div>);
    //     expect(renderElement.find('#test')).to.have.lengthOf(1);
    //     renderElement.find('#test').simulate('click');
    //     expect(mockCallBack).toHaveBeenCalled();
    // });
    // Error:Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none.
})

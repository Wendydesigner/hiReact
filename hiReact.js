

export class Component {
    constructor(options) {

    }
    setAttribute(attr, value) {
    }
    mountTo(parent) {
        let vdom = this.render();
        parent.appendChild(vdom);
    }
    
}

export let HiReact = {
    createElement(type, attributes, ...children) {
        console.log(arguments);

        let root;
        if (typeof type == 'function') {
            let func = new type;
            root = func.render();
        } else {
            root = document.createElement(type);
        }

        for (let attr in attributes) {
            let value = attributes[attr];
            let exist = root.getAttribute(attr);
            if (exist) {
                root.setAttribute(attr, `${value} ${exist}`);
            } else {
                root.setAttribute(attr, value);
            }
        }

        function insertChild(children) {
            for (let child of children) {
                if (Object.prototype.toString(child) == '[Object Array]') {
                    insertChild(child);
                } else if (child instanceof Element == false) {
                    child = document.createTextNode(String(child));
                }
                root.appendChild(child);
            }
        }
        insertChild(children);

        return root;
    },
    render(vdom, element) {
        element.appendChild(vdom);
        // vdom.mountTo(element)
    }
}
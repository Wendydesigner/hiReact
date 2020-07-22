import { eventNames } from "cluster";

class NewElement {
    constructor() {}
}
export class HiComponent {
    constructor() {
        this.children = [];
        this.props = Object.create(null);
    }
    setAttribute(attr, value) {
        this.props[attr] = value;
    }
    mountTo(parent) {
        let vdom = this.render();
        parent.appendChild(vdom.root);
    }
    appendChild(child) {
        this.children.push(child);
    }

}
class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(attr, value) {
        if (attr == 'hiProps') {
            for (let parentAttr in value) {
                this.setAttribute(parentAttr, value[parentAttr])
            }
            this.root.removeAttribute(attr);
        } else if (attr.match(/^on([\s\S]$)/)) {
            let eventName = attr.match(/^on([\s\S*]$)/)[1];
            console.log(eventName);
        } else {
            let exist = this.root.getAttribute(attr);
            if (exist) {
                this.root.setAttribute(attr, `${value} ${exist}`);
            } else {
                this.root.setAttribute(attr, value);
            }
        }
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
    appendChild(child) {
        child.mountTo(this.root);
    }

}

class TextWrapper {
    constructor(text) {
        this.root = document.createTextNode(text);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

export let HiReact = {
    createElement(type, attributes, ...children) {
        console.log(arguments);

        let root;
        if (typeof type == 'function') {
            root = new type;
        } else {
            root = new ElementWrapper(type);
        }

        console.log(root);
        for (let attr in attributes) {
            let value = attributes[attr];
            root.setAttribute(attr, value);
        }

        function insertChild(children) {
            for (let child of children) {
                if (Object.prototype.toString.call(child) == '[object Array]') {
                    insertChild(child);
                } else if (
                    child instanceof ElementWrapper == false &&
                    child instanceof HiComponent == false &&
                    child instanceof TextWrapper == false) {
                    child = new TextWrapper(child.toString());
                    root.appendChild(child);
                } else {
                    root.appendChild(child);
                }
            }
        }
        insertChild(children);
        console.log(root);
        return root;
    },
    render(vdom, element) {
        // element.appendChild(vdom);
        vdom.mountTo(element)
    }
}

export class HiComponent {
    constructor() {
        this.children = [];
        this.props = Object.create(null);
    }
    setAttribute(attr, value) {
        this.props[attr] = value;
    }
    mountTo(parent) {
        this.parent = parent;
        this.update();
    }
    update() {
        console.log('before', this.parent);
        let vdom = this.render();
        vdom.mountTo(this.parent,this);
    }
    setState(state) {
        this.state.value = state.value;
        this.update();
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
        if (attr == 'hiClass') {
            for (let parentAttr in value) {
                this.setAttribute(parentAttr, value[parentAttr])
            }
            this.root.removeAttribute(attr);
        } else if (attr.match(/^on([\s\S]*)/)) {
            let match = attr.match(/^on([\s\S])([\s\S]*)/);
            let eventName = match[1].toLowerCase() + match[2];
            this.root.addEventListener(eventName, value);
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
        parent.deleteContents();
        parent.insertNode(this.root);
        console.log('after', parent);
    }
    appendChild(child) {
        let range = document.createRange();
        if (this.root.children.length) {
            range.setStartAfter(this.root.lastChild);
            range.setEndAfter(this.root.lastChild);
        } else {
            range.setStart(this.root, 0);
            range.setEnd(this.root, 0);
        }
        child.mountTo(range);
    }

}

class TextWrapper {
    constructor(text) {
        this.root = document.createTextNode(text);
    }
    mountTo(parent) {
        parent.deleteContents();
        parent.insertNode(this.root);
    }
}

export let HiReact = {
    createElement(type, attributes, ...children) {

        let root;
        if (typeof type == 'function') {
            root = new type;
        } else {
            root = new ElementWrapper(type);
        }

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
        return root;
    },
    render(vdom, element) {
        let range = document.createRange();
        if (element.children.length) {
            range.setStartAfter(element.lastChild);
            range.setEndAfter(element.lastChild);
        } else {
            range.setStart(element, 0);
            range.setEnd(element, 0)
        }
        vdom.mountTo(range);
    }
}
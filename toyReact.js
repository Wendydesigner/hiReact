



export let ToyReact = {
    createElement(type, attributes, ...children) {
        let root = document.createElement(type);
        for (let attr in attributes) 
            root.setAttribute(attr, attributes[attr]);
        function insertChild(children) {
            for (let child of children) {
                if (Object.prototype.toString(child) == '[Object Array]') {
                    insertChild(child)
                }
                if (typeof child == 'string') {
                    child = document.createTextNode(child);
                } 
                root.appendChild(child);
            }
        }
        insertChild(children)
        console.log(root.children.length);
        return root;
    },
    render(child, parent) {
        parent.appendChild(child);
    }
}
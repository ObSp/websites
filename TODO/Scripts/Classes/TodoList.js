export class TodoList{

    constructor(documentNode) {
        this.node = documentNode;
        this.items = [];
    }

    addTodoItem(item){
        this.items.push(item);
        this.node.appendChild(item.node);

        item.Parent = this;
    }

    removeTodoItem(item){
        this.items.splice(this.items.indexOf(item), 1);
        this.node.removeChild(item.node);

        item.Parent = null;
    }
}
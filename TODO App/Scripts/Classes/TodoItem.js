export class TodoItem{

    /* 
    <div class="todo-item">
            <div class="circle"></div>
            <p>This is the text stuff</p>
            <img src="Media/Delete.png" alt="">
        </div>
    
    */



    constructor(todoString){
        this.todo = todoString;

        this.node = document.createElement("div");
        this.node.className = "todo-item";

        this.circleNode = document.createElement("div")
        this.circleNode.className = "circle";
        this.node.appendChild(this.circleNode);

        this.textNode = document.createElement("p");
        this.textNode.innerHTML = this.todo;
        this.node.appendChild(this.textNode);

        this.trashNode = document.createElement("img");
        this.trashNode.src = "Media/Delete.png";
        this.node.appendChild(this.trashNode);

        this.ondelete = null;

        this.trashNode.addEventListener("click", ()=>{
            if (this.ondelete != null) this.ondelete();
        });
    }

    OnDeleteRequest(f){
        this.ondelete = f;
    }

    destroy(){
        this.Parent.removeTodoItem(this);
    }

}
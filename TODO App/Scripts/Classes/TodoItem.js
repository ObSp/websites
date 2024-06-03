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

        if (this.todo == ""){
            this.textNode.innerHTML = "Buy milk"
        }

        this.trashNode = document.createElement("img");
        this.trashNode.src = "Media/Delete.png";
        this.node.appendChild(this.trashNode);

        this.ondelete = null;
        this.oncomplete = null;

        this.Complete = false;

        this.trashNode.addEventListener("click", ()=>{
            if (this.ondelete != null) this.ondelete();
        });

        this.circleNode.addEventListener("click", ()=>{
            if (this.oncomplete != null) this.oncomplete();
        });
    }

    OnDeleteRequest(f){
        this.ondelete = f;
    }

    OnCompleteRequest(f){
        this.oncomplete = f;
    }

    destroy(){
        this.Parent.removeTodoItem(this);
    }

}
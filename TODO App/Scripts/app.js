import { TodoItem } from "./Classes/TodoItem.js";
import { TodoList } from "./Classes/TodoList.js";

const CurrentTimeDisp = document.getElementById("cur-time");
const dateDisp = document.getElementById("date");
const footer = document.getElementById("doc-footer");

const KEY = "TODO_APP_LIST"

const months = ["January", "February","March","April","May","June","July","October","November", "December"];
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const todolist = new TodoList(document.getElementById("todo-list-section"))

function updateTime(){
    saveTodoList();
    const curTime = new Date();
    const hour = curTime.getHours();
    let mins = curTime.getMinutes();

    if (mins < 10)
        mins = "0"+mins;

    CurrentTimeDisp.textContent = hour+":"+mins;

    dateDisp.textContent = daysOfWeek[curTime.getDay()-1]+", "+months[curTime.getMonth()-1]+" "+curTime.getDate();

    setTimeout(updateTime, 1000);
}

function saveTodoList(key){
    localStorage.setItem(key, "hello");
    console.log(localStorage.getItem(key));
}

function retrieveStoredList(key){
    const list = localStorage.getItem(key);
    console.log(list)
}

function createItem(){
    const item = new TodoItem("Do something");

    todolist.addTodoItem(item);

    item.OnDeleteRequest(()=>{
        item.textNode.innerHTML = "a"
        todolist.removeTodoItem(item)
    });
}



retrieveStoredList(KEY);

updateTime();

window.addEventListener("befureunload", e=>{
    console.log(JSON.stringify(todolist.items))
    saveTodoList(KEY);
});

footer.addEventListener("click", createItem);
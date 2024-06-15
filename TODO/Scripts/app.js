import { TodoItem } from "./Classes/TodoItem.js";
import { TodoList } from "./Classes/TodoList.js";

const CurrentTimeDisp = document.getElementById("cur-time");
const dateDisp = document.getElementById("date");
const footer = document.getElementById("doc-footer");

const darkBackground = document.getElementById("screen-darken");
const popup = document.getElementById("popup");
const todoInput = document.getElementById("popup-input");

function e(id){
    return document.getElementById(id)
}

const KEY = "TODO_APP_LIST"

const months = ["January", "February","March","April","May","June","July","October","November", "December"];
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const todolist = new TodoList(document.getElementById("todo-list-section"))

function updateTime(){
    const curTime = new Date();
    const hour = curTime.getHours();
    let mins = curTime.getMinutes();

    if (mins < 10)
        mins = "0"+mins;

    CurrentTimeDisp.textContent = hour+":"+mins;

    dateDisp.textContent = daysOfWeek[curTime.getDay()-1]+", "+months[curTime.getMonth()-1]+" "+curTime.getDate();

    setTimeout(updateTime, 1000);
}

function saveTodoList(){
    //parse items into array
    const arr = [];
    for (const item of todolist.items){
        arr.push(item.todo + (item.Complete ? "-comp" : ""));
    }
    localStorage.setItem(KEY, JSON.stringify(arr))
}

function retrieveStoredList(){
    let arr = localStorage.getItem(KEY);
    if (arr == null) return;
    arr = JSON.parse(arr);
    for (const str of arr){
        const item = createItem(str.replace("-comp", ""));
        if (str.includes("-com")){
            item.oncomplete()
        }
    }
}

function createItem(value){
    const item = new TodoItem(value != null ? value : todoInput.value);

    todolist.addTodoItem(item);

    item.OnDeleteRequest(()=>{
        todolist.removeTodoItem(item)
    });

    item.OnCompleteRequest(()=>{
        if (item.Complete){
            item.Complete = false;
            item.textNode.innerHTML = item.textNode.innerHTML.replace("<del>", "").replace("</del>", "");
            item.node.style.backgroundColor = "rgb(255, 255, 255, 1)"
            return;
        }
        item.Complete = true;
        item.textNode.innerHTML = "<del>"+item.textNode.innerHTML+"</del>"
        item.node.style.backgroundColor = "rgb(52, 204, 93, .5)"
    });

    saveTodoList();

    return item;
}

function hidePopup(){
    darkBackground.hidden = true;
    popup.hidden = true;
    todoInput.value = ""
}

function showPopup(){
    darkBackground.hidden = false;
    popup.hidden = false;
}

e("popup-confirm").addEventListener("click", ()=>{
    createItem()

    hidePopup()
});

e("popup-cancel").addEventListener("click", ()=>{
    hidePopup()
});

window.addEventListener("beforeunload", ()=>{
    saveTodoList();
});

updateTime();

footer.addEventListener("click", showPopup);

retrieveStoredList();
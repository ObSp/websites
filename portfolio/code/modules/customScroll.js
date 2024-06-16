const welcome = document.getElementById("welcome-section")
const last = document.getElementsByClassName("last-section")[0]


export function customScroll(){
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.overflowY = "hidden";


    window.addEventListener("wheel", (e)=>{

        if (e.deltaY > 0){
            onDown()
        } else {
            onUp()
        }
        
    });
}


function onUp(){
    welcome.scrollIntoView()
}

function onDown(){
    last.scrollIntoView()
}
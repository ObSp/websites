const welcome = document.getElementById("welcome-section")
const last = document.getElementsByClassName("last-section")[0]


export function customScroll(){
    //window.scrollTo(0,0)
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
    window.scrollTo(0,0)
}

function onDown(){
    window.scrollTo(0, document.body.scrollHeight)
}
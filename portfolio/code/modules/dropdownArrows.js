import { wait } from "../util/wait.js";

export async function init() {
    const dropdownArrows = document.getElementsByClassName("dropdown-arrow");
    document.documentElement.style.scrollBehavior = "smooth";
    
    for (const arrow of dropdownArrows){
        const openSection = arrow.parentElement.parentElement.lastElementChild

        arrow.addEventListener("click", async ()=>{
            const hide =  !openSection.hidden
            if (!hide){
                openSection.hidden = hide;
                openSection.parentElement.scrollIntoView()
                arrow.style.rotate = "180deg"
            } else {
                const clipRect = openSection.getBoundingClientRect();
                //window.scrollTo(0, clipRect.y-clipRect.height);
                arrow.style.rotate = "0deg"
                //await wait(.3)
                openSection.hidden = hide;
            }

            
        });
    }
}
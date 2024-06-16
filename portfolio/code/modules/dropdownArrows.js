import { wait } from "../util/wait.js";

export async function init() {
    const dropdownArrows = document.getElementsByClassName("dropdown-arrow");
    
    for (const arrow of dropdownArrows){
        const openSection = arrow.parentElement.parentElement.lastElementChild

        arrow.addEventListener("click", async ()=>{
            const hide =  !openSection.hidden
            if (!hide){
                openSection.hidden = hide;
                openSection.scrollIntoView()
            } else {
                const clipRect = openSection.getBoundingClientRect();
                window.scrollTo(0, clipRect.y-clipRect.height);
                await wait(.3)
                openSection.hidden = hide;
            }

            
        });
    }
}
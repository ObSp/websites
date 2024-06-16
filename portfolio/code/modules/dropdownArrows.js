export function init() {
    const dropdownArrows = document.getElementsByClassName("dropdown-arrow");
    
    for (const arrow of dropdownArrows){
        const openSection = arrow.parentElement.lastElementChild

        arrow.addEventListener("click", ()=>{
            openSection.hidden =  !openSection.hidden
            if (!openSection.hidden){
                openSection.scrollIntoView()
            }
        });
    }
}
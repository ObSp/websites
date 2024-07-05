export function fixStyles(){
    const lastElementOfPastWork = document.getElementById("past-work").lastElementChild
    lastElementOfPastWork.style.marginBottom = getComputedStyle(lastElementOfPastWork).marginTop;
}
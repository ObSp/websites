let average_input = document.getElementById("avg-text-input")
let weight_input = document.getElementById("percent-worth-text-input")
let goal_input = document.getElementById("fg-text-input")
let result_field = document.getElementById("result")
let storage = document.getElementById("Final-Score")

let openmenu = document.getElementById('open-menu')
let menubar = document.getElementById('menu-bar')
let showwebsites = document.getElementById('website-menu-hover')
let websitemenu = document.getElementById('websites-show')


function CalculateResult(){
    let score = average_input.value
    let weight = weight_input.value/100
    let goal = goal_input.value

    let result = Math.ceil((goal - ((1-weight)*score))/weight)

    result_field.innerHTML = "In order to get a final grade of " +goal+"%, you will need to get at least a <b><i>" +result+ "%</i></b> on this assesment"
    storage.innerHTML = result
}

openmenu.onclick = function(){
    menubar.hidden = !menubar.hidden    
}


showwebsites.onclick = function() {
    websitemenu.hidden = !websitemenu.hidden
}

showwebsites.onmouseenter = function() {
    websitemenu.hidden = !websitemenu.hidden
}

websitemenu.onmouseleave = function() {
    websitemenu.hidden = true
}
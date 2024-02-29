//window.location.href = "/Quiz+"

let openset = document.getElementById('open-set')
let startstudy = document.getElementById('study-set')

let termdisplay = document.getElementById('term')
let definitionInput = document.getElementById('answer')
let checkanswerbutton = document.getElementById('check-button')

let feedbackDisplay = document.getElementById('right-or-wrong')


class Item {
    constructor(term, definition){
        this.term = term
        this.definition = definition
        this.timesRight = 0
        this.timesWrong = 0
    }
}


function awaitClick(button){
    return new Promise((resolve, reject) => {
        button.addEventListener('click', resolve)
    });
}

function awaitKeyPress(key){
    return new Promise((resolve, reject) => {
        document.onkeydown = function(e){
            console.log(e.key)
        }
    });
}

function answered(){
    return new Promise((resolve, reject) => {
        checkanswerbutton.addEventListener('click', resolve)

        document.onkeydown = function(e){
            if (e.key=="Enter") resolve()
        }
    });
}


function wait(ms){
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    });
}



function getItemsList(rawContent){
    let returnList = []
    let items = rawContent.split(";")
    
    for (let i=0; i<items.length-1; i++){
        const item = items[i]
        let split = item.split(":")
        returnList.push(new Item(split[0], split[1]))
    }
    return returnList
}

function evaluateAnswer(answer, pair){
    let score = 0
    for (const word of answer.split(" ")){
        if (pair.definition.includes(word)) score++;
    }

    score = (score/pair.definition.split(" ").length)*100
    return score
}

async function study(setContent){
    //hide stuff
    document.getElementById("set-name-input").hidden = true
    document.getElementById("study-container").hidden = false


    let items = getItemsList(setContent)
    
    //randomize items
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }


    for (const item of items){
        termdisplay.innerHTML = item.term
        await answered()
        const score = evaluateAnswer(definitionInput.value, item)
        console.log(score)
        if (score > 60){
            console.log("crt!")
            feedbackDisplay.innerHTML = "<span "
        }


        await wait(10000)
    }
}




startstudy.onclick = function(){
    let file = openset.files[0]
    if (file == null) {alert("You must choose a file"); return;}
    let reader = new FileReader()

    reader.readAsText(file)

    reader.onload = function(){
        study(reader.result)
    }
}


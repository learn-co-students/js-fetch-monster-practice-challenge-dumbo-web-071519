// - When the page loads, show the first 50 monsters.Each monster's name, age, and
// description should be shown.

const monsterContainer = document.getElementById("monster-container")
const createMonsterContainer = document.querySelector("#create-monster")

let pageNum = 1

const url = "http://localhost:3000/monsters"
function getMonsters(pageNum){
    fetch(`${url}/?_limit=50&_page=${pageNum}`)
        .then(res => res.json())
        .then(data => data.forEach(function(monster){ 
                displayMonster(monster)
                //console.log(monster)
            })
        )
}

function displayMonster(monsterObj){
    const div = document.createElement("div")
    const name = document.createElement("h2")
    const age = document.createElement("h4")
    const description = document.createElement("p")
    name.innerText = monsterObj.name
    age.innerText = monsterObj.age
    description.innerText = monsterObj.description
    div.appendChild(name)
    div.appendChild(age)
    div.appendChild(description)
    monsterContainer.appendChild(div)
    // monsterContainer.innerHTML += `
    // <h2> ${monsterObj.name} </h2>
    // <h4> ${monsterObj.age}</h4>
    // <p> ${monsterObj.description}</p>
    // `

}

// - Above your list of monsters, you should have a form to create a new monster.
// You should have fields for name, age, and description, and a 'Create Monster
// Button'. When you click the button, the monster should be added to the list
// and saved in the API.
function createMonsterForm(){
    const formNode = document.createElement("form")
    formNode.id = "monster-form"

    const name = document.createElement("input")
    name.id = "name"
    name.placeholder ="...name..."
    
    const age = document.createElement("input")
    age.id = "age"
    age.placeholder = "...age..."

    const description = document.createElement("input")
    description.id = "description"
    description.placeholder = "...description..."

    const button = document.createElement("button")
    button.innerHTML="create"

    formNode.appendChild(name)
    formNode.appendChild(age)
    formNode.appendChild(description)
    formNode.appendChild(button)
    createMonsterContainer.appendChild(formNode)
    addSubmitEventListener()
}

function addSubmitEventListener(){
    document.querySelector("#monster-form").addEventListener("submit",function(event){
        event.preventDefault()
        postNewMonster(getFormData())
        
        clearForm()
    })
}   

function getFormData() {
    //console.log(event.target)
    return { name: document.querySelector('#name').value, age: document.querySelector('#age').value, description: document.querySelector('#description').value}
}

function postNewMonster(formData){
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log('new monster', data))
}


function clearForm(){
    document.querySelector("#monster-form").reset()
}



// - At the end of the list of monsters, show a button.When clicked, the button
// should load the next 50 monsters and show them.

const backButton = document.getElementById("back")
const forwardButton = document.getElementById("forward")

backButton.addEventListener("click",currentPageNumber)
forwardButton.addEventListener("click", currentPageNumber)

function currentPageNumber(event){
    console.log(event)
    if (event.target.id === "forward"){
        pageNum++
        monsterContainer.innerHTML = ""
        getMonsters(pageNum)
    } else {
        pageNum--
        monsterContainer.innerHTML = ""
        getMonsters(pageNum)
    }
}


init = () => { getMonsters(pageNum), createMonsterForm()};


document.addEventListener('DOMContentLoaded', init);
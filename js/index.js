const monsterContainer = document.getElementById("monster-container")
const monsterFormDiv = document.getElementById("create-monster")
const forwardButton = document.getElementById("forward")
const backButton = document.getElementById("back")



const baseUrl = 'http://localhost:3000/monsters'
let page = 1

function getMonsters() {
    fetch(`${baseUrl}/?_limit=50&_page=${page}`)
            .then(resp => resp.json())
            .then(renderMonsters)
};
//adds the monsters from the fetch above to the DOM
function renderMonsters(arr) {
    monsterContainer.innerHTML = ""
    arr.forEach((monster) => {
        monsterContainer.innerHTML += makeMonster(monster)
    })
};

//shows the name, age and description keys on each monster object
function makeMonster(monster){
    return `
            <div>
                <h2>${monster.name}</h2>
                <h4>Age: ${monster.age}</h4>
                <p>${monster.description}</p>
            </div>
        `
}

function createMonster(e){
    e.preventDefault()
    //configures our post request for fetch
    const config = {
        'method': 'POST',
        'headers': {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
'body' : JSON.stringify({
    name: `${e.target.name.value}`,
    age: `${parseInt(e.target.age.value)}`,
    description: `${e.target.description.value}`
})
        }
        //makes our fetch to /monsters with config settings
    fetch(baseUrl, config).then(resp => resp.json()).then(() => {
        e.target.reset()
        getMonsters()
    })

}



//adds one to page number and reloads the apge
forwardButton.addEventListener("click", (e) => {
    e.preventDefault()
    page += 1
    getMonsters()
})
//subtracts one from page number and reloads the page
backButton.addEventListener("click", (e) => {
    e.preventDefault()
    page -= 1
    getMonsters()
})



getMonsters()

//creates the form at the top of the page
const monsterForm = document.createElement('form')
//writes the interpolated html for the form
monsterForm.innerHTML = `
        <input type= "text" name="name" placeholder="Monster Name..."/>
        <input type= "text" name="description" placeholder="Monster Description..."/>
        <input type="number" step="0.001" name="age" placeholder="Monster Age..."/>
        <input type= "submit"/>`
//listens for the submit event from form and runs our post request defined above
monsterForm.addEventListener('submit', (e) => createMonster(e))
//adds the form to the DOM 
monsterFormDiv.appendChild(monsterForm)



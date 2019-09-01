document.addEventListener('DOMContentLoaded', () => {
    let pageNum = 1
    const monsterFormContainer = document.querySelector('#create-monster')
    const monsterContainer = document.querySelector('#monster-container')
    const backPage = document.querySelector('#back')
    const nextPage = document.querySelector('#forward')

    //Loads 50 monsters to the document, BASED ON pageNum
    function loadMonsters() {
        //console.log('Loading page Number', pageNum)
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
        .then(resp => resp.json())
        .then(renderMonsters)
    }

    //This function will only get the array of monsters and render in #monster-container
    function renderMonsters(arr) {
        if (arr.length === 0){
            alert('There are no more mosnters to load')
            pageNum -= 1
            loadMonsters()
        }
        monsterContainer.innerHTML = ""
        arr.forEach((monster) => {
            monsterContainer.innerHTML += makeMonster(monster)
        })
    }
    //This function RETURNS a single monster
    function makeMonster(monster) {
        return `
            <div>
                <h2>${monster.name}</h2>
                <h4>Age: ${monster.age}</h4>
                <p>${monster.description}</p>
            </div>
        `
    }

    //This will create a post function
    function createMonster(e) {
        e.preventDefault()
        const config = {
            'method': 'POST',
            'headers': {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            'body' : JSON.stringify({
                name: `${e.target.name.value}`,
                age: `${parseInt(e.target.age.value)}`,
                description: `${e.target.description.value}`
            })
        }
        fetch('http://localhost:3000/monsters/', config)
        .then(resp => resp.json())
        .then(() => {
            //Afterwards, render the monsters again
            pageNum = 1
            e.target.reset()
            loadMonsters()
        })
    }

    // Event handling for back and forward buttons
    backPage.addEventListener('click', (e) => {
        e.preventDefault()
        if(pageNum === 1){
            alert('There is nothing back there!')
        }
        else{
            pageNum -= 1
            loadMonsters()
        }
    })
    nextPage.addEventListener('click', (e) => {
        e.preventDefault()
        pageNum += 1
        loadMonsters()
    })

    // loading the first page of monsters on content load
    loadMonsters()

    // creatin the form on page load
    const monsterForm = document.createElement('form')
    monsterForm.innerHTML = `
        <input type= "text" name="name" placeholder="Monster Name..."/>
        <input type= "text" name="description" placeholder="Monster Description..."/>
        <input type="number" step="0.001" name="age" placeholder="Monster Age..."/>
        <input type= "submit"/>`

    monsterForm.addEventListener('submit', (e) => createMonster(e))
    monsterFormContainer.appendChild(monsterForm)
})

//dom vars
const monstersDiv = document.querySelector("#monster-container")
const buttonContainer = document.querySelector(".button-container"); 
const form = document.querySelector(".create-mon-form");
const formName = document.querySelector("#monster-name");
const formAge= document.querySelector("#monster-age");
const formDesc = document.querySelector("#monster-desc");
let pageNumber = 1
const url = 'http://localhost:3000/monsters';
//event lists

buttonContainer.addEventListener('click', handleButton)
form.addEventListener('submit', createMonster);
//funcs
function createMonster(e){
    e.preventDefault();
    
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: formName.value,
            age: formAge.value,
            description: formDesc.value
        })
    })
    .then(res => res.json())
    .then(console.log)

}

function handleButton(e){
    if(e.target.id === "forward"){
        pageNumber ++;
        loadMonsters(pageNumber);
    } else {  
        if (pageNumber > 1){
            pageNumber--;
            loadMonsters(pageNumber);
        }
        else{
            alert("Ain't no monsters here.")
        }
    }
}

function loadMonsters(pageNum){
    fetch(`${url}?_limit=50&_page=${pageNum}`)
    .then(res => res.json())
    .then(mons => {
        //clear div before displaying
        monstersDiv.innerHTML = "";
        mons.forEach(displayMon)
    })
}

function displayMon(monster){
    monstersDiv.innerHTML += `<div>
    <h2>Name: ${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>
    </div>`
}


//onload
loadMonsters(pageNumber);
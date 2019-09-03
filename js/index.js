

const monsterConteiner = document.querySelector('#monster-container')
const formContainer = document.querySelector('#create-monster')
formContainer.innerHTML+=`
<form id='submit-form'>
  Monster's name:<br>
  <input type="text" name="name">
  <br>
  Age:<br>
  <input type="text" name="age">
  <br>
  Description:<br>
  <input type="text" name="description">
  <br>
  <input type="submit" id='createBtn'>
</form> 


`
const smtForm = document.querySelector('#submit-form')
const func=(fetchMonster()) 

smtForm.addEventListener('submit',fetchCreate)


function fetchCreate(event){
    event.preventDefault();
    const name = event.target.name.value
    const age = event.target.age.value
    const description = event.target.description.value
   
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
             name: name, age: age, description: description
        })
        
    })
        .then(res => res.json())
        .then(slapMonster)
        smtForm.reset()
    
}
function fetchMonster() {
   
    fetch('http://localhost:3000/monsters')
        .then(res => res.json())
        .then(monsters => {
        // console.log(monsters[0])
            for(let i=0;i<50;i++){
                 slapMonster(monsters[i])
             }

        })
    }
            


function slapMonster(monster){
    monsterConteiner.innerHTML +=`
    <ul>
    <li data-id=${monster.id}>
    <p id='name'>${monster.name}</p>
     <p id='age'>${monster.age}</p>
      <p id='description'>${monster.description}</p>
      </li>
    </ul>`
    
}

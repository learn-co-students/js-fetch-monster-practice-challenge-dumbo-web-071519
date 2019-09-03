// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.

  const monstersDiv = document.querySelector("#monster-container")

  const targetURL = "http://localhost:3000/monsters"

  fetch(`${targetURL}/?_limit=50`)
  .then(response => response.json())
  .then(showFirstFifty)

  function showFirstFifty(monsterList) {
    // console.dir(data)
    monsterList.forEach((monster) => {
      const monsterDiv = document.createElement("div")
      monsterDiv.id = monster["id"]

      const monsterName = document.createElement("h3")
      monsterName.innerText = monster.name
      monsterDiv.appendChild(monsterName)

      const monsterAge = document.createElement("h4")
      monsterAge.innerText = `Age: ${monster.age}`
      monsterDiv.appendChild(monsterAge)

      monstersDiv.appendChild(monsterDiv)
    })
  }


// Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.

  const createMonsterDiv = document.querySelector("#create-monster")
  const formNode = document.createElement("form")
  formNode.id = "create-monster-form"

  const nameInput = document.createElement("input")
  nameInput.id = "js-name-field"
  nameInput.placeholder = "...name..."
  formNode.appendChild(nameInput)

  const ageInput = document.createElement("input")
  ageInput.id = "js-age-field"
  ageInput.placeholder = "...age..."
  formNode.appendChild(ageInput)

  const descriptionInput = document.createElement("input")
  descriptionInput.id = "description"
  descriptionInput.placeholder = "...desription..."
  formNode.appendChild(descriptionInput)

  const submitButton = document.createElement("input")
  submitButton.type = "button"
  submitButton.value = "Create Monster"
  formNode.appendChild(submitButton)

  createMonsterDiv.appendChild(formNode)





// At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

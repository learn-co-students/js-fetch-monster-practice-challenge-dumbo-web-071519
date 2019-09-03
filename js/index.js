function fetchMonsters(){
    fetch('http://localhost:3000/monsters/?_limit=50')
    .then(resp => resp.json())
    .then(renderMonster)
  }

  fetchMonsters()


  const monsterCollection = document.getElementById('monster-container')
function rendermonsters(monsters) {
  monsterCollection.innerHTML = ""
  monsters.forEach(function (monster) {
    monsterCollection.innerHTML += `
   <div class="card" data-id=${monster.id}>
        <h2>${monster.name}</h2>
        <p>"${monster.age}" class="monster-avatar" />
        <p>${monster.description} description</p>

   </div>
  `
  })
}
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let currentPotion = 0;
let currentHazmat = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let i = 0;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const game = document.querySelector("#game");
const img = document.querySelector("#img1");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const potionText = document.querySelector("#potionText");
const hazmatText = document.querySelector("#hazmatText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100},
  { name: 'institute assault rifle', power: 300 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  },
  {
    name: "deathclaw.",
    level: 40,
    health: 700
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon", "Go to Gloving Sea"],
    "button functions": [goStore, goCave, fightDragon, fightDeathclaw],
    text: "You are in the town square. You see a sign that says \"Store\".", source: "town.png"
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Buy health potion (20 gold)", "Buy HAZMAT (100 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, buyPotion, buyHazmat, goTown],
    text: "You enter the store.", source: "store.webp"
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.", source: "cave.jpg"
  },
  {
    name: "fight",
    "button text": ["Attack", "Use healing potion", "Run"],
    "button functions": [attack, potion, goTown],
    text: "You are fighting a monster.", source: ["slime.png", "beast.png", "dragon.png", "deathclaw.png"]
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the deathclaw! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = goTown;
button5.onclick = goTown;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button5.innerText = location["button text"][4];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  button5.onclick = location["button functions"][4];
  text.innerHTML = location.text;
  img.src = location.source;
}

function goTown() {
  update(locations[0]);
  if(currentHazmat > 0) {
    button4.style.display = "inline-block"; 
}else {
  button4.style.display = "none";
}
  button5.style.display = "none";
}

function goStore() {
  update(locations[1]);
  button4.style.display = "inline-block";
  button5.style.display = "inline-block";
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyHazmat() {
  if(currentHazmat < 1 && gold >= 100) {
    currentHazmat++;
    hazmatText.innerText = currentHazmat;
    game.style.border = "10px solid yellow";
    gold -= 100;
    goldText.innerText = gold;
    text.innerText = "You bought a HAZMAT. You can travel to the Gloving Sea now!";
  }else {
    text.innerText = "You cannot buy anymore HAZMAT";
  }
}

function buyPotion() {
  if(currentPotion < 2 && gold >= 20) {
    currentPotion++;
    potionText.innerText = currentPotion;
    gold -= 20;
    goldText.innerText = gold;
    text.innerText = "You bought a health potion. This can heal you from enemy poison.";
  }else {
    text.innerText = "You cannot buy anymore health potions.";
  } 
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
  img.src = locations[3].source[0];
}

function fightBeast() {
  fighting = 1;
  goFight();
  img.src = locations[3].source[1];
}

function fightDragon() {
  fighting = 2;
  goFight();
  img.src = locations[3].source[2];
}

function fightDeathclaw() {
  fighting = 3;
  goFight();
  img.src = locations[3].source[3];
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  button4.style.display = "none";
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  isPoisenPlayer();
  if(i > 0) {
    health -= 5 * monsters[fighting].level - xp * 2;
    i--;
    text.innerText += "You are poisend!";
    game.style.border = "5px solid green";
  }else if(currentHazmat > 0) {
    game.style.border = "10px solid yellow";
  }else {
    game.style.border = "none";
  }
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 3) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function isPoisenPlayer() {
  if(Math.random() < .15 && fighting === 3) {
    i = 3;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function potion() {
  if(currentPotion > 0) {
  i = 0;
  game.style.border = "10px solid yellow";
  currentPotion--;
  potionText.innerText = currentPotion;
  text.innerText = "You have used a healing potion. You're no longer poisend.";
  }else {
    text.innerText = "You don't have anymore healing potions!"
  }
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentPotion = 0;
  potionText.innerText = currentPotion;
  currentHazmat = 0;
  hazmatText.innerText = currentHazmat;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  game.style.border = "none";
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
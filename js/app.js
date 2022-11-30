//Move labels
let startLvlMvRng = document.getElementById('move-start-level-range');
let startLvMvInp = document.getElementById('move-start-level-value');
let endLvlMvRng = document.getElementById('move-end-level-range');
let endLvMvInp = document.getElementById('move-end-level-value');

//catalyst labels
let startLvlCTRng = document.getElementById('catalyst-start-level-range');
let startLvCTInp = document.getElementById('catalyst-start-level-value');
let endLvlCTRng = document.getElementById('catalyst-end-level-range');
let endLvCTInp = document.getElementById('catalyst-end-level-value');
 
//fighter exp labels
let startLvlFtRng = document.getElementById('fighter-start-level-range');
let startLvFtInp = document.getElementById('fighter-start-level-value');
let endLvlFtRng = document.getElementById('fighter-end-level-range');
let endLvFtInp = document.getElementById('fighter-end-level-value');

let theList = document.getElementById('theList');

function addCommas(intNum) {
  return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

function moveCalc() {
  const start=parseInt(startLvlMvRng.value);
  const end=parseInt(endLvlMvRng.value);
  let rarity;
  switch (document.querySelector('input[name="mv-rarity"]:checked').value) {
    case 'mv-bronze': 
      rarity = "bronze";
      break;
    case 'mv-silver': 
      rarity = "silver";
      break;
    case 'mv-gold': 
      rarity = "gold";
      break;
  }
  const window = document.querySelector('.move-button');
  if (end <= start) {
    window.innerHTML = "This move has reached the deisred level";
  } else {
    const result = genCalc(rarity, start, end);
    window.innerHTML = "This " + rarity + " move needs " + result + " more levels to be completed";
  }
}

function cataCalc() {
  const start=parseInt(startLvlCTRng.value);
  const end=parseInt(endLvlCTRng.value);
  let rarity;
  switch (document.querySelector('input[name="rarity"]:checked').value) {
    case 'ct-bronze': 
      rarity = "bronze";
      break;
    case 'ct-silver': 
      rarity = "silver";
      break;
    case 'ct-gold': 
      rarity = "gold";
      break;
  }
  const window = document.querySelector('.catalyst-button');
  if (end <= start) {
    window.innerHTML = "This move has reached the deisred level";
  } else {
    const result = genCalc(rarity, start, end);
    window.innerHTML = "This " + rarity + " catalyst needs " + result + " more levels to be completed";
  }
}

function genCalc(rarity, current, goal) {
  let multi;
  switch(rarity) {
    case 'bronze':
      multi = 1;
      break;
    case 'silver':
      multi = 2;
      break;
    case 'gold':
      multi = 5;
      break;
  }
    
    return addCommas((moves[goal] - moves[current]) * multi);
}

function pushList(item) {
  if (item === "move") {
    const start=parseInt(startLvlMvRng.value);
    const end=parseInt(endLvlMvRng.value);
    const name=document.getElementById('move-name').value
    let rarity;
    switch (document.querySelector('input[name="mv-rarity"]:checked').value) {
      case 'mv-bronze': 
        rarity = "bronze";
        break;
      case 'mv-silver': 
        rarity = "silver";
        break;
      case 'mv-gold': 
        rarity = "gold";
        break;
    }
    if (start >= end) alert("This move has met it's goal, and will not be added to your list");
    else if (name === '') alert('Please name this move, then try again');
    else {
      localStorage.setItem(rarity.toUpperCase() + " " + name + " " + start + " to " + end, genCalc(rarity, start, end));
      alert(name + " was added to your list");
    }
  }
  if (item==="catalyst") {
    const start=parseInt(startLvlCTRng.value);
    const end=parseInt(endLvlCTRng.value);
    const name=document.getElementById('cata-name').value
    let rarity;
    switch (document.querySelector('input[name="rarity"]:checked').value) {
      case 'ct-bronze': 
        rarity = "bronze";
        break;
      case 'ct-silver': 
        rarity = "silver";
        break;
      case 'ct-gold': 
        rarity = "gold";
        break;
    }
    if (start >= end) alert("This catalyst has met it's goal, and will not be added to your list");
    else if (name === '') alert('Please name this catalyst, then try again');
    else {
      localStorage.setItem(rarity.toUpperCase() + " " + name + " " + start + " to " + end, genCalc(rarity, start, end));
      alert(name + " was added to your list");
    }
  }
  completeList();
}

function completeList() {

  theList.innerHTML = "<ul>";
  let fullCost = 0;

  for(let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
      continue;
    }
    theList.innerHTML = theList.innerHTML + `<li>${key}: ${localStorage.getItem(key)} </li>` 
    fullCost += parseFloat(localStorage.getItem(key).replaceAll(",", ""));
  }

  theList.innerHTML = theList.innerHTML + "<li id='cost-of-all'> Cost of everything: " + addCommas(fullCost) + "</li>";
  modifyList();
}

function modifyList() {
  let listItems = theList.getElementsByTagName("li");

  for (let i=0; i < listItems.length; i++) {
    listItems[i].addEventListener("click", () => {
      console.log(listItems[i]);
      let thisKey = listItems[i].innerHTML.slice(0, listItems[i].innerHTML.indexOf(':'))
      if (thisKey === " Cost of everything") {
        if (confirm ("Do you want to delete the entire list? THIS ACTION CANNOT BE UNDONE!")){
          localStorage.clear();
          completeList();
        };
      }
      else { if (confirm ("Do you want to delete " + thisKey + "?")) {
        localStorage.removeItem(thisKey)
        completeList();
      }
      };
    })  }

}

completeList();
let totalCost = document.getElementById('cost-of-all');

totalCost.onmouseover = function(){
  theList.style = ('color: #b30303;');
}

totalCost.onmouseleave = function(){
  theList.style = ('color: #b99e56')
}

//everything past here is just arrays to help calculate the cost of things. I didn't make it easy to read, cause it would take longer than I care to.
const moves = [
  0,
  0,
  750,    //750
  2000,   //1250
  4000,   //2000
  7000,   //3000
  12000,  //5000
  21000,  //9000
  36000,  //15000
  59000,  //23000
  92000,  //33000
  137000, //45000
  187000, //50000
  262000, //75000
  387000, //125000
  587000  //200000
]

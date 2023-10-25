'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  getOrder: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; // restituisco un array di due elementi composto dall'iesimo elemento di starterMenu e l'iesimo elemento di mainMenu
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/*
const array = [1, 2, 3, 4, 5];
const [a, b, c] = array;

console.log(a, b, c);

let [primo, , secondo] = restaurant.categories;
console.log(primo, secondo);

// per scambiare il primo col secondo senza usare una variabile di comodo in cui parcheggiare un valore:
// in pratica creo un array con le due variabili estratte invertendone l'ordine e lo assegno nuovamente alle stesse variabili usando nuovamente il destructuring
[primo, secondo] = [secondo, primo];

console.log(primo, secondo);
*/
/*
let a = "ciao";
let b = "pippo";
console.log(a, b);

//scambio usando destructuring
[a, b] = [b, a];
console.log(a, b);

//chiamo getOrder e uso destructuring per valorizzare due variabili con il risultato, che è un array di due elementi
const [starter, menu] = restaurant.getOrder(1, 2);
console.log(starter, menu);

function prova() {
  return ["ciao", "da", "giggi"];
}

const [ciao, da, giggi] = prova();
console.log(ciao, da, giggi);

// posso fare anche il destructuring nel destructuring, se l'array in input ha un sottoarray
const listaNum = [1, 2, [3, 4]];
const [uno, , [tre, quattro]] = listaNum;
console.log(uno, tre, quattro);   // SALTO IL DUE E ESTRAGGO TRE E QUATTRO CHE STANNO IN UN ARRAY NELL'ARRAY
*/
/*
const { name, categories, mainMenu } = restaurant;
console.log(name, categories, mainMenu);

const mioObj = {
  propA: 'ciao',
  propB: 'da',
  propC: 'giggi',
};

const { propA, propB, propC } = mioObj;
console.log(propA, propB, propC);

// const { propA: property1, propB: property2, propC: property3 } = mioObj;
// console.log(property3, property2, property1);

const {
  propA: property1,
  propB: property2,
  propertyZZ: giggi = 'forza milan',
} = mioObj;
console.log(property1, property2, giggi);

let a = 111;
let b = 222;
const obj = { a: 20, b: 30, c: 40 };
// {
//   let { a: x, b: y } = obj;
//   console.log(x, y);
// }
({ a, b } = obj);
console.log(a, b);
*/
/*
const { openingHours } = restaurant;
console.log(openingHours);

const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

const mioObj = {
  mioSubObj: {
    prop1: 10,
    prop2: 20,
  },
};

const {
  mioSubObj: { prop1: a, prop2: b, c = '999' },
} = mioObj;
// console.log(prop1, prop2);
console.log(a, b, c);

function provaDestr({
  attr1: a = 'FORZA',
  attr2: b = 'MILAN',
  attr3: { uno, due } = { uno: 'DAJE', due: 'MEJO' },
  attr4 = '!!!',
}) {
  console.log(a, b, uno + 'gggg' + due, attr4);
}
provaDestr({
  attr1: 'ciao',
  attr2: 'da',
  attr3: {
    uno: 'gig',
    due: 'gi',
  },
});
provaDestr({
  attr4: 'EJA EJA !!!',
});
*/

/*

const mioarray = [5, 6, 7];
const nuovoArray = [1, 2, 3, 4, ...mioarray]; // AGGIUNGO TUTTI GLI ELEMENTI DI mioarray
console.log(nuovoArray);
console.log(...nuovoArray); // USO LO SPREAD OPERATOR PER SCRIVERE IN CONSOLE TUTTI I SINGOLI ELEMENTI DELL'ARRAY INVECE CHE L'OGGETTO STESSO

const newArray = [...nuovoArray, 8, 9, 10];
console.log(newArray);

const [uno, due, tre, , , , , otto, nove, dieci] = newArray;
console.log(uno, due, tre, otto, nove, dieci);

// const str = '{ "F": [100, 200, 300], "P": [300, 400] }';

// console.log(F, P);

const newArray2 = [...newArray]; // copia array
newArray2[0] = 999;
console.log(...newArray);
console.log(...newArray2);

const newArray3 = [...newArray, ...newArray2]; //concateno due array
console.log(newArray3);

const stringa = 'Ciao da';
const stringa2 = [...stringa, ' ', ...'Giggi']; // CONVERTO STRINGHE IN ARRAY PER CREARE UN ARRAY COMPLESSIVO
console.log(stringa2);
console.log(...'diretto', ...stringa);

const obj1 = {
  prop1: 'ciao',
  prop2: 'da',
  prop3: 'giggi',
};

const obj2 = { ...obj1, prop4: '!!!!' };
console.log(obj2);

const obj3 = { ...obj2 };
obj3.prop1 = 'aaa ciao';
console.log(obj2);
console.log(obj3);

*/

/*
let testjson = {
  "E": ["971"],
  "C": ["443"],
  "F": ["831", "719", "970"],
  "G": ["111", "222"],
  "storeDefault": "A"
};

let store_number = "123";
store_number = store_number.padStart(3, "0");
console.log("store_number", store_number);

//uso destructoring per separare default da tutto il resto
const { storeDefault, ...exceptions } = testjson;
console.log(storeDefault);
console.log(exceptions);

let found = false;
for (const key in exceptions) {
  console.log(key, exceptions[key]);
  if (exceptions[key].includes(store_number)) {
    store_number = key + store_number;
    found = true;
    console.log("trovato!");
    break;
  }
}
if (!found) store_number = storeDefault + store_number;
console.log("new store_number", store_number);
*/

// const [a, b, ...altro] = [1, 2, 3, 4, 5];	// destructoring in cui a = 1, b = 2 e 3, 4, 5 vengono assegnati all'array altro
// console.log(a, b);
// console.log(...altro);

// const arrayA = ['a', 'b', 'c'];
// const arrayB = ['d', 'e', 'f'];

// const [aa, , cc, ...resto] = [...arrayA, ...arrayB];
// console.log(aa, cc);
// console.log(...resto);

// let testjson = {
//   "E": ["971"],
//   "C": ["443"],
//   "F": ["831", "719", "970"],
//   "G": ["111", "222"]
// };

// const { G, ...objresto } = testjson;    // estraggo E dall'oggetto testjson e tutti gli altri oggetti li metto in objresto
// console.log(G);
// console.log(objresto);

/*
const add = function (...numbers) {
  console.log(numbers);
}

add(1, 2, 3, 4, 5);

const x = [1, 2, 3];
add(...x);

const testRest = function (primo, ...altri) {
  console.log(primo);
  console.log(altri);
}
testRest(1, 2, 3, 4, 5);
*/

// let pluto = 0;
// //const pippo = pluto || 'no pluto';
// const pippo = pluto ?? 'no pluto';
// console.log(pippo);

// const obj1 = {
//   a: 'ciao',
//   b: 0,
// };

// const obj2 = {
//   a: 'ciao',
// };

// // uso logical assignment operator per assicurarmi che entrambi gli oggetti abbiamo property b

// // obj1.b ||= 10; // forma stringata di obj1.b = obj1.b || 10, ma attenzione non funziona se b = 0
// // obj2.b ||= 10;
// obj1.b ??= 10; // forma stringata di obj1.b = obj1.b ?? 10, nullish value quindi funziona con 0
// obj2.b ??= 10;
// console.log(obj1);
// console.log(obj2);

// obj2.a &&= 'pippo'; // assegno 'pippo' se obj2.a è già valorizzato
// console.log(obj2);


/*
// const players1 = game.players[0];
// const players2 = game.players[1];
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

const [gk, ...fieldPlayers] = players1;
console.log(gk);
console.log(fieldPlayers);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

const printGoals = function (...playerNames) {
  console.log(...playerNames);
  console.log(playerNames.length);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

printGoals(...game.scored);

console.log();

team1 < team2 && console.log('team1 meglio di team2');
team2 > team1 && console.log('team2 meglio di team1');

*/
/*
const array = ['a', 'b', 'c', 'd', 'e'];
for (const elemento of array) {
  console.log(elemento);
}
for (const [i, valore] of array.entries()) {
  console.log(i + 1, valore);
}

*/
/*
const c = {
  logga(uno, due) {
    console.log(uno, due);
  },
};

const obj = {
  a: {
    logga(uno, due) {
      console.log(uno, due);
    },
  },
  b: {
    c: 'ciao',
  },
  c,
};

obj.a.logga(1, 2);
obj.b.logga?.logga(1, 2); //eseguo logga solo se non undefined e non null
obj.c?.logga(1, 2); //eseguo logga solo se non undefined e non null
*/

/*
const days = ['mon', 'tue', 'thu', 'wed', 'fri', 'sat', 'sun'];
console.log('🎉 Orari Apertura 🎉');
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`${day} - ${open}`);
}

*/

/*
const users = [{ name: 'Giggi', email: 'giggi@giggi.it' }];
console.log(users[1]?.name ?? 'non esiste');
*/
/*
for (const day of Object.keys(restaurant.openingHours)) {
  console.log(day);
}

const values = Object.values(restaurant.openingHours);
console.log(values);
*/

/*
const openingHours = restaurant.openingHours;

const entries = Object.entries(openingHours);
for (const [key, { open, close }] of entries) {
  console.log(key, open, close);
}


const stores = {
  "E": ["971"],
  "C": ["443"],
  "F": ["831", "719", "970"]
};

for (const key in stores) {
  console.log(key, ...stores[key]);
}
*/

/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

let sum = 0;
const values = Object.values(game.odds);
for (const value of values) sum += value;
console.log(`average odd: ${sum / values.length}`);

const entries = Object.entries(game.odds);
for (const [key, value] of entries) {
  console.log(`Odd of ${(game[key] && 'victory ' + game[key]) || 'draw'}: ${value}`);
}

const scorers = {};

for (const player of game.scored) {
  const score = scorers[player] ?? 0;
  scorers[player] = score + 1;
}
console.log(scorers);
*/

/*
const ordersSet = new Set(['ciao', 'da', 'giggi', 'da', 'giggi']);
console.log(ordersSet);   // doppioni eliminati !

ordersSet.add("forza");
ordersSet.delete("giggi");
//ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet)
  console.log(order)

const arrayConDuplicati = ['aa', 'bb', 'aa', 'bb', 'cc'];
const arrayUnique = [...new Set(arrayConDuplicati)];    //creo Set dell'array con duplicati e con l'operatore Spread lo espando in un array 
console.log(arrayUnique);

*/

/*
const rest = new Map();
rest.set("ciao", "da giggi");
rest.set(1, "forza");
console.log(rest.set(2, "milan"));
console.log(rest.set("lista", [1, 2, 3]).set("altro", { nome: "giggi", email: "giggi@tin.it" }));
rest
  .set('open', 11)
  .set('open', 23)
  .set(true, 'we are open :D')
  .set(false, 'we are close :(');

console.log("ciao", rest.get("ciao"));

const arr = [1, 2];
rest.set(arr, "ciao");    //aggiungo elemento con chiave = array di due elementi 
console.log(rest.get(arr));           // ottengo "ciao"

rest.set(document.querySelector("h1"), "intestazione H1");
console.log(rest);

*/
/*
const rest = new Map([
  ["primo", "primo elemento"],
  ["secondo", "secondo elemento"],
]);
console.log(rest);

const objToMap = new Map(Object.entries(restaurant.openingHours));
console.log(objToMap);
console.log(objToMap.get("thu"));
*/
/*
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);

// Quiz app
console.log(question.get("question"));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
const scelta = Number(prompt("Your answer"));
console.log(scelta);
console.log(question.get(question.get('correct') === scelta));

*/
/*
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);

// riconvertire Map in array
const mapToArray = [...question];
console.log(mapToArray);

*/
/*
let testjson = {
  "E": ["971"],
  "C": ["443"],
  "F": ["831", "719", "970"],
  "G": ["111", "222"]
};

let store = "1";
//converto obj in Map per poi iterare 
const objToMap = new Map(Object.entries(testjson));
for (const [key, value] of objToMap) {
  //console.log(key, value);
  value.includes(store) && (store = key + store)
}
console.log(store);
*/

/*
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
console.log(events);
gameEvents.delete(64);
console.log(gameEvents);

//let average = 0;
// for (const key of gameEvents.keys()) average += key;
// console.log(`An event happened, on average, every ${average / 90} minutes`);
console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`);

// BONUS rimuovo 92 e ricalcolo
const time = [...gameEvents.keys()].pop();  // converto in array e con pop ottengo 92, la lunghezza reale della partita
console.log(`An event happened, on average, every ${time / gameEvents.size} minutes`);

for (const [key, value] of gameEvents) console.log(`${key <= 45 ? '[FIRST' : '[SECOND'} HALF] ${key}: ${value} `);
*/

// const prova = "ciao ciao";
// console.log(prova[0]);
// console.log(prova.length);
// console.log("ciao"[3]);
// console.log("ciao".length);
// console.log("forza".indexOf('za'));
// const forza = "forza milan";
// console.log(forza.slice(forza.indexOf("milan")));

// let myName = "gIggI  \n\r";
// myName = myName[0].toUpperCase() + myName.slice(1).toLowerCase().trim();
// console.log(myName);

const boh = "forza milan milan milan";
console.log(boh.replace(/milan/g, "giggi"));
//console.log(boh.replaceAll("milan", "giggi"));
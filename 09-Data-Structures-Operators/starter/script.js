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
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]    // restituisco un array di due elementi composto dall'iesimo elemento di starterMenu e l'iesimo elemento di mainMenu
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

const { name, categories, mainMenu } = restaurant;
console.log(name, categories, mainMenu);

const mioObj = {
  propA: "ciao",
  propB: "da",
  propC: "giggi"
}

const { propA, propB, propC } = mioObj;
console.log(propA, propB, propC);
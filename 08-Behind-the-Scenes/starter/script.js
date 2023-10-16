'use strict';
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  function printAge() {
    const output = `You are ${age}, born in ${birthYear}`;
    console.log(output);
  }
  {
    function test() {
      console.log('ciao da', firstName);
    }
    test();
  }
  //   test();

  printAge();
  return age;
}
prima();    // si può invocare perché le dichiarazioni di function sono "hoistate"

function prima() {
  console.log("prima!");
}

console.log("firstName", firstName);    //restituisce undefined 
var firstName = 'giggi';
calcAge(1994);

console.log("provalet", provalet);
let provalet = "prova let";
*/
/*
function pippo() {
  console.log(this);

  const mioarrow = (a) => {
    console.log(a);
    console.log("in arrow", this);
  }
  mioarrow("ciao");
}
pippo();

const oggetto = {
  a: 10,
  b: (c) => {
    console.log(c);
    console.log(this);  // dentro l'arrow function this punta al primo owner regolare, in questo caso lo scope global, quindi punta a window
  },
  d: function (e) {
    console.log(e);
    console.log(this); // nel metodo dell'oggetto this punta all'oggetto, che è il suo onwer
  },
  f: function () {
    const g = () => {
      console.log("g", this); // in questo caso il this nell'arrow function punta alla function regolare che la contiene che, essendo un metodo, il suo owner è l'oggetto, quindi il this punta all'oggetto
    }
    g();
  },
  h: function () {
    function i() {
      console.log("i", this) // in questo caso il this essendo usato in una funzione regolare (non arrow) è undefined !!!  non l'oggetto come ci aspetteremmo 
    }
  }
}

oggetto.b("ciao");
oggetto.d("forza");
oggetto.f();

const hh = oggetto.f;
hh();     // in questo caso ho copiato la function e l'ho invocata, il this contenuto in essa questa volta è nella function e quindi è undefined in strict mode e window in sloppy mode  

*/

let oggetto1 = {
  a: 10,
  b: "ciao",
  c: [1, 2, 3]
}

let oggetto2 = Object.assign({}, oggetto1);  //concateno un oggetto vuoto con l'oggetto1, ottenendo un nuovo oggetto uguale come properties a oggetto1
oggetto2.b = "forza";

function mylog() {
  console.log("oggetto1", oggetto1);
  console.log("oggetto2", oggetto2);
}
mylog();

//inverto gli oggetti
const salvo = oggetto1;  // salvo riferimento a oggetto2
oggetto1 = oggetto2;     // imposto oggetto1 con riferimento a oggetto2   //non funziona con const perché il riferimento nel call stack è immutable !, devo dichiararlo let 
oggetto2 = salvo;        // imposto oggetto2 con riferimento all'oggetto1 originario salvato in salvo //idem come sopra 

mylog();

oggetto2.c[0] = 99;      // cambio primo elemento dell'array della property c di oggetto2, ma essendo stato creato con shallow copy (solo primo livello) cambierò anche array di oggetto1 perché le due property puntano allo stesso array

mylog();

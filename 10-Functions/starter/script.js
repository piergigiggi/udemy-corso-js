'use strict';

/*
const bookings = [];

const createBooking = function (flightNumber, numPassengers = 1, price = 199 * numPassengers) {

    // numPassengers = numPassengers || 1;
    // price = price || 199;

    const booking = {
        flightNumber,
        numPassengers,
        price,
    }

    console.log(booking);
    bookings.push(booking);
}

createBooking("LH123", 2, 200);
*/
/*
const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function (str) {
    const [firstWord, ...resto] = str.split(' ');
    return [firstWord.toUpperCase(), ...resto].join(' ');
}

// Higher-Order function
const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}`);
}

transformer("Ciao da giggi", upperFirstWord);

transformer("Ciao da giggi", oneWord);
*/

// return function from high-order function

/*
const ciao = function (saluto) {
    return function (nome) {
        console.log(`${saluto} ${nome} !`);
    }
}

ciao("Hey ! ciao")("giggi");
*/

// const ciao = saluto => nome => console.log(`${saluto} ${nome} !`);
// ciao("Hola")("Pippo");

/*
const oggetto1 = {
    prop1: "ciao",
    method1(nome) {
        console.log(`${this.prop1} ${nome}`)
    }
}
oggetto1.method1("giggi");
const oggetto2 = {
    prop1: "forza"
}

const method2 = oggetto1.method1;
//method2("pippo");   // errore perché il this del metodo copiato è undefined quando la function è regular e non più method
method2.call(oggetto2, "milan");
oggetto1.method1.call(oggetto2, "ehila!");
*/
/*
const method = function (nome) {
    console.log(`${this.prop1} ${nome}`);
}
const oggetto1 = {
    prop1: "ciao"
}
const oggetto2 = {
    prop1: "forza"
}
*/
// method.call(oggetto1, "oggetto1 !");
// method.call(oggetto2, "oggetto2 !");
// method.apply(oggetto1, ["oggetto1 !"]);
// method.apply(oggetto2, ["oggetto2 !"]);
// method.call(oggetto1, ...["oggetto1 !"]);
// method.call(oggetto2, ...["oggetto2 !"]);
// method.bind(oggetto1)("oggetto1 !");
// method.bind(oggetto2)("oggetto2 !");
// method.bind(oggetto1, "oggetto1 !")();
// method.bind(oggetto2, "oggetto2 !")();
/*
const lufthansa = {};

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
}
document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa));
*/
/*
const calcTassa = (perc, importo) => importo + importo * (perc / 100);
console.log(calcTassa(19, 100));
const calcTassaIVA = calcTassa.bind(null, 22);  //preimposto perc=22, il this non mi serve e lo imposto a null
console.log(calcTassaIVA(100));
*/
/*
const calcTassa = function (perc) {
    return function (importo) {
        return importo + importo * (perc / 100);
    }
}

const calcTassa22 = calcTassa(22);
console.log(calcTassa22(100));
console.log(calcTassa22(200));
const calcTassa19 = calcTassa(19);
console.log(calcTassa19(100));
console.log(calcTassa19(200));

*/

/*
const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        // let str = this.question + "\n";
        // for (const option of this.options) {
        //     str += option + "\n";
        // }
        // str += "(Write option number)";
        // const choice = Number(prompt(str));
        const choice = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));
        typeof choice === "number" && choice <= this.answers.length && this.answers[choice]++;
        this.displayResults("string");
    },
    displayResults(type = "array") {
        type === "array" && console.log(this.answers);
        type === "string" && console.log(`Poll results are ${this.answers.join(', ')}`);
    }
}
//poll.registerNewAnswer();
document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll));

const data1 = {
    answers: [5, 2, 3]
}
const data2 = {
    answers: [1, 5, 3, 9, 6, 1]
}
// poll.displayResults.call(data1)
// poll.displayResults.call(data1, "string");
// poll.displayResults.call(data2)
// poll.displayResults.call(data2, "string");
//anche così: 
poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3] }, "string");
*/
// (function () {
//     console.log("ciao");
// })();
// (() => console.log("ciao"));

/*
const prova = function (uno, due = true) {
    const tre = `ciao ${uno}`;
    return function () {
        console.log(uno, due, tre);
    };
}

console.dir(prova("ciao"));
*/

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.body.addEventListener("click", () => header.style.color = 'blue')
    header.addEventListener("click", () => { event.preventDefault(); event.stopPropagation(); header.style.color = 'red' })
})();
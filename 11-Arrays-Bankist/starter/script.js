'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {

  containerMovements.innerHTML = '';

  // uso slice per fare una copia di movements e sortare questa, altrimenti sorterei movements ! 
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    // usare literals !
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>      
      <div class="movements__value">${mov} €</div>
    </div>
    `;
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

// displayMovements(account1.movements);

const calcDisplayBalance = function (account) {

  account.balance = account.movements.reduce((acc, mov, i, arr) => acc + mov, 0);
  labelBalance.textContent = `${account.balance} €`;
}

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (account) {
  const movements = account.movements;
  const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;
  const outcomes = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;
  //const interests = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov * 0.012, 0);
  const interests = movements
    .filter(mov => mov > 0)                   // seleziono depositi 
    .map(deposit => (deposit * account.interestRate) / 100)    // calcolo interesse dell'account su ciascun deposito
    .filter(int => int >= 1)                  // seleziono solo gli interessi > 1 
    .reduce((acc, int) => acc + int, 0);      // sommo gli interessi rimasti
  labelSumInterest.textContent = `${interests} €`;
}
// calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  // versione con map + join
  //accs.forEach(acc => acc.username = acc.owner.toLowerCase().split(" ").map(name => name.at(0)).join(''));
  // versione con reduce
  accs.forEach(acc => acc.username = acc.owner.toLowerCase().split(" ").reduce((username, name) => username + name.at(0), ''));
}
createUsernames(accounts);

const balanceUSD = function (movements) {
  //const balanceUSD = movements.filter(mov => mov > 0).map(mov => Math.round(mov * 1.1)).reduce((acc, mov) => acc + mov, 0);
  // per fare debug dei singoli comandi usare l'array in input a ciascun comando: 
  const balanceUSD = movements
    .filter(mov => mov > 0)
    .map((mov, i, arr) => {
      i == 0 && console.log(arr);
      return Math.round(mov * 1.1);
    })
    .reduce((acc, mov) => acc + mov, 0);
  console.log("balance USD:", balanceUSD);
}
// balanceUSD(account1.movements);


const updateUI = function (acc) {
  // Display Balance 
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);

  // Display Movements
  displayMovements(acc.movements);
  balanceUSD(acc.movements);
}

let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(inputLoginUsername.value);
  console.log(inputLoginPin.value);
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  currentAccount && console.log(currentAccount.owner);
  // if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
  //   console.log("LOGIN !");
  // }
  //currentAccount && currentAccount.pin === Number(inputLoginPin.value) && console.log("LOGIN !");
  // anche così con OPTIONAL CHAINING: 
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log("LOGIN !");
    // Display UI e welcome message (show only the name)
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear login input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(inputTransferTo.value, inputTransferAmount.value);
  // if (inputTransferTo.value) {
  //   const accountTo = accounts.find(acc => acc.username === inputTransferTo.value);
  //   if (accountTo && inputTransferAmount.value && ) {
  //     currentAccount.movements.push(Number(inputTransferAmount.value) * -1);
  //     accountTo.movements.push(Number(inputTransferAmount.value));
  //     calcDisplayBalance(currentAccount.movements);
  //     calcDisplaySummary(currentAccount);
  //     displayMovements(currentAccount.movements);
  //   }
  // }
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferTo.value = inputTransferAmount.value = "";

  if (amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username) {
    console.log("transfer valid!");
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value = "";
  if (amount > 0 && currentAccount?.movements.some(mov => mov >= amount * 0.10)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const user = inputCloseUsername.value;
  const pin = inputClosePin.value;
  inputCloseUsername.value = inputClosePin.value = "";
  if (currentAccount?.username === user && currentAccount?.pin === Number(pin)) {
    console.log("Delete");
    const index = accounts.findIndex(acc => acc.username === user);

    // delete account
    accounts.splice(index, 1);

    // Update UI 
    containerApp.style.opacity = 0;
    // inputLoginUsername.focus();
  }
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));
// console.log("ultimo elemento array: ", arr.slice(-1));

// //const arr2 = arr.splice(2);
// // console.log("arr:", arr);
// // console.log("arr2:", arr2);
// arr.splice(-1)
// console.log(arr);

// console.log("uso at", arr.at(0));

// console.log("giggi".at(-1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const elemento of movements) {
//   console.log(`${elemento > 0 ? "withdraw" : "deposito"}`, elemento);
// }

// con metodo forEach(callback) 
// movements.forEach(elemento => console.log(`${elemento > 0 ? "withdraw" : "deposito"}`, elemento));
// same
// movements.forEach((elemento) => { console.log(`${elemento > 0 ? "withdraw" : "deposito"}`, elemento) });
// movements.forEach(e => console.log(`${e > 0 ? "withdraw" : "deposito"}`, e));

// for (const [i, elemento] of movements.entries()) {
//   console.log(`${elemento > 0 ? "withdraw" : "deposito"}`, i + 1, elemento);
// }

//versione forEach con indice 
// movements.forEach((elemento, i, array) => console.log(`${elemento > 0 ? "withdraw" : "deposito"}`, i + 1, elemento));

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (elemento, key, map) {
//   console.log(key, elemento);
// });

// const currencies = new Set(["EUR", "EUR", "USD", "GBP"]);
// console.log(currencies);
// currencies.forEach(function (elemento, _, map) {
//   //console.log(key, elemento);
//   console.log(elemento);
// });

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJulia2 = [...dogsJulia];
//   dogsJulia2.splice(0, 1);
//   dogsJulia2.splice(-2, 2);
//   //const dogs = [...new Set([...dogsJulia2, ...dogsKate])];
//   const dogs = [...new Set(dogsJulia2.concat(dogsKate))];
//   dogs.forEach((dog, i) => console.log(`Dog number ${i + 1} is ${dog >= 3 ? "a dog" : "still a puppy"}, and is ${dog} years old`));
// }

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// const calcAverageHumanAge = function (ages) {

//   let humanAges = ages.map(dogAge => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4);
//   console.log(humanAges);
//   humanAges = humanAges.filter(humanAge => humanAge >= 18);
//   console.log(humanAges);
//   //const averageHumanAge = humanAges.reduce((acc, humanAge) => acc + humanAge, 0) / humanAges.length;
//   // si puo' calcolare la media direttamente nel reduce
//   const averageHumanAge = humanAges.reduce((acc, humanAge, i, arr) => acc + humanAge / arr.length, 0);
//   console.log(averageHumanAge);
// }
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

// const calcAverageHumanAge = ages =>
//   ages
//     .map(dogAge => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)
//     .filter(humanAge => humanAge >= 18)
//     .reduce((acc, humanAge, i, arr) => acc + humanAge / arr.length, 0);

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// converto euro in dollari usando il metodo map 
// const movementsUSD = movements.map(euro => Math.round(euro * 1.1));
// console.log(...movementsUSD);
// // uso map per copiare l'array in un nuovo array
// const copia = movements.map(e => e);
// console.log(copia);

// const movementToUSD = movements.map((mov, i) => `Movement ${i + 1}: you ${mov > 0 ? "deposited" : "withdrew"} $ ${Math.round(mov * 1.1)}`);
// console.log(movementToUSD);
// movementToUSD.forEach(mov => console.log(mov));

// const user = "Pinco Pallino Rossi";

//console.log(username);

// const createUsernames = function (user) {
//   return user.toLowerCase().split(" ").map(name => name.at(0)).join('');
// }

// console.log(createUsernames(user));

// accounts.forEach(obj => obj.username = createUsernames(obj.owner));
// accounts.forEach(obj => console.log(obj.owner, obj.username));

// const createUsernames = function (accs) {
//   // versione con map + join
//   //accs.forEach(acc => acc.username = acc.owner.toLowerCase().split(" ").map(name => name.at(0)).join(''));
//   // versione con reduce
//   accs.forEach(acc => acc.username = acc.owner.toLowerCase().split(" ").reduce((username, name) => username + name.at(0), ''));
// }
// createUsernames(accounts);
// accounts.forEach(obj => console.log(obj.owner, obj.username));


// const deposits = movements.filter(mov => mov > 0);
// const withdrawal = movements.filter(mov => mov < 0);
// console.log(deposits);
// console.log(withdrawal);

// const balance = movements.reduce((acc, mov, i, arr) => acc + mov, 0);
// console.log("balance", balance);

// // calcolo valore massimo con reduce
// const maxmov = movements.reduce((acc, mov) => acc > mov ? acc : mov, movements[0]);
// console.log(maxmov);

const firstWithdraw = movements.find(mov => mov < 0);
console.log(firstWithdraw);

// trovo account con username in input
const account = accounts.find(acc => acc.username === "jd");
console.log(account);

// cerco se ci sono movimenti > 0 con some 
const anyDeposits = movements.some(mov => mov < -10000);
console.log("deposits ? ", anyDeposits);

// cerco se tutti i movimenti sono > 0 con every 
const allDeposits = account1.movements.every(mov => mov > 0);
console.log("all deposits ? ", allDeposits);

// dichiarare la callback separatamente ed usarla con più array methods !
const deposit = mov => mov > 0;
console.log(movements.filter(deposit));
console.log(movements.some(deposit));
console.log(movements.every(deposit));

// usare flat 
const arr1 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr1.flat());

// const allMovements = accounts.map(acc => acc.movements).flat();
// console.log(allMovements);
// const totalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(totalBalance);

// chaining..
const totalBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(totalBalance);

// con flatMap combino map + flat 
const totalBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(totalBalance2);

// sort movements con sort(callback)
movements.sort((a, b) => {    // sort è mutable !
  if (a > b) return 1; // non importa che valore restituisco, basta che sia maggiore di 0, in tal caso i due valori vengono scambiati 
  if (b > a) return -1; // idem come sopra, non importa il valore restituito basta che sia minore di 0, in tal caso i due valori sono già ordinati e rimangono come sono 
})
console.log(movements);

movements.sort((a, b) => a - b)
console.log([...movements]);
movements.sort((a, b) => b - a)
console.log([...movements]);

const arr3 = new Array(5)
arr3.fill("ciao", 3);
console.log(arr3);

const arrx = Array.from({ length: 7 }, () => 1);
console.log(arrx);

// const arry = Array.from({ length: 7 }, (_, i) => i + 1);
const arry = Array.from({ length: 7 }, (_, i) => ++i);
console.log("++i", arry);

const arrrandom = Array.from({ length: 100 }, (_, i) => Math.trunc(Math.random() * 6) + 1);
console.log(arrrandom);

// seleziono tutti i div con gli importi dei movimenti, il NodeList risultante lo do in input ad Array.from che me lo converte in array


labelBalance.addEventListener("click", function (e) {
  e.preventDefault()
  //const movementsUI = Array.from(document.querySelectorAll('.movements__value')).reduce((acc, mov) => acc + mov, 0);
  //const movementsUI = Array.from(document.querySelectorAll('.movements__value')).map((mov) => Number(mov.innerText.split(" ")[0])).reduce((acc, mov) => acc + mov, 0);
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace(" €", ""))).reduce((acc, mov) => acc + mov, 0);
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
})

const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositSum);

// const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;
// const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((cnt, mov) => mov >= 1000 ? cnt + 1 : cnt, 0);
const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((cnt, mov) => mov >= 1000 ? ++cnt : cnt, 0);
console.log(numDeposits1000);

// calcolo somma depositi e prelievi mettendoli in un oggetto
const { sumDepositi, sumPrelievi } = accounts.flatMap(acc => acc.movements).reduce((sums, mov) => {
  // mov > 0 ? sums.sumDepositi += mov : sums.sumPrelievi += mov;
  sums[mov > 0 ? "sumDepositi" : "sumPrelievi"] += mov;
  return sums;
}, { sumDepositi: 0, sumPrelievi: 0 });
console.log(sumDepositi, sumPrelievi);


// function per convertire una stringa in un Title: la maggior parte delle parole viene capitalize ma alcune no 
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  // mia prova, funziona quasi, le parole maiuscole le lascia in minuscolo
  // return title.split(' ').map(el => !exceptions.includes(el) ? el.toLowerCase().replace(el[0], el[0].toUpperCase()) : el).join(' ');
  // soluzione corso
  // con map
  // return title.toLowerCase().split(' ').map(word => !exceptions.includes(word) ? word[0].toUpperCase() + word.slice(1) : word).join(' ');
  // con reduce
  return title.toLowerCase().split(' ').reduce((title, word) => {
    title = title + (!exceptions.includes(word) ? capitalize(word) : word) + " ";
    return title;
  }, "");
}
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not so long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
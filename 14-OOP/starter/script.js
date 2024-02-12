'use strict';
/*
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    // MAI DICHIARARE METODI COSI': !
    // this.calcAge = function () {
    //     console.log(2037 - this.birthYear);
    // }
}

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
}

const giggi = new Person("Pierluigi", 1974);
console.log(giggi instanceof Person);
console.log(giggi.calcAge());

Array.prototype.unique = function () {
    return [...new Set(this)];
}

const mioarray = [1, 1, 2, 4, 5, 5, 6, 7];
console.log(mioarray.unique());



*/
/*
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log("speed now", `${this.speed} km/h`);
}

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log("speed now", `${this.speed} km/h`);
}

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate();
bmw.brake();
bmw.brake();

mercedes.accelerate();
mercedes.brake();
mercedes.brake();
mercedes.brake();*/
/*
class PersonCl {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
    calcAge = function () {
        console.log(2032 - this.birthYear);
    }
    // niente virgole !!
    greet = function () {
        console.log(`welcome ${this.firstName}`);
    }
}

const pippo = new PersonCl('Giggi', 1974);
console.dir(pippo);
pippo.greet(); 

*/
const account = {
    owner: 'Giggi',
    movements: [10, 20, 30, 40, 50],

    get latest() {
        return this.movements.slice(-1).pop();
    },
    set latest(mov) {
        this.movements.push(mov);
    }
}

console.log(account.latest);
account.latest = 100;
console.log(account.latest);
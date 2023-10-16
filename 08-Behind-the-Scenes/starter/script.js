'use strict';

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

var firstName = 'giggi';
calcAge(1994);

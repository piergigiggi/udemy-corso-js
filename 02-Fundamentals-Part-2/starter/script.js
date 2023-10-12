"use strict"
/*
const myarray = ['ciao', 'da', 'giggi', new Array(1,2,3), 123, (data) => {console.log(data.split("ciao"))}, "forza", "milan"];

console.log(myarray.length);
	
for (let i=0; i<myarray.length; i++){
    if (typeof myarray[i] === "number") break;
    if (typeof myarray[i] !== "string") continue;
    console.log(`${i} - ${typeof myarray[i]}`);
}

//myarray[5]("ciaociao");

for (let i=myarray.length-1; i>=0; i--){
    console.log(`${i} - ${typeof myarray[i]}`);
}

console.log("");

for (let esercizio = 1; esercizio<=3; esercizio++){
    console.log("-------inizio", esercizio)
    for (let ripetizione = 1; ripetizione<=5; ripetizione++){
        console.log(esercizio, "ripetizione: ", ripetizione);
    }
}
*/

// let i = 1;
// while (i<=10){
//     console.log(i);
//     i++;
// }

// let func = () => Math.trunc(Math.random() *6) +1;
// let dice = func();
// while(dice !== 6){
//     dice = func();
//     console.log(`lancio di dado: ${dice}`);
// }

let func = () => Math.trunc(Math.random() *6) +1;
while(func() !== 6){
    console.log(`lancio di dado`);
}
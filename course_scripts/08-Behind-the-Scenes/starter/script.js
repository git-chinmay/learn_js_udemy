'use strict';
const Jessica = {
    firstName : 'Jessica',
    lastname : 'Williams',
    family: ['Alice', 'Bob']
}

// const afterMarrigae = Jessica;
// afterMarrigae.lastname = 'Davis';
// console.log(`Before Marriage: ${Jessica.lastname}`); //Davis
// console.log(`After Marriage: ${afterMarrigae.lastname}`)//Davis

// We can get around this by using object assign function of JS

const afterMarrigae = Object.assign({}, Jessica);
afterMarrigae.lastname = 'Davis';
console.log(`Before Marriage: ${Jessica.lastname}`); //William
console.log(`After Marriage: ${afterMarrigae.lastname}`)//Davis

/* NOTE: But this object assign is for first layer menase it will not copy any object inside the object. It 
is not for deep level copy. Its a shalow copy function.
*/

//To demonostrate this
afterMarrigae.family.push('Matis');
console.log(`Before Marriage: ${Jessica.family}`); //Alice,Bob,Matis
console.log(`After Marriage: ${afterMarrigae.family}`)// Alice,Bob,Matis

//Family object is a deeply nested object which skipped by object assign function

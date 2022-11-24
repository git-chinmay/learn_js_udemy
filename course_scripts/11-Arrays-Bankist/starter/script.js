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

/////////////////////////////////////////////
/////////TX Movements Display////////////////
////////////////////////////////////////////

const displayMovements = function(movements, sort=false){

  //Emptying/clearing the container first
  //Otherwise previosu value if any will be added
  containerMovements.innerHTML = '';

  //We can not use anything else otherthan slice() to copy the array bcz we are in middle of chain operation
  //We use different variable movs to store sorted arrays as we dont want to distrurb the original movements array
  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;

  movs.forEach(function(mov, i){

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov} eur</div>
      </div>`;

    //Attaching the above changes to html file
    containerMovements.insertAdjacentHTML('afterbegin', html)
  });
}



//Display the balance of account
const calcDisplayBalance = function(currentAccount){
  currentAccount.balance = currentAccount.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${currentAccount.balance} EUR`;
}



const calcDisplaySummary = function(acc){
  const totalIn = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  const totalOut = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${totalIn} eur`;
  labelSumOut.textContent = `${Math.abs(totalOut)} eur`;

  //Let Bank gives 1.2% interest on every deposit(A bank in dreamland)
  //ANd bank only pays it if its value  more than 1 euro.
  const interest = acc.movements.filter(mov => mov>0).map(deposit => deposit * acc.interestRate/100).filter(int => int >= 1).reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest} eur`;
}



const createUserName = function(user){
  const userName = user.toLowerCase().split(' ').map(word => word[0]).join('');
  return userName;
}

//const userName = user.toLowerCase().split(' ').map(function(word){ return word[0];}).join('');
//console.log(createUserName('Steven Thomas Williams'));
//To compute the accounts and crate a username key with usernames
//(We will use forEach as we dont need to return any array so no map use here.)

const createUsername = function(account_array){
  account_array.forEach(function(account){
    account.userName = account.owner.toLowerCase().split(' ').map(word => word[0]).join('');
  });
}

//const accounts = [account1, account2, account3, account4];
createUsername(accounts);
//console.log(accounts);

//Update UI
const updateUI = function(currentAccount){

    //Display Movements
    displayMovements(currentAccount.movements);

    //Display Balance
    calcDisplayBalance(currentAccount);
    
    //Display Summary
    calcDisplaySummary(currentAccount);
}

//Event Handler for Login
let currentAccount;
btnLogin.addEventListener('click', function(e){
  //in form type the submit action bydefault reload the page
  //To prevent it here so that we can print & see the 'LOGIN'
  e.preventDefault();
  

  //validate the input username
  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);
  //console.log(`Current Account: ${currentAccount.userName}`);

  //Validate the PIN(? checks if currentAccount exist first before checking pin)
  if(currentAccount?.pin === Number(inputLoginPin.value)){
    console.log(`${currentAccount.owner} Loggedin`);

    //Display UI & Message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //Calling Update UI to display the changes
    updateUI(currentAccount);

    //clearing login fields
    inputLoginUsername.value = inputLoginPin.value = '';
    
    //To hide the cursor blinking from input pin field
    inputLoginPin.blur();

  }
})

/////////////////////////////////////////////
// Implementing the amount transfer mechanism
/////////////////////////////////////////////

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);
  console.log(receiverAcc, amount);

  //Crucial checks before transfer
  if(amount > 0 && 
    currentAccount.balance >= amount && 
    receiverAcc && 
    receiverAcc.userName !== currentAccount.userName){
    console.log("Valid Transfer!")

    //Doing the Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Calling Update UI to display the changes
     updateUI(currentAccount);

  }

  //Clenup the Transfer card fileds
  inputTransferTo.value = inputTransferAmount.value = '';
})



////////////////////////////////////////////
///////Impelementing Loan functionality/////
///////////////////////////////////////////

//LOAN Condition = atleast one deposit should be 10% of loan amount
btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const loan_amount = Number(inputLoanAmount.value);
  //Lets find if any existing deposit amount is 10% of requested loan amount
  const check = currentAccount.movements.some(mov => mov >= loan_amount * 0.1);

  if (loan_amount > 0 && check){
    console.log('loan approved.')

    //Deposit the loan amount
    currentAccount.movements.push(loan_amount);

    //Update the UI
    updateUI(currentAccount);

    //Remove the cursor from loan field
    inputLoanAmount.value = '';
  }
  else{
    console.log('loan rejected.')
  }
})



//////////////////////////////////////////
//////////////Close Account//////////////
/////////////////////////////////////////
btnClose.addEventListener('click', function(e){
  e.preventDefault();
  const Cuser = inputCloseUsername.value;
  const Cpin  = Number(inputClosePin.value);
  if(Cuser && Cuser ===  currentAccount.userName && Cpin && Cpin === currentAccount.pin){
    
    const index = accounts.findIndex(acc => acc.userName === currentAccount.userName);
    //Delete the account
    accounts.splice(index, 1);
    console.log("Account Deleted");

    //Hide the App
    containerApp.style.opacity = 0;
  }

  //Clear the form fields orelse it will showup for othere user login
  inputCloseUsername.value = inputClosePin.value = '';
})




////////////////////////////////////////////////
/////////////Sort thr trnasactions/////////////
//////////////////////////////////////////////

let sortedState = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState
  
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// let arr = [1,2,3,4,5,6]
// console.log(arr.splice(2))
// //console.log(arr.slice(2))
// console.log(arr)

// console.log(arr.splice(1,3));
// console.log(arr);

// const arr1 = ['a', 'b', 'c'];
// console.log(arr1.join('-'));
// const x = arr1.join('-');
// console.log(typeof(x));
// console.log(arr1);
// const arr2 = [1,2,3];
// console.log(arr2.join('*'));


/*
////// Coding challenge //////
const display = function(age, idx){
  const adult_puppy = age >= 3 ? `Dog number ${idx+1} is an adult, and is ${age} years old.`:`Dog number ${idx+1} is still a puppy.`;
  console.log(adult_puppy);
}

const checkDog = function(dogsJulia, dogsKale){
  let dogsJulia_copy = dogsJulia.slice();
  dogsJulia_copy.splice(0,1); //Remove first array element
  dogsJulia_copy.splice(-2); //Remove last two array element

  const dogs = dogsJulia_copy.concat(dogsKale);
  dogs.forEach(function(age, idx){ display(age, idx); });
}

const dogsJulia = [3,5,2,12,7];
const dogsKale = [4,1,15,8,3];

checkDog(dogsJulia, dogsKale);
*/




/*
//// Data Transformation //////
const Euro = [200, 400, 3000];
const Usd = Euro.map(function(eur){
  return eur * 1.1;
})

console.log(Usd);

//Replacing callback with arrow function

const USD = Euro.map(eur => { return eur * 1.1});
console.log(USD);

const sideeffect1 = Euro.forEach(function(i){return i + 1;});
console.log(sideeffect1);

const sideeffect2 = Euro.map(function(i){return i + 1});
console.log(sideeffect2);
*/


/*
//// Filter method
console.log(`movements array: ${movements}`);
console.log("Filtering out the -ve samples");
const onlyDeplosits = movements.filter(function(amount){ return amount>0})
console.log(onlyDeplosits);
//With arrow
const onlyDeplositsArr = movements.filter(amount => amount>0)
console.log(onlyDeplositsArr);
*/




/*
//// REDUCE METHOD
console.log(`movements array: ${movements}`);
const totalBalance = movements.reduce(function(acc, val, idx, arr){
  //console.log(`Iter ${idx} : current val ${val} : Accum ${acc}`)
  //return acc + val;
  let summ = acc + val;
  console.log(`Iter ${idx} : current val ${val} : Accum ${acc} : Current Total ${summ}`);
  return summ;
}, 0);
console.log(`total balance: ${totalBalance}`);

// Doing it with arrow function
const totalBalanceArr = movements.reduce((acc, val) => acc + val, 0);
console.log(`total balance with arrow: ${totalBalance}`);


// Getting same with for-of
let acc = 0; 
for (const iter of movements) {acc += iter; console.log(acc);}

//Getting the MAX value of array using Reduce
const max = movements.reduce((acc, mov) => {
  if(acc > mov){return acc}
  else {return mov}
}, movements[0]);
console.log(`Movements array ${movements}`);
console.log(`Max value of movemets ${max}`);
*/



/*
/// COADING CHALLENGE  /////////////

// Converting dog ages to human ages

function calcAverageHumanAge(dogAges){

  console.log(`Dog ages ${dogAges}`);

  // const humanAges = dogAges.map(dage => {
  //   if (dage <= 2) 
  //   { 
  //      return 2 * dage;
  //   }
  //   else {
  //     return 16 + dage *4;
  //   }
  // });

  const humanAges = dogAges.map(dage => dage <= 2 ? 2 * dage : 16 + dage * 4);


  console.log(`Coresponding Human ages ${humanAges}`);

  // Adult dogs based on Human age
  const dogAgesFiltered = humanAges.filter(hage => hage >= 18);
  console.log(`Filtered Dog list ${dogAgesFiltered}`)

  //Average Humanage of adult dogs
  const avgHumanDogAge = dogAgesFiltered.reduce((acc, val) => acc + val, 0) / dogAgesFiltered.length;
  // const avgHumanDogAge = dogAgesFiltered.reduce(function(acc, val){
  //   acc + val
  // },0) / dogAgesFiltered.length;

  console.log(`Average human age of adult dogs ${avgHumanDogAge}`);


}

console.log(calcAverageHumanAge([5, 2,4,1,15,8,3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

*/

/*
const ar = [10, 20, 30];
// const op = ar.map(val => val * 2); // [20, 40, 60]
//const op = ar.map(val => {val * 2}); // undefined, undefined, undefined
//const op = ar.map(val => {if (val > 10) return val * 2;}); // undefined, 40, 60 As it goes over each element
//const op = ar.map(function(val){if (val > 10) return val * 2;})
const op = ar.forEach(function(val){if (val > 10) {console.log( val * 2)}})
console.log(op);
*/

/*

/// PIPELINING OR CHAINING

// Take movements array, extract deposists , convert to USD and show the total

const totalInUSD = movements.filter(mov => mov > 0).map(mov => mov * 1.1).reduce((acc, mov) => acc + mov);
console.log(`Total Deposist in UDS: ${totalInUSD}`);
*/


/*
//// COADING CHALLENEG /////
//Performing humanAgeCalc using chanining

function calcAverageHumanAge(dogAges){

  console.log(`Dog ages ${dogAges}`);
  const avgHumanDogAge = dogAges.map(dage => dage <= 2 ? 2 * dage : 16 + dage * 4).filter(hage => hage >= 18).reduce((acc,age,i,arr) => acc + age/arr.length, 0);
  console.log(`Average human age of adult dogs ${avgHumanDogAge}`);


}

//As arrow
//const calcAverageHumanAge = ages => ages.map(dage => (dage <= 2 ? 2 * dage : 16 + dage * 4)).filter(hage => hage >= 18).reduce((acc,age,i,arr) => acc + age/arr.length, 0);



console.log(calcAverageHumanAge([5, 2,4,1,15,8,3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

*/


/*
/// find method
console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/


/*
///flat method
const arr = [1,2,[3,4], [5,6], 7,8,9]
console.log(arr.flat());

const arrDeep = [1,2,[3,[4]], [5,[6]], 7,8,9]
console.log(arrDeep.flat(2)); //deep level =2, default =1

const arrDeep2 = [1,2,[3,[4]], [[5,[6]]], 7,8,9]
console.log(arrDeep.flat(3)); //deep level =2, default =1

// Calculating whole bank's account balance

const overallBalance = accounts.map(mov => mov.movements).flat().reduce((acc, bal) => acc + bal, 0);
console.log(`The overall Bank balance of th BANK: ${overallBalance}`);

//Flatmap = It performs map operation then got for flat
//Note: Its only works on one level deeper. Multi level we need to still use map() & Flat() separately

const overallBalance2 = accounts.flatMap(mov => mov.movements).reduce((acc, bal) => acc + bal, 0);
console.log(`The overall Bank balance of th BANK: ${overallBalance2}`);
*/


/////////Create an total sum of deposit & Withdrawl using Reduce()
// const sums = accounts.flatMap(accts => accts.movements).reduce((sums, cur) => {
//                       //cur > 0 ? sums.deposits += cur : sums.withdrawls += cur
//                       //More cleaner way
//                       sums[cur > 0 ? 'deposits': 'withdrawls'] += cur;
//                       return sums}, 
//                       {deposits:0, withdrawls:0});

// console.log(sums);

// //// Title case converter
// //Ex: this is a tile -> This Is a Title

// //TYPE-1
// const result = function(inputTitle){
//   const exceptionList = ['a', 'an', 'the', 'but', 'in', 'on', 'with'];
//   let titleArray = []
//   const inputTitleSplit = inputTitle.toLowerCase().split(' ').forEach(word => {
//     if(exceptionList.includes(word)){
//       titleArray.push(word)
//     }
//     else{
//       let wrd = word.split('')
//       wrd[0] = wrd[0].toUpperCase()
//       titleArray.push(wrd.join(''));
//     }
//   })
  
//   return titleArray.join(' ');
// }

// //TYPE-2
// const result1 = function(inputTitle){
//   const exceptionList = ['a', 'an', 'and', 'the', 'but', 'in', 'on', 'with'];
//   const captilised = str => str[0].toUpperCase() + str.slice(1)
//   const inputTitleSplit = inputTitle.toLowerCase().
//                                     split(' ').
//                                     map(word => exceptionList.includes(word)? 
//                                     word : captilised(word)).join(' ');

//   return captilised(inputTitleSplit);
// }
// console.log(result1('this is a nice title'));
// console.log(result1('this is a LONG title but not too long'));
// console.log(result1('and here is another title with an EXAMPLE'));


////// CODING CHALLENGE ////////////

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  ];

//recommendedFood = weight ** 0.75 * 28. (The result is in grams of
//food, and the weight needs to be in kg)

//TASK-1
dogs.forEach( dog => {
  dog['recommendedFood'] = Math.trunc(dog.weight ** 0.75 * 28);
});

console.log(dogs);

//TASK-2
//Print if Sarah's dog eats too little or too less

//Filter method will return the object in a list(So below is the solution)
const Sarah_dog = dogs.filter(dog => dog.owners.includes('Sarah'))
console.log(Sarah_dog)
console.log(`Sarah's dog eating too ${Sarah_dog[0].curFood>Sarah_dog[0].recommendedFood ? 'much':'little'}.`);

//Find will directly retunr the object
// const Sarah_dog = dogs.find(dog => dog.owners.includes('Sarah'))
// console.log(Sarah_dog)
// console.log(`Sarah's dog eating too ${Sarah_dog.curFood>Sarah_dog.recommendedFood ? 'much':'little'}.`);


//TASK-3
// Create an array containing all owners of dogs who eat too much('ownersEatTooMuch') 
//and an array with all owners of dogs who eat too little('ownersEatTooLittle').


const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recommendedFood).flatMap(dog => dog.owners)
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recommendedFood).flatMap(dog => dog.owners)
console.log(ownersEatTooLittle);

//TASK-4
//Log a string to the console for each array created in 3., like this: "Matilda and
//Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

//TASK-5
// Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)

console.log(`${dogs.some(dog => dog.curFood === dog.recommendedFood)}`)

//TASK-6
// Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
//Apply this rule current > (recommended * 0.90) && current < (recommended *1.10)

console.log(`${dogs.some(dog => dog.curFood > dog.recommendedFood * 0.90 && 
                                dog.curFood < dog.recommendedFood * 1.10)}`)

//TASK-7
// Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)

const dogsOKAmtFood = dogs.filter(dog => dog.curFood > dog.recommendedFood * 0.90 && 
                                  dog.curFood < dog.recommendedFood * 1.10);
console.log(dogsOKAmtFood);

//TASK-8
// Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects 😉)
const dogsCopy = dogs.slice();
console.log(dogsCopy.map(dog => dog.recommendedFood).sort());

//2nd Approach
const dogsCopy2 = dogs.slice().sort((a,b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopy2);
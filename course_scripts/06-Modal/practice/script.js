'use strict';

const btnShowModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');


//seq-3
const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}


const openModal = function(){
   
    //To see the modal(pop up card) we need to remove the hidden class
    modal.classList.remove('hidden');
    //Overlay will blur the background
    overlay.classList.remove('hidden');
}


//Looping through the multielemnt

//seq-1
// for (let i=0; i<btnShowModal.length; i++){
//     console.log(btnShowModal[i].textContent);
// }

//seq-2
// for (let i=0; i<btnShowModal.length; i++){
//     btnShowModal[i].addEventListener('click', function(){
//         console.log("Button clicked.");
//         //To see the modal(pop up card) we need to remove the hidden class
//         modal.classList.remove('hidden');
//         //Overlay will blur the background
//         overlay.classList.remove('hidden');
//     });
// }

for (let i=0; i<btnShowModal.length; i++){
    btnShowModal[i].addEventListener('click', openModal);
}


//To close the popup card
btnCloseModal.addEventListener('click', closeModal)

// To close when we select on overrelay
overlay.addEventListener('click', closeModal)


// seq-4 Listening to key press event
// document.addEventListener('keypress', function(){
//     console.log("A key was pressed.")
// })

//seq-5 we want to take action based on Escape key
// It will pass an event object which cotains information about the key
// This will print the key name on console when you pressed the key
// document.addEventListener('keypress', function(e){
//         console.log(e.key)
//     })

//seq-6
// We will now close the modal if certain key pressed
document.addEventListener('keydown', function(e){
    console.log(e.key)
    //modal class doen not have hidden means the popup is open
    if (e.key === "Escape" && !modal.classList.contains('hidden')){
        closeModal();
    }
})
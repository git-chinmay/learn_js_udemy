'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


///////// SMOOTH SCROLLING ///////////////

btnScrollTo.addEventListener('click', function(e){

  //////OLD METHOD//////

  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords);
  //To see cordinates of clcked button
  console.log(e.target.getBoundingClientRect());
  //To see the current scroll cordinate
  console.log(`current scroll(X/Y): ${window.pageXOffset},${window.pageYOffset}`);
  //[FUN] o see the height & width of viewport(the webpage in console page)
  console.log(`The height-width of viewport: ${document.documentElement.clientHeight},
  ${document.documentElement.clientWidth}`);

  //Scroll to section1
  //window.scroll(s1cords.left, s1cords.top); //This has some issue
  //We need current position + current scroll
  //window.scroll(s1cords.left + window.pageXOffset,s1cords.top + window.pageYOffset);

  //To make it smooth
  // window.scroll({left: s1cords.left + window.pageXOffset,
  //               top: s1cords.top + window.pageYOffset,
  //               behavior:"smooth"})

  //// NEW METHOD(worked on only modern browser) /////
  section1.scrollIntoView({behavior:'smooth'});
})

///////////////////////////////////////////////////
//////// PAGE NAVIGATION /////////////////////////
/////////////////////////////////////////////////
//method-1 - It works but not efficinet as we are looping through all elemets each time
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();//To prevent scrolling due to anchor elements
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   })
// })

//method-2
//1- Add an event listner to a parent element
//2- Apply the scroll to the target element

document.querySelector('.nav__links').addEventListener('click', function(e){

  //Matching strategy(Only scroll when click event generated from the target not anywhere else in parent)
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
})


//////////////////////////////////////////////////
////////////////////////TABBED CONTAINER//////////
/////////////////////////////////////////////////
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');

//Add a click event to the container so that it captures the clicks
tabContainer.addEventListener('click', function(e){
  //e.target will just give the specifc target means span will come if someone just click on No1 in tab-1
  //We need only the button class one so lets go for parent elemen
  const clicked = e.target.closest('.operations__tab')
  console.log(clicked);

  //Remove the activation from all tabs. Just keep the keep the clicked one elevated
  tabs.forEach(t=>t.classList.remove('operations__tab--active')); 
  clicked.classList.add('operations__tab--active');

  //Actvate contents based on Tab clicked
  const tabContents = document.querySelectorAll('.operations__content');


  //FIrst Remove all active content otherwise it will get stacked for each click
  tabContents.forEach(content => content.classList.remove('operations__content--active'));

  //console.log(clicked.dataset.tab)
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
  

});










///////////////////////////////////////////////////
//////////////////////////////////////////////////
////////////Practice/////////////////////////////

console.log(document.getElementById('section--1'));
console.log(document.getElementsByTagName('button'));

//CREATING A DOM ELEMENT AND ADDING IT TO THE DOM Obj
const message = document.createElement('div'); //isolate elemnt created
message.classList.add('cookie-message'); //A class attached to it
//message.textContent = 'cokkies for analytics'; // Adding to text content
message.innerHTML = 'cookies for analytics.<button class = "btn btn--close-cookies">Got It!</button>'
//Adding it to the header of the HTML
const header = document.querySelector('.header');
//header.prepend(message); //-- add it as first chile
header.append(message); // Adding it as last child
//header.before(message);
//header.after(message); // Adding after the header

/// DELETE ELEMENTS
//New way using remove()
//document.querySelector('.btn--close-cookies').addEventListener('click', function(){message.remove()});
//OLD ways before remove() -- first select parent element then remove child from that
document.querySelector('.btn--close-cookies').addEventListener('click', function(){
  message.parentElement.removeChild(message); //This technique called DOM Traverse
});



/////STYLE///////

//Set the background color of cookie banner
message.style.backgroundColor = '#37383d';
//Set the width
message.style.width = '120%';

//Reading the CSS file element
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height); //49px

//Set the height
console.log(message.style.height); //Nothing becz its reading inline data and we have not set anything for height yet
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
console.log(message.style.height);

//Set the CSS variables/cutom properties
document.documentElement.style.setProperty('--color-primary','green');

////ATTRIBUTES/////
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
//Non standard attribute
console.log(logo.getAttribute('designer')); //Chinmay
console.log(logo.designer);//undefined as its reads only standard attributes

////DATA ATTRIBUTS////
console.log(logo.dataset.versionNumber);






////// EVENTS ////////////////

//mouseenter
const h1 = document.querySelector('h1');
//h1.addEventListener('mouseenter', function(e){alert('addEventLisner: Gret!')});

//Other approach
//h1.onmouseenter = function(e){alert('oneventproperty: Great!')};

//Removing Alertevent
const alertFunction = function(e){alert('Hello ALert!!!')}
h1.addEventListener('mouseenter', alertFunction);
//h1.removeEventListener('mouseenter', alertFunction)
setTimeout( () => h1.removeEventListener('mouseenter', alertFunction), 3000)


//////Event Bubbling testing by generating random colors

//Generate random inetger
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
//Generate random rgb //rgb(255,255,255)
const randomColor = () => `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`
console.log(randomColor());

//On particular nav option
document.querySelector('.nav__link').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  //this = document.querySelector('.nav_link')
  //Just this run this line on console & see the coclor change document.querySelector('.nav__link').style.backgroundColor = randomColor();
  
  // console.log('LINK', e.target)
  // console.log('LINK CUrrent Traget', e.currentTarget);

  //To stop the propagation(IN practice its not good idea to do the stopping, sometimes used to bug fix)
  //e.stopPropagation();
})

//On total nav option lists (nav_links is the parent element of nav_link)
document.querySelector('.nav__links').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  // console.log('CONTAINER', e.target)
  // console.log('CONTAINER CUrrent Traget', e.currentTarget);
})

//On total nav bar (nav is the parent element of nav_links)
document.querySelector('.nav').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  // console.log('NAV', e.target)
  // console.log('NAV CUrrent Traget', e.currentTarget);
})

//e.target = target is the pointing to the element where click event happened.
//e.currenttraget = current target point to the lement where eventHandler attached


/////EVENT CAPTURE PHASE
//Capturing phase is actually useless for us.
//We can see the captuing by enabling 3rd parameter of addEventLister to tru
//addEventListner('click', function(e){},true) --> By default its false mease we ant to see Bubbling



///// DOM TRAVERSING /////////////
const hd= document.querySelector('h1');
console.log(hd)

//Going downward: the child

console.log(hd.querySelectorAll('.highlight'));
//We also can get it othere way
console.log(hd.childNodes);
//Another way (but it works only on direct child elements) -. It gives HTML Collections not Nodelist
console.log(hd.children);

//We can also set the properties of the child elements
hd.firstElementChild.style.color = 'blue';
hd.lastElementChild.style.color = 'magenta';

//Going upward: The Parent

//These are direct parents
console.log(hd.parentNode);
console.log(hd.parentElement);

//To find a parent element no matter how far it present in DOM tree
//Find the closest parent element of class header
//Setting up color from css custom style declared in css file
//hd.closest('.header').style.background = 'var(--gradient-primary)'

//NOTE: closest is do opposite of queryselector
//Both accept input string while querySelector finds the nearest child element
//closest seraches the nearest parent element

//Going sideways: The siblings
console.log(hd.previousElementSibling); // null here as this is the first child element
console.log(hd.nextElementSibling); //h1 is first child & h4 is its first sibling

//otherway
console.log(hd.previousSibling);
console.log(hd.nextSibling);

//Lets do something with sibling
console.log(hd.parentElement.children); //HTML collection
//convert it to array
[...hd.parentElement.children].forEach(function(el){
  if(el !== hd) {
    el.style.transform = 'scale(0.5)';
  }
});


//PASSING EVENT As AN ARGUMENT
// OPTION FADING ANMATION

const handleMouseHovering = function(e, opacityLabel){
    //using event delegation
    if(e.target.classList.contains('nav__link')){
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');
  
      siblings.forEach(el => {
        if(el !== link){
          el.style.opacity = opacityLabel;
          //el.style.opacity = this; //Use this when we use bind method
        }
      });
  
      logo.style.opacity = opacityLabel;
      //logo.style.opacity = this; //Use this when we use bind method
    }

}

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function(e){
  handleMouseHovering(e, 0.5);
});

nav.addEventListener('mouseout', function(e){
  handleMouseHovering(e, 1);
});

//Another way is using "bind" method
//Only change is we have to replace he opacityLabel with 'this' keyword
// nav.addEventListener('mouseover', handleMouseHovering.bind(0.5));
// nav.addEventListener('mouseout', handleMouseHovering.bind(1));


//// STICKY NAV WITH SCROLL EVENT /////////////

// where to start stickyness ans: at start of section-1
//SO we need section-1 cordinates

// const section1_cord = section1.getBoundingClientRect();

// window.addEventListener('scroll', function(e){
//   //console.log(e);
//   //console.log(window.scrollY);
//   //console.log(window.scrollX); always 0 as no horaizental scrolling
//   //We can remove the argument 'e' as it has no use here
//   if (window.scrollY > section1_cord.top){
//     nav.classList.add('sticky')
//   }
//   else{
//     nav.classList.remove('sticky')
//   }
// })

// This is inefficient as it generating tons of events and will cause problem in mobile devices. We will 
//use Observer Intersection api




/// GET TO KNOW OBSERVER INTERSECTION API /////

// const obsCallback = function(entries, observer){
//   entries.forEach(entry => console.log(entry))
// }

// const obsOptions = {
//   root:null,
//   //threshold: 0.10
//   threshold: [0, 0.2]
// }
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);



//////STICKY NAV: INTERSECTION API

//Where to intersect ? header

const obsTargetHeader = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const obsCallback = function(entries){
  const entry = entries[0];
  console.log(entry);

  //When header is not intersecting(false) then I want to see the nav
  if(!entry.isIntersecting){
    nav.classList.add('sticky')
  }
  else{
    nav.classList.remove('sticky')
  }

}

const obsOptions = {
  root: null,
  threshold: 0,
  //rootMargin: '-90px' //Navigation will appear 90px before the header taraget
  rootMargin: `-${navHeight}px`
}

const observerHeader = new IntersectionObserver(obsCallback, obsOptions);
observerHeader.observe(obsTargetHeader);
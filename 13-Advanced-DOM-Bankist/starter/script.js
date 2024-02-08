'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnToSection1 = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
// btnToSection1.addEventListener('click', function (e) {
// const coords = section1.getBoundingClientRect();
// window.scrollTo(coords.left + window.pageXOffset, coords.top + window.pageYOffset);
// window.scrollTo({
//   left: coords.left + window.scrollX,
//   top: coords.top + window.scrollY,
//   behavior: 'smooth'
// });
// section1.scrollIntoView({
//   behavior: "smooth"
// })
// });
btnToSection1.onclick = function () {
  const coords = section1.getBoundingClientRect();
  section1.scrollIntoView({
    behavior: "smooth"
  });
}


// PAGE NAVIGATION 
// document.querySelectorAll('.nav__link').forEach(link => link.addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log(e.target.textContent);
//   // uso href dell'anchor (per esempio "#section--1") come selettore del section
//   // uso getAttribute('href') perchè mi restituisce l'url relativo, e quindi solo #section--1, mentre href mi restituisce url assoluto !
//   document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: "smooth" });
// }));
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target.textContent);
  // controllo che il target sia quello giusto perché il container potrebbe avere altri elementi sui quali non voglio gestire l'evento 
  e.target.classList.contains('nav__link') && document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: "smooth" });
});

// TABBED COMPONENT 

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // guard clause 
  if (!clicked) return;

  console.log(clicked.className, clicked.dataset.tab);
  // tolgo active a tutti e poi lo metto a quello giusto 
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // activate content uso il data-tab 
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

// MENU FADE ANIMATION

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // risalgo a nav e poi trovo tutti gli anchor 
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // stessa cosa per l'immagine, torno al nav e poi giu di nuovo all'img
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => el !== link && (el.style.opacity = this.opacity));
    logo.style.opacity = this.opacity;
  }
}

// uso elemento NAV class .nav per fare event delegation e gestire gli anchor e l'img contenuti in esso 
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', handleHover.bind({ opacity: 0.5 }));
nav.addEventListener('mouseout', handleHover.bind({ opacity: 1 }));

// STICKY NAVIGATION
// PRIMO MODO- USARE EVENTO SCROLL DI WINDOW - POCO EFFICIENTE ! 
// recupero posizione della section1, quando il top del viewport > del top del section1 mostro la barra
/*
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function (e) {
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

// SECONDO METODO - USARE IntersectionObserver !
// const callback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// }
// const opt = {
//   root: null,       //specifico l'elemento che andrà a intersecare l'elemento osservato. se null è il viewport !
//   threshold: [0, 0.2]    //percentuale (in decimi, 0.1=10%) di intersezione che farà eseguire il callback. posso passare anche un array. 
// }
// const observer = new IntersectionObserver(callback, opt);
// observer.observe(section1);
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;   // ottengo altezza nav

const stickyNav = function (entries) {
  const entry = entries[0];
  // const [entry] = entries; //stessa cosa usando spread ma non si capisce..
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const opt = {
  root: null,       //specifico l'elemento che andrà a intersecare l'elemento osservato. se null è il viewport !
  threshold: 0,    //percentuale (in decimi, 0.1=10%) di intersezione che farà eseguire il callback. posso passare anche un array. 
  rootMargin: `-${navHeight}px` //margine del root, togliendo esattamente la dimensione del navbar faccio in modo che raggiunga threshold 0 90 pixel prima che finisca l'header.
}
const headerObserver = new IntersectionObserver(stickyNav, opt);
headerObserver.observe(header);

// REVEAL SECTIONS
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;  // se l'entry non è di intersezione esco

  entry.target.classList.remove('section--hidden'); //rimuovo il class hidden in modo da mostrare la sezione 
  observer.unobserve(entry.target);  // una volta mostrata la sezione non mi serve più osservarla e quindi la tolgo dall'observer
}
const allSections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,

});
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// LAZY IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;  // se l'entry non è di intersezione esco

  const img = entry.target;
  img.src = img.dataset.src;
  img.addEventListener('load', function (e) {
    img.classList.remove('lazy-img');
  });
  observer.unobserve(img);
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});
imgTargets.forEach(img => imgObserver.observe(img));

// SLIDER COMPONENT
const slides = document.querySelectorAll('.slide');
slides.forEach((slide, i) => slide.style.transform = `translateX(${100 * i}%)`);

/*
const h1 = document.querySelector('h1');
const fnMouseEnter = function (e) {
  alert("ciao da giggi");
  // h1.removeEventListener('mouseenter', fnMouseEnter);
}
h1.addEventListener('mouseenter', fnMouseEnter);

setTimeout(() => h1.removeEventListener('mouseenter', fnMouseEnter), 5000);

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookie for improved functionality and analytics. ';
message.innerHTML = 'We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
const header = document.querySelector('.header');
// header.prepend(message);
// header.append(message.cloneNode(true));
header.append(message);
// header.querySelectorAll('.cookie-message')

header.querySelector('.btn--close-cookie').addEventListener('click', function (e) {
  message.remove();
});
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
//CSS custom pro
document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav__logo');
console.log('src', logo.src);   // url assoluto
console.log('get src', logo.getAttribute('src')); // url relativo

// DATA ATTRIBUTES 

*/
/*
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
//rgb(255, 255, 255)
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
// console.log(randomColor())

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // fermo propagazione, meglio, bubbling 
  // e.stopPropagation();
  console.log('LINK');
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINKS');
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV');
}, true);
*/
/*
const handleClick = function (e) {		// devo per forza dichiarare solo il parametro e
  console.log(e.target.src, this.param);
}
document.querySelector('.nav__logo').addEventListener('click', handleClick.bind({ param: "giggi" }));
*/
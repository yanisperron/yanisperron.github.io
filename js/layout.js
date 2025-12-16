const nav = document.querySelector('.nav-wrapper');
const u = document.querySelector('.underline');
const links = nav.querySelectorAll('a');
const currentPage = window.location.pathname.split('/').pop();
const images = ["https://i.imgur.com/t6wMlZt.jpeg","https://i.imgur.com/B3MnaEZ.jpeg","https://i.imgur.com/sEuOblP.jpeg","https://i.imgur.com/egC7PA8.jpeg","https://i.imgur.com/fkIATkz.jpeg"];
const randomImg = images[Math.floor(Math.random() * images.length)];
console.log(randomImg);

// EFFET SUR LA NAVBAR

let activeLink = null;
links.forEach(link => {
  if (link.getAttribute('href') === currentPage) activeLink = link;
});

function setUnderline(el) {
  if (!el) return;
  u.style.width = el.offsetWidth + 'px';
  u.style.left = el.offsetLeft + 'px';
}

window.addEventListener('load', () => setUnderline(activeLink));
nav.addEventListener('mouseover', e => {
  if (e.target.tagName === 'A') setUnderline(e.target);
});
nav.addEventListener('mouseleave', () => setUnderline(activeLink));
window.addEventListener('resize', () => setUnderline(activeLink));


// IMAGE RANDOM

document.querySelector("img").src = randomImg;

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav-wrapper");
  if (window.scrollY > 50) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});

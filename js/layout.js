const nav = document.querySelector('.nav-wrapper');
const u = document.querySelector('.underline');

nav.addEventListener('mouseover', e => {
  if(e.target.tagName !== 'A') return;
  const r = e.target.getBoundingClientRect();
  u.style.width = r.width + 'px';
  u.style.left = e.target.offsetLeft + r.width/2 + 'px';
});

nav.addEventListener('mouseleave', () => {
  u.style.width = 0;
});

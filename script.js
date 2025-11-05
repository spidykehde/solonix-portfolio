// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

// Hero typing animation
const heroName = document.getElementById('hero-name');
const text = 'Solonix';
let index = 0;

function type() {
  heroName.textContent = text.slice(0, index);
  index++;
  if(index > text.length) index = 0;
  setTimeout(type, 300);
}

type();

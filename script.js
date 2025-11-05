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
const heroElement = document.querySelector('.hero h1');
const typingText = "Hi, I'm Solonix";
let index = 0;

function typeHero() {
  heroElement.textContent = typingText.slice(0, index);
  index++;
  if (index > typingText.length) index = 0;
  setTimeout(typeHero, 200); // slower typing
}

typeHero();

// Auto-scroll thumbnails with swipe
const autoScroll = document.querySelector('.auto-scroll-inner');
let isDown = false;
let startX;
let scrollLeft;

autoScroll.addEventListener('mousedown', (e) => {
  isDown = true;
  autoScroll.style.cursor = 'grabbing';
  startX = e.pageX - autoScroll.offsetLeft;
  scrollLeft = autoScroll.scrollLeft;
});

autoScroll.addEventListener('mouseleave', () => {
  isDown = false;
  autoScroll.style.cursor = 'grab';
});

autoScroll.addEventListener('mouseup', () => {
  isDown = false;
  autoScroll.style.cursor = 'grab';
});

autoScroll.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - autoScroll.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast multiplier
  autoScroll.scrollLeft = scrollLeft - walk;
});
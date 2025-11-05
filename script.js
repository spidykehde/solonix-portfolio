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
const text = 'Hi, I’m Solonix';
let index = 0;

function type() {
  heroName.textContent = text.slice(0, index);
  index++;
  if(index > text.length) index = 0;
  setTimeout(type, 150); // slowed down
}

type();

// ---------------------- AUTO SCROLL & SWIPE ----------------------
const autoScrollContainer = document.querySelector('.auto-scroll');
const autoScrollInner = document.querySelector('.auto-scroll-inner');

// Clone thumbnails for seamless infinite scroll
const thumbnails = Array.from(autoScrollInner.children);
thumbnails.forEach(item => {
  const clone = item.cloneNode(true);
  autoScrollInner.appendChild(clone);
});

let isDragging = false;
let startX;
let scrollLeft;

// Function to auto-scroll smoothly
function autoScroll() {
  if (!isDragging) {
    autoScrollContainer.scrollLeft += 1; // speed
    // Loop back when reaching the end of original items
    if (autoScrollContainer.scrollLeft >= autoScrollInner.scrollWidth / 2) {
      autoScrollContainer.scrollLeft = 0;
    }
  }
  requestAnimationFrame(autoScroll);
}

autoScroll();

// Drag functionality
autoScrollContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - autoScrollContainer.offsetLeft;
  scrollLeft = autoScrollContainer.scrollLeft;
});

autoScrollContainer.addEventListener('mouseleave', () => {
  isDragging = false;
});

autoScrollContainer.addEventListener('mouseup', () => {
  isDragging = false;
});

autoScrollContainer.addEventListener('mousemove', (e) => {
  if(!isDragging) return;
  e.preventDefault();
  const x = e.pageX - autoScrollContainer.offsetLeft;
  const walk = (x - startX) * 2; // scroll speed on drag
  autoScrollContainer.scrollLeft = scrollLeft - walk;
});

// Touch events for mobile
autoScrollContainer.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - autoScrollContainer.offsetLeft;
  scrollLeft = autoScrollContainer.scrollLeft;
});

autoScrollContainer.addEventListener('touchend', () => {
  isDragging = false;
});

autoScrollContainer.addEventListener('touchmove', (e) => {
  if(!isDragging) return;
  const x = e.touches[0].pageX - autoScrollContainer.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast
  autoScrollContainer.scrollLeft = scrollLeft - walk;
});
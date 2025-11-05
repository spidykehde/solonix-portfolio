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
const text = ' Solonix';
let index = 0;

function type() {
  heroName.textContent = text.slice(0, index);
  index++;
  if(index > text.length) index = 0;
  setTimeout(type, 150);
}

type();

// ---------------------- AUTO SCROLL & SWIPE ----------------------
const container = document.querySelector('.auto-scroll');
const inner = document.querySelector('.auto-scroll-inner');

// Clone for infinite scroll
Array.from(inner.children).forEach(child => {
  inner.appendChild(child.cloneNode(true));
});

let isDragging = false;
let startX;
let scrollStart;
let velocity = 0; // for momentum
const AUTO_SPEED = 0.5; // slow auto-scroll
let resumeTimeout;

// Animate function
function animate() {
  if (!isDragging) {
    container.scrollLeft += AUTO_SPEED + velocity;
    velocity *= 0.95; // decay momentum
    if (container.scrollLeft >= inner.scrollWidth / 2) {
      container.scrollLeft -= inner.scrollWidth / 2;
    }
  }
  requestAnimationFrame(animate);
}

animate();

// ---------------------- DRAG / SWIPE ----------------------
function pointerDown(x) {
  isDragging = true;
  startX = x;
  scrollStart = container.scrollLeft;
  velocity = 0;
  if (resumeTimeout) clearTimeout(resumeTimeout); // cancel resume timer
}

function pointerMove(x) {
  if (!isDragging) return;
  const dx = x - startX;
  container.scrollLeft = scrollStart - dx;
  velocity = -dx * 0.05; // set momentum based on drag speed
}

function pointerUp() {
  isDragging = false;
  // Resume auto-scroll after 0.7s
  resumeTimeout = setTimeout(() => {
    isDragging = false;
  }, 700);
}

// Mouse
container.addEventListener('mousedown', e => pointerDown(e.pageX));
container.addEventListener('mousemove', e => pointerMove(e.pageX));
container.addEventListener('mouseup', pointerUp);
container.addEventListener('mouseleave', pointerUp);

// Touch
container.addEventListener('touchstart', e => pointerDown(e.touches[0].pageX));
container.addEventListener('touchmove', e => pointerMove(e.touches[0].pageX));
container.addEventListener('touchend', pointerUp);
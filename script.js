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
  setTimeout(type, 150);
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

const NORMAL_SPEED = 1; // default speed
let requestId;

// Auto-scroll function
function autoScroll() {
  if (!isDragging) {
    autoScrollContainer.scrollLeft += NORMAL_SPEED;
    if (autoScrollContainer.scrollLeft >= autoScrollInner.scrollWidth / 2) {
      autoScrollContainer.scrollLeft = 0;
    }
  }
  requestId = requestAnimationFrame(autoScroll);
}

autoScroll(); // start auto-scroll

// ---------------- DRAG / SWIPE ----------------
function startDrag(xPos) {
  isDragging = true;
  startX = xPos - autoScrollContainer.offsetLeft;
  scrollLeft = autoScrollContainer.scrollLeft;
}

function moveDrag(xPos) {
  if (!isDragging) return;
  const walk = xPos - startX;
  autoScrollContainer.scrollLeft = scrollLeft - walk;
}

function endDrag() {
  isDragging = false;
}

// Mouse events
autoScrollContainer.addEventListener('mousedown', (e) => startDrag(e.pageX));
autoScrollContainer.addEventListener('mousemove', (e) => moveDrag(e.pageX));
autoScrollContainer.addEventListener('mouseup', endDrag);
autoScrollContainer.addEventListener('mouseleave', endDrag);

// Touch events
autoScrollContainer.addEventListener('touchstart', (e) => startDrag(e.touches[0].pageX));
autoScrollContainer.addEventListener('touchmove', (e) => moveDrag(e.touches[0].pageX));
autoScrollContainer.addEventListener('touchend', endDrag);
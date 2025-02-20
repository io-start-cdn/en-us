// Intersection Observer for animated elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animate elements when they come into view
document.querySelectorAll('.feature-box, .animated-box').forEach(el => {
  observer.observe(el);
});

// Particle animation in hero section
class Particle {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > window.innerWidth) this.x = 0;
    if (this.x < 0) this.x = window.innerWidth;
    if (this.y > window.innerHeight) this.y = 0;
    if (this.y < 0) this.y = window.innerHeight;
  }

  draw(ctx) {
    ctx.fillStyle = 'rgba(108, 84, 216, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Setup canvas for particle animation
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const heroSection = document.querySelector('.hero');
heroSection.appendChild(canvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Create particles
const particles = Array.from({ length: 50 }, () => new Particle());

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw(ctx);
  });

  requestAnimationFrame(animate);
}

animate();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scroll = window.pageYOffset;
  const hero = document.querySelector('.hero');
  hero.style.backgroundPositionY = scroll * 0.5 + 'px';
});

// Improved mobile menu toggle
const createMobileMenu = () => {
  const nav = document.querySelector('nav');
  const menuButton = document.createElement('button');
  menuButton.classList.add('menu-toggle');
  menuButton.innerHTML = '☰';
  
  document.querySelector('.header-content').prepend(menuButton);
  
  menuButton.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuButton.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
      nav.classList.remove('active');
      menuButton.innerHTML = '☰';
    }
  });
};

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.step-card, .feature-box, h2, h3, p');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px'
  });

  elements.forEach(el => observer.observe(el));
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  if (window.innerWidth <= 768) {
    createMobileMenu();
  }
});

// Performance optimization
let animationFrame;
const optimizedScroll = () => {
  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame);
  }
  
  animationFrame = window.requestAnimationFrame(() => {
    // Perform scroll-based animations
    const scroll = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = scroll * 0.5 + 'px';
  });
};

window.addEventListener('scroll', optimizedScroll, { passive: true });
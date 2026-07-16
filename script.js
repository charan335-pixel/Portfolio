/* ============================================
   P. Charan Portfolio - JavaScript
   ============================================ */

'use strict';

// ============================================
// RESUME DOWNLOAD
// Opens resume.html in a hidden iframe and triggers browser print (Save as PDF)
// ============================================
function downloadResume(e) {
  if (e) e.preventDefault();
  // Open resume in a new tab; user can Ctrl+P → Save as PDF
  const win = window.open('resume.html', '_blank');
  if (win) {
    win.addEventListener('load', function () {
      setTimeout(() => {
        win.print();
      }, 600);
    });
  }
}

// ============================================
// NAVBAR SCROLL EFFECT & ACTIVE LINK
// ============================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function updateActiveNavLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', () => {
  updateNavbar();
  updateActiveNavLink();
});
updateNavbar();

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksContainer.classList.toggle('open');
});

navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinksContainer.classList.remove('open');
  });
});

// ============================================
// TYPING ANIMATION
// ============================================
const typingTexts = [
  'Java Full Stack Developer',
  'Spring Boot Developer',
  'React Developer',
  'Backend Developer'
];
const typingEl = document.getElementById('typingText');

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeWriter() {
  const currentText = typingTexts[textIndex];

  if (!isDeleting) {
    typingEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      typingDelay = 2000; // pause before deleting
    } else {
      typingDelay = 80;
    }
  } else {
    typingEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      typingDelay = 500;
    } else {
      typingDelay = 40;
    }
  }

  setTimeout(typeWriter, typingDelay);
}

setTimeout(typeWriter, 1000);

// ============================================
// PARTICLE CANVAS
// ============================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const PARTICLE_COUNT = 70;
const particles = [];

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    const colors = ['rgba(37,99,235,', 'rgba(124,58,237,', 'rgba(34,211,238,'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.life = 0;
    this.maxLife = Math.random() * 200 + 100;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if (
      this.x < -10 || this.x > canvas.width + 10 ||
      this.y < -10 || this.y > canvas.height + 10 ||
      this.life > this.maxLife
    ) {
      this.reset();
    }
  }
  draw() {
    const alpha = this.opacity * (1 - this.life / this.maxLife);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `${this.color}${alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = new Particle();
  p.life = Math.random() * p.maxLife;
  particles.push(p);
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  // Draw connection lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const alpha = (1 - dist / 100) * 0.08;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(37,99,235,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el, idx) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 80) {
      setTimeout(() => {
        el.classList.add('visible');
      }, (el.dataset.delay || 0));
    }
  });
}

// Stagger siblings
document.querySelectorAll('.reveal').forEach((el, i) => {
  const parent = el.parentElement;
  const siblings = Array.from(parent.querySelectorAll('.reveal'));
  const idx = siblings.indexOf(el);
  if (idx > 0) {
    el.dataset.delay = idx * 100;
  }
});

window.addEventListener('scroll', checkReveal);
checkReveal();

// ============================================
// SKILL BAR ANIMATION
// ============================================
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = `${width}%`;
      }, 300);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ============================================
// ANIMATED COUNTERS
// ============================================
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    const current = Math.round(eased * target);
    el.textContent = current;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendMessageBtn');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const btnText = sendBtn.querySelector('.btn-text');
  const btnLoading = sendBtn.querySelector('.btn-loading');

  btnText.style.display = 'none';
  btnLoading.style.display = 'inline-flex';
  sendBtn.disabled = true;

  // Simulate send (no backend)
  setTimeout(() => {
    btnText.style.display = 'inline-flex';
    btnLoading.style.display = 'none';
    sendBtn.disabled = false;
    formSuccess.style.display = 'flex';
    contactForm.reset();
    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1800);
});

// ============================================
// SMOOTH SECTION SCROLL (nav links)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// PROJECT CARD GLOW ON HOVER
// ============================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', function (e) {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(37,99,235,0.1), rgba(255,255,255,0.03) 70%)`;
  });
  card.addEventListener('mouseleave', function () {
    card.style.background = '';
  });
});

// ============================================
// ACHIEVEMENT CARD STAGGER
// ============================================
document.querySelectorAll('.achievement-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});

// ============================================
// INFO CARD STAGGER ANIMATION
// ============================================
document.querySelectorAll('.info-card').forEach((card, i) => {
  card.style.animationDelay = `${i * 0.1}s`;
});

// ============================================
// TIMELINE ANIMATION
// ============================================
const timelineItems = document.querySelectorAll('.timeline-item, .edu-item');
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-30px)';
  item.style.transition = 'all 0.6s ease';
  tlObserver.observe(item);
});

// ============================================
// GLASSMORPHISM MOUSE PARALLAX (Hero)
// ============================================
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    heroContent.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
}

console.log('%cP. Charan Portfolio', 'font-size:24px; font-weight:bold; color:#2563EB;');
console.log('%cJava Full Stack Developer', 'font-size:14px; color:#7C3AED;');

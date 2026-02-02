/* ================================================================
   SANTOS META - PROFESSIONAL WEB DESIGN
   responsivo.js - Versão Melhorada 2.0
   ================================================================ */

/* ============================
   CONFIGURAÇÃO INICIAL
============================ */
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar todas as funcionalidades
  initLoader();
  initCursor();
  initMobileMenu();
  initScrollEffects();
  initSmoothScroll();
  initBackToTop();
  initReadingProgress();
  initPromoBanner();
  initTypingEffect();
  initStatsCounter();
  initTestimonialSlider();
  initFAQ();
  initPortfolioFilter();
  initModal();
  initFormValidation();
  initThemeToggle();
  initParticles();
  initAOS();
  
  console.log('✅ Site Santos Meta carregado com sucesso!');
});

/* ============================
   LOADER SCREEN
============================ */
function initLoader() {
  window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }, 1000);
    }
  });
}

/* ============================
   CURSOR CUSTOMIZADO
============================ */
function initCursor() {
  if (window.matchMedia("(pointer: fine)").matches) {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });
    
    // Animação suave para o follower
    function animateFollower() {
      const distX = mouseX - followerX;
      const distY = mouseY - followerY;
      
      followerX += distX * 0.1;
      followerY += distY * 0.1;
      
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Efeitos em hover
    const hoverElements = document.querySelectorAll('a, button, .card, .portfolio-item');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }
}

/* ============================
   MENU MOBILE
============================ */
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav ul');
  const navLinks = document.querySelectorAll('.nav a');
  
  if (!navToggle || !navMenu) return;
  
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    navToggle.classList.toggle('active');
    
    // Prevenir scroll quando menu aberto
    if (navMenu.classList.contains('show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Fechar menu ao clicar em link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('show');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ============================
   SCROLL EFFECTS
============================ */
function initScrollEffects() {
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav a');
  
  window.addEventListener('scroll', () => {
    // Header scroll effect
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Active nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Reveal animation
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(reveal => revealObserver.observe(reveal));
}

/* ============================
   SMOOTH SCROLL
============================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============================
   BACK TO TOP
============================ */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ============================
   READING PROGRESS
============================ */
function initReadingProgress() {
  const progressBar = document.querySelector('.reading-progress');
  
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/* ============================
   PROMO BANNER
============================ */
function initPromoBanner() {
  const banner = document.querySelector('.promo-banner');
  const closeBtn = document.querySelector('.close-banner');
  
  if (!banner || !closeBtn) return;
  
  // Verificar se o banner foi fechado anteriormente
  if (localStorage.getItem('promoBannerClosed') === 'true') {
    banner.style.display = 'none';
    return;
  }
  
  closeBtn.addEventListener('click', () => {
    banner.style.animation = 'slideUp 0.4s ease forwards';
    setTimeout(() => {
      banner.style.display = 'none';
    }, 400);
    localStorage.setItem('promoBannerClosed', 'true');
  });
}

/* ============================
   TYPING EFFECT
============================ */
function initTypingEffect() {
  const typingElement = document.querySelector('.typing');
  if (!typingElement) return;
  
  const text = typingElement.dataset.text || typingElement.textContent;
  typingElement.textContent = '';
  
  let i = 0;
  function type() {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
      setTimeout(type, 50);
    }
  }
  
  // Iniciar depois do carregamento
  setTimeout(type, 500);
}

/* ============================
   STATS COUNTER
============================ */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  
  if (stats.length === 0) return;
  
  const animateValue = (element, start, end, duration) => {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      element.textContent = current;
      
      if (current === end) {
        clearInterval(timer);
        if (element.dataset.target === '98') {
          element.textContent = '98%';
        }
      }
    }, stepTime);
  };
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateValue(entry.target, 0, target, 2000);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => statsObserver.observe(stat));
}

/* ============================
   TESTIMONIAL SLIDER
============================ */
function initTestimonialSlider() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  
  if (cards.length === 0) return;
  
  let currentSlide = 0;
  
  function showSlide(n) {
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + cards.length) % cards.length;
    
    cards[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Auto slide
  setInterval(nextSlide, 6000);
}

/* ============================
   FAQ ACCORDION
============================ */
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isOpen = answer.classList.contains('open');
      
      // Fechar todas as outras
      document.querySelectorAll('.faq-answer').forEach(a => {
        a.classList.remove('open');
        a.previousElementSibling.setAttribute('aria-expanded', 'false');
      });
      
      // Toggle atual
      if (!isOpen) {
        answer.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ============================
   PORTFOLIO FILTER
============================ */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterBtns.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Atualizar botão ativo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filtrar itens
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ============================
   MODAL
============================ */
function initModal() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  const viewBtns = document.querySelectorAll('.btn-view');
  
  if (!modal) return;
  
  const projectData = {
    '1': {
      title: 'Startup Tech - Landing Page',
      description: 'Landing page moderna e conversora desenvolvida para uma startup de tecnologia. Foco em performance, design minimalista e alta taxa de conversão. Implementação de animações suaves e otimização SEO.',
      image: 'https://via.placeholder.com/600x400/1a1a1a/00ffff?text=Projeto+1',
      tags: ['Web Design', 'UI/UX', 'React', 'Performance']
    },
    '2': {
      title: 'Arquitetura Moderna - Website Institucional',
      description: 'Website institucional completo para empresa de arquitetura. Design elegante que reflete a sofisticação da marca, galeria de projetos interativa e formulário de contato integrado.',
      image: 'https://via.placeholder.com/600x400/1a1a1a/00ffff?text=Projeto+2',
      tags: ['Branding', 'Website', 'WordPress', 'Fotografia']
    },
    '3': {
      title: 'Loja Virtual Premium - E-commerce',
      description: 'E-commerce de alta performance com design responsivo e experiência de compra otimizada. Integração completa com gateway de pagamento, gestão de estoque e painel administrativo.',
      image: 'https://via.placeholder.com/600x400/1a1a1a/00ffff?text=Projeto+3',
      tags: ['E-commerce', 'Responsivo', 'WooCommerce', 'SEO']
    },
    '4': {
      title: 'Dashboard Analytics - Interface Interativa',
      description: 'Interface interativa para visualização de dados e métricas em tempo real. Design focado em usabilidade, gráficos dinâmicos e experiência intuitiva para análise de dados complexos.',
      image: 'https://via.placeholder.com/600x400/1a1a1a/00ffff?text=Projeto+4',
      tags: ['App', 'UI/UX', 'Data Viz', 'Dashboard']
    }
  };
  
  function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-image').alt = project.title;
    
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = project.tags
      .map(tag => `<span class="portfolio-tags"><span>${tag}</span></span>`)
      .join('');
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.project);
    });
  });
  
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  
  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ============================
   FORM VALIDATION
============================ */
function initFormValidation() {
  const form = document.querySelector('.contact-form');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>⏳</span> Enviando...';
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        showToast('Mensagem enviada com sucesso! 🎉', 'success');
        form.reset();
      } else {
        throw new Error('Erro ao enviar');
      }
    } catch (error) {
      showToast('Erro ao enviar mensagem. Tente novamente. 😔', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
  
  // Validação em tempo real
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });
  });
}

function validateInput(input) {
  if (input.hasAttribute('required') && !input.value.trim()) {
    input.style.borderColor = '#ff4444';
    return false;
  }
  
  if (input.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
      input.style.borderColor = '#ff4444';
      return false;
    }
  }
  
  input.style.borderColor = 'rgba(0, 255, 255, 0.3)';
  return true;
}

/* ============================
   TOAST NOTIFICATION
============================ */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: ${type === 'success' ? '#00ffff' : '#ff4444'};
    color: ${type === 'success' ? '#0a0a0a' : '#fff'};
    padding: 1rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 99999;
    animation: slideInRight 0.4s ease;
    max-width: 90%;
  `;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.4s ease forwards';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ============================
   THEME TOGGLE
============================ */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (!themeToggle) return;
  
  // Verificar preferência salva
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    
    // Feedback visual
    showToast(
      theme === 'light' ? '☀️ Modo claro ativado' : '🌙 Modo escuro ativado',
      'info'
    );
  });
}

/* ============================
   PARTICLES.JS
============================ */
function initParticles() {
  if (typeof particlesJS === 'undefined') return;
  
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#00ffff'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#00ffff',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
}

/* ============================
   AOS (Animate On Scroll)
============================ */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      delay: 100
    });
  }
}

/* ============================
   PERFORMANCE OPTIMIZATION
============================ */
// Lazy Loading para imagens
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Debounce para scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Descomente para ativar PWA
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('✅ Service Worker registrado'))
    //   .catch(err => console.log('❌ Erro no Service Worker:', err));
  });
}

/* ============================
   ANALYTICS & TRACKING
============================ */
// Google Analytics Event Tracking
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
}

// Track CTA clicks
document.querySelectorAll('.btn-glow, .btn-ghost').forEach(btn => {
  btn.addEventListener('click', () => {
    trackEvent('CTA', 'click', btn.textContent.trim());
  });
});

// Track form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    trackEvent('Form', 'submit', 'Contact Form');
  });
}

/* ============================
   EASTER EGGS & EXTRAS
============================ */
// Konami Code Easter Egg
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
  
  if (konamiCode.join('') === konamiPattern.join('')) {
    showToast('🎮 Código Konami ativado! Você é um verdadeiro gamer!', 'success');
    document.body.style.animation = 'rainbow 5s linear';
  }
});

// Log criativo no console
console.log('%c🚀 Santos Meta - Web Design', 'font-size: 20px; font-weight: bold; color: #00ffff;');
console.log('%c💼 Desenvolvedor Front-End', 'font-size: 14px; color: #00cccc;');
console.log('%c📧 Entre em contato: contato@santosmeta.com', 'font-size: 12px; color: #66fff7;');
console.log('%c🌟 Gostou do site? Vamos criar algo incrível juntos!', 'font-size: 12px; color: #f9f9f9;');

/* ============================
   FIM DO SCRIPT
============================ */
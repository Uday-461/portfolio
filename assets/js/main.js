// ===========================================================================
// Portfolio Interactive JavaScript
// Enhanced UI/UX functionality
// ===========================================================================

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeScrollAnimations();
  initializeBackToTop();
  initializeProgressIndicator();
  initializeSmoothScrolling();
  initializeMobileNavigation();
  initializeFormEnhancements();
});

// ===========================================================================
// Scroll Reveal Animations
// ===========================================================================

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.scroll-reveal, .fade-in-left, .fade-in-right, .scale-in, .stagger-item'
  );

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// ===========================================================================
// Back to Top Button
// ===========================================================================

function initializeBackToTop() {
  const backToTopButton = document.createElement('button');
  backToTopButton.className = 'back-to-top';
  backToTopButton.innerHTML = '↑';
  backToTopButton.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopButton);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===========================================================================
// Progress Indicator
// ===========================================================================

function initializeProgressIndicator() {
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-indicator';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// ===========================================================================
// Smooth Scrolling for Anchor Links
// ===========================================================================

function initializeSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===========================================================================
// Mobile Navigation
// ===========================================================================

function initializeMobileNavigation() {
  const toggle = document.querySelector('.site-nav__toggle');
  const navLinks = document.querySelector('.site-nav__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      toggle.setAttribute('aria-expanded',
        toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// ===========================================================================
// Form Enhancements
// ===========================================================================

function initializeFormEnhancements() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    // Add floating label functionality
    const inputs = form.querySelectorAll('.form-input');

    inputs.forEach(input => {
      // Check if input has value on load
      if (input.value) {
        input.classList.add('has-value');
      }

      // Add/remove class on focus/blur
      input.addEventListener('focus', () => {
        input.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        input.classList.remove('focused');
        if (input.value) {
          input.classList.add('has-value');
        } else {
          input.classList.remove('has-value');
        }
      });
    });

    // Enhanced form validation
    form.addEventListener('submit', (e) => {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          showError(field, 'This field is required');
        } else {
          field.classList.remove('error');
          removeError(field);
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  });
}

// ===========================================================================
// Error Handling for Forms
// ===========================================================================

function showError(field, message) {
  removeError(field);

  const errorElement = document.createElement('div');
  errorElement.className = 'form-error';
  errorElement.textContent = message;
  errorElement.style.color = 'var(--color-error)';
  errorElement.style.fontSize = '0.875rem';
  errorElement.style.marginTop = '0.25rem';

  field.parentNode.appendChild(errorElement);
}

function removeError(field) {
  const errorElement = field.parentNode.querySelector('.form-error');
  if (errorElement) {
    errorElement.remove();
  }
}

// ===========================================================================
// Enhanced Image Loading
// ===========================================================================

function initializeImageLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ===========================================================================
// Keyboard Navigation Enhancement
// ===========================================================================

document.addEventListener('keydown', (e) => {
  // Press 'Escape' to close mobile menu
  if (e.key === 'Escape') {
    const mobileMenu = document.querySelector('.site-nav__links.mobile-open');
    const toggle = document.querySelector('.site-nav__toggle');

    if (mobileMenu && toggle) {
      mobileMenu.classList.remove('mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  // Press 'T' to go to top (when not in a form)
  if (e.key === 't' || e.key === 'T') {
    const activeElement = document.activeElement;
    const isInForm = activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.contentEditable === 'true'
    );

    if (!isInForm) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
});

// ===========================================================================
// Performance Optimization - Debounce Function
// ===========================================================================

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

// Debounced scroll handlers for better performance
const debouncedScrollHandlers = debounce(() => {
  // Add any scroll handlers that need debouncing here
}, 100);

window.addEventListener('scroll', debouncedScrollHandlers, { passive: true });

// ===========================================================================
// Dark Mode Toggle (Optional Enhancement)
// ===========================================================================

function initializeDarkMode() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');

  if (darkModeToggle) {
    // Check for saved preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    darkModeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Update toggle button state
      darkModeToggle.setAttribute('aria-pressed', newTheme === 'dark');
    });
  }
}

// ===========================================================================
// Animation on Page Load
// ===========================================================================

window.addEventListener('load', () => {
  // Add loaded class to body for initial animations
  document.body.classList.add('page-loaded');

  // Initialize any loading animations
  const loadingElements = document.querySelectorAll('.loading-skeleton');
  setTimeout(() => {
    loadingElements.forEach(element => {
      element.classList.remove('loading-skeleton');
    });
  }, 1000);
});

// ===========================================================================
// Console Easter Egg (Fun Enhancement)
// ===========================================================================

console.log('%c🚀 Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cBuilt with Hugo, styled with SCSS, and enhanced with JavaScript', 'font-size: 14px; color: #64748b;');
console.log('%cFeel free to explore the code!', 'font-size: 12px; color: #10b981;');
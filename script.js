// Basic interactivity: nav toggle, dark mode persistence, simple form validation
(() => {
  const root = document.documentElement;
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const darkToggle = document.getElementById('dark-toggle');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const yearEl = document.getElementById('year');

  // Set year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navigation toggle for small screens
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (nav.style.display === 'flex') {
        nav.style.display = '';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
      }
    });
  }

  // Dark mode: read from localStorage or system preference
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      darkToggle.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      darkToggle.textContent = '🌙';
    }
  };

  const saved = localStorage.getItem('theme');
  if (saved) applyTheme(saved);
  else {
    // apply system preference by default
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  darkToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Simple form validation and mock submit
  const validators = {
    name: (v) => v.trim().length >= 2 || 'Please enter your name',
    email: (v) => /\S+@\S+\.\S+/.test(v) || 'Please enter a valid email',
    message: (v) => v.trim().length >= 10 || 'Message must be at least 10 characters'
  };

  function showError(field, message) {
    const el = document.querySelector(`.error[data-for="${field}"]`);
    if (el) el.textContent = message || '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const data = new FormData(form);
    let hasError = false;
    for (const [key, validator] of Object.entries(validators)) {
      const val = data.get(key) || '';
      const res = validator(val);
      if (res !== true) {
        showError(key, res);
        hasError = true;
      } else {
        showError(key, '');
      }
    }
    if (hasError) {
      status.textContent = 'Please fix the errors above.';
      return;
    }

    // Mock submit: simulate network delay
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message')
    };
    status.textContent = 'Sending...';
    setTimeout(() => {
      status.textContent = 'Thanks — your message was sent (mock).';
      form.reset();
    }, 900);
    console.log('Mock submit payload:', payload);
  });
})();
// lang-switch.js
// Handles full-page language switching using external JSON files

const languageFiles = {
  en: 'lang.en.json',
  np: 'lang.np.json',
  zh: 'lang.zh.json',
  hi: 'lang.hi.json'
};

function setLanguage(lang) {
  const file = languageFiles[lang] || languageFiles['en'];
  fetch(file)
    .then(response => response.json())
    .then(data => applyTranslations(data))
    .catch(() => {});
}

function applyTranslations(dict) {
  // Directly map element IDs to translation keys
  Object.entries(dict).forEach(([key, value]) => {
    const el = document.getElementById(key);
    if (el) {
      el.textContent = value;
    }
  });

  // Special handling for counter numbers
  if (dict['counter-years']) {
    const yearsEl = document.getElementById('counter-years');
    if (yearsEl) yearsEl.querySelector('.counter').textContent = dict['counter-years'];
  }
  if (dict['counter-professionals']) {
    const profEl = document.getElementById('counter-professionals');
    if (profEl) profEl.querySelector('.counter').textContent = dict['counter-professionals'];
  }
  if (dict['counter-clients']) {
    const clientsEl = document.getElementById('counter-clients');
    if (clientsEl) clientsEl.querySelector('.counter').textContent = dict['counter-clients'];
  }
  if (dict['counter-quality']) {
    const qualEl = document.getElementById('counter-quality');
    if (qualEl) qualEl.textContent = dict['counter-quality'];
  }

  // Ensure product and gallery top section always update
  ['products-title','product-title-1','product-desc-1','product-feature-1-1','product-feature-1-2','gallery-title','gallery-desc'].forEach(id => {
    if (dict[id]) {
      const el = document.getElementById(id);
      if (el) el.textContent = dict[id];
    }
  });

  // Add support for mobile nav IDs in language switching
  // Desktop nav
  ['nav-home','nav-about','nav-products','nav-gallery','nav-contact','open-modal-btn-desktop'].forEach(id => {
    if (dict[id]) {
      const el = document.getElementById(id);
      if (el) el.textContent = dict[id];
    }
  });
  // Mobile nav
  ['nav-home-mobile','nav-about-mobile','nav-products-mobile','nav-gallery-mobile','nav-contact-mobile','open-modal-btn-mobile'].forEach(id => {
    if (dict[id]) {
      const el = document.getElementById(id);
      if (el) el.textContent = dict[id];
    }
  });
}

// Listen for both desktop and mobile language selector changes
window.addEventListener('DOMContentLoaded', () => {
  const desktopSelector = document.getElementById('language-switcher-desktop');
  const mobileSelector = document.getElementById('language-switcher-mobile');

  function handleChange(e) {
    setLanguage(e.target.value);
    // Sync both selectors
    if (desktopSelector && mobileSelector) {
      desktopSelector.value = e.target.value;
      mobileSelector.value = e.target.value;
    }
  }

  if (desktopSelector) {
    desktopSelector.addEventListener('change', handleChange);
    setLanguage(desktopSelector.value || 'en');
  }
  if (mobileSelector) {
    mobileSelector.addEventListener('change', handleChange);
    setLanguage(mobileSelector.value || 'en');
  }
});

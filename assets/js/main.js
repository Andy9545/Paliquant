'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const toggleBtn = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', function () {
      navMenu.classList.toggle('nav__menu--open');
    });

    // Close menu on link click
    navMenu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('nav__menu--open');
      });
    });
  }

  // Set copyright year
  const yearEls = document.querySelectorAll('.footer__bottom p:first-child');
  yearEls.forEach(function (el) {
    el.textContent = el.textContent.replace('2025', String(new Date().getFullYear()));
  });
});

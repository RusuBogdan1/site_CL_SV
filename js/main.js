/**
 * Centrul Local „Ținutul Fagilor” Suceava - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isExpanded = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Mobile dropdown toggle on click
    const dropdownWrappers = document.querySelectorAll('.nav-dropdown-wrapper');
    dropdownWrappers.forEach(wrapper => {
      const parentLink = wrapper.querySelector('.nav-link');
      if (parentLink) {
        parentLink.addEventListener('click', (e) => {
          if (window.innerWidth <= 1080) {
            wrapper.classList.toggle('open');
          }
        });
      }
    });
  }

  // Sticky Header scroll styling
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // General Tabs Functionality
  const tabContainers = document.querySelectorAll('.tabs-container');
  tabContainers.forEach(container => {
    const tabBtns = container.querySelectorAll('.tab-btn');
    const tabContents = container.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetContent = container.querySelector('#' + targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });

  // Gallery Filtering (Trecut - Prezent)
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-bar .filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-grid .gallery-card');

  if (galleryFilterBtns.length > 0 && galleryCards.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        galleryCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Activities Filtering
  const activityFilterBtns = document.querySelectorAll('.activity-filter-bar .filter-btn');
  const activityCards = document.querySelectorAll('.activities-grid .activity-card');

  if (activityFilterBtns.length > 0 && activityCards.length > 0) {
    activityFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activityFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        activityCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Timeline Filtering (Istoric)
  const filterBtns = document.querySelectorAll('.timeline-filter-bar .filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (filterBtns.length > 0 && timelineItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const period = btn.getAttribute('data-period');

        timelineItems.forEach(item => {
          if (period === 'all' || item.getAttribute('data-era') === period) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.3s ease';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(otherItem => {
          otherItem.classList.remove('active');
        });
      }

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Age Finder / Calculator
  const calcBtn = document.getElementById('calcBranchBtn');
  const calcInput = document.getElementById('calcAgeInput');
  const calcResult = document.getElementById('calcResult');

  if (calcBtn && calcInput && calcResult) {
    const calculateBranch = () => {
      const age = parseInt(calcInput.value, 10);
      if (isNaN(age) || age < 5 || age > 99) {
        calcResult.innerHTML = `
          <div style="color: #ef4444; font-weight: 700;">
            Te rugăm să introduci o vârstă validă între 5 și 99 de ani.
          </div>
        `;
        calcResult.classList.add('show');
        return;
      }

      let branchName = '';
      let branchAgeRange = '';
      let branchColor = '';
      let branchDescription = '';
      let branchLink = 'ramuri-de-varsta.html';

      if (age >= 7 && age <= 10) {
        branchName = 'Lupișori';
        branchAgeRange = '7 - 10 ani';
        branchColor = '#b45309';
        branchDescription = 'Lumea poveștilor din Cartea Junglei, a jocurilor pline de energie și a primilor pași în echipă (patrulă). Înveți să fii curios și să ajuți!';
        branchLink = 'ramuri-de-varsta.html#lupisori';
      } else if (age >= 11 && age <= 14) {
        branchName = 'Temerari';
        branchAgeRange = '11 - 14 ani';
        branchColor = '#065f46';
        branchDescription = 'Aventură pură, orientare pe busolă și hartă, campuri în corturi, foc de tabără și primele mari responsabilități în patrulă.';
        branchLink = 'ramuri-de-varsta.html#temerari';
      } else if (age >= 15 && age <= 18) {
        branchName = 'Exploratori';
        branchAgeRange = '15 - 18 ani';
        branchColor = '#c2410c';
        branchDescription = 'Inițiativă, proiecte pentru comunitate, expediții montane, autonomie și dezvoltarea abilităților de lider.';
        branchLink = 'ramuri-de-varsta.html#exploratori';
      } else if (age >= 19 && age <= 24) {
        branchName = 'Seniori';
        branchAgeRange = '19 - 24 ani';
        branchColor = '#581c87';
        branchDescription = 'Implicare activă, suport pentru comunitate, pregătire pentru viața profesională și proiecte de mare impact.';
        branchLink = 'ramuri-de-varsta.html#seniori';
      } else if (age > 24) {
        branchName = 'Lider Adult / Voluntar CL';
        branchAgeRange = 'Adulți & Părinți';
        branchColor = '#134074';
        branchDescription = 'Fii mentor pentru generațiile viitoare! Alătură-te echipei de lideri și voluntari adulți din Suceava pentru a ghida copiii și tinerii.';
        branchLink = 'ce-este-cercetasia.html#adulti';
      } else {
        branchName = 'Viitor Cercetaș';
        branchAgeRange = 'Sub 7 ani';
        branchColor = '#2563eb';
        branchDescription = 'Ești încă un pic micuț, dar abia așteptăm să împlinești 7 ani pentru a te alătura lupișorilor noștri!';
        branchLink = 'ramuri-de-varsta.html';
      }

      calcResult.innerHTML = `
        <div style="text-align: center;">
          <span style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: var(--gold-400); letter-spacing: 0.05em;">Rezultat Recomandat</span>
          <h3 style="font-size: 1.75rem; color: #ffffff; margin: 0.35rem 0;">Ramura potrivită: <span style="color: var(--gold-400);">${branchName}</span></h3>
          <p style="display: inline-block; background: rgba(255,255,255,0.2); padding: 0.2rem 0.8rem; border-radius: 999px; font-weight: 700; font-size: 0.85rem; margin-bottom: 0.75rem;">Grupa de vârstă: ${branchAgeRange}</p>
          <p style="color: var(--blue-100); max-width: 550px; margin: 0 auto 1.25rem; font-size: 0.95rem;">${branchDescription}</p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="contact.html?branch=${encodeURIComponent(branchName)}" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.9rem;">Înscrie-te la ${branchName}</a>
            <a href="${branchLink}" class="btn btn-secondary" style="padding: 0.5rem 1.25rem; font-size: 0.9rem;">Află mai multe detalii</a>
          </div>
        </div>
      `;
      calcResult.classList.add('show');
    };

    calcBtn.addEventListener('click', calculateBranch);
    calcInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        calculateBranch();
      }
    });
  }

  // Toast System
  window.showToast = function(message) {
    let toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.className = 'toast-box';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  // Copy to clipboard helper (e.g. IBAN)
  const copyBtns = document.querySelectorAll('.copy-iban-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-clipboard') || 'RO00RZBR0000000000000000';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Codul IBAN a fost copiat în clipboard!');
          const origText = btn.textContent;
          btn.textContent = 'Copiat!';
          setTimeout(() => { btn.textContent = origText; }, 2000);
        });
      } else {
        showToast('IBAN: ' + textToCopy);
      }
    });
  });

  // Contact / Registration Form submission
  const registerForm = document.getElementById('scoutRegisterForm');
  const confirmModal = document.getElementById('confirmModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (registerForm && confirmModal) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('applicantName')?.value || 'Prieten cercetaș';
      const branch = document.getElementById('branchSelect')?.value || 'Unitate Cercetășie';

      const modalApplicant = document.getElementById('modalApplicant');
      if (modalApplicant) {
        modalApplicant.textContent = `${name} (${branch})`;
      }

      confirmModal.classList.add('show');
      registerForm.reset();
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        confirmModal.classList.remove('show');
      });
    }

    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) {
        confirmModal.classList.remove('show');
      }
    });
  }
});

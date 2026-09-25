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

// Mobile dropdown toggle on click (deschide / închide la click-uri succesive)
    const dropdownWrappers = document.querySelectorAll('.nav-dropdown-wrapper');
    dropdownWrappers.forEach(wrapper => {
      const parentLink = wrapper.querySelector('.nav-link');
      if (parentLink) {
        parentLink.addEventListener('click', (e) => {
          if (window.innerWidth <= 1080) {
            e.preventDefault();
            
            const isOpen = wrapper.classList.contains('open');

            // Închidem toate dropdown-urile
            dropdownWrappers.forEach(w => w.classList.remove('open'));

            // Toggle starea
            if (!isOpen) {
              wrapper.classList.add('open');
            }
          }
        });
      }
    });
    
    // Mobile submenu toggle on click
    const submenuWrappers = document.querySelectorAll('.dropdown-submenu-wrapper');
    submenuWrappers.forEach(wrapper => {
      const subToggle = wrapper.querySelector('.dropdown-submenu-toggle');
      if (subToggle) {
        subToggle.addEventListener('click', (e) => {
          if (window.innerWidth <= 1080) {
            e.preventDefault();
            e.stopPropagation();
            wrapper.classList.toggle('open');
          }
        });
      }
    });

    // Close mobile menu when clicking leaf/actionable sub-links
    const allTerminalSubLinks = document.querySelectorAll('.dropdown-menu a:not(.dropdown-submenu-toggle), .dropdown-submenu a');
    allTerminalSubLinks.forEach(subLink => {
      subLink.addEventListener('click', () => {
        if (window.innerWidth <= 1080) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Sticky Header scroll styling
  const header = document.querySelector('.site-header');
  if (header) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    handleHeaderScroll();
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  }

  // Scroll-to-top button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.type = 'button';
  scrollTopBtn.setAttribute('aria-label', 'Mergi sus');
  scrollTopBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5l6 8h-4v6H10v-6H6l6-8z" fill="currentColor"/></svg>';
  document.body.appendChild(scrollTopBtn);

  const handleScrollTopButton = () => {
    const threshold = window.innerHeight * 0.55;
    scrollTopBtn.classList.toggle('visible', window.scrollY > threshold);
  };

  handleScrollTopButton();
  window.addEventListener('scroll', handleScrollTopButton, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

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

  // Collage Filtering & Lightbox System (Ramuri & Activități)
  const collageFilterBtns = document.querySelectorAll('.collage-filter-bar .filter-btn');
  const collageCards = document.querySelectorAll('.collage-card');

  if (collageFilterBtns.length > 0 && collageCards.length > 0) {
    collageFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        collageFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        collageCards.forEach(card => {
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

  // Previzualizare miniaturi la hover pe cardul evenimentului
  collageCards.forEach(card => {
    const mainImg = card.querySelector('.collage-img-wrap img');
    const miniThumbs = card.querySelectorAll('.collage-mini-thumb');
    const defaultSrc = mainImg ? mainImg.src : '';

    miniThumbs.forEach(thumb => {
      thumb.addEventListener('mouseenter', () => {
        if (mainImg) {
          mainImg.src = thumb.src;
          miniThumbs.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        }
      });
    });

    card.addEventListener('mouseleave', () => {
      if (mainImg && defaultSrc) {
        mainImg.src = defaultSrc;
        miniThumbs.forEach((t, i) => {
          t.classList.toggle('active', i === 0);
        });
      }
    });
  });

  // Lightbox Modal Functionality (Enhanced for Event Albums & Single Photos)
  const lightbox = document.getElementById('imageLightbox');
  if (lightbox && collageCards.length > 0) {
    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbTitle = lightbox.querySelector('.lightbox-title');
    const lbCounter = lightbox.querySelector('.lightbox-counter');
    const lbClose = lightbox.querySelector('.lightbox-close-btn');
    const lbPrev = lightbox.querySelector('.lightbox-btn.prev');
    const lbNext = lightbox.querySelector('.lightbox-btn.next');
    let lbThumbsBox = lightbox.querySelector('.lightbox-thumbnails');

    if (!lbThumbsBox) {
      lbThumbsBox = document.createElement('div');
      lbThumbsBox.className = 'lightbox-thumbnails';
      const container = lightbox.querySelector('.lightbox-container');
      if (container) container.appendChild(lbThumbsBox);
    }

    let isAlbumMode = false;
    let albumPhotos = []; // array of { src, alt }
    let albumTitle = '';
    let albumDate = '';
    let currentPhotoIdx = 0;

    let visibleCards = [];
    let currentCardIdx = 0;

    const renderLightboxView = () => {
      if (isAlbumMode) {
        if (albumPhotos.length === 0) return;
        const photo = albumPhotos[currentPhotoIdx];
        if (lbImg) {
          lbImg.src = photo.src;
          lbImg.alt = photo.alt || albumTitle;
        }
        if (lbTitle) {
          lbTitle.textContent = albumTitle;
        }
        if (lbCounter) {
          lbCounter.textContent = `${currentPhotoIdx + 1} / ${albumPhotos.length}${albumDate ? ' • ' + albumDate : ''}`;
        }

        // Render thumbnails in lightbox
        if (lbThumbsBox) {
          if (albumPhotos.length > 1) {
            lbThumbsBox.style.display = 'flex';
            lbThumbsBox.innerHTML = '';
            albumPhotos.forEach((p, idx) => {
              const thumbImg = document.createElement('img');
              thumbImg.className = `lightbox-thumb ${idx === currentPhotoIdx ? 'active' : ''}`;
              thumbImg.src = p.src;
              thumbImg.alt = `Miniatură ${idx + 1}`;
              thumbImg.addEventListener('click', (e) => {
                e.stopPropagation();
                currentPhotoIdx = idx;
                renderLightboxView();
              });
              lbThumbsBox.appendChild(thumbImg);
            });
          } else {
            lbThumbsBox.style.display = 'none';
            lbThumbsBox.innerHTML = '';
          }
        }
      } else {
        // Standard card-by-card mode (for single photo per card pages)
        if (visibleCards.length === 0) return;
        const card = visibleCards[currentCardIdx];
        const img = card.querySelector('img');
        const title = card.querySelector('.collage-card-title')?.textContent || '';
        
        if (img && lbImg) {
          lbImg.src = img.src;
          lbImg.alt = img.alt || title;
        }
        if (lbTitle) {
          lbTitle.textContent = title;
        }
        if (lbCounter) {
          lbCounter.textContent = `${currentCardIdx + 1} / ${visibleCards.length}`;
        }
        if (lbThumbsBox) {
          lbThumbsBox.style.display = 'none';
          lbThumbsBox.innerHTML = '';
        }
      }
    };

    const openLightbox = (card, targetIdx = 0) => {
      const albumContainer = card.querySelector('.collage-album-photos');
      const albumImgElements = albumContainer ? albumContainer.querySelectorAll('img') : null;

      if (albumImgElements && albumImgElements.length > 0) {
        isAlbumMode = true;
        albumTitle = card.querySelector('.collage-card-title')?.textContent || '';
        albumDate = card.querySelector('.collage-date-tag')?.textContent || '';
        albumPhotos = Array.from(albumImgElements).map(img => ({
          src: img.src,
          alt: img.alt || albumTitle
        }));
        currentPhotoIdx = (targetIdx >= 0 && targetIdx < albumPhotos.length) ? targetIdx : 0;
      } else {
        isAlbumMode = false;
        visibleCards = Array.from(collageCards).filter(c => window.getComputedStyle(c).display !== 'none');
        currentCardIdx = visibleCards.indexOf(card);
        if (currentCardIdx === -1) currentCardIdx = 0;
      }

      renderLightboxView();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const showPrev = (e) => {
      if (e) e.stopPropagation();
      if (isAlbumMode) {
        if (albumPhotos.length === 0) return;
        currentPhotoIdx = (currentPhotoIdx - 1 + albumPhotos.length) % albumPhotos.length;
        renderLightboxView();
      } else {
        if (visibleCards.length === 0) return;
        currentCardIdx = (currentCardIdx - 1 + visibleCards.length) % visibleCards.length;
        renderLightboxView();
      }
    };

    const showNext = (e) => {
      if (e) e.stopPropagation();
      if (isAlbumMode) {
        if (albumPhotos.length === 0) return;
        currentPhotoIdx = (currentPhotoIdx + 1) % albumPhotos.length;
        renderLightboxView();
      } else {
        if (visibleCards.length === 0) return;
        currentCardIdx = (currentCardIdx + 1) % visibleCards.length;
        renderLightboxView();
      }
    };

    collageCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Check if a specific mini thumbnail was clicked
        const clickedMini = e.target.closest('.collage-mini-thumb, .collage-mini-more');
        let initialIdx = 0;
        if (clickedMini && clickedMini.getAttribute('data-idx')) {
          initialIdx = parseInt(clickedMini.getAttribute('data-idx'), 10) || 0;
        }
        openLightbox(card, initialIdx);
      });
    });

    if (lbClose) lbClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
    if (lbPrev) lbPrev.addEventListener('click', showPrev);
    if (lbNext) lbNext.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  // Activities Filtering
  const activityFilterBtns = document.querySelectorAll('.activity-filter-bar .filter-btn');
  const activityCards = document.querySelectorAll('.activities-grid .activity-card');

  function applyActivityFilter(filter, scrollIntoView = false) {
    if (activityFilterBtns.length === 0 || activityCards.length === 0) return;

    activityFilterBtns.forEach(btn => {
      if (btn.getAttribute('data-filter') === filter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    activityCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.3s ease';
      } else {
        card.style.display = 'none';
      }
    });

    if (scrollIntoView) {
      const targetElement = document.querySelector('.activity-filter-bar') || document.querySelector('.activities-grid');
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  if (activityFilterBtns.length > 0 && activityCards.length > 0) {
    activityCards.forEach(card => {
      card.style.display = 'none';
    });

    activityFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        applyActivityFilter(filter, false);
      });
    });

    const handleActivityHash = (shouldScroll = false) => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['centru', 'evenimente', 'colaborari'].includes(hash)) {
        applyActivityFilter(hash, shouldScroll);
      } else {
        applyActivityFilter('centru', shouldScroll);
      }
    };

    if (window.location.hash) {
      setTimeout(() => {
        handleActivityHash(true);
      }, 100);
    } else {
      // Default to Activități de Centru on load
      applyActivityFilter('centru', false);
    }

    window.addEventListener('hashchange', () => {
      handleActivityHash(true);
    });

    // Intercept clicks on activity hash links if already on page
    document.querySelectorAll('a[href*="activitati.html#"], a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', () => {
        const href = anchor.getAttribute('href');
        const hashIndex = href.indexOf('#');
        if (hashIndex !== -1) {
          const hash = href.substring(hashIndex + 1).toLowerCase();
          if (['centru', 'evenimente', 'colaborari'].includes(hash)) {
            applyActivityFilter(hash, true);
          }
        }
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

  // Contact / Registration Form & Google Sheets Integration
  // =========================================================================
  // INSTRUCȚIUNI GOOGLE SHEETS:
  // Introduceți URL-ul Web App generat din Google Apps Script în variabila de mai jos:
  const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz1mqo_3gNKIVWXlMaHB0ya_1NiQlac-Btd37bv4Z874PoIcxEkGS74oGqdkyRaokiF/exec'; 
  // Exemplu: 'https://script.google.com/macros/s/AKfycbx.../exec'
  // =========================================================================

  const registerForm = document.getElementById('scoutRegisterForm');
  const confirmModal = document.getElementById('confirmModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const branchSelect = document.getElementById('branchSelect');
  const submitBtn = document.getElementById('submitRegisterBtn');

  // Pre-select branch from URL parameter if present (e.g. contact.html?branch=Lupișori)
  if (branchSelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const branchParam = urlParams.get('branch');
    if (branchParam) {
      const decodedParam = decodeURIComponent(branchParam).toLowerCase();
      for (let i = 0; i < branchSelect.options.length; i++) {
        const optText = branchSelect.options[i].text.toLowerCase();
        const optVal = branchSelect.options[i].value.toLowerCase();
        if (optText.includes(decodedParam) || optVal.includes(decodedParam)) {
          branchSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  if (registerForm && confirmModal) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('applicantName')?.value?.trim() || 'Prieten cercetaș';
      const age = document.getElementById('applicantAge')?.value?.trim() || '';
      const branch = branchSelect?.value || 'Unitate Cercetășie';
      const phone = document.getElementById('applicantPhone')?.value?.trim() || '';
      const email = document.getElementById('applicantEmail')?.value?.trim() || '';
      const message = document.getElementById('applicantMessage')?.value?.trim() || '';

      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Trimite Cererea de Înscriere ➔';

      // Show loading indicator on button
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳ Se trimite cererea...</span>';
      }

      const payload = {
        name: name,
        age: age,
        branch: branch,
        phone: phone,
        email: email,
        message: message,
        submittedAt: new Date().toLocaleString('ro-RO')
      };

      // Send to Google Sheets if endpoint is provided
      if (GOOGLE_SHEETS_ENDPOINT && GOOGLE_SHEETS_ENDPOINT.trim() !== '') {
        try {
          await fetch(GOOGLE_SHEETS_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(payload)
          });
        } catch (err) {
          console.warn('Eroare la trimiterea în Google Sheets:', err);
        }
      }

      // Update modal and show confirmation
      const modalApplicant = document.getElementById('modalApplicant');
      if (modalApplicant) {
        modalApplicant.textContent = `${name} (${branch})`;
      }

      confirmModal.classList.add('show');
      document.body.style.overflow = 'hidden';
      registerForm.reset();

      // Reset submit button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });

    const closeModal = () => {
      confirmModal.classList.remove('show');
      document.body.style.overflow = '';
    };

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }

    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && confirmModal.classList.contains('show')) {
        closeModal();
      }
    });
  }

  // Setează automat anul curent în footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

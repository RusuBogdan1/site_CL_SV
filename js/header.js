class CustomHeader extends HTMLElement {
  connectedCallback() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentFullPath = decodeURIComponent(window.location.pathname);
    const isNestedPage = /\/(Activitati%20poze|Activitati poze|Poze FL|Poze OCF)\//i.test(currentFullPath);

    const resolveLocalHref = (href) => {
      if (!href || href.startsWith('#') || href.startsWith('http')) return href;
      if (!isNestedPage) return href;
      return '../' + href.replace(/^\.\//, '').replace(/^\.\.\//, '');
    };

    const isActive = (href) => {
      const target = href.split('#')[0];
      if (!target || target === 'index.html') {
        return currentPath === 'index.html' || currentPath === '';
      }
      return currentPath === target;
    };

    this.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a href="${resolveLocalHref('index.html')}" class="brand-logo" title="Centrul Local Ținutul Fagilor Suceava">
            <img src="${resolveLocalHref('assets/images/logo.png')}" alt="Siglă Cercetașii României Suceava" width="54" height="54">
            <div class="brand-text">
              <span class="brand-title">Ținutul Fagilor Suceava</span>
              <span class="brand-subtitle"></span>
            </div>
          </a>

          <nav class="main-nav">
            <ul class="nav-links" id="navLinks">
              <li><a href="${resolveLocalHref('index.html')}" class="nav-link ${isActive('index.html') ? 'active' : ''}">Acasă</a></li>
              
              <li class="nav-dropdown-wrapper">
                <a href="#" class="nav-link dropdown-toggle">
                  Despre Noi <span class="dropdown-caret">▾</span>
                </a>
                <ul class="dropdown-menu">
                  <li><a href="${resolveLocalHref('despre-noi.html')}">Cine suntem?</a></li>
                  <li><a href="${resolveLocalHref('istoric.html')}">Istoricul Cercetășiei</a></li>
                  <li><a href="${resolveLocalHref('contact.html')}">Contact</a></li>
                </ul>
              </li>

              <li>
                <a href="${resolveLocalHref('ce-este-cercetasia.html')}" class="nav-link ${isActive('ce-este-cercetasia.html') ? 'active' : ''}">
                  Ce este Cercetășia? 
                </a>
              </li>

              <li>
                <a href="${resolveLocalHref('ramuri-de-varsta.html')}" class="nav-link ${isActive('ramuri-de-varsta.html') ? 'active' : ''}">
                  Ramuri de Vârstă 
                </a>
              </li>

              <li class="nav-dropdown-wrapper">
                <a href="#" class="nav-link dropdown-toggle">
                  Activități <span class="dropdown-caret">▾</span>
                </a>
                <ul class="dropdown-menu">
                  <li><a href="${resolveLocalHref('activitati.html')}">Activități de Centru</a></li>
                  <li><a href="${resolveLocalHref('Activitati%20poze/poze-lupisori.html')}">Activități Lupișori</a></li>
                  <li><a href="${resolveLocalHref('Activitati%20poze/activitati-temerari.html')}">Activități Temerari</a></li>
                  <li><a href="${resolveLocalHref('Activitati%20poze/activitati-exploratori.html')}">Activități Exploratori</a></li>
                </ul>
              </li>

              <li><a href="${resolveLocalHref('proiecte.html')}" class="nav-link ${isActive('proiecte.html') ? 'active' : ''}">Proiecte</a></li>
              <li><a href="${resolveLocalHref('parteneri.html')}" class="nav-link ${isActive('parteneri.html') ? 'active' : ''}">Parteneri</a></li>
              <li><a href="${resolveLocalHref('donatii.html')}" class="nav-link ${isActive('donatii.html') ? 'active' : ''}">Donații</a></li>
            </ul>

            <button class="nav-toggle" id="navToggle" aria-label="Deschide meniul de navigare" aria-expanded="false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </nav>
        </div>
      </header>
    `;

    this.initEvents();
  }

  initEvents() {
    const toggleBtn = this.querySelector('#navToggle');
    const navLinks = this.querySelector('#navLinks');
    const dropdownToggles = this.querySelectorAll('.dropdown-toggle');

    // Deschidere/Închidere meniu mobil
    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('is-open');
        toggleBtn.setAttribute('aria-expanded', isOpen);
      });
    }

    // Deschidere dropdown-uri la atingere pe mobil
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          const wrapper = toggle.closest('.nav-dropdown-wrapper');
          wrapper.classList.toggle('is-active');
        }
      });
    });
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', CustomHeader);
}
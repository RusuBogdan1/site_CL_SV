class CustomFooter extends HTMLElement {
  connectedCallback() {
    const currentYear = new Date().getFullYear();
    const currentPath = window.location.pathname;
    const isNestedPage = /\/(Activitati%20poze|Activitati poze|Poze FL|Poze OCF)\//i.test(currentPath);

    const resolveHref = (href) => {
      if (!href || href.startsWith('http') || href.startsWith('#')) return href;
      if (!isNestedPage) return href;
      return '../' + href.replace(/^\.\//, '').replace(/^\.\.\//, '');
    };

    const resolveAsset = (src) => {
      if (!src || src.startsWith('http') || src.startsWith('data:')) return src;
      if (!isNestedPage) return src;
      return '../' + src.replace(/^\.\//, '').replace(/^\.\.\//, '');
    };

    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand">
              <div class="footer-logo">
                <img src="${resolveAsset('assets/images/logo.png')}" alt="Siglă Cercetașii României Suceava" width="48" height="48">
                <div class="brand-text">
                  <span class="brand-title" style="color: var(--white);">Ținutul Fagilor Suceava</span>
                  <span class="brand-subtitle" style="color: var(--gold-400);">Cercetașii României</span>
                </div>
              </div>
              <div style="margin-top: 0.75rem;">
                <a href="https://scout.ro/" target="_blank" rel="noopener" style="color: var(--gold-400); font-weight: 600; font-size: 0.9rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
                  <span>⚜️</span> <span>Site-ul Național ONCR</span>
                </a>
              </div>
            </div>

            <div class="footer-links-col">
              <h4 class="footer-heading">Despre Noi</h4>
              <ul class="footer-links">
                <li><a href="${resolveHref('index.html')}">Acasă</a></li>
                <li><a href="${resolveHref('despre-noi.html')}">Despre Noi</a></li>
                <li><a href="${resolveHref('istoric.html')}">Istoricul Cercetășiei</a></li>
                <li><a href="${resolveHref('ce-este-cercetasia.html')}">Ce este Cercetășia?</a></li>
                <li><a href="https://www.facebook.com/cercetasisuceava" target="_blank" rel="noopener">Facebook</a></li>
                <li><a href="https://www.instagram.com/cercetasisuceava" target="_blank" rel="noopener">Instagram</a></li>
              </ul>
            </div>

            <div class="footer-links-col">
              <h4 class="footer-heading">Susține Cercetășia</h4>
              <ul class="footer-links">
                <li><a href="${resolveHref('donatii.html')}">Donații & Sponsorizări</a></li>
                <li><a href="https://formular230.ro/centrul-local-tinutul-fagilor-suceava-filiala-organizatiei-nationale-cercetasii-romani" target="_blank" rel="noopener">Redirecționează 3.5%</a></li>
                <li><a href="${resolveHref('parteneri.html')}">Parteneri & Colaboratori</a></li>
              </ul>
            </div>

            <div class="footer-links-col">
              <h4 class="footer-heading">Activități & Proiecte</h4>
              <ul class="footer-links">
                <li><a href="${resolveHref('activitati.html')}">Activități de Centru</a></li>
                <li><a href="${resolveHref('ramuri-de-varsta.html')}">Ramuri de Vârstă</a></li>
                <li><a href="${resolveHref('proiecte.html#festivalul-luminii')}">Festivalul Luminii</a></li>
                <li><a href="${resolveHref('proiecte.html#cadou')}">Ordinul Cadoului Fermecat</a></li>
                <li><a href="${resolveHref('proiecte.html#lumina-pacii')}">Lumina Păcii</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p class="copyright">
              &copy; <span>${currentYear}</span> Centrul Local „Ținutul Fagilor” Suceava • Organizația Națională „Cercetașii României”. Toate drepturile rezervate.
            </p>
            <div class="footer-bottom-links">
              <a href="https://sfh.scout.ro/" target="_blank" rel="noopener">Platforma Safe from Harm</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

if (!customElements.get('site-footer')) {
  customElements.define('site-footer', CustomFooter);
}
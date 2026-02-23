  /* ── Nav hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id], div.stats-bar');
  const navAs    = document.querySelectorAll('.nav-links a');

  const ioNav = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + e.target.id) a.classList.add('active');
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('section[id]').forEach(s => ioNav.observe(s));

  /* ── Team grid responsive ── */
  function fixTeamGrid() {
    const coordCard = document.getElementById('coordGeral');
    if (coordCard) coordCard.style.gridColumn = window.innerWidth < 640 ? '' : 'span 2 / span 2';
  }
  fixTeamGrid();
  window.addEventListener('resize', fixTeamGrid);

  /* ── Copy PIX key ── */
  function copyPix() {
    const key = document.getElementById('pixKey').innerText;
    const btn = document.getElementById('btnCopy');
    navigator.clipboard.writeText(key).then(() => {
      btn.textContent = '✓ Copiado!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 2000);
    });
  }

  /* ── Scroll reveal ── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll(
    '.objective-card, .team-group-card, .stat-item, .transp-tab, .transp-use-card, .pix-card, .use-item'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObs.observe(el);
  });
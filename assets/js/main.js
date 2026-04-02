/* ============================================================
   HAMZA GÖKALP PORTFOLIO — main.js
   ============================================================ */

/* ---------- NAVBAR: Scroll ---------- */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ---------- HAMBURGER ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const s = hamburger.querySelectorAll('span');
    const open = navLinks.classList.contains('open');
    s[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    s[1].style.opacity   = open ? '0' : '';
    s[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
  }));
}

/* ---------- TYPED TEXT ---------- */
const typedEl = document.getElementById('typedText');
if (typedEl) {
  const words = ['Yazılım Geliştirici','Python Programcısı','Web Geliştirici','Problem Çözücü','Bilgisayar Programcısı'];
  let wi = 0, ci = 0, del = false;
  function type() {
    const w = words[wi];
    typedEl.textContent = del ? w.slice(0,--ci) : w.slice(0,++ci);
    if (!del && ci === w.length) { setTimeout(()=>{ del=true; setTimeout(type,60); },1800); return; }
    if (del && ci === 0) { del=false; wi=(wi+1)%words.length; }
    setTimeout(type, del ? 40 : 80);
  }
  type();
}

/* ---------- SKILL BARS ---------- */
const fills = document.querySelectorAll('.skill-fill');
if (fills.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = (e.target.dataset.width || 0) + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => obs.observe(f));
}

/* ---------- SCROLL TOP ---------- */
const scrollBtn = document.getElementById('scrollTop');
if (scrollBtn) {
  window.addEventListener('scroll', () => scrollBtn.classList.toggle('show', window.scrollY > 400));
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- NAVBAR: Oturum Durumu ---------- */
(function () {
  const navAuth = document.querySelector('.nav-auth');
  if (!navAuth) return;
  const isPages = window.location.pathname.includes('/pages/');
  const base    = isPages ? '../backend/php/' : 'backend/php/';
  fetch(base + 'nav_session.php')
    .then(r => r.json())
    .then(data => {
      if (!data.logged_in) return;
      const authPath = isPages ? '../backend/php/auth.php' : 'backend/php/auth.php';
      navAuth.innerHTML = `
        <div class="nav-user">
          <span class="nav-user-name"><i class="fas fa-user-circle"></i>${data.name}</span>
          <form method="POST" action="${authPath}" style="margin:0">
            <input type="hidden" name="action" value="logout">
            <button type="submit" class="nav-btn-logout"><i class="fas fa-sign-out-alt"></i> Çıkış</button>
          </form>
        </div>`;
    })
    .catch(() => {});
})();

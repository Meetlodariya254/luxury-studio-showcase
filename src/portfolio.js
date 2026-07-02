/**
 * portfolio.js — Photography Portfolio Section (Aikawakenichi List Mode)
 * Features:
 * - Dedicated Horizontal List/Strip Layout (Aikawakenichi Inspired)
 * - Eager image loading for instant display across all strips
 * - Interactive Hover Expansion with ZOOM badge animation
 * - GSAP Flip-powered Full-Screen Image Lightbox (Click to open full view, click to roll back)
 * - Animated Category Menu Bar with smooth item filtering
 * - Infinite horizontal scrolling via wheel & touch drag
 */

import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

/* ─── Portfolio Data (10 Images per Category) ────────────────────── */
const portfolioData = [
  {
    category: 'commercial',
    title: 'Commercial',
    images: [
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    category: 'wedding',
    title: 'Wedding',
    images: [
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545232972-9bdae8587396?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519225336804-91fe1b6dc63c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    category: 'portrait',
    title: 'Portrait',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    category: 'nature',
    title: 'Nature',
    images: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518173946687-a4c8a683392e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

/* ─── Flatten items and duplicate for True Infinite Scrolling ─────── */
const allItems = [];
portfolioData.forEach(group => {
  group.images.forEach((url, idx) => {
    // Generate ultra-high resolution version without cropping for lightbox view
    const fullUrl = url.replace(/w=\d+/, 'w=2200').replace(/q=\d+/, 'q=95');
    allItems.push({
      url,
      fullUrl,
      category: group.category,
      title: group.title,
      index: idx
    });
  });
});

/* ─── State ──────────────────────────────────────────────────────── */
let isOpen = false;
let currentCategory = 'all';
let isLightboxOpen = false;
let activeStripEl = null;
let singleSetWidth = 0;

/* ─── Build DOM ──────────────────────────────────────────────────── */
export function buildPortfolioDOM(container) {
  container.innerHTML = '';

  /* Back Button */
  const backBtn = document.createElement('button');
  backBtn.className = 'hero-back-btn pf-back-btn';
  backBtn.id = 'portfolio-back-btn';
  backBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
    Back to Canvas`;
  container.appendChild(backBtn);

  /* Animated Category Menu Bar */
  const menuBar = document.createElement('div');
  menuBar.className = 'pf-menubar';
  menuBar.id = 'pf-menubar';

  const categories = [
    { key: 'all', label: 'All Archives' },
    { key: 'commercial', label: 'Commercial' },
    { key: 'wedding', label: 'Wedding' },
    { key: 'portrait', label: 'Portrait' },
    { key: 'nature', label: 'Nature' }
  ];

  const menuInner = document.createElement('div');
  menuInner.className = 'pf-menubar-inner';
  menuInner.id = 'pf-menubar-inner';

  // Sliding black background indicator pill
  const slider = document.createElement('div');
  slider.className = 'pf-menu-slider';
  slider.id = 'pf-menu-slider';
  menuInner.appendChild(slider);

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `pf-menu-btn ${cat.key === 'all' ? 'active' : ''}`;
    btn.setAttribute('data-filter', cat.key);
    btn.textContent = cat.label;
    btn.addEventListener('click', (e) => filterCategory(cat.key, btn));
    menuInner.appendChild(btn);
  });

  menuBar.appendChild(menuInner);
  container.appendChild(menuBar);

  /* Horizontal Strip Gallery Wrapper */
  const scrollWrap = document.createElement('div');
  scrollWrap.className = 'pf-scroll-wrap pf-scroll-wrap--strip';
  scrollWrap.id = 'pf-scroll-wrap';

  const gallery = document.createElement('div');
  gallery.className = 'pf-gallery pf-gallery--strip';
  gallery.id = 'pf-gallery';

  // Render 2 sets for infinite horizontal loop
  const displayList = [...allItems, ...allItems];

  displayList.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'pf-item pf-item--strip';
    card.setAttribute('data-category', item.category);

    const imgWrap = document.createElement('div');
    imgWrap.className = 'pf-img-wrap';

    const img = document.createElement('img');
    img.src = item.url;
    img.alt = `${item.title} ${item.index + 1}`;
    img.className = 'pf-img';
    // Use eager loading so images show instantly
    img.loading = 'eager';
    img.decoding = 'async';

    const overlay = document.createElement('div');
    overlay.className = 'pf-strip-overlay';
    overlay.innerHTML = `
      <div class="pf-overlay-content">
        <span class="pf-cat-tag">${item.title}</span>
        <span class="pf-zoom-label">ZOOM</span>
      </div>`;

    imgWrap.appendChild(img);
    imgWrap.appendChild(overlay);
    card.appendChild(imgWrap);

    // Click on strip -> open full view
    card.addEventListener('click', () => openFullView(card, item));

    gallery.appendChild(card);
  });

  scrollWrap.appendChild(gallery);
  container.appendChild(scrollWrap);

  /* Helper Note Below Images */
  const clickNote = document.createElement('h4');
  clickNote.className = 'pf-click-note';
  clickNote.id = 'pf-click-note';
  clickNote.textContent = 'click on image to see full view';
  container.appendChild(clickNote);

  /* Full View / Lightbox Modal */
  const lightbox = document.createElement('div');
  lightbox.className = 'pf-lightbox';
  lightbox.id = 'pf-lightbox';
  lightbox.innerHTML = `
    <div class="pf-lightbox-backdrop" id="pf-lightbox-backdrop"></div>
    <div class="pf-lightbox-container" id="pf-lightbox-container">
      <img src="" alt="Full View" class="pf-lightbox-img" id="pf-lightbox-img">
      <div class="pf-lightbox-caption" id="pf-lightbox-caption"></div>
    </div>
    <button class="pf-lightbox-nav pf-lightbox-prev" id="pf-lightbox-prev" aria-label="Previous image">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>
    <button class="pf-lightbox-nav pf-lightbox-next" id="pf-lightbox-next" aria-label="Next image">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>
    <button class="pf-lightbox-close" id="pf-lightbox-close">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>`;
  container.appendChild(lightbox);

  /* Lightbox events */
  lightbox.querySelector('#pf-lightbox-backdrop')?.addEventListener('click', closeFullView);
  lightbox.querySelector('#pf-lightbox-close')?.addEventListener('click', closeFullView);
  lightbox.querySelector('#pf-lightbox-img')?.addEventListener('click', closeFullView);
  lightbox.querySelector('#pf-lightbox-prev')?.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
  lightbox.querySelector('#pf-lightbox-next')?.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });

  /* Infinite Scroll Monitor */
  scrollWrap.addEventListener('scroll', handleInfiniteHorizontalScroll, { passive: true });
}

/* ─── Infinite Horizontal Scroll Handler ─────────────────────────── */
function handleInfiniteHorizontalScroll() {
  const scrollWrap = document.getElementById('pf-scroll-wrap');
  const gallery = document.getElementById('pf-gallery');
  if (!scrollWrap || !gallery) return;

  singleSetWidth = gallery.scrollWidth / 2;
  if (singleSetWidth <= 0) return;

  const currentScroll = scrollWrap.scrollLeft;
  if (currentScroll >= singleSetWidth) {
    scrollWrap.scrollLeft = currentScroll - singleSetWidth;
  } else if (currentScroll <= 0) {
    scrollWrap.scrollLeft = singleSetWidth;
  }
}

/* ─── Strip Mode Interactions (Hover Expansion & Wheel Scroll) ───── */
function initStripInteractions() {
  const gallery = document.getElementById('pf-gallery');
  const scrollWrap = document.getElementById('pf-scroll-wrap');
  if (!gallery) return;

  gallery.addEventListener('mouseover', (e) => {
    if (isLightboxOpen) return;
    const strip = e.target.closest('.pf-item--strip');
    if (!strip) return;

    const allStrips = gallery.querySelectorAll('.pf-item--strip:not([style*="display: none"])');
    allStrips.forEach(s => {
      if (s === strip) {
        gsap.to(s, { flexGrow: 3.5, duration: 0.45, ease: 'power2.out' });
      } else {
        gsap.to(s, { flexGrow: 0.65, duration: 0.45, ease: 'power2.out' });
      }
    });
  });

  gallery.addEventListener('mouseleave', () => {
    if (isLightboxOpen) return;
    const allStrips = gallery.querySelectorAll('.pf-item--strip:not([style*="display: none"])');
    allStrips.forEach(s => gsap.to(s, { flexGrow: 1, duration: 0.4, ease: 'power2.out' }));
  });

  // Enable smooth mousewheel horizontal scrolling
  scrollWrap?.addEventListener('wheel', (e) => {
    if (isLightboxOpen) return;
    e.preventDefault();
    scrollWrap.scrollLeft += e.deltaY + e.deltaX;
  }, { passive: false });
}

/* ─── Category Filtering (Ultra-Smooth Sliding Pill + Accordion) ─── */
function filterCategory(categoryKey, targetBtn) {
  if (currentCategory === categoryKey) return;
  currentCategory = categoryKey;

  // Update sliding indicator pill position
  if (targetBtn) {
    gsap.to('#pf-menu-slider', {
      left: targetBtn.offsetLeft,
      width: targetBtn.offsetWidth,
      duration: 0.45,
      ease: 'power3.out'
    });
  }

  document.querySelectorAll('.pf-menu-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === categoryKey);
  });

  const items = document.querySelectorAll('.pf-item--strip');

  items.forEach(item => {
    const match = categoryKey === 'all' || item.getAttribute('data-category') === categoryKey;
    if (match) {
      if (item.style.display === 'none') {
        item.style.display = '';
        gsap.set(item, { flexBasis: 0, width: 0, opacity: 0, scale: 0.85, margin: 0 });
      }
      gsap.to(item, {
        flexBasis: 160,
        width: 160,
        opacity: 1,
        scale: 1,
        margin: 0,
        duration: 0.55,
        ease: 'power3.inOut'
      });
    } else {
      gsap.to(item, {
        flexBasis: 0,
        width: 0,
        opacity: 0,
        scale: 0.85,
        margin: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          if (currentCategory === categoryKey || categoryKey !== 'all') {
            item.style.display = 'none';
          }
        }
      });
    }
  });
}

/* ─── Full View / Lightbox Transition (Aikawakenichi Curtain Sweep & High-Res) ── */
function openFullView(stripEl, itemData) {
  if (isLightboxOpen) return;
  isLightboxOpen = true;
  activeStripEl = stripEl;

  const lightbox = document.getElementById('pf-lightbox');
  const lightboxImg = document.getElementById('pf-lightbox-img');
  const lightboxCaption = document.getElementById('pf-lightbox-caption');
  const stripImg = stripEl.querySelector('.pf-img');

  if (!lightbox || !lightboxImg || !stripImg) return;

  // 1) IMMEDIATELY set src to the already-cached thumbnail url to prevent flash of previous image
  lightboxImg.src = itemData.url;
  lightboxCaption.textContent = `${itemData.title} Collection`;

  // 2) Preload high-res version in background and upgrade silently when downloaded
  if (itemData.fullUrl && itemData.fullUrl !== itemData.url) {
    const highRes = new Image();
    highRes.src = itemData.fullUrl;
    highRes.onload = () => {
      if (isLightboxOpen && activeStripEl === stripEl) {
        lightboxImg.src = itemData.fullUrl;
      }
    };
  }

  // Get exact bounding rect of the clicked strip image
  const rect = stripImg.getBoundingClientRect();
  
  lightbox.classList.add('active');

  // Start image over strip with cover fit
  gsap.set(lightboxImg, {
    position: 'fixed',
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: '4px',
    objectFit: 'cover',
    zIndex: 1000
  });

  const isMob = window.innerWidth <= 768;
  const openDur = isMob ? 0.65 : 0.95;

  // Aikawakenichi upward black curtain reveal
  gsap.fromTo('#pf-lightbox-backdrop',
    { yPercent: 100, opacity: 1 },
    { yPercent: 0, opacity: 1, duration: openDur, ease: 'power3.inOut' }
  );

  gsap.to('#pf-lightbox-close', { opacity: 1, pointerEvents: 'auto', duration: 0.4, delay: isMob ? 0.2 : 0.35 });
  gsap.to('.pf-lightbox-nav', { opacity: 1, pointerEvents: 'auto', duration: 0.4, delay: isMob ? 0.2 : 0.35 });
  gsap.to(lightboxCaption, { opacity: 1, y: 0, duration: 0.4, delay: isMob ? 0.25 : 0.4 });

  // Animate smoothly to center viewport with object-fit: contain (Zero Cropping!)
  gsap.to(lightboxImg, {
    top: '6vh',
    left: '6vw',
    width: '88vw',
    height: '88vh',
    borderRadius: '8px',
    objectFit: 'contain',
    duration: openDur,
    ease: 'power3.inOut'
  });
}

function navigateLightbox(direction) {
  if (!isLightboxOpen || !activeStripEl) return;
  const visibleStrips = Array.from(document.querySelectorAll('.pf-item--strip:not([style*="display: none"])'));
  if (visibleStrips.length <= 1) return;

  const currentIdx = visibleStrips.indexOf(activeStripEl);
  if (currentIdx === -1) return;

  const nextIdx = (currentIdx + direction + visibleStrips.length) % visibleStrips.length;
  const nextStripEl = visibleStrips[nextIdx];
  const nextImgEl = nextStripEl.querySelector('.pf-img');
  if (!nextImgEl) return;

  activeStripEl = nextStripEl;

  const itemIdx = allItems.findIndex(it => it.url === nextImgEl.src || it.fullUrl === nextImgEl.src);
  const itemData = itemIdx !== -1 ? allItems[itemIdx] : { url: nextImgEl.src, title: nextStripEl.getAttribute('data-category')?.toUpperCase() || 'Archive' };

  const lightboxImg = document.getElementById('pf-lightbox-img');
  const lightboxCaption = document.getElementById('pf-lightbox-caption');

  if (lightboxCaption) lightboxCaption.textContent = `${itemData.title} Collection`;

  if (lightboxImg) {
    gsap.to(lightboxImg, {
      opacity: 0.3,
      scale: 0.96,
      duration: 0.2,
      onComplete: () => {
        lightboxImg.src = itemData.url;
        gsap.to(lightboxImg, { opacity: 1, scale: 1, duration: 0.35 });
        if (itemData.fullUrl && itemData.fullUrl !== itemData.url) {
          const highRes = new Image();
          highRes.src = itemData.fullUrl;
          highRes.onload = () => {
            if (isLightboxOpen && activeStripEl === nextStripEl) {
              lightboxImg.src = itemData.fullUrl;
            }
          };
        }
      }
    });
  }

  // Ensure next strip stays inside scroll viewport
  nextStripEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function closeFullView() {
  if (!isLightboxOpen || !activeStripEl) return;

  const lightboxImg = document.getElementById('pf-lightbox-img');
  const lightboxCaption = document.getElementById('pf-lightbox-caption');
  const stripImg = activeStripEl.querySelector('.pf-img');

  if (!lightboxImg || !stripImg) return;

  const rect = stripImg.getBoundingClientRect();
  const isMob = window.innerWidth <= 768;
  const closeDur = isMob ? 0.6 : 0.85;

  // Aikawakenichi downward black curtain reveal (white canvas slides downwards from top)
  gsap.to('#pf-lightbox-backdrop', { yPercent: 100, duration: closeDur, ease: 'power3.inOut' });
  gsap.to('#pf-lightbox-close', { opacity: 0, pointerEvents: 'none', duration: 0.3 });
  gsap.to('.pf-lightbox-nav', { opacity: 0, pointerEvents: 'none', duration: 0.3 });
  gsap.to(lightboxCaption, { opacity: 0, duration: 0.3 });

  // Switch object-fit back to cover as it rolls back into the strip sliver
  gsap.to(lightboxImg, {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: '4px',
    objectFit: 'cover',
    duration: closeDur,
    ease: 'power3.inOut',
    onComplete: () => {
      document.getElementById('pf-lightbox')?.classList.remove('active');
      isLightboxOpen = false;
      activeStripEl = null;
      // Clear src so previous image is never held in memory for next click
      lightboxImg.removeAttribute('src');
    }
  });
}

/* ─── Lifecycle Exports ──────────────────────────────────────────── */
export function openPortfolioPage(triggerShatterFn) {
  if (isOpen) return;
  isOpen = true;

  const page = document.getElementById('portfolio-page');
  if (!page) return;

  if (typeof triggerShatterFn === 'function') triggerShatterFn(2);

  page.classList.add('active');

  // Position menu slider under active pill on entrance
  setTimeout(() => {
    const activeBtn = document.querySelector('.pf-menu-btn.active');
    if (activeBtn) {
      gsap.set('#pf-menu-slider', {
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth
      });
    }
    initStripInteractions();
  }, 60);

  gsap.fromTo(
    '#pf-menubar',
    { opacity: 0, y: -30 },
    { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.1 }
  );
}

export function closePortfolioPage(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  if (!isOpen) return;
  isOpen = false;

  const page = document.getElementById('portfolio-page');
  if (!page) return;

  page.classList.remove('active');
}

export function isPortfolioOpen() {
  return isOpen;
}

export function initPortfolioEvents() {
  const pfBackBtn = document.getElementById('portfolio-back-btn');
  if (pfBackBtn) ['click', 'pointerdown', 'touchend'].forEach(evt => pfBackBtn.addEventListener(evt, closePortfolioPage));
}

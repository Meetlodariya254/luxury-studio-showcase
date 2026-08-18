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
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80'
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
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80',
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
let currentCategoryTitle = 'ALL ARCHIVES';
let currentLayout = 'grid'; // 'grid' | 'list'
let isLightboxOpen = false;
let isFiltering = false;
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
    const triggerCat = (e) => {
      e.preventDefault();
      e.stopPropagation();
      filterCategory(cat.key, btn);
    };
    btn.addEventListener('click', triggerCat);
    btn.addEventListener('touchend', triggerCat);
    menuInner.appendChild(btn);
  });

  ['touchstart', 'touchmove', 'touchend', 'pointerdown'].forEach(evt => {
    menuBar.addEventListener(evt, (e) => e.stopPropagation());
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
  clickNote.textContent = 'CLICK ON IMAGE TO SEE FULL VIEW';
  container.appendChild(clickNote);

  /* Full View / Lightbox Modal */
  const lightbox = document.createElement('div');
  lightbox.className = 'pf-lightbox';
  lightbox.id = 'pf-lightbox';
  lightbox.innerHTML = `
    <div class="pf-lightbox-backdrop" id="pf-lightbox-backdrop"></div>
    <div class="pf-lightbox-container" id="pf-lightbox-container">
      <img src="" alt="Full View" class="pf-lightbox-img" id="pf-lightbox-img">
    </div>`;
  container.appendChild(lightbox);

  /* New Glassmorphism Action Pill (Aikawakenichi style) */
  const glassPill = document.createElement('div');
  glassPill.className = 'pf-glass-pill mode-gallery';
  glassPill.id = 'pf-glass-pill';
  glassPill.innerHTML = `
    <div class="pill-left" id="pill-center-pill">
      <!-- Gallery Mode: Shows Category & Thumb -->
      <div class="pill-gallery-info" id="pill-gallery-info">
        <div class="pill-thumb-circle">
          <img src="" id="pill-gallery-thumb" alt="thumb">
        </div>
        <div class="pill-cat-text" id="pill-cat-text">
          <span class="pill-label" id="pill-label-top">Category</span>
          <span class="pill-value" id="pill-value-bottom">ALL ARCHIVES</span>
        </div>
      </div>
      
      <!-- Lightbox Mode: Shows Image Info & Nav -->
      <div class="pill-lightbox-info">
        <div class="pill-thumb-circle">
          <img src="" id="pill-thumb-img" alt="thumb">
        </div>
        <div class="pill-lightbox-text">
          <span class="pill-counter" id="pill-counter">1 — 10</span>
        </div>
        <div class="pill-nav-buttons">
          <button class="pill-nav-btn" id="pill-prev-btn" aria-label="Previous Image">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
          <button class="pill-nav-btn" id="pill-next-btn" aria-label="Next Image">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
    
    <div class="pill-right">
      <!-- Gallery Mode: Layout Toggle Icon & Label -->
      <div class="pill-layout-toggle" id="pill-layout-toggle">
        <div class="layout-icon-svg" id="layout-icon-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9V6h12v3"/><path d="M6 15v3h12v-3"/>
          </svg>
        </div>
        <span class="layout-label">LAYOUT</span>
      </div>
      
      <!-- Lightbox Mode: Close Button -->
      <button class="pill-close-btn" id="pill-close-btn" aria-label="Close Lightbox">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `;
  container.appendChild(glassPill);

  /* Lightbox events */
  lightbox.querySelector('#pf-lightbox-backdrop')?.addEventListener('click', closeFullView);
  lightbox.querySelector('#pf-lightbox-img')?.addEventListener('click', closeFullView);
  
  /* Pill Events */
  glassPill.querySelector('#pill-close-btn')?.addEventListener('click', closeFullView);
  glassPill.querySelector('#pill-prev-btn')?.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
  glassPill.querySelector('#pill-next-btn')?.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });
  
  let mobileLayoutTimer = null;

  const updatePillHoverState = (isHovered) => {
    const glassPillEl = document.getElementById('pf-glass-pill');
    const layoutBtn = document.getElementById('pill-layout-toggle');
    const labelTop = document.getElementById('pill-label-top');
    const valueBottom = document.getElementById('pill-value-bottom');

    if (isHovered) {
      glassPillEl?.classList.add('is-hovered');
      layoutBtn?.classList.add('active');
      if (labelTop && valueBottom) {
        labelTop.style.display = 'none';
        valueBottom.textContent = currentLayout === 'grid' ? 'GRID' : 'LIST';
      }
    } else {
      glassPillEl?.classList.remove('is-hovered');
      layoutBtn?.classList.remove('active');
      if (labelTop && valueBottom) {
        labelTop.style.display = '';
        valueBottom.textContent = currentCategoryTitle;
      }
    }
  };

  const layoutToggleBtn = glassPill.querySelector('#pill-layout-toggle');
  if (layoutToggleBtn) {
    // Desktop mouse hover events
    layoutToggleBtn.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) {
        updatePillHoverState(true);
      }
    });

    layoutToggleBtn.addEventListener('mouseleave', () => {
      if (window.matchMedia('(hover: hover)').matches) {
        updatePillHoverState(false);
      }
    });

    // Toggle layout on click / tap
    const triggerLayoutToggle = (e) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      const newLayout = currentLayout === 'grid' ? 'list' : 'grid';
      toggleLayout(newLayout);

      // Show layout button state & name for 1 second, then revert back to icon symbol
      updatePillHoverState(true);
      if (mobileLayoutTimer) clearTimeout(mobileLayoutTimer);
      mobileLayoutTimer = setTimeout(() => {
        const isHoveringDesktop = window.matchMedia('(hover: hover)').matches && layoutToggleBtn.matches(':hover');
        if (!isHoveringDesktop) {
          updatePillHoverState(false);
        }
      }, 1000);
    };

    layoutToggleBtn.addEventListener('click', triggerLayoutToggle);
  }

  // Initialize gallery thumb with first image
  const galleryThumb = glassPill.querySelector('#pill-gallery-thumb');
  if (galleryThumb && portfolioData.length > 0 && portfolioData[0].images.length > 0) {
    galleryThumb.src = portfolioData[0].images[0];
  }

  /* Infinite Scroll Monitor */
  scrollWrap.addEventListener('scroll', () => {
    if (currentLayout === 'grid') {
      handleInfiniteHorizontalScroll();
    } else {
      handleVerticalAbsorbScroll();
    }
  }, { passive: true });
}

/* ─── Infinite Horizontal Scroll Handler ─────────────────────────── */
function handleInfiniteHorizontalScroll() {
  if (isFiltering || currentLayout !== 'grid') return;
  const scrollWrap = document.getElementById('pf-scroll-wrap');
  const gallery = document.getElementById('pf-gallery');
  if (!scrollWrap || !gallery) return;

  singleSetWidth = gallery.scrollWidth / 2;
  if (singleSetWidth <= 0) return;

  const currentScroll = scrollWrap.scrollLeft;
  if (currentScroll >= singleSetWidth) {
    scrollWrap.scrollLeft = currentScroll - singleSetWidth;
  } else if (currentScroll < 0) {
    scrollWrap.scrollLeft = singleSetWidth + currentScroll;
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

    // Update gallery thumb dynamically on hover
    const stripImg = strip.querySelector('.pf-img');
    const galleryThumb = document.getElementById('pill-gallery-thumb');
    if (stripImg && galleryThumb) {
      galleryThumb.src = stripImg.src;
    }

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

  // Enable smooth mousewheel horizontal scrolling only in grid mode
  scrollWrap?.addEventListener('wheel', (e) => {
    if (isLightboxOpen || currentLayout === 'list') return;
    e.preventDefault();
    scrollWrap.scrollLeft += e.deltaY + e.deltaX;
  }, { passive: false });
}

/* ─── Category Filtering (Ultra-Smooth Sliding Pill + Accordion) ─── */
function filterCategory(categoryKey, targetBtn) {
  const isSameCategory = currentCategory === categoryKey;
  
  if (isSameCategory) {
    // If user clicks the currently active category, smoothly scroll back to the first image
    const scrollWrap = document.getElementById('pf-scroll-wrap');
    if (scrollWrap) {
      if (currentLayout === 'grid') {
        gsap.to(scrollWrap, { scrollLeft: 0, duration: 0.5, ease: 'power3.out' });
      } else {
        gsap.to(scrollWrap, { scrollTop: 0, duration: 0.5, ease: 'power3.out' });
      }
    }
    return;
  }

  currentCategory = categoryKey;
  isFiltering = true;

  // Update sliding indicator pill position
  if (targetBtn) {
    currentCategoryTitle = targetBtn.textContent.toUpperCase();
    gsap.to('#pf-menu-slider', {
      left: targetBtn.offsetLeft,
      width: targetBtn.offsetWidth,
      duration: 0.45,
      ease: 'power3.out'
    });
    
    // Update the bottom pill category text
    const valueBottom = document.getElementById('pill-value-bottom');
    if (valueBottom) {
      valueBottom.textContent = currentCategoryTitle;
    }
  }

  // Update bottom pill gallery thumb to the first image of the selected category
  let firstItemImg = '';
  if (categoryKey === 'all') {
    firstItemImg = portfolioData[0]?.images[0] || '';
  } else {
    const catGroup = portfolioData.find(g => g.category === categoryKey);
    if (catGroup && catGroup.images.length > 0) {
      firstItemImg = catGroup.images[0];
    }
  }
  const galleryThumb = document.getElementById('pill-gallery-thumb');
  if (galleryThumb && firstItemImg) {
    galleryThumb.src = firstItemImg;
  }

  document.querySelectorAll('.pf-menu-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === categoryKey);
  });

  const scrollWrap = document.getElementById('pf-scroll-wrap');
  if (scrollWrap) {
    gsap.killTweensOf(scrollWrap);
    // Reset scroll immediately so it always displays from the first image of the selected category
    if (currentLayout === 'grid') {
      scrollWrap.scrollLeft = 0;
    } else {
      scrollWrap.scrollTop = 0;
    }
  }

  const items = document.querySelectorAll('.pf-item--strip');
  let finishedCount = 0;
  const total = items.length;

  items.forEach(item => {
    gsap.killTweensOf(item);
    const match = categoryKey === 'all' || item.getAttribute('data-category') === categoryKey;
    if (match) {
      if (item.style.display === 'none') {
        item.style.display = '';
        gsap.set(item, { flexBasis: 0, width: 0, opacity: 0, scale: 0.85, margin: 0 });
      }
      gsap.to(item, {
        flexBasis: currentLayout === 'grid' ? 160 : '',
        width: currentLayout === 'grid' ? 160 : '',
        opacity: 1,
        scale: 1,
        margin: 0,
        duration: 0.5,
        ease: 'power3.out',
        onComplete: () => {
          finishedCount++;
          if (finishedCount >= total) {
            isFiltering = false;
            if (scrollWrap && currentLayout === 'grid') {
              scrollWrap.scrollLeft = 0;
            }
          }
        }
      });
    } else {
      gsap.to(item, {
        flexBasis: 0,
        width: 0,
        opacity: 0,
        scale: 0.85,
        margin: 0,
        duration: 0.35,
        ease: 'power3.inOut',
        onComplete: () => {
          if (currentCategory === categoryKey || categoryKey !== 'all') {
            item.style.display = 'none';
          }
          finishedCount++;
          if (finishedCount >= total) {
            isFiltering = false;
            if (scrollWrap && currentLayout === 'grid') {
              scrollWrap.scrollLeft = 0;
            }
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
  const stripImg = stripEl.querySelector('.pf-img');

  if (!lightbox || !lightboxImg || !stripImg) return;

  // 1) IMMEDIATELY set src to the already-cached thumbnail url to prevent flash of previous image
  lightboxImg.src = itemData.url;

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

  const state = Flip.getState(lightboxImg);

  const isMob = window.innerWidth <= 768;
  const openDur = isMob ? 0.65 : 0.95;

  // Aikawakenichi upward black curtain reveal
  gsap.fromTo('#pf-lightbox-backdrop',
    { yPercent: 100, opacity: 1 },
    { yPercent: 0, opacity: 1, duration: openDur, ease: 'power3.inOut' }
  );

  const glassPill = document.getElementById('pf-glass-pill');
  if (glassPill) {
    glassPill.classList.remove('mode-gallery');
    glassPill.classList.add('mode-lightbox');
    const thumbImg = document.getElementById('pill-thumb-img');
    if (thumbImg) thumbImg.src = itemData.url;
    
    const visibleStrips = Array.from(document.querySelectorAll('.pf-item--strip:not([style*="display: none"])'));
    const currentIdx = visibleStrips.indexOf(activeStripEl);
    const counterEl = document.getElementById('pill-counter');
    if (counterEl) counterEl.textContent = `${currentIdx + 1} — ${visibleStrips.length}`;
  }

  // Calculate exact bounds to maintain image aspect ratio without using contain
  const natWidth = stripImg.naturalWidth || 800;
  const natHeight = stripImg.naturalHeight || 1200;
  const imgRatio = natWidth / natHeight;

  const maxW = window.innerWidth * 0.88;
  const maxH = window.innerHeight * 0.88;
  const containerRatio = maxW / maxH;

  let finalW, finalH;
  if (imgRatio > containerRatio) {
    finalW = maxW;
    finalH = maxW / imgRatio;
  } else {
    finalH = maxH;
    finalW = maxH * imgRatio;
  }

  const finalTop = (window.innerHeight - finalH) / 2;
  const finalLeft = (window.innerWidth - finalW) / 2;

  // Move to final state, keeping objectFit: 'cover'
  gsap.set(lightboxImg, {
    top: finalTop + 'px',
    left: finalLeft + 'px',
    width: finalW + 'px',
    height: finalH + 'px',
    borderRadius: '8px',
    objectFit: 'cover'
  });

  // Animate smoothly to center viewport (Perfect Aikawakenichi reveal)
  Flip.from(state, {
    duration: openDur,
    ease: 'power3.inOut',
    absolute: true
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
  const thumbImg = document.getElementById('pill-thumb-img');
  const counterEl = document.getElementById('pill-counter');

  if (counterEl) counterEl.textContent = `${nextIdx + 1} — ${visibleStrips.length}`;
  if (thumbImg) thumbImg.src = itemData.url;

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

  const state = Flip.getState(lightboxImg);

  const rect = stripImg.getBoundingClientRect();
  const isMob = window.innerWidth <= 768;
  const closeDur = isMob ? 0.6 : 0.85;

  // Aikawakenichi downward black curtain reveal (white canvas slides downwards from top)
  gsap.to('#pf-lightbox-backdrop', { yPercent: 100, duration: closeDur, ease: 'power3.inOut' });
  
  const glassPill = document.getElementById('pf-glass-pill');
  if (glassPill) {
    glassPill.classList.remove('mode-lightbox');
    glassPill.classList.add('mode-gallery');
  }

  // Move to final closed state
  gsap.set(lightboxImg, {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: '4px',
    objectFit: 'cover'
  });

  // Smoothly roll back into the strip sliver
  Flip.from(state, {
    duration: closeDur,
    ease: 'power3.inOut',
    absolute: true,
    onComplete: () => {
      document.getElementById('pf-lightbox')?.classList.remove('active');
      isLightboxOpen = false;
      activeStripEl = null;
      // Clear src so previous image is never held in memory for next click
      lightboxImg.removeAttribute('src');
    }
  });
}

/* ─── Layout Toggle & Scroll Effect ──────────────────────────────── */
function toggleLayout(layout) {
  if (currentLayout === layout) return;
  currentLayout = layout;
  
  const iconBox = document.getElementById('layout-icon-box');
  if (iconBox) {
    if (layout === 'grid') {
      iconBox.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V6h12v3"/><path d="M6 15v3h12v-3"/></svg>`;
    } else {
      iconBox.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6H5v12h3"/><path d="M16 6h3v12h-3"/></svg>`;
    }
  }

  const valueBottom = document.getElementById('pill-value-bottom');
  const glassPillEl = document.getElementById('pf-glass-pill');
  if (glassPillEl && glassPillEl.classList.contains('is-hovered') && valueBottom) {
    valueBottom.textContent = layout === 'grid' ? 'GRID' : 'LIST';
  }
  
  const scrollWrap = document.getElementById('pf-scroll-wrap');
  const gallery = document.getElementById('pf-gallery');
  if (!scrollWrap || !gallery) return;

  if (layout === 'list') {
    scrollWrap.classList.remove('pf-scroll-wrap--strip');
    scrollWrap.classList.add('pf-scroll-wrap--list');
    gallery.classList.remove('pf-gallery--strip');
    gallery.classList.add('pf-gallery--list');
    
    // reset scroll for list mode
    scrollWrap.scrollLeft = 0;
    scrollWrap.scrollTop = 0;
    
    // reset interaction styles from strip mode
    const items = gallery.querySelectorAll('.pf-item--strip');
    items.forEach(item => {
      gsap.killTweensOf(item);
      item.style.flexGrow = '';
      const img = item.querySelector('.pf-img');
      if (img) {
        gsap.killTweensOf(img);
        img.style.transform = '';
        img.style.filter = '';
      }
    });
  } else {
    scrollWrap.classList.remove('pf-scroll-wrap--list');
    scrollWrap.classList.add('pf-scroll-wrap--strip');
    gallery.classList.remove('pf-gallery--list');
    gallery.classList.add('pf-gallery--strip');
    
    // reset scroll for strip mode
    scrollWrap.scrollTop = 0;
    scrollWrap.scrollLeft = 0;
    
    // cleanup list inline styles
    const items = gallery.querySelectorAll('.pf-item--strip');
    items.forEach(item => {
      const img = item.querySelector('.pf-img');
      if (img) {
        img.style.transform = '';
        img.style.filter = '';
      }
    });
  }
}

function handleVerticalAbsorbScroll() {
  if (currentLayout !== 'list') return;
  const items = document.querySelectorAll('.pf-gallery--list .pf-item--strip:not([style*="display: none"])');
  const isMob = window.innerWidth <= 768;
  const stickyTop = isMob ? 130 : window.innerHeight * 0.10;
  
  items.forEach((item, i) => {
    const rect = item.getBoundingClientRect();
    const imgWrap = item.querySelector('.pf-img-wrap');
    if (!imgWrap) return;

    if (rect.top <= stickyTop + 4) {
      const nextItem = items[i + 1];
      if (nextItem) {
        const nextRect = nextItem.getBoundingClientRect();
        const distance = nextRect.top - stickyTop;
        
        let progress = 1 - (distance / (window.innerHeight * 0.7));
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        
        // Scale down to 0.85
        const scale = 1 - (progress * 0.15);
        
        imgWrap.style.transform = `scale(${scale})`;
        imgWrap.style.filter = '';
        imgWrap.style.transformOrigin = 'top center';
      } else {
        imgWrap.style.transform = 'scale(1)';
        imgWrap.style.filter = '';
      }
    } else {
      imgWrap.style.transform = 'scale(1)';
      imgWrap.style.filter = '';
    }
  });
}

/* ─── Lifecycle Exports ──────────────────────────────────────────── */
export function openPortfolioPage(triggerShatterFn) {
  if (isOpen) return;
  isOpen = true;

  const page = document.getElementById('portfolio-page');
  if (!page) return;

  const scrollWrap = document.getElementById('pf-scroll-wrap');
  if (scrollWrap) {
    scrollWrap.scrollLeft = 0;
    scrollWrap.scrollTop = 0;
  }

  // Ensure bottom capsule pill thumbnail matches the first image of current category
  let firstThumbImg = '';
  if (currentCategory === 'all') {
    firstThumbImg = portfolioData[0]?.images[0] || '';
  } else {
    const catGroup = portfolioData.find(g => g.category === currentCategory);
    firstThumbImg = catGroup?.images[0] || '';
  }
  const galleryThumb = document.getElementById('pill-gallery-thumb');
  if (galleryThumb && firstThumbImg) {
    galleryThumb.src = firstThumbImg;
  }

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
  const globalBack = document.getElementById('global-back-btn');
  if (globalBack) globalBack.style.display = 'none';
}

export function isPortfolioOpen() {
  return isOpen;
}

export function initPortfolioEvents() {
  const pfBackBtn = document.getElementById('portfolio-back-btn');
  if (pfBackBtn) ['click', 'pointerdown', 'touchend'].forEach(evt => pfBackBtn.addEventListener(evt, closePortfolioPage));
}

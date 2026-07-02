import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { Reflector } from 'three/addons/objects/Reflector.js';
import {
  buildPortfolioDOM,
  openPortfolioPage,
  closePortfolioPage,
  isPortfolioOpen,
  initPortfolioEvents,
} from './portfolio.js';


// Data configuration for the 4 sections
const SECTIONS = [
  {
    id: 'home',
    title: 'HOME',
    subtitle: 'Vishal Shah — Visual Artist & Photographer',
    bgTheme: '#f6f3f6',
    thumb: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=300&q=80',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2 class="modal-title">Vision & Light</h2>
      <p class="modal-subtitle">Vishal Shah captures the evocative interplay between natural light and architectural form. Based in Ahmedabad, Gujarat, Vishal's work spans across timeless wedding stories and fine art portraits.</p>
      <div class="modal-grid">
        <div class="modal-img-card"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" alt="Shot 1"></div>
        <div class="modal-img-card"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80" alt="Shot 2"></div>
      </div>
    `
  },
  {
    id: 'about',
    title: 'ABOUT',
    subtitle: 'Biography & Artist Statement',
    bgTheme: '#f3f5f8',
    thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2 class="modal-title">About Vishal Shah</h2>
      <p class="modal-subtitle">With 8+ years behind the lens, Vishal focuses on emotive storytelling. Based in Ahmedabad, Gujarat, Vishal crafts compelling visuals for weddings, portraits, and timeless celebrations across India and abroad.</p>
      <div class="modal-grid">
        <div class="modal-img-card"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" alt="Portrait"></div>
        <div class="modal-img-card"><img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80" alt="Studio"></div>
      </div>
    `
  },
  {
    id: 'portfolio',
    title: 'PORTFOLIO',
    subtitle: 'Selected Works (2018 — 2026)',
    bgTheme: '#f5f3f0',
    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2 class="modal-title">Selected Archives</h2>
      <p class="modal-subtitle">An ongoing exploration of weddings, intimate portraits, and timeless stories across India and abroad.</p>
      <div class="modal-grid">
        <div class="modal-img-card"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" alt="Arch 1"></div>
        <div class="modal-img-card"><img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80" alt="Nature"></div>
        <div class="modal-img-card"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" alt="Portrait 2"></div>
        <div class="modal-img-card"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" alt="Fashion"></div>
      </div>
    `
  },
  {
    id: 'contact',
    title: 'CONTACT',
    subtitle: 'Inquiries & Commissions',
    bgTheme: '#f2f6f5',
    thumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2 class="modal-title">Initiate Dialogue</h2>
      <p class="modal-subtitle">Available across India and abroad for weddings, portraits, and timeless stories. Reach out directly at hello@vishalshah.in</p>
      <form class="contact-form" onsubmit="event.preventDefault(); alert('Thank you! Your message has been sent to Vishal Shah.');">
        <input type="text" class="form-input" placeholder="Your Name" required>
        <input type="email" class="form-input" placeholder="Your Email Address" required>
        <textarea class="form-textarea" rows="4" placeholder="Project Details or Inquiry..." required></textarea>
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    `
  }
];

let activeIndex = 0;
let targetRotation = 0;
let currentRotation = 0;
let isDragging = false;
let startX = 0;
let previousX = 0;
let rotationVelocity = 0;

// DOM Elements
const bgTitle = document.getElementById('bg-title');
const pillThumb = document.getElementById('pill-thumb');
const thumbImg = document.getElementById('thumb-img');
const pillLabel = document.getElementById('pill-label');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const menuBtn = document.getElementById('menu-btn');
const contentModal = document.getElementById('content-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCloseBackdrop = document.getElementById('modal-close-backdrop');
const modalBodyContent = document.getElementById('modal-body-content');

// Build portfolio page DOM & wire events
const portfolioPageEl = document.getElementById('portfolio-page');
if (portfolioPageEl) {
  buildPortfolioDOM(portfolioPageEl);
  initPortfolioEvents();
}

// Three.js Setup
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

let floorReflector;

function adjustCameraForViewport() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  if (aspect < 0.6) { // Portrait phone (e.g. iPhone / Android)
    camera.position.z = 15.5;
    camera.position.y = 0.35;
  } else if (aspect < 0.9) { // Portrait tablet / foldable
    camera.position.z = 12.5;
    camera.position.y = 0.2;
  } else { // Desktop / landscape
    camera.position.z = 9.5;
    camera.position.y = 0;
  }
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (floorReflector) {
    const dpr = Math.min(window.devicePixelRatio, 2);
    floorReflector.getRenderTarget().setSize(Math.min(1024, window.innerWidth * dpr * 0.5), Math.min(1024, window.innerHeight * dpr * 0.5));
  }
}

adjustCameraForViewport();

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Create 3D Cylinder Group
const cylinderGroup = new THREE.Group();
scene.add(cylinderGroup);

// Texture Loader with fallback canvas generator
const textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = 'anonymous';

function createFallbackTexture(text, color) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  
  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 1024, 640);
  grad.addColorStop(0, color);
  grad.addColorStop(1, '#2a2a2a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 640);
  
  // Text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.font = 'bold 140px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 512, 320);
  
  return new THREE.CanvasTexture(canvas);
}

const meshes = [];
const radius = 3.6;
const height = 2.4;
const segments = SECTIONS.length;
const arcAngle = (Math.PI * 2) / segments;
const gapAngle = 0.15; // Gap between panels

SECTIONS.forEach((sec, i) => {
  // Curved cylinder segment centered at local angle 0
  const geometry = new THREE.CylinderGeometry(
    radius, radius, height, 64, 1, true,
    -arcAngle / 2 + gapAngle / 2,
    arcAngle - gapAngle
  );
  
  const posAttr = geometry.attributes.position;
  const curvedPos = new Float32Array(posAttr.count * 3);
  const flatPos = new Float32Array(posAttr.count * 3);
  for (let k = 0; k < posAttr.count; k++) {
    const vx = posAttr.getX(k);
    const vy = posAttr.getY(k);
    const vz = posAttr.getZ(k);
    curvedPos[k * 3] = vx;
    curvedPos[k * 3 + 1] = vy;
    curvedPos[k * 3 + 2] = vz;
    
    const alpha = Math.atan2(vx, vz);
    flatPos[k * 3] = alpha * radius;
    flatPos[k * 3 + 1] = vy;
    flatPos[k * 3 + 2] = radius;
  }
  
  const fallbackTex = createFallbackTexture(sec.title, '#4a3a4a');
  const material = new THREE.MeshPhysicalMaterial({
    map: fallbackTex,
    roughness: 0.25,
    metalness: 0.1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide
  });

  // Load actual high-res image
  textureLoader.load(sec.image, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    material.map = tex;
    material.needsUpdate = true;
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.y = i * arcAngle;
  mesh.userData = { index: i, section: sec, curvedPos, flatPos, flatFactor: 0, currentFlatFactor: 0 };
  cylinderGroup.add(mesh);
  meshes.push(mesh);
});

// Tilt cylinder slightly for dynamic cinematic 3D perspective
cylinderGroup.rotation.x = 0.08;
cylinderGroup.rotation.z = -0.03;

// Realistic Floor Reflection (aikawakenichi style)
const customReflectorShader = {
  name: 'FloorReflectorShader',
  uniforms: {
    color: { value: new THREE.Color(0xffffff) },
    tDiffuse: { value: null },
    textureMatrix: { value: null },
    opacity: { value: 0.65 }
  },
  vertexShader: `
    uniform mat4 textureMatrix;
    varying vec4 vUv;
    varying vec3 vWorldPos;

    #include <common>
    #include <logdepthbuf_pars_vertex>

    void main() {
      vUv = textureMatrix * vec4( position, 1.0 );
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      vWorldPos = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
      #include <logdepthbuf_vertex>
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    uniform float opacity;
    varying vec4 vUv;
    varying vec3 vWorldPos;

    #include <logdepthbuf_pars_fragment>

    void main() {
      #include <logdepthbuf_fragment>

      vec2 uv = vUv.xy / vUv.w;
      if (vUv.w <= 0.0) discard;

      // Slight blur sampling for subtle, imperfect mirror reflection
      float blur = 0.0035;
      vec4 base = texture2D(tDiffuse, uv) * 0.36;
      base += texture2D(tDiffuse, uv + vec2(-blur, -blur)) * 0.16;
      base += texture2D(tDiffuse, uv + vec2(blur, -blur)) * 0.16;
      base += texture2D(tDiffuse, uv + vec2(-blur, blur)) * 0.16;
      base += texture2D(tDiffuse, uv + vec2(blur, blur)) * 0.16;

      // Smooth distance gradient fade out (dark at bottom/edges, visible near base)
      float zFade = 1.0 - smoothstep(1.5, 12.0, abs(vWorldPos.z));
      float xFade = 1.0 - smoothstep(8.0, 22.0, abs(vWorldPos.x));
      float fade = zFade * xFade;

      float finalAlpha = base.a * fade * opacity;
      if (finalAlpha <= 0.001) discard;

      gl_FragColor = vec4(base.rgb, finalAlpha);

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `
};

const dprInit = Math.min(window.devicePixelRatio, 2);
const floorGeometry = new THREE.PlaneGeometry(60, 60);
floorReflector = new Reflector(floorGeometry, {
  clipBias: 0.003,
  textureWidth: Math.min(1024, window.innerWidth * dprInit * 0.5),
  textureHeight: Math.min(1024, window.innerHeight * dprInit * 0.5),
  color: 0xffffff,
  shader: customReflectorShader,
  multisample: 4
});

floorReflector.rotation.x = -Math.PI / 2;
floorReflector.position.y = -1.56;
floorReflector.material.transparent = true;
floorReflector.material.depthWrite = false;
scene.add(floorReflector);



// Hero Page State & Actions
let isHeroPageOpen = false;
let typewriterTimeout;

function triggerShatter(index) {
  const breakingOverlay = document.getElementById('breaking-overlay');
  const shatterGrid = document.getElementById('shatter-grid');
  if (!breakingOverlay || !shatterGrid) return;
  
  shatterGrid.innerHTML = '';
  const cols = 6;
  const rows = 4;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tile = document.createElement('div');
      tile.className = 'shatter-tile';
      tile.style.backgroundImage = `url('${SECTIONS[index].image}')`;
      tile.style.backgroundPosition = `${(c / (cols - 1)) * 100}% ${(r / (rows - 1)) * 100}%`;
      shatterGrid.appendChild(tile);
    }
  }

  gsap.set(breakingOverlay, { opacity: 1 });
  const tiles = Array.from(shatterGrid.children);
  gsap.set(tiles, { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, opacity: 1 });

  tiles.forEach((tile) => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 300 + Math.random() * 600;
    gsap.to(tile, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      z: 200 - Math.random() * 500,
      rotationX: (Math.random() - 0.5) * 240,
      rotationY: (Math.random() - 0.5) * 240,
      rotationZ: (Math.random() - 0.5) * 240,
      opacity: 0,
      duration: 1.3,
      ease: 'power3.out'
    });
  });

  setTimeout(() => { gsap.set(breakingOverlay, { opacity: 0 }); }, 1400);
}

function openHeroPage() {
  if (isAnyPageOpen()) return;
  isHeroPageOpen = true;
  const heroPage = document.getElementById('hero-page');
  const heroNameEl = document.getElementById('hero-name');
  const typewriterEl = document.getElementById('hero-typewriter');
  
  triggerShatter(0);

  // Reveal Hero Page
  heroPage.classList.add('active');
  showGlobalBack(closeHeroPage);

  // Character split reveal for VISHAL SHAH
  const text = "VISHAL SHAH";
  heroNameEl.innerHTML = text.split('').map(char => {
    if (char === ' ') return `<span class="char-wrap" style="width: 24px;">&nbsp;</span>`;
    return `<span class="char-wrap"><span class="char-inner">${char}</span></span>`;
  }).join('');

  gsap.fromTo(heroPage.querySelectorAll('.char-inner'), 
    { yPercent: 110 },
    { yPercent: 0, stagger: 0.04, ease: 'power3.out', duration: 0.9, delay: 0.3 }
  );

  // Typewriter loop
  clearTimeout(typewriterTimeout);
  const lines = [
    "Weddings. Portraits. Timeless stories.",
    "8 years behind the lens.",
    "Available across India and abroad."
  ];
  let lineIdx = 0;
  
  function typeLine() {
    if (!isHeroPageOpen) return;
    const currentLine = lines[lineIdx];
    let charIdx = 0;
    typewriterEl.textContent = '';
    
    function typeChar() {
      if (!isHeroPageOpen) return;
      if (charIdx < currentLine.length) {
        typewriterEl.textContent += currentLine.charAt(charIdx);
        charIdx++;
        typewriterTimeout = setTimeout(typeChar, 45);
      } else {
        typewriterTimeout = setTimeout(deleteChar, 2200);
      }
    }
    
    function deleteChar() {
      if (!isHeroPageOpen) return;
      if (charIdx > 0) {
        typewriterEl.textContent = currentLine.substring(0, charIdx - 1);
        charIdx--;
        typewriterTimeout = setTimeout(deleteChar, 25);
      } else {
        lineIdx = (lineIdx + 1) % lines.length;
        typewriterTimeout = setTimeout(typeLine, 400);
      }
    }
    
    typeChar();
  }
  
  setTimeout(typeLine, 800);

  // Stats count up
  const statProjects = document.getElementById('stat-projects');
  const statYears = document.getElementById('stat-years');
  let obj = { p: 0, y: 0 };
  gsap.to(obj, {
    p: 500,
    y: 8,
    duration: 2,
    ease: 'power2.out',
    delay: 0.5,
    onUpdate: () => {
      if (statProjects) statProjects.textContent = Math.round(obj.p);
      if (statYears) statYears.textContent = Math.round(obj.y);
    }
  });
}

// ── Global Back-to-Canvas Button ─────────────────────────────────
// This button lives OUTSIDE all page divs so it is never trapped by
// opacity or pointer-events of a parent stacking context.
const globalBackBtn = document.getElementById('global-back-btn');
function showGlobalBack(closeFn) {
  if (!globalBackBtn) return;
  globalBackBtn._closeFn = closeFn;
  globalBackBtn.style.display = 'flex';
}
function hideGlobalBack() {
  if (!globalBackBtn) return;
  globalBackBtn.style.display = 'none';
  globalBackBtn._closeFn = null;
}
if (globalBackBtn) {
  ['click', 'pointerdown', 'touchend'].forEach(evt => globalBackBtn.addEventListener(evt, (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof globalBackBtn._closeFn === 'function') globalBackBtn._closeFn();
  }));
}

function closeHeroPage() {
  isHeroPageOpen = false;
  clearTimeout(typewriterTimeout);
  document.getElementById('hero-page').classList.remove('active');
  hideGlobalBack();
}

let heroParallaxY = 0;
window.addEventListener('wheel', (e) => {
  if (isHeroPageOpen) {
    heroParallaxY += e.deltaY * 0.4;
    heroParallaxY = Math.max(-150, Math.min(150, heroParallaxY));
    gsap.to('#hero-name', { y: -heroParallaxY, duration: 0.3, ease: 'power1.out' });
  }
}, { passive: true });

let isProfilePageOpen = false;
let isContactPageOpen = false;

function isAnyPageOpen() {
  return isHeroPageOpen || isProfilePageOpen || isContactPageOpen || isPortfolioOpen() || contentModal.classList.contains('active');
}

function openProfilePage() {
  if (isAnyPageOpen()) return;
  isProfilePageOpen = true;
  const profilePage = document.getElementById('profile-page');
  const profileImgWrapper = document.getElementById('profile-img-wrapper');
  
  triggerShatter(1);
  profilePage.classList.add('active');
  showGlobalBack(closeProfilePage);

  gsap.fromTo(profileImgWrapper,
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power2.inOut', delay: 0.3 }
  );

  const animItems = profilePage.querySelectorAll('.profile-anim-item');
  gsap.fromTo(animItems,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out', delay: 0.5 }
  );
}

function closeProfilePage() {
  isProfilePageOpen = false;
  document.getElementById('profile-page').classList.remove('active');
  hideGlobalBack();
}

function openContactPage() {
  if (isAnyPageOpen()) return;
  isContactPageOpen = true;
  const contactPage = document.getElementById('contact-page');
  
  triggerShatter(3);
  contactPage.classList.add('active');
  showGlobalBack(closeContactPage);

  const cards = contactPage.querySelectorAll('.contact-anim-card');
  gsap.fromTo(cards,
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out', delay: 0.35 }
  );

  const mapElem = contactPage.querySelector('.contact-anim-map');
  gsap.fromTo(mapElem,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.35 + (cards.length * 0.12) + 0.2 }
  );

  const formCard = contactPage.querySelector('.contact-anim-form');
  gsap.fromTo(formCard,
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.35 }
  );

  const formGroups = contactPage.querySelectorAll('.contact-form-group');
  gsap.fromTo(formGroups,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: 'power2.out', delay: 0.65 }
  );
}

function closeContactPage() {
  isContactPageOpen = false;
  document.getElementById('contact-page').classList.remove('active');
  hideGlobalBack();
}

// Modal Actions
function openModal(index = activeIndex) {
  if (index === 0) {
    openHeroPage();
    return;
  }
  if (index === 1) {
    openProfilePage();
    return;
  }
  if (index === 2) {
    // Portfolio: open the dedicated full-screen portfolio page
    openPortfolioPage(triggerShatter);
    showGlobalBack(() => { closePortfolioPage(); hideGlobalBack(); });
    return;
  }
  if (index === 3) {
    openContactPage();
    return;
  }
  triggerShatter(index);
  const sec = SECTIONS[index];
  modalBodyContent.innerHTML = sec.content;
  contentModal.classList.add('active');
}

function closeModal() {
  contentModal.classList.remove('active');
}

function closeAllPages() {
  closeHeroPage();
  closeProfilePage();
  closePortfolioPage();
  closeContactPage();
  closeModal();
}

pillThumb.addEventListener('click', () => { if (isAnyPageOpen()) closeAllPages(); openModal(activeIndex); });
pillLabel.addEventListener('click', () => { if (isAnyPageOpen()) closeAllPages(); openModal(activeIndex); });
menuBtn.addEventListener('click', () => { if (isAnyPageOpen()) closeAllPages(); openModal(activeIndex); });
modalCloseBtn.addEventListener('click', closeModal);
modalCloseBackdrop.addEventListener('click', closeModal);

// Mouse & Touch Drag Interaction
window.addEventListener('mousedown', (e) => {
  if (isAnyPageOpen()) return;
  isDragging = true;
  startX = e.clientX;
  previousX = e.clientX;
  rotationVelocity = 0;
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - previousX;
  previousX = e.clientX;
  
  const rotDelta = deltaX * 0.005;
  targetRotation += rotDelta;
  currentRotation += rotDelta;
  rotationVelocity = rotDelta;
});

window.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  
  const snappedIndex = Math.round(-targetRotation / arcAngle);
  targetRotation = -snappedIndex * arcAngle;
  
  const normalizedIndex = ((snappedIndex % segments) + segments) % segments;
  updateActiveSection(normalizedIndex);
});

// Touch support for mobile/tablet
window.addEventListener('touchstart', (e) => {
  if (isAnyPageOpen()) return;
  isDragging = true;
  startX = e.touches[0].clientX;
  previousX = e.touches[0].clientX;
  rotationVelocity = 0;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].clientX - previousX;
  previousX = e.touches[0].clientX;
  
  const rotDelta = deltaX * 0.005;
  targetRotation += rotDelta;
  currentRotation += rotDelta;
}, { passive: true });

window.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  const snappedIndex = Math.round(-targetRotation / arcAngle);
  targetRotation = -snappedIndex * arcAngle;
  const normalizedIndex = ((snappedIndex % segments) + segments) % segments;
  updateActiveSection(normalizedIndex);
});

// Click on page or canvas to open section
window.addEventListener('click', (e) => {
  if (isDragging || Math.abs(e.clientX - startX) > 5) return;
  if (isAnyPageOpen()) return;
  // Ignore clicks on navbar or controls
  if (e.target.closest('.glass-pill-nav') || e.target.closest('.bottom-controls-bar') || e.target.closest('.mode-toggle-btn') || e.target.closest('.content-modal') || e.target.closest('.hero-page') || e.target.closest('.profile-page') || e.target.closest('.contact-page') || e.target.closest('.portfolio-page') || e.target.closest('.hero-back-btn') || e.target.closest('#contact-back-btn') || e.target.closest('#portfolio-back-btn')) return;
  
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(
    (e.clientX / window.innerWidth) * 2 - 1,
    -(e.clientY / window.innerHeight) * 2 + 1
  );
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(meshes);
  
  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    const clickedIdx = clickedMesh.userData.index;
    if (clickedIdx !== activeIndex) {
      goToSection(clickedIdx);
    }
    openModal(clickedIdx);
  } else {
    // Clicked background canvas
    openModal(activeIndex);
  }
});

// Wheel / Trackpad horizontal & vertical scrolling
let wheelTimeout;
window.addEventListener('wheel', (e) => {
  if (isAnyPageOpen()) return;
  
  const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  if (Math.abs(delta) < 2) return;
  
  const rotDelta = delta * 0.003;
  targetRotation += rotDelta;
  currentRotation += rotDelta;
  
  clearTimeout(wheelTimeout);
  wheelTimeout = setTimeout(() => {
    const snappedIndex = Math.round(-targetRotation / arcAngle);
    targetRotation = -snappedIndex * arcAngle;
    const normalizedIndex = ((snappedIndex % segments) + segments) % segments;
    updateActiveSection(normalizedIndex);
  }, 120);
}, { passive: true });

// Resize Handler
window.addEventListener('resize', adjustCameraForViewport);

let isFlatMode = false;
const modeProgress = { val: 0 };
let isEntranceAnimateDone = false;

const modeBtn = document.getElementById('mode-btn');
const modeText = document.getElementById('mode-text');
const modeDot = document.querySelector('.mode-dot');

function toggleMode(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  if (isAnyPageOpen()) return;
  isFlatMode = !isFlatMode;
  
  if (isFlatMode) {
    if (modeText) modeText.textContent = 'MODE: FLAT';
    if (modeDot) {
      modeDot.style.background = '#3b82f6';
      modeDot.style.boxShadow = '0 0 8px #3b82f6';
    }
    gsap.to(modeProgress, { val: 1, duration: 1.2, ease: 'power3.inOut' });
    meshes.forEach((m) => gsap.to(m.userData, { flatFactor: 1, duration: 1.2, ease: 'power3.inOut' }));
  } else {
    if (modeText) modeText.textContent = 'MODE: CYLINDER';
    if (modeDot) {
      modeDot.style.background = '#10b981';
      modeDot.style.boxShadow = '0 0 8px #10b981';
    }
    gsap.to(modeProgress, { val: 0, duration: 1.2, ease: 'power3.inOut' });
    meshes.forEach((m) => gsap.to(m.userData, { flatFactor: 0, duration: 1.2, ease: 'power3.inOut' }));
  }
}

modeBtn?.addEventListener('click', toggleMode);

// Update UI state when active index shifts
function updateActiveSection(index) {
  if (index === activeIndex) return;
  activeIndex = index;
  const sec = SECTIONS[activeIndex];

  // Animate background typography
  gsap.to(bgTitle, {
    opacity: 0,
    scale: 0.95,
    yPercent: -50,
    duration: 0.2,
    onComplete: () => {
      bgTitle.textContent = sec.title;
      gsap.to(bgTitle, { opacity: 1, scale: 1, yPercent: -50, duration: 0.4, ease: 'power2.out' });
    }
  });

  // Animate Pill Label & Thumb
  gsap.to(pillLabel, {
    opacity: 0,
    y: 5,
    duration: 0.15,
    onComplete: () => {
      pillLabel.textContent = sec.title;
      gsap.to(pillLabel, { opacity: 1, y: 0, duration: 0.3 });
    }
  });

  gsap.to(thumbImg, {
    scale: 1.3,
    opacity: 0.5,
    duration: 0.2,
    onComplete: () => {
      thumbImg.src = sec.thumb;
      gsap.to(thumbImg, { scale: 1, opacity: 1, duration: 0.3 });
    }
  });

  // Shift background theme color smoothly
  document.documentElement.style.setProperty('--bg-color', sec.bgTheme);
}

// Navigation Controls
function goToSection(index) {
  // Calculate shortest path rotation
  const currentIdx = Math.round((-targetRotation / arcAngle)) % segments;
  const normalizedCurrent = (currentIdx + segments) % segments;
  let diff = index - normalizedCurrent;
  
  if (diff > segments / 2) diff -= segments;
  if (diff < -segments / 2) diff += segments;
  
  targetRotation -= diff * arcAngle;
  updateActiveSection(index);
}

prevBtn.addEventListener('click', () => {
  const wasOpen = isAnyPageOpen();
  if (wasOpen) closeAllPages();
  targetRotation += arcAngle;
  const newIndex = (activeIndex - 1 + segments) % segments;
  updateActiveSection(newIndex);
  if (wasOpen) openModal(newIndex);
});

nextBtn.addEventListener('click', () => {
  const wasOpen = isAnyPageOpen();
  if (wasOpen) closeAllPages();
  targetRotation -= arcAngle;
  const newIndex = (activeIndex + 1) % segments;
  updateActiveSection(newIndex);
  if (wasOpen) openModal(newIndex);
});

// Animation Render Loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  
  if (isAnyPageOpen()) {
    return;
  }
  
  const elapsedTime = clock.getElapsedTime();
  
  // Smooth continuous rotation damping / lerp for both modes
  currentRotation += (targetRotation - currentRotation) * 0.08;
  
  if (isEntranceAnimateDone) {
    const p = modeProgress.val;
    
    // Blend cylinder group tilt and rotation between Cylinder Mode (p=0) and Flat Mode (p=1)
    cylinderGroup.rotation.x = 0.08 * (1 - p);
    cylinderGroup.rotation.z = -0.03 * (1 - p);
    cylinderGroup.rotation.y = currentRotation * (1 - p);
    
    // Update each mesh smoothly
    meshes.forEach((m) => {
      const idx = m.userData.index;
      
      // 1. Smoothly morph geometry vertices between curved cylinder segment and flat rectangular photograph
      if (Math.abs(m.userData.currentFlatFactor - m.userData.flatFactor) > 0.0001) {
        m.userData.currentFlatFactor += (m.userData.flatFactor - m.userData.currentFlatFactor) * 0.15;
        const f = m.userData.currentFlatFactor;
        const posAttr = m.geometry.attributes.position;
        const cPos = m.userData.curvedPos;
        const fPos = m.userData.flatPos;
        for (let k = 0; k < posAttr.count; k++) {
          posAttr.setXYZ(
            k,
            cPos[k * 3] + (fPos[k * 3] - cPos[k * 3]) * f,
            cPos[k * 3 + 1] + (fPos[k * 3 + 1] - cPos[k * 3 + 1]) * f,
            cPos[k * 3 + 2] + (fPos[k * 3 + 2] - cPos[k * 3 + 2]) * f
          );
        }
        posAttr.needsUpdate = true;
        m.geometry.computeVertexNormals();
      }
      
      // 2. Calculate continuous normalized angular offset theta in [-PI, PI]
      let theta = (idx * arcAngle + currentRotation) % (Math.PI * 2);
      if (theta > Math.PI) theta -= Math.PI * 2;
      if (theta < -Math.PI) theta += Math.PI * 2;
      
      const step = theta / arcAngle;
      
      // Flat Mode positions & rotations (spacing 5.6 for exact aikawakenichi gap)
      const flatX = step * 5.6;
      const flatZ = -Math.abs(step) * 0.35; // Subtle 3D depth parallax
      const flatRotY = -step * 0.12; // Subtle parallax tilt facing camera
      
      // Blend smoothly based on modeProgress p:
      m.position.x = flatX * p;
      m.position.z = flatZ * p;
      m.rotation.y = (idx * arcAngle) * (1 - p) + flatRotY * p;
    });
  } else {
    cylinderGroup.rotation.y = currentRotation;
  }
  
  // Subtle breathing animation on cylinder position
  cylinderGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.06;
  
  renderer.render(scene, camera);
}

animate();

// Preloader & Entrance Animation Sequence
const loaderOverlay = document.getElementById('loader-overlay');
const loaderCounter = document.getElementById('loader-counter');
const loaderBar = document.getElementById('loader-bar');

if (loaderOverlay) {
  // Set initial hidden states for entrance animation
  gsap.set('.g-header', { opacity: 0, y: -25 });
  gsap.set('.bottom-controls-bar', { opacity: 0, y: 50 });
  gsap.set('.drag-hint', { opacity: 0 });
  gsap.set('#bg-title', { opacity: 0, scale: 0.85, yPercent: -50 });
  
  // Initial flat/unrolled fanned-out state for entrance animation
  meshes.forEach((m, idx) => {
    m.position.set((idx - 1.5) * 5.8, -4, -6);
    m.rotation.set(0.4, 0, 0);
    m.scale.set(0.25, 0.25, 0.25);
    m.material.opacity = 0;
    m.material.transparent = true;
  });
  cylinderGroup.rotation.set(0, 0, 0);

  let progress = { val: 0 };
  gsap.to(progress, {
    val: 100,
    duration: 2.4,
    ease: 'power2.inOut',
    onUpdate: () => {
      const p = Math.round(progress.val);
      if (loaderCounter) loaderCounter.textContent = `${p}%`;
      if (loaderBar) loaderBar.style.width = `${p}%`;
    },
    onComplete: () => {
      // Fade out preloader overlay
      gsap.to(loaderOverlay, {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          if (loaderOverlay && loaderOverlay.parentNode) {
            loaderOverlay.parentNode.removeChild(loaderOverlay);
          }
        }
      });

      // Swoosh cards from flat unrolled state into 3D cylinder formation
      meshes.forEach((m, idx) => {
        gsap.to(m.position, { x: 0, y: 0, z: 0, duration: 1.8, ease: 'power3.out', stagger: 0.1 });
        gsap.to(m.rotation, { x: 0, y: idx * arcAngle, z: 0, duration: 1.8, ease: 'power3.out', stagger: 0.1 });
        gsap.to(m.scale, { x: 1, y: 1, z: 1, duration: 1.8, ease: 'power3.out', stagger: 0.1 });
        gsap.to(m.material, { opacity: 1, duration: 1.2, ease: 'power2.out', stagger: 0.1 });
      });

      // Tilt cylinder smoothly into position
      gsap.to(cylinderGroup.rotation, { x: 0.08, y: 0, z: -0.03, duration: 2.0, ease: 'power3.out', onComplete: () => {
        isEntranceAnimateDone = true;
      }});

      // Stagger reveal UI components
      gsap.to('#bg-title', { opacity: 1, scale: 1, yPercent: -50, duration: 1.4, delay: 0.2, ease: 'power2.out' });
      gsap.to('.g-header', { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: 'power2.out' });
      gsap.to('.bottom-controls-bar', { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: 'power2.out' });
      gsap.to('.drag-hint', { opacity: 0.7, duration: 1.2, delay: 0.9 });
    }
  });
}

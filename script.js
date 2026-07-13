/* =====================================================
   SOLAR POWERED INTELLIGENT IRRIGATION SYSTEM
   Complete JavaScript — Three.js + GSAP + Interactions
   ===================================================== */

'use strict';

// ============================================================
// 1. LOADING SCREEN
// ============================================================
(function initLoader() {
  const bar    = document.getElementById('loader-bar');
  const pct    = document.getElementById('loader-percent');
  const screen = document.getElementById('loading-screen');

  // Spawn loader particles
  const pContainer = document.getElementById('loader-particles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    const hue  = Math.random() > 0.5 ? '185' : '150';
    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:hsl(${hue},100%,${50 + Math.random()*30}%);
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --dur:${5 + Math.random()*10}s;
      --op:${0.2 + Math.random()*0.5};
      animation-delay:${Math.random()*5}s;
    `;
    pContainer.appendChild(p);
  }

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 4 + 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        gsap.to(screen, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            screen.style.display = 'none';
            document.body.style.overflow = 'auto';
            startAnimations();
          }
        });
      }, 400);
    }
    bar.style.width = progress + '%';
    pct.textContent  = Math.floor(progress) + '%';
  }, 40);

  document.body.style.overflow = 'hidden';
})();

// ============================================================
// 2. GSAP REGISTER PLUGINS
// ============================================================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================================
// 3. CUSTOM CURSOR
// ============================================================
const cursorGlow = document.getElementById('cursor-glow');
const cursorDot  = document.getElementById('cursor-dot');

document.addEventListener('mousemove', (e) => {
  gsap.to(cursorGlow, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power2.out' });
  gsap.to(cursorDot,  { x: e.clientX, y: e.clientY, duration: 0.1 });
});

document.querySelectorAll('a, button, .hw-card, .metric-card, .app-detail-card, .glass-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
});

// ============================================================
// 4. SCROLL PROGRESS BAR
// ============================================================
window.addEventListener('scroll', () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const progress   = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});

// ============================================================
// 5. NAVBAR
// ============================================================
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Active nav link on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});

// ============================================================
// 6. SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 70 },
        duration: 1.2,
        ease: 'power3.inOut'
      });
    }
  });
});

// ============================================================
// 7. DARK MODE TOGGLE
// ============================================================
const darkBtn = document.getElementById('dark-mode-toggle');
darkBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const icon = darkBtn.querySelector('i');
  icon.className = document.body.classList.contains('light-mode')
    ? 'fas fa-sun' : 'fas fa-moon';
});

// ============================================================
// 8. BACK TO TOP
// ============================================================
document.getElementById('back-to-top').addEventListener('click', () => {
  gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power3.inOut' });
});

// ============================================================
// 9. RIPPLE BUTTON EFFECT
// ============================================================
document.querySelectorAll('.ripple-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect   = this.getBoundingClientRect();
    const ripple = this.querySelector('.btn-ripple');
    ripple.style.left    = (e.clientX - rect.left) + 'px';
    ripple.style.top     = (e.clientY - rect.top) + 'px';
    ripple.style.width   = '0';
    ripple.style.height  = '0';
    ripple.style.opacity = '1';
    ripple.style.animation = 'none';
    ripple.offsetHeight; // reflow
    ripple.style.animation = 'rippleAnim 0.6s linear forwards';
  });
});

// ============================================================
// 10. TYPED.JS
// ============================================================
function initTyped() {
  if (typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings: [
        'Solar Energy',
        'IoT Technology',
        'ESP32 Microcontroller',
        'Blynk Cloud Platform',
        'Precision Agriculture',
        'Smart Irrigation'
      ],
      typeSpeed:   60,
      backSpeed:   35,
      backDelay:   1500,
      loop:        true,
      cursorChar:  '|'
    });
  }
}

// ============================================================
// 11. AOS INIT
// ============================================================
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      offset: 60
    });
  }
}

// ============================================================
// 12. SCROLL REVEAL
// ============================================================
function initScrollReveal() {
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({ reset: false, distance: '30px', duration: 900 });
    sr.reveal('.hw-card',    { origin: 'bottom', interval: 100 });
    sr.reveal('.step-card',  { origin: 'left',   interval: 80  });
    sr.reveal('.ref-category',{ origin: 'bottom', interval: 150 });
  }
}

// ============================================================
// 13. ANIMATED COUNTERS
// ============================================================
function initCounters() {
  const counterEls = document.querySelectorAll('.count-num, .stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let start    = 0;
        const step   = Math.ceil(target / 60);
        const timer  = setInterval(() => {
          start += step;
          if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = start;
          }
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => observer.observe(el));
}

// ============================================================
// 14. AMBIENT PARTICLES (Hero Background)
// ============================================================
function createAmbientParticles() {
  const container = document.getElementById('ambient-particles');
  if (!container) return;

  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const isGreen = Math.random() > 0.6;
    const isYellow = Math.random() > 0.85;

    p.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${isYellow ? '#ffd700' : isGreen ? '#00ff88' : '#00d4ff'};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${8 + Math.random() * 12}s;
      --op: ${0.2 + Math.random() * 0.5};
      animation: particleFloat var(--dur) ease-in-out infinite;
      animation-delay: ${Math.random() * 8}s;
      opacity: var(--op);
      box-shadow: 0 0 ${size * 3}px ${isGreen ? 'rgba(0,255,136,0.6)' : 'rgba(0,212,255,0.6)'};
    `;
    container.appendChild(p);
  }
}

// ============================================================
// 15. ANIMATED BIRDS
// ============================================================
function createBirds() {
  const container = document.getElementById('birds-container');
  if (!container) return;

  for (let i = 0; i < 8; i++) {
    const bird = document.createElement('div');
    bird.className = 'bird';
    const top  = 8 + Math.random() * 35;
    const dur  = 8 + Math.random() * 12;
    const delay= Math.random() * 10;
    const size = 0.6 + Math.random() * 0.8;

    bird.style.cssText = `
      top: ${top}%;
      --dur: ${dur}s;
      animation-delay: ${delay}s;
      transform: scale(${size});
    `;
    container.appendChild(bird);
  }
}

// ============================================================
// 16. THREE.JS — HERO 3D SCENE
// ============================================================
function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.set(0, 0, 8);

  // ---- LIGHTS ----
  const ambientLight = new THREE.AmbientLight(0x112233, 0.8);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffd700, 2);
  sunLight.position.set(5, 10, 5);
  sunLight.castShadow = true;
  scene.add(sunLight);

  const blueLight = new THREE.PointLight(0x00d4ff, 1.5, 20);
  blueLight.position.set(-5, 3, 3);
  scene.add(blueLight);

  const greenLight = new THREE.PointLight(0x00ff88, 1, 15);
  greenLight.position.set(5, -2, 2);
  scene.add(greenLight);

  // ---- SOLAR PANEL GROUP ----
  const solarGroup = new THREE.Group();
  scene.add(solarGroup);

  // Panel frame
  const frameGeo  = new THREE.BoxGeometry(3, 2, 0.08);
  const frameMat  = new THREE.MeshStandardMaterial({ color: 0x334455, metalness: 0.9, roughness: 0.2 });
  const frame     = new THREE.Mesh(frameGeo, frameMat);
  solarGroup.add(frame);

  // Panel cells (4x3 grid)
  const cellMat = new THREE.MeshStandardMaterial({
    color: 0x001a3a,
    metalness: 0.7,
    roughness: 0.1,
    emissive: 0x001133,
    emissiveIntensity: 0.3
  });

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const cellGeo  = new THREE.BoxGeometry(0.68, 0.62, 0.04);
      const cell     = new THREE.Mesh(cellGeo, cellMat);
      cell.position.set(-1.02 + c * 0.68, 0.62 - r * 0.62, 0.05);
      solarGroup.add(cell);

      // Cell grid lines
      const lineGeo = new THREE.EdgesGeometry(cellGeo);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x003366, linewidth: 1 });
      const lines   = new THREE.LineSegments(lineGeo, lineMat);
      lines.position.copy(cell.position);
      solarGroup.add(lines);
    }
  }

  // Support pole
  const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x556677, metalness: 0.8 });
  const pole    = new THREE.Mesh(poleGeo, poleMat);
  pole.position.set(0, -1.8, -0.3);
  pole.rotation.x = 0.3;
  solarGroup.add(pole);

  solarGroup.position.set(-2.5, 0.5, 0);
  solarGroup.rotation.x = -0.3;

  // ---- EARTH ----
  const earthGeo = new THREE.SphereGeometry(1.5, 64, 64);

  // Use procedural texture for Earth
  const earthCanvas  = document.createElement('canvas');
  earthCanvas.width  = 512;
  earthCanvas.height = 256;
  const ctx = earthCanvas.getContext('2d');

  // Ocean
  ctx.fillStyle = '#0a3d7a';
  ctx.fillRect(0, 0, 512, 256);

  // Continents (simplified)
  ctx.fillStyle = '#1a6b2a';
  // Africa
  ctx.beginPath(); ctx.ellipse(270, 140, 40, 60, 0, 0, Math.PI*2); ctx.fill();
  // Europe
  ctx.beginPath(); ctx.ellipse(255, 80, 25, 30, 0, 0, Math.PI*2); ctx.fill();
  // Americas
  ctx.beginPath(); ctx.ellipse(150, 100, 35, 70, -0.3, 0, Math.PI*2); ctx.fill();
  // Asia
  ctx.beginPath(); ctx.ellipse(360, 90, 70, 45, 0, 0, Math.PI*2); ctx.fill();
  // Australia
  ctx.beginPath(); ctx.ellipse(410, 170, 30, 22, 0, 0, Math.PI*2); ctx.fill();
  // Ice caps
  ctx.fillStyle = '#ddeeff';
  ctx.fillRect(0, 0, 512, 20);
  ctx.fillRect(0, 236, 512, 20);

  // Clouds overlay
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.ellipse(
      Math.random()*512, Math.random()*256,
      20 + Math.random()*40, 8 + Math.random()*15,
      Math.random()*Math.PI, 0, Math.PI*2
    );
    ctx.fill();
  }

  const earthTex = new THREE.CanvasTexture(earthCanvas);
  const earthMat = new THREE.MeshStandardMaterial({
    map: earthTex,
    metalness: 0.1,
    roughness: 0.8,
    emissive: 0x001122,
    emissiveIntensity: 0.1
  });

  const earth = new THREE.Mesh(earthGeo, earthMat);
  earth.position.set(3, 0, 0);
  scene.add(earth);

  // Atmosphere glow
  const atmGeo = new THREE.SphereGeometry(1.55, 32, 32);
  const atmMat = new THREE.MeshStandardMaterial({
    color: 0x4488ff,
    transparent: true,
    opacity: 0.12,
    side: THREE.BackSide
  });
  const atm = new THREE.Mesh(atmGeo, atmMat);
  atm.position.copy(earth.position);
  scene.add(atm);

  // ---- FLOATING IOT CUBES ----
  const iotGroup = new THREE.Group();
  scene.add(iotGroup);

  const iotPositions = [
    [-4, 2.5, -1], [4.5, -1.5, -2], [-3.5, -2, -1],
    [5, 2, -1.5],  [0, -3, -1],     [-5, 0, -2]
  ];

  const iotColors = [0x00d4ff, 0x00ff88, 0xffd700, 0x00d4ff, 0x00ff88, 0xff6b35];

  iotPositions.forEach((pos, i) => {
    const geo  = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const mat  = new THREE.MeshStandardMaterial({
      color: iotColors[i],
      emissive: iotColors[i],
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: i % 2 === 0
    });
    const cube = new THREE.Mesh(geo, mat);
    cube.position.set(...pos);
    iotGroup.add(cube);
  });

  // ---- WATER DROPLETS ----
  const dropGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const dropMat = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    emissive: 0x0066ff,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.8
  });

  const drops = [];
  for (let i = 0; i < 20; i++) {
    const drop = new THREE.Mesh(dropGeo, dropMat.clone());
    drop.position.set(
      -1.5 + Math.random() * 3,
      3 + Math.random() * 2,
      Math.random() * 2 - 1
    );
    drop.userData.speed  = 0.02 + Math.random() * 0.04;
    drop.userData.startY = drop.position.y;
    scene.add(drop);
    drops.push(drop);
  }

  // ---- PARTICLE FIELD ----
  const partGeo  = new THREE.BufferGeometry();
  const partCount = 300;
  const positions = new Float32Array(partCount * 3);

  for (let i = 0; i < partCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const partMat = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
  });
  const particles = new THREE.Points(partGeo, partMat);
  scene.add(particles);

  // ---- FARM TERRAIN ----
  const farmGeo = new THREE.PlaneGeometry(12, 6, 20, 10);
  const farmVerts = farmGeo.attributes.position.array;
  for (let i = 0; i < farmVerts.length; i += 3) {
    farmVerts[i + 2] = Math.random() * 0.1;
  }
  farmGeo.computeVertexNormals();

  const farmMat = new THREE.MeshStandardMaterial({
    color: 0x1a4a1a,
    roughness: 0.9,
    metalness: 0.0
  });
  const farm = new THREE.Mesh(farmGeo, farmMat);
  farm.rotation.x = -Math.PI / 2;
  farm.position.y = -4;
  scene.add(farm);

  // Farm rows
  for (let i = 0; i < 8; i++) {
    const rowGeo = new THREE.BoxGeometry(10, 0.1, 0.15);
    const rowMat = new THREE.MeshStandardMaterial({ color: 0x2d6b2d, roughness: 0.8 });
    const row    = new THREE.Mesh(rowGeo, rowMat);
    row.position.set(0, -3.9, -1.8 + i * 0.5);
    scene.add(row);
  }

  // ---- SUNLIGHT RAYS (3D) ----
  const rayGroup = new THREE.Group();
  scene.add(rayGroup);

  for (let i = 0; i < 5; i++) {
    const rayGeo = new THREE.CylinderGeometry(0.01, 0.04, 5, 6);
    const rayMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffd700,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.15
    });
    const ray = new THREE.Mesh(rayGeo, rayMat);
    ray.position.set(-2 + i * 1.2, 5, -2);
    ray.rotation.z = 0.1 * (i - 2);
    rayGroup.add(ray);
  }

  // ---- MOUSE PARALLAX ----
  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ---- SCROLL CAMERA ----
  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  // ---- ANIMATION LOOP ----
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Solar panel rotation
    solarGroup.rotation.y = Math.sin(time * 0.5) * 0.3;
    solarGroup.position.y = 0.5 + Math.sin(time * 0.7) * 0.2;

    // Earth rotation
    earth.rotation.y += 0.003;
    atm.rotation.y   += 0.002;

    // IoT cubes floating
    iotGroup.children.forEach((cube, i) => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.015;
      cube.position.y += Math.sin(time * 0.8 + i * 1.2) * 0.002;
    });

    // Water drops falling
    drops.forEach(drop => {
      drop.position.y -= drop.userData.speed;
      if (drop.position.y < -4) {
        drop.position.y = drop.userData.startY;
      }
      drop.material.opacity = 0.8 - (drop.userData.startY - drop.position.y) / 7;
    });

    // Particle field slow rotation
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;

    // Sun rays pulse
    rayGroup.children.forEach((ray, i) => {
      ray.material.opacity = 0.08 + Math.sin(time * 2 + i) * 0.07;
    });

    // Mouse parallax camera
    const heroSection = document.getElementById('home');
    const heroVisible = scrollY < (heroSection ? heroSection.offsetHeight : 800);
    if (heroVisible) {
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Scroll zoom
      const scrollFrac = Math.min(scrollY / 600, 1);
      camera.position.z = 8 + scrollFrac * 4;
    }

    renderer.render(scene, camera);
  }

  animate();

  // ---- RESIZE ----
  const resizeObserver = new ResizeObserver(() => {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  resizeObserver.observe(canvas);
}

// ============================================================
// 17. THREE.JS — HARDWARE SECTION PARTICLES
// ============================================================
function initHardwareScene() {
  const canvas = document.getElementById('hardware-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.z = 5;

  // Floating circuit board-like geometry
  const circuitGroup = new THREE.Group();
  scene.add(circuitGroup);

  // PCB traces
  for (let i = 0; i < 30; i++) {
    const len   = 0.5 + Math.random() * 2;
    const geo   = new THREE.BoxGeometry(len, 0.02, 0.02);
    const mat   = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      emissive: 0x00ff88,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.3 + Math.random() * 0.4
    });
    const trace = new THREE.Mesh(geo, mat);
    trace.position.set(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 8,
      Math.random() * 2 - 4
    );
    trace.rotation.z = Math.floor(Math.random() * 2) * Math.PI / 2;
    circuitGroup.add(trace);
  }

  // Chip components
  for (let i = 0; i < 15; i++) {
    const geo = new THREE.BoxGeometry(0.2, 0.2, 0.1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x001a2e,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.3,
      metalness: 0.9
    });
    const chip = new THREE.Mesh(geo, mat);
    chip.position.set(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 8,
      Math.random() * 2 - 4
    );
    circuitGroup.add(chip);
  }

  // Floating ESP32 model (simplified box)
  const esp32Group = new THREE.Group();
  const boardGeo   = new THREE.BoxGeometry(2, 1, 0.1);
  const boardMat   = new THREE.MeshStandardMaterial({ color: 0x0d3a26, roughness: 0.7 });
  esp32Group.add(new THREE.Mesh(boardGeo, boardMat));

  // Pins
  for (let i = 0; i < 19; i++) {
    const pinGeo = new THREE.BoxGeometry(0.05, 0.15, 0.05);
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 1 });
    const pinT   = new THREE.Mesh(pinGeo, pinMat);
    const pinB   = new THREE.Mesh(pinGeo, pinMat);
    pinT.position.set(-0.9 + i * 0.1, 0.575, 0);
    pinB.position.set(-0.9 + i * 0.1, -0.575, 0);
    esp32Group.add(pinT, pinB);
  }

  // Antenna
  const antGeo = new THREE.BoxGeometry(0.05, 0.4, 0.02);
  const antMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 1 });
  const ant    = new THREE.Mesh(antGeo, antMat);
  ant.position.set(0.95, 0.7, 0);
  esp32Group.add(ant);

  esp32Group.position.set(0, 0, 0);
  scene.add(esp32Group);

  // Lights
  scene.add(new THREE.AmbientLight(0x112233, 1));
  const ptLight = new THREE.PointLight(0x00d4ff, 2, 15);
  ptLight.position.set(3, 3, 3);
  scene.add(ptLight);

  // Signal ripples around ESP32
  const rippleMats = [];
  for (let i = 0; i < 3; i++) {
    const rGeo = new THREE.RingGeometry(0.5 + i * 0.4, 0.52 + i * 0.4, 32);
    const rMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.6 - i * 0.15,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(rGeo, rMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0;
    esp32Group.add(ring);
    rippleMats.push({ mat: rMat, offset: i * 0.33 });
  }

  // Particle field
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(500 * 3);
  for (let i = 0; i < 500 * 3; i++) pPos[i] = (Math.random() - 0.5) * 20;
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.025, color: 0x00ff88, transparent: true, opacity: 0.4 });
  scene.add(new THREE.Points(pGeo, pMat));

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.012;

    esp32Group.rotation.y += 0.008;
    esp32Group.rotation.x  = Math.sin(time * 0.5) * 0.15;
    esp32Group.position.y  = Math.sin(time * 0.7) * 0.2;

    circuitGroup.rotation.z += 0.001;

    rippleMats.forEach(r => {
      r.mat.opacity = 0.4 * Math.abs(Math.sin(time * 1.5 + r.offset * Math.PI * 2));
    });

    renderer.render(scene, camera);
  }
  animate();

  new ResizeObserver(() => {
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
  }).observe(canvas);
}

// ============================================================
// 18. THREE.JS — ABSTRACT SECTION (Data Flow)
// ============================================================
function initAbstractScene() {
  const canvas = document.getElementById('abstract-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.z = 6;

  scene.add(new THREE.AmbientLight(0x112233, 1.5));

  // Data flow lines
  const lineGroup = new THREE.Group();
  scene.add(lineGroup);

  for (let i = 0; i < 40; i++) {
    const points = [];
    const x0 = (Math.random() - 0.5) * 16;
    const y0 = (Math.random() - 0.5) * 10;
    const x1 = x0 + (Math.random() - 0.5) * 4;
    const y1 = y0 + (Math.random() - 0.5) * 4;

    for (let t = 0; t <= 20; t++) {
      points.push(new THREE.Vector3(
        x0 + (x1 - x0) * t / 20,
        y0 + (y1 - y0) * t / 20,
        Math.sin(t * 0.5) * 0.2
      ));
    }

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const hue = Math.random() > 0.5 ? 0x00d4ff : 0x00ff88;
    const mat = new THREE.LineBasicMaterial({
      color: hue,
      transparent: true,
      opacity: 0.15 + Math.random() * 0.3
    });
    lineGroup.add(new THREE.Line(geo, mat));
  }

  // Nodes at intersections
  const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
  for (let i = 0; i < 25; i++) {
    const hue = [0x00d4ff, 0x00ff88, 0xffd700][Math.floor(Math.random()*3)];
    const mat = new THREE.MeshStandardMaterial({
      color: hue, emissive: hue, emissiveIntensity: 0.7
    });
    const node = new THREE.Mesh(nodeGeo, mat);
    node.position.set(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 10,
      Math.random() * 2 - 4
    );
    scene.add(node);
  }

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.008;
    lineGroup.rotation.z += 0.001;
    lineGroup.children.forEach((line, i) => {
      line.material.opacity = 0.1 + 0.2 * Math.abs(Math.sin(time + i * 0.2));
    });
    renderer.render(scene, camera);
  }
  animate();

  new ResizeObserver(() => {
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
  }).observe(canvas);
}

// ============================================================
// 19. THREE.JS — APPLICATIONS SECTION
// ============================================================
function initAppScene() {
  const canvas = document.getElementById('app-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.z = 7;

  scene.add(new THREE.AmbientLight(0x001a00, 1.5));
  const light = new THREE.PointLight(0x00ff88, 2, 20);
  light.position.set(0, 5, 3);
  scene.add(light);

  // Animated farm terrain
  const terrainGeo = new THREE.PlaneGeometry(14, 10, 40, 25);
  const terrainPos = terrainGeo.attributes.position.array;

  for (let i = 0; i < terrainPos.length; i += 3) {
    terrainPos[i+2] = Math.sin(terrainPos[i] * 0.5) * 0.3 + Math.random() * 0.15;
  }
  terrainGeo.computeVertexNormals();

  const terrainMat = new THREE.MeshStandardMaterial({
    color: 0x1a4a1a,
    roughness: 0.9,
    wireframe: false
  });
  const terrain = new THREE.Mesh(terrainGeo, terrainMat);
  terrain.rotation.x = -Math.PI / 2;
  terrain.position.y = -3.5;
  scene.add(terrain);

  // Crop rows (green cylinders = plants)
  const plantGroup = new THREE.Group();
  scene.add(plantGroup);

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 14; col++) {
      const h   = 0.15 + Math.random() * 0.25;
      const geo = new THREE.CylinderGeometry(0.04, 0.06, h, 6);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(
          0.05 + Math.random() * 0.05,
          0.4  + Math.random() * 0.3,
          0.05 + Math.random() * 0.05
        )
      });
      const plant = new THREE.Mesh(geo, mat);
      plant.position.set(-6.5 + col * 1, -3.5 + h/2, -2.5 + row * 1);
      plant.userData.origY = plant.position.y;
      plantGroup.add(plant);
    }
  }

  // Water droplets falling on crops
  const wDropGeo = new THREE.SphereGeometry(0.04, 6, 6);
  const wDropMat = new THREE.MeshStandardMaterial({
    color: 0x00d4ff, emissive: 0x0066ff, emissiveIntensity: 0.5,
    transparent: true, opacity: 0.8
  });
  const wDrops = [];
  for (let i = 0; i < 30; i++) {
    const drop = new THREE.Mesh(wDropGeo, wDropMat.clone());
    drop.position.set(
      (Math.random() - 0.5) * 12,
      2 + Math.random() * 4,
      (Math.random() - 0.5) * 4 - 1
    );
    drop.userData.speed  = 0.03 + Math.random() * 0.05;
    drop.userData.startY = drop.position.y;
    scene.add(drop);
    wDrops.push(drop);
  }

  // Solar panel above farm
  const spGroup = new THREE.Group();
  const spGeo = new THREE.BoxGeometry(1.5, 1, 0.05);
  const spMat = new THREE.MeshStandardMaterial({ color: 0x001a3a, metalness: 0.8 });
  spGroup.add(new THREE.Mesh(spGeo, spMat));
  spGroup.position.set(5, 1, -2);
  spGroup.rotation.x = -0.5;
  scene.add(spGroup);

  // Particles
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(200 * 3);
  for (let i = 0; i < 200 * 3; i++) pPos[i] = (Math.random() - 0.5) * 18;
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    size: 0.03, color: 0x00ff88, transparent: true, opacity: 0.4
  })));

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.008;

    // Grass sway
    plantGroup.children.forEach((plant, i) => {
      plant.rotation.z = Math.sin(time * 1.5 + i * 0.5) * 0.08;
      plant.position.y = plant.userData.origY + Math.sin(time + i * 0.3) * 0.02;
    });

    // Water drops
    wDrops.forEach(drop => {
      drop.position.y -= drop.userData.speed;
      if (drop.position.y < -3.2) {
        drop.position.y = drop.userData.startY;
        drop.material.opacity = 0.8;
      }
    });

    spGroup.rotation.y = Math.sin(time * 0.5) * 0.3;
    spGroup.position.y = 1 + Math.sin(time * 0.8) * 0.15;

    renderer.render(scene, camera);
  }
  animate();

  new ResizeObserver(() => {
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
  }).observe(canvas);
}

// ============================================================
// 20. GSAP SCROLL ANIMATIONS
// ============================================================
function initGSAPScrollAnimations() {
  // Hero parallax
  gsap.to('.hero-content', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to('.floating-icons', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Section titles animation
  document.querySelectorAll('.section-title').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  // HW Cards stagger
  gsap.from('.hw-card', {
    opacity: 0,
    y: 60,
    scale: 0.95,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.hardware-grid',
      start: 'top 80%',
      once: true
    }
  });

  // Step cards slide from left
  gsap.from('.step-card', {
    opacity: 0,
    x: -80,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.principle-steps',
      start: 'top 80%',
      once: true
    }
  });

  // Metric cards pop
  gsap.from('.metric-card', {
    opacity: 0,
    scale: 0.8,
    stagger: 0.1,
    duration: 0.7,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.metrics-grid',
      start: 'top 85%',
      once: true
    }
  });

  // References slide
  gsap.from('.ref-category', {
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.references-grid',
      start: 'top 85%',
      once: true
    }
  });

  // Future timeline items
  gsap.from('.future-item', {
    opacity: 0,
    x: 40,
    stagger: 0.15,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.future-timeline',
      start: 'top 85%',
      once: true
    }
  });

  // Conclusion achievements
  gsap.from('.achieve-item', {
    opacity: 0,
    scale: 0.85,
    stagger: 0.08,
    duration: 0.6,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.conclusion-achievements',
      start: 'top 85%',
      once: true
    }
  });

  // Flowchart nodes
  gsap.from('.fc-node', {
    opacity: 0,
    scale: 0.8,
    stagger: 0.08,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.flowchart',
      start: 'top 85%',
      once: true
    }
  });

  // IoT layer boxes
  gsap.from('.iot-layer', {
    opacity: 0,
    x: -50,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.iot-arch',
      start: 'top 85%',
      once: true
    }
  });

  // BOM table
  gsap.from('.bom-table tr', {
    opacity: 0,
    x: -20,
    stagger: 0.05,
    duration: 0.4,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.bom-table',
      start: 'top 85%',
      once: true
    }
  });
}

// ============================================================
// 21. 3D CARD TILT EFFECT
// ============================================================
function initCardTilt() {
  document.querySelectorAll('.hw-card, .metric-card, .glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
        transformOrigin: 'center center'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

// ============================================================
// 22. NAVBAR SCROLL ANIMATION
// ============================================================
function initNavbarAnimation() {
  gsap.from('.nav-logo', { opacity: 0, x: -30, duration: 0.8, delay: 0.2, ease: 'power3.out' });
  gsap.from('.nav-link', {
    opacity: 0,
    y: -20,
    stagger: 0.08,
    duration: 0.6,
    delay: 0.4,
    ease: 'power3.out'
  });
}

// ============================================================
// 23. WATER DROP ANIMATION (DOM)
// ============================================================
function createWaterDrops() {
  const sections = ['#home'];
  sections.forEach(sel => {
    const sec = document.querySelector(sel);
    if (!sec) return;

    for (let i = 0; i < 12; i++) {
      const drop = document.createElement('div');
      drop.className = 'water-drop';
      drop.style.cssText = `
        left: ${5 + Math.random() * 90}%;
        top:  ${Math.random() * 40}%;
        --dur: ${2 + Math.random() * 3}s;
        animation-delay: ${Math.random() * 4}s;
      `;
      sec.appendChild(drop);
    }
  });
}

// ============================================================
// 24. MOVING CLOUDS (DOM CSS)
// ============================================================
function createClouds() {
  const hero = document.getElementById('home');
  if (!hero) return;

  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement('div');
    const w = 80 + Math.random() * 120;
    const h = 30 + Math.random() * 30;
    cloud.style.cssText = `
      position: absolute;
      width: ${w}px;
      height: ${h}px;
      background: rgba(255,255,255,${0.04 + Math.random() * 0.06});
      border-radius: ${h}px;
      top: ${5 + Math.random() * 30}%;
      left: -${w}px;
      z-index: 3;
      pointer-events: none;
      filter: blur(${2 + Math.random() * 4}px);
    `;
    hero.appendChild(cloud);

    gsap.to(cloud, {
      x: window.innerWidth + w + 200,
      duration: 30 + Math.random() * 40,
      delay: Math.random() * 20,
      ease: 'none',
      repeat: -1,
      onRepeat: () => {
        cloud.style.top = (5 + Math.random() * 30) + '%';
      }
    });
  }
}

// ============================================================
// 25. SENSOR SIGNAL ANIMATIONS
// ============================================================
function initSensorSignals() {
  // Create pulsing rings around IoT icon elements
  document.querySelectorAll('.float-icon').forEach(icon => {
    const ring = document.createElement('div');
    ring.className = 'signal-ripple';
    ring.style.cssText = `
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: ${Math.random()}s;
    `;
    icon.style.position = 'relative';
    icon.appendChild(ring);
  });
}

// ============================================================
// 26. HERO SECTION ENTRANCE
// ============================================================
function initHeroEntrance() {
  const tl = gsap.timeline({ delay: 0.3 });

  tl.from('.hero-badge', { opacity: 0, scale: 0.8, duration: 0.6, ease: 'back.out(1.7)' })
    .from('.scroll-indicator', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.2');
}

// ============================================================
// 27. IMAGE HOVER PARALLAX
// ============================================================
function initImageHover() {
  document.querySelectorAll('.hw-img-wrapper').forEach(wrapper => {
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      const img  = wrapper.querySelector('.hw-img');
      gsap.to(img, {
        x: x * 15, y: y * 10,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    wrapper.addEventListener('mouseleave', () => {
      const img = wrapper.querySelector('.hw-img');
      gsap.to(img, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ============================================================
// 28. FLOATING IOT ICONS GSAP ENHANCEMENT
// ============================================================
function enhanceFloatingIcons() {
  document.querySelectorAll('.float-icon').forEach((icon, i) => {
    gsap.to(icon, {
      y: -20,
      duration: 2 + i * 0.3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * 0.4
    });

    gsap.to(icon, {
      rotation: 5 * (i % 2 === 0 ? 1 : -1),
      duration: 3 + i * 0.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * 0.3
    });
  });
}

// ============================================================
// 29. SECTION BACKGROUND EFFECTS
// ============================================================
function initSectionEffects() {
  // Parallax for section backgrounds
  gsap.utils.toArray('.section-bg-dots, .section-bg-grid, .section-bg-mesh').forEach(el => {
    gsap.to(el, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// ============================================================
// 30. SCROLL REVEAL FOR OBJECTIVES
// ============================================================
function initObjectivesAnimation() {
  gsap.from('.obj-item', {
    opacity: 0,
    y: 40,
    rotateX: 20,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.objectives-grid',
      start: 'top 85%',
      once: true
    }
  });

  gsap.from('.app-mini-card', {
    opacity: 0,
    scale: 0.7,
    stagger: 0.06,
    duration: 0.5,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.app-cards-grid',
      start: 'top 85%',
      once: true
    }
  });

  gsap.from('.need-list li', {
    opacity: 0,
    x: 30,
    stagger: 0.08,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.need-list',
      start: 'top 85%',
      once: true
    }
  });
}

// ============================================================
// 31. BLOCK DIAGRAM ANIMATION
// ============================================================
function initBlockDiagramAnimation() {
  gsap.from('.bd-block', {
    opacity: 0,
    scale: 0.7,
    stagger: 0.08,
    duration: 0.6,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.block-diagram',
      start: 'top 85%',
      once: true
    }
  });
}

// ============================================================
// 32. COVER SECTION ANIMATION
// ============================================================
function initCoverAnimation() {
  gsap.from('.cover-card', {
    opacity: 0,
    scale: 0.95,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.cover-section',
      start: 'top 80%',
      once: true
    }
  });
}

// ============================================================
// MAIN INIT (called after loading screen)
// ============================================================
function startAnimations() {
  initTyped();
  initAOS();
  initCounters();
  initScrollReveal();
  initGSAPScrollAnimations();
  initCardTilt();
  initNavbarAnimation();
  initImageHover();
  enhanceFloatingIcons();
  initSectionEffects();
  initObjectivesAnimation();
  initBlockDiagramAnimation();
  initCoverAnimation();
  initSensorSignals();
  initHeroEntrance();
  createWaterDrops();
  createClouds();

  // Three.js scenes
  initHeroScene();
  initHardwareScene();
  initAbstractScene();
  initAppScene();

  // Ambient particles
  createAmbientParticles();
  createBirds();
}

// ============================================================
// WINDOW RESIZE
// ============================================================
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

// ============================================================
// KEYBOARD NAVIGATION
// ============================================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

// ============================================================
// FOOTER WAVE SVG ANIMATION
// ============================================================
function animateFooterWave() {
  const wave = document.querySelector('.footer-wave');
  if (wave) {
    gsap.to(wave, {
      backgroundPositionX: '200%',
      duration: 4,
      ease: 'none',
      repeat: -1
    });
  }
}
animateFooterWave();

// ============================================================
// TABLE ROW HOVER HIGHLIGHT
// ============================================================
document.querySelectorAll('.bom-table tr').forEach(row => {
  row.addEventListener('mouseenter', () => {
    gsap.to(row.querySelectorAll('td'), {
      color: 'var(--text-primary)',
      duration: 0.2
    });
  });
  row.addEventListener('mouseleave', () => {
    gsap.to(row.querySelectorAll('td'), {
      color: '',
      duration: 0.2
    });
  });
});

// ============================================================
// PREFERS REDUCED MOTION
// ============================================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.removeAttribute('data-aos');
  });
}

// ============================================================
// 31. SOURCE CODE DATA & CONTROLLER
// ============================================================
const sourceCode = {
  main: `/*
 * Solar Powered Intelligent Irrigation System using IoT
 * Main Controller Firmware (main.ino)
 * Hardware: ESP32 Dev Board + Blynk IoT Platform
 */

#define BLYNK_TEMPLATE_ID   "TMPL-SOLAR-IRR"
#define BLYNK_TEMPLATE_NAME "SmartIrrigation"
#define BLYNK_AUTH_TOKEN    "Your_Auth_Token_Here"

#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>
#include "config.h"

BlynkTimer timer;
bool manualOverride = false;
int pumpState = LOW;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // Active-low relay (OFF)

  // Initialize sensors
  initSensors();

  // Connect to Blynk
  Blynk.begin(BLYNK_AUTH_TOKEN, WIFI_SSID, WIFI_PASS);

  // Set up timed updates (every 5 seconds for testing, normally 5 mins)
  timer.setInterval(5000L, readAndUploadData);
  timer.setInterval(2000L, runAutomationLogic);

  Serial.println("--- System Initialized ---");
}

void loop() {
  Blynk.run();
  timer.run();
}

// Blynk Switch handler (Virtual Pin V4)
BLYNK_WRITE(V4) {
  int val = param.asInt();
  manualOverride = (val == 1);
  Serial.print("Manual Override: ");
  Serial.println(manualOverride ? "ENABLED" : "DISABLED");
  
  if (!manualOverride) {
    runAutomationLogic(); // Fallback to automatic mode immediately
  }
}

// Blynk Pump Toggle handler (Virtual Pin V5)
BLYNK_WRITE(V5) {
  if (manualOverride) {
    pumpState = param.asInt();
    digitalWrite(RELAY_PIN, pumpState == 1 ? LOW : HIGH); // Active-low relay
    Blynk.virtualWrite(V6, pumpState); // Update state indicator
    Serial.print("Manual Pump Command: ");
    Serial.println(pumpState == 1 ? "ON" : "OFF");
  } else {
    // Notify user to enable manual override first
    Blynk.logEvent("override_error", "Enable Manual Override first!");
    Blynk.virtualWrite(V5, pumpState); // Revert switch position
  }
}`,

  config: `/*
 * System Pinout and Connection Configuration (config.h)
 */

#ifndef CONFIG_H
#define CONFIG_H

// Wi-Fi Credentials
const char WIFI_SSID[] = "SmartFarm_5G";
const char WIFI_PASS[] = "FarmSecure2024";

// Pin Allocations
#define MOISTURE_PIN       34  // Analog pin ADC1_CH6
#define DHT_PIN            4   // Digital pin GPIO4
#define RELAY_PIN          5   // Digital pin GPIO5
#define STATUS_LED_PIN     2   // Onboard LED GPIO2

// Calibration Values for Capacitive Sensor
const int DRY_CALIBRATION = 3120; // Reading in completely dry air
const int WET_CALIBRATION = 1450; // Reading in saturated water

// Thresholds
const int MOISTURE_DRY_THRESHOLD = 30; // Pump turns ON below this %
const int MOISTURE_WET_THRESHOLD = 70; // Pump turns OFF above this %

// Sensor Library Setup
#include <DHT.h>
#define DHTTYPE DHT11
extern DHT dht;

void initSensors();
float readMoisturePercentage();
float readTemperature();
float readHumidity();

#endif`,

  sensor: `/*
 * Sensor Reading and Processing Functions (sensor.ino)
 */

#include "config.h"

DHT dht(DHT_PIN, DHTTYPE);

void initSensors() {
  pinMode(MOISTURE_PIN, INPUT);
  dht.begin();
  Serial.println("Sensors Initialized.");
}

float readMoisturePercentage() {
  int rawValue = analogRead(MOISTURE_PIN);
  // Map analog input to percentage (inverted for capacitive sensor)
  float percentage = map(rawValue, DRY_CALIBRATION, WET_CALIBRATION, 0, 100);
  percentage = constrain(percentage, 0.0, 100.0);
  return percentage;
}

float readTemperature() {
  float t = dht.readTemperature();
  if (isnan(t)) {
    Serial.println("Failed to read temperature!");
    return -1.0;
  }
  return t;
}

float readHumidity() {
  float h = dht.readHumidity();
  if (isnan(h)) {
    Serial.println("Failed to read humidity!");
    return -1.0;
  }
  return h;
}`,

  blynk: `/*
 * Blynk Upload and Intelligent Decision Logic (blynk_handler.ino)
 */

#include <BlynkSimpleEsp32.h>
#include "config.h"

extern bool manualOverride;
extern int pumpState;

void readAndUploadData() {
  float moisture = readMoisturePercentage();
  float temp = readTemperature();
  float hum = readHumidity();

  // Send to Blynk Virtual Pins
  Blynk.virtualWrite(V1, moisture);
  Blynk.virtualWrite(V2, temp);
  Blynk.virtualWrite(V3, hum);
  
  // Calculate battery voltage roughly (simulated in ESP32 analog pin)
  float rawV = analogRead(35);
  float batteryVolts = (rawV / 4095.0) * 2.0 * 3.3 * 1.1; // Voltage divider map
  Blynk.virtualWrite(V8, batteryVolts);

  Serial.printf("Moisture: %.1f%% | Temp: %.1fC | Hum: %.1f%%\\n", moisture, temp, hum);
}

void runAutomationLogic() {
  if (manualOverride) return; // Skip automatic control if manual mode is enabled

  float moisture = readMoisturePercentage();
  
  if (moisture < MOISTURE_DRY_THRESHOLD && pumpState == LOW) {
    pumpState = HIGH;
    digitalWrite(RELAY_PIN, LOW); // Turn on water pump (Active-low)
    Blynk.virtualWrite(V5, HIGH);  // Update button widget in app
    Blynk.virtualWrite(V6, HIGH);  // Update status indicator in app
    Blynk.logEvent("moisture_alert", "Moisture dry. Starting irrigation!");
    Serial.println("AUTOPUMP: Activated due to dry conditions.");
  } 
  else if (moisture > MOISTURE_WET_THRESHOLD && pumpState == HIGH) {
    pumpState = LOW;
    digitalWrite(RELAY_PIN, HIGH); // Turn off water pump (Active-low)
    Blynk.virtualWrite(V5, LOW);   // Update button widget
    Blynk.virtualWrite(V6, LOW);   // Update status indicator
    Serial.println("AUTOPUMP: Deactivated. Optimal moisture achieved.");
  }
}`
};

function initCodeViewer() {
  const codeDisplay = document.getElementById('code-display');
  const codeFilename = document.getElementById('code-filename');
  const tabs = document.querySelectorAll('.code-tab');
  const copyBtn = document.getElementById('copy-btn');

  if (!codeDisplay) return;

  function updateCode(tabKey) {
    codeDisplay.textContent = sourceCode[tabKey];
    codeFilename.textContent = tabKey === 'main' ? 'main.ino' : tabKey === 'config' ? 'config.h' : tabKey === 'sensor' ? 'sensor.ino' : 'blynk_handler.ino';
    // Smooth fade in
    gsap.fromTo('#code-content', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      updateCode(target);
    });
  });

  // Initial code load
  updateCode('main');

  // Copy code utility
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(codeDisplay.textContent).then(() => {
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      copyBtn.style.color = 'var(--secondary)';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyBtn.style.color = '';
      }, 2000);
    });
  });
}

// ============================================================
// 32. LIVE IoT DASHBOARD SIMULATOR
// ============================================================
let simulatedMoisture = 42;
let simulatedTemp = 28.4;
let simulatedHum = 62.1;
let simulatedSolar = 8.6;
let simulatedBattery = 12.6;
let isPumpRunning = false;
let moistureHistory = [45, 44, 43, 42, 42, 43, 41, 40, 42, 41, 42, 42];

// Elements
const gaugeValEl = document.getElementById('gauge-value');
const tempValEl  = document.getElementById('temp-value');
const humValEl   = document.getElementById('hum-value');
const solarValEl = document.getElementById('solar-value');
const tempFill   = document.getElementById('temp-fill');
const humFill    = document.getElementById('hum-fill');
const solarFill  = document.getElementById('solar-fill');
const tempStatusEl = document.getElementById('temp-status');
const humStatusEl = document.getElementById('hum-status');
const pumpWidget = document.getElementById('pump-widget');
const pumpStatusText = document.getElementById('pump-status-text');
const pumpToggleBtn = document.getElementById('pump-toggle');
const flowValueEl = document.getElementById('flow-value');
const flowStatusEl = document.getElementById('flow-status');
const alertList = document.getElementById('alert-list');
const alertCountEl = document.getElementById('alert-count');
const timeEl = document.getElementById('dash-time');
const batteryEl = document.getElementById('dash-batt');

// Alerts Counter
let alertCount = 0;

function addAlertLog(message, type = 'info') {
  if (!alertList) return;
  
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const alertItem = document.createElement('div');
  alertItem.className = `alert-item alert-${type}`;
  
  const icon = type === 'critical' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle';
  alertItem.innerHTML = `<i class="fas fa-${icon}"></i><span>${message}</span><span class="alert-time">${timeStr}</span>`;
  
  alertList.insertBefore(alertItem, alertList.firstChild);
  alertCount++;
  alertCountEl.textContent = alertCount;

  // Limit alert logs length
  if (alertList.children.length > 20) {
    alertList.removeChild(alertList.lastChild);
  }
}

// Draw radial gauge
function drawMoistureGauge() {
  const canvas = document.getElementById('moisture-gauge');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height - 10;
  const radius = 80;
  
  // Background Arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineCap = 'round';
  ctx.stroke();

  // Active Arc Color Gradient
  const gradient = ctx.createLinearGradient(0, centerY, canvas.width, centerY);
  gradient.addColorStop(0, '#ff6b35'); // dry
  gradient.addColorStop(0.5, '#ffd700'); // normal
  gradient.addColorStop(1, '#00ff88'); // wet

  const fillAngle = Math.PI + (simulatedMoisture / 100) * Math.PI;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, Math.PI, fillAngle, false);
  ctx.lineWidth = 10;
  ctx.strokeStyle = gradient;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Draw target marker ticks
  // 30% tick
  const angle30 = Math.PI + 0.3 * Math.PI;
  ctx.beginPath();
  ctx.moveTo(centerX + (radius - 12) * Math.cos(angle30), centerY + (radius - 12) * Math.sin(angle30));
  ctx.lineTo(centerX + (radius + 2) * Math.cos(angle30), centerY + (radius + 2) * Math.sin(angle30));
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ff6b35';
  ctx.stroke();

  // 70% tick
  const angle70 = Math.PI + 0.7 * Math.PI;
  ctx.beginPath();
  ctx.moveTo(centerX + (radius - 12) * Math.cos(angle70), centerY + (radius - 12) * Math.sin(angle70));
  ctx.lineTo(centerX + (radius + 2) * Math.cos(angle70), centerY + (radius + 2) * Math.sin(angle70));
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#00ff88';
  ctx.stroke();
}

// Draw history line chart
function drawHistoryChart() {
  const canvas = document.getElementById('history-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const w = canvas.width;
  const h = canvas.height;
  const padding = 15;
  const usableH = h - padding * 2;
  const pointsCount = moistureHistory.length;
  const stepX = w / (pointsCount - 1);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    const yLine = padding + (usableH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(0, yLine);
    ctx.lineTo(w, yLine);
    ctx.stroke();
  }

  // Draw Area under line
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let i = 0; i < pointsCount; i++) {
    const x = stepX * i;
    const yVal = moistureHistory[i];
    const y = h - padding - (yVal / 100) * usableH;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  
  const areaGrad = ctx.createLinearGradient(0, 0, 0, h);
  areaGrad.addColorStop(0, 'rgba(0,212,255,0.15)');
  areaGrad.addColorStop(1, 'rgba(0,212,255,0.0)');
  ctx.fillStyle = areaGrad;
  ctx.fill();

  // Draw Line
  ctx.beginPath();
  for (let i = 0; i < pointsCount; i++) {
    const x = stepX * i;
    const yVal = moistureHistory[i];
    const y = h - padding - (yVal / 100) * usableH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'var(--primary)';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Draw dot on final point
  const lastX = stepX * (pointsCount - 1);
  const lastYVal = moistureHistory[pointsCount - 1];
  const lastY = h - padding - (lastYVal / 100) * usableH;
  ctx.beginPath();
  ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
  ctx.fillStyle = 'var(--secondary)';
  ctx.shadowColor = 'var(--secondary)';
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.shadowBlur = 0; // reset
}

function updateLiveStats() {
  // Moisture decrease gradually over time, increase rapidly if pump is ON
  if (isPumpRunning) {
    simulatedMoisture += Math.random() * 2 + 1;
    if (simulatedMoisture >= 75) {
      simulatedMoisture = 75;
      isPumpRunning = false;
      pumpWidget.classList.remove('active');
      pumpStatusText.textContent = 'STANDBY';
      flowValueEl.textContent = '0.0';
      flowStatusEl.textContent = 'Pump OFF';
      addAlertLog('Optimal moisture reached. Automated shutdown.', 'info');
    }
  } else {
    simulatedMoisture -= Math.random() * 0.15 + 0.05;
    // Auto turn on pump if moisture drops below 30%
    if (simulatedMoisture <= 30) {
      simulatedMoisture = 30;
      isPumpRunning = true;
      pumpWidget.classList.add('active');
      pumpStatusText.textContent = 'RUNNING';
      flowValueEl.textContent = (3.5 + Math.random() * 0.5).toFixed(1);
      flowStatusEl.textContent = 'Watering field...';
      addAlertLog('Moisture drop detected (<30%). Irrigation started!', 'warning');
    }
  }

  // Update history array
  moistureHistory.push(Math.round(simulatedMoisture));
  if (moistureHistory.length > 12) {
    moistureHistory.shift();
  }

  // Temperature variation
  simulatedTemp += (Math.random() - 0.5) * 0.4;
  simulatedTemp = Math.max(24, Math.min(36, simulatedTemp));

  // Humidity variation inverse of temperature
  simulatedHum -= (Math.random() - 0.5) * 0.6;
  simulatedHum = Math.max(45, Math.min(85, simulatedHum));

  // Solar variation
  const hour = new Date().getHours();
  if (hour >= 6 && hour <= 18) {
    simulatedSolar += (Math.random() - 0.5) * 0.5;
    simulatedSolar = Math.max(4, Math.min(18.5, simulatedSolar));
  } else {
    simulatedSolar = 0.0;
  }

  // Battery status drainage/charging
  if (simulatedSolar > 5.0) {
    simulatedBattery += 0.01;
  } else if (isPumpRunning) {
    simulatedBattery -= 0.03;
  } else {
    simulatedBattery -= 0.002;
  }
  simulatedBattery = Math.max(11.2, Math.min(12.8, simulatedBattery));

  // DOM Updates
  if (gaugeValEl) {
    gaugeValEl.textContent = Math.round(simulatedMoisture);
    tempValEl.textContent  = simulatedTemp.toFixed(1);
    humValEl.textContent   = Math.round(simulatedHum);
    solarValEl.textContent = simulatedSolar.toFixed(1);
    batteryEl.textContent  = simulatedBattery.toFixed(1) + 'V';
    
    // Status text & arrows
    tempStatusEl.textContent = simulatedTemp > 32 ? 'High' : 'Normal';
    tempFill.style.width     = ((simulatedTemp - 20) / 20) * 100 + '%';
    
    humStatusEl.textContent = simulatedHum > 75 ? 'Humid' : simulatedHum < 50 ? 'Dry' : 'Optimal';
    humFill.style.width     = simulatedHum + '%';
    
    solarFill.style.width = (simulatedSolar / 20) * 100 + '%';
    
    // Time updating
    const t = new Date();
    timeEl.textContent = t.toLocaleTimeString([], { hour12: false });

    // Battery alert if low
    if (simulatedBattery < 11.6) {
      addAlertLog('Critical Alert: Low Battery Voltage!', 'critical');
    }
  }

  drawMoistureGauge();
  drawHistoryChart();
}

function initDashboardSimulator() {
  if (!pumpToggleBtn) return;

  // Initial updates
  updateLiveStats();

  // Periodic simulations
  setInterval(updateLiveStats, 3000);

  // Manual override logic
  pumpToggleBtn.addEventListener('click', () => {
    isPumpRunning = !isPumpRunning;
    pumpWidget.classList.toggle('active', isPumpRunning);
    
    if (isPumpRunning) {
      pumpStatusText.textContent = 'RUNNING';
      flowValueEl.textContent = (3.8 + Math.random() * 0.4).toFixed(1);
      flowStatusEl.textContent = 'Manual watering mode';
      addAlertLog('Manual pump override activated.', 'info');
    } else {
      pumpStatusText.textContent = 'STANDBY';
      flowValueEl.textContent = '0.0';
      flowStatusEl.textContent = 'Pump OFF';
      addAlertLog('Manual pump override deactivated.', 'info');
    }
    updateLiveStats();
  });
}

// ============================================================
// 33. WIRING DIAGRAM HOVER GLOWS
// ============================================================
function initWiringDiagramInteractions() {
  const comps = document.querySelectorAll('.wiring-comp');
  comps.forEach(comp => {
    comp.addEventListener('mouseenter', () => {
      // Find connecting lines in SVG and add active glow
      gsap.to(comp.querySelector('rect'), {
        fill: 'rgba(0, 212, 255, 0.2)',
        stroke: 'var(--primary)',
        strokeWidth: 2.5,
        duration: 0.3
      });
    });

    comp.addEventListener('mouseleave', () => {
      gsap.to(comp.querySelector('rect'), {
        fill: '',
        stroke: '',
        strokeWidth: '',
        duration: 0.3
      });
    });
  });
}

// Add these to MAIN startup sequences
const origStart = startAnimations;
startAnimations = function() {
  origStart();
  initCodeViewer();
  initDashboardSimulator();
  initWiringDiagramInteractions();
};

console.log('%c⚙️ Anti-gravity Code Extension Injected Successfully', 'color:#00ff88;font-weight:bold;');


console.log('%c🌞 Solar IoT System — Website Loaded', 'color:#00d4ff;font-size:18px;font-weight:bold;');
console.log('%cPowered by Three.js + GSAP + IoT', 'color:#00ff88;font-size:12px;');

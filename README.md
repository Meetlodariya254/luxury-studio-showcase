# 📸 Luxe Lens — Interactive 3D Photography Studio Portfolio

An ultra-premium, next-generation web portfolio designed for high-end photography studios, visual artists, and cinematic storytellers. Built with modern WebGL 3D interactions, buttery-smooth GSAP animations, and curated editorial aesthetics to convert visitors into high-ticket inquiries.

![Project Preview](https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Key Features

- **🎨 Ultra-Premium Editorial Design:** Inspired by international luxury fashion and photography magazines, using Google Fonts (*Bodoni Moda*, *Cormorant Garamond*, *Outfit*).
- **🌐 3D Interactive WebGL Elements:** Powered by **Three.js** with custom shaders, floating reflective planes, and interactive camera movements.
- **⚡ Smooth Micro-Animations:** Fluid section transitions, parallax scrolling, and modal reveals driven by **GSAP (GreenSock)**.
- **📱 Fully Responsive & Mobile-First:** Optimized for touch interactions, iPad displays, and high-DPI retina mobile screens.
- **💬 Instant WhatsApp Lead Generation:** Integrated call-to-action buttons designed to open direct WhatsApp booking inquiries with pre-filled messages.
- **🚀 Zero-Friction Performance:** Fast static bundling powered by **Vite**, ensuring near-instant load times with zero framework bloat.

---

## 🛠️ Technology Stack

- **Core:** ES Modules (Vanilla JavaScript), HTML5, Semantic CSS3
- **3D & WebGL:** [Three.js](https://threejs.org/) (`^0.185.0`)
- **Animation Engine:** [GSAP](https://greensock.com/gsap/) (`^3.15.0`)
- **Build Tool & Bundler:** [Vite](https://vitejs.dev/) (`^8.1.0`)

---

## 📦 Quick Start & Local Development

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME.git
cd YOUR-REPOSITORY-NAME
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the local development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
To create an optimized production bundle:
```bash
npm run build
```
The compiled static assets will be output to the `dist/` folder, ready for zero-config hosting.

---

## 🗺️ Product Roadmap & Phased Architecture

This project is architected with a modular approach to allow seamless future upgrades:

- **Phase 1: Brand Authority & Lead Showcase (Current)**
  - High-impact 3D visual showcase
  - Gallery curation & artist biography
  - Direct WhatsApp / Contact Form lead conversions

- **Phase 2: Business Automation Upgrade (Optional / Planned)**
  - Interactive Client Booking Calendar & Deposit Gateway
  - Private Client Login Portal for Photo Selection & Proofing
  - Studio Management Admin Dashboard

---

## ☁️ Deployment

Easily deployable on any static hosting platform:

- **Vercel (Recommended):** Import GitHub repository → Auto-detects Vite → One-click deploy.
- **Hostinger / cPanel / Netlify:** Run `npm run build` and upload the contents of the `dist/` directory to your server root (`public_html`).

---

## 📄 License

This project is proprietary and built for custom studio client deployments.

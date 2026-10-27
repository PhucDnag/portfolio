# 🚀 Ahmad Rizki Hartawan (RyHar) — Developer Portfolio

A sleek, ultra-modern developer portfolio recreated 1:1 from **@ryhar.dev**'s TikTok showcase ([TikTok Video 7617746640438299925](https://www.tiktok.com/@ryhar.dev/video/7617746640438299925)).

![RyHar Portfolio Preview](./assets/avatar.jpg)

---

## ✨ Features & Architecture

1. **Initial Page Loading Screen**:
   - Displays the bold `RyHar` logo, `PORTFOLIO LOADING` subtitle, and an animated progress bar before revealing the portfolio.
2. **Floating Capsule Navbar**:
   - Fixed header with frosted glassmorphism (`backdrop-filter: blur`), capsule pill border, and `PORTFOLIO.` branding.
   - **Scrollspy Navigation**: Automatically highlights active navigation links (`Home`, `About`, `Experience`, `Projects`, `Contacts`) on scroll.
   - **Seamless Dual Theme (Light & Dark Mode)**:
     - ☀️ / 🌙 toggle button with smooth icon rotations.
     - Persists user preferences via `localStorage`.
3. **Hero Section**:
   - Prominent greeting `Hi, I'm Rizki` with dynamic typing animation (**Typewriter Effect**): *Frontend Developer*, *Fullstack Web Developer*, *Bot Developer*, *UI/UX Enthusiast*.
   - Glowing circular silhouette avatar paired with 3 interactive floating badges:
     - ⏱️ `2+ Years of Experience`
     - `</>` `Javascript Main Language`
     - 💻 `Fullstack developer`
   - Call-to-action buttons (`Explore Work →` and `View CV`).
   - Social media connect bar (Instagram, GitHub, LinkedIn).
4. **About Me Section**:
   - Large rounded photo card featuring the artistic silhouette portrait.
   - Dual narrative columns: `Who Am I` and `My Approach`.
   - Structured `Personal Details` grid: Name, Place of Birth, Phone, GPA (`3.84`), Email, and Education (`Universitas Multi Data Palembang`).
5. **Infinite Marquee Ticker**:
   - Dual high-impact continuous scrolling text bands: `Hello I'm RyHar` and `Fullstack Web Developer`.
6. **Work Experience Section**:
   - Alternating vertical timeline with pulsing node connectors:
     - **2025**: *Fullstack Web Developer* at **RYHAR PANEL** (Next.js, Node.js, Prisma, Express, Tailwind, MySQL).
     - **2025**: *Fullstack Web Developer* at **RYHAR API** (Next.js, Tailwind, Express.js, MySQL, REST API).
     - **2024 - 2025**: *Bot Developer* at **WHATSAPP BOT PLATFORM** (Node.js, Baileys, Puppeteer, Canvas).
7. **My Tech Stack Section**:
   - Categorized grids for Frontend, Backend Core, and Developer Tools with interactive hover cards.
8. **Selected Works (Projects)**:
   - High-definition project showcases extracted directly from the author's video:
     - **Ryhar Panel**: Automated cloud hosting panel sales platform with dual dashboards & payment gateway.
     - **Ryhar API**: Free developer REST API platform with comprehensive endpoint documentation.
     - **Elaina Bot**: Multi-device WhatsApp automation bot with Baileys & Puppeteer.
   - **Interactive Project Details Modal**: Clicking `VIEW DETAILS` opens an animated dialog with full architectural breakdown, feature highlights, and live/GitHub links.
9. **Contact Me Section**:
   - Clean, modern direct email form (`Send an Email directly.`) with client-side validation, loading spinner, and toast notifications.
   - Direct contact info cards: Email, WhatsApp (+62 895-0818-8642), Location (Palembang, Indonesia), and Availability.
10. **Interactive Floating AI Assistant (RyHar Assistant)**:
    - Floating action button in the bottom right corner with an animated pulsating `AI` badge.
    - Chat popup matching the video:
      - Online presence indicator (`● Online`).
      - Quick prompt chips (*"Who are you?"*, *"Ryhar Panel?"*, *"Skills & Tech Stack"*, *"Contact Rizki"*).
      - Realistic 3-dot typing animation (`● ● ●`).
      - Smart knowledge engine answering questions about Rizki, his background, projects, GPA, and contact info in English.

---

## 🛠️ Getting Started

Built with **pure Vanilla HTML5, CSS3, and ES6+ JavaScript** for zero-dependency, ultra-fast performance.

### Option 1: Open Directly
Double-click [index.html](file:///d:/Code/profile/index.html) to run it in any modern web browser.

### Option 2: Run via Local Web Server
Run the following in the project root:

```bash
# Start server using npm
npm run dev

# Or with npx serve directly
npx serve . -p 3000
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Directory Structure

```
d:\Code\profile\
├── index.html          # Semantic HTML5 page structure & modal dialogs
├── style.css           # Modern design system, Light/Dark themes, animations
├── script.js           # Typewriter, theme toggle, modal logic, and RyHar AI Assistant
├── package.json        # NPM scripts for local development
├── README.md           # Documentation
└── assets/             # Extracted high-res media from TikTok video
    ├── avatar.jpg            # Artistic silhouette portrait
    ├── profile_avatar.jpg    # Hero circular avatar
    ├── project_panel.jpg     # Ryhar Panel dashboard screenshot
    ├── project_api.jpg       # Ryhar API marketplace screenshot
    └── project_bot.jpg       # Elaina Bot WhatsApp mockup
```

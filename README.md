# Dinesh Boy – Private Luxury Villas on ECR, Chennai

Mobile-first, production-ready villa booking website for **Dinesh Boy** (private 2BHK and 3BHK luxury villas on East Coast Road, Chennai). Built with **React 18, Vite, React Router 6, Bootstrap 5, Framer Motion, react-icons, and Day.js (Asia/Kolkata timezone)**.

---

## 📁 Project Structure

```
DineshRoomBoy/
├── public/
│   ├── favicon.svg             # Animated vector favicon (villa roof, sun, wave)
│   ├── favicon-512.png         # High-resolution 512x512 browser/social icon
│   ├── manifest.json           # Web app manifest for mobile PWA install
│   ├── logo/
│   │   ├── logo-full.svg       # Full logo (animated icon + brand typography)
│   │   ├── logo-icon.svg       # Standalone logo icon (villa roof, rising sun, wave)
│   │   ├── logo-white.svg      # White/light logo icon for dark backgrounds
│   │   ├── logo-full-white.svg # Full white logo for dark footers/headers
│   │   └── logo-512.png        # 512x512 PNG for browser tabs & WhatsApp sharing
│   └── images/
│       ├── CREDITS.md          # Full Unsplash attribution & photographer source links
│       ├── ecr-beach.webp      # Real photo of ECR coastline
│       ├── villa-exterior.webp # Real photo of villa facade
│       ├── swimming-pool.webp  # Real photo of private swimming pool
│       ├── villa-bedroom.webp  # Real photo of master bedroom
│       ├── lawn-night.webp     # Real photo of lawn illuminated at night
│       ├── sunset.webp         # Real photo of ECR golden sunset
│       ├── villa-living.webp   # Real photo of living hall
│       ├── villa-kitchen.webp  # Real photo of equipped kitchen
│       ├── terrace-view.webp   # Real photo of open terrace
│       ├── villa-2bhk-1.webp ... 3.webp
│       ├── villa-3bhk-1.webp ... 3.webp
│       ├── villa-pool-1.webp ... 4.webp
│       ├── gallery-1.webp ... 9.webp
│       └── fallback-villa.svg
├── src/
│   ├── components/
│   │   ├── CountUp.jsx         # 60fps easing count-up animation for prices
│   │   ├── CustomCalendar.jsx  # IST calendar with live pricing & striped booked dates
│   │   ├── FloatingActions.jsx # Floating WhatsApp and Call buttons (hidden on /book)
│   │   ├── Footer.jsx          # Desktop/mobile footer with logo, timings & disclaimer
│   │   ├── ImageLightbox.jsx   # Fullscreen lightbox viewer for gallery images
│   │   ├── MobileTabBar.jsx    # WhatsApp-style fixed bottom navigation
│   │   ├── MobileTopBar.jsx    # App bar with animated logo, back arrow & call icon
│   │   ├── Navbar.jsx          # Sticky desktop header with animated logo & theme toggle
│   │   └── VillaCard.jsx       # Cards with image carousel, amenity badges & CountUp prices
│   ├── data/
│   │   └── config.js           # Central editable config (owner, villas, rates, booked dates)
│   ├── pages/
│   │   ├── Booking.jsx         # 5-step booking flow with live price calculation, UPI & WhatsApp
│   │   ├── Contact.jsx         # Contact cards, UPI copy, embedded Google Map & enquiry form
│   │   ├── Gallery.jsx         # Masonry photo grid with category filters & lightbox
│   │   ├── Home.jsx            # Animated hero (letter-by-letter, typewriter), quick facts, featured villas
│   │   ├── Rates.jsx           # Tariff table, weekend definition, timings & house rules
│   │   ├── VillaDetail.jsx     # Individual villa page with gallery, amenities & booking CTA
│   │   └── Villas.jsx          # Catalog of all private villas
│   ├── utils/
│   │   └── date.js             # Tested Day.js (Asia/Kolkata) date helpers, rates, booking IDs
│   ├── App.jsx                 # Route splitting, theme management, Framer Motion page transitions
│   ├── index.css               # WCAG AA color variables, shimmer CTA effect & typography
│   └── main.jsx                # React root entry point
├── tests/
│   └── date.test.js            # Automated edge case unit test suite
├── index.html                  # SEO tags, Google Fonts, LocalBusiness schema JSON-LD
├── package.json
├── vercel.json                 # Vercel SPA routing rewrite rules & cache headers
├── vite.config.js
└── README.md
```

---

## 🎨 Design, Typography & Logo

### 1. Logo Design
The brand logo features a minimalist villa gable roof, a rising morning sun, and ocean waves inspired by the East Coast Road (ECR) beach:
- **Colors**: Deep teal (`#0b4a57`), Sea blue (`#127a86`), and Sunset Marigold (`#f0a21f`).
- **Files**:
  - `public/logo/logo-full.svg`: Full logo with brand typography.
  - `public/logo/logo-icon.svg`: Vector icon.
  - `public/logo/logo-white.svg`: White/light version for dark backgrounds.
  - `public/logo/logo-full-white.svg`: Full white version for dark footers.
  - `public/logo/logo-512.png`: 512x512 high-resolution PNG for WhatsApp preview and browser tabs.
- **Animation**: On page load, the sun gently rises (`sunRise`) and the wave draws itself (`waveDraw`). Fully disabled when `prefers-reduced-motion` is active.

### 2. Typography & Animations
- **Fonts**:
  - Headings: `Bricolage Grotesque`
  - Body: `DM Sans`
  - Taglines: `Pacifico`
- **Animations (60fps, under 1s, disabled on prefers-reduced-motion)**:
  - **Hero Title**: Letter-by-letter staggered entrance with spring physics.
  - **Tagline**: Realistic character-by-character typewriter effect.
  - **Section Headings**: Slide up and fade in once on scroll using Framer Motion (`whileInView`).
  - **Pricing**: Dynamic count-up easing numbers via `CountUp.jsx`.
  - **Book Now CTA**: Subtle golden shimmer on text (`.shimmer-text`).

### 3. Text Contrast & WCAG AA Compliance
- **Light Mode**:
  - Headings: `#0b2f38` (13.9:1 contrast ratio against white)
  - Body: `#2f4a50` (7.5:1 contrast ratio against white)
  - Muted text: `#4d6a70` (5.2:1 contrast ratio against white)
  - Links: `#127a86` (4.7:1 contrast ratio against white)
  - Buttons: `#2b1c00` on `#f0a21f` (8.6:1 contrast ratio)
- **Dark Mode**:
  - Headings: `#e6f2f1` (14.2:1 contrast ratio)
  - Body: `#cfe3e4` (12.1:1 contrast ratio)
  - Muted text: `#9bb8bb` (7.2:1 contrast ratio)
  - Links: `#7fd0d8` (8.6:1 contrast ratio)
- **Contrast Rules**:
  - Marigold (`#f0a21f`) is **never** used as text on white backgrounds.
  - White text over photographs sits on a dark multi-stop gradient overlay (`.photo-dark-overlay`).
  - Accessible 3px focus outline on all interactive buttons, inputs, and links.

---

## 📸 Real Photography & How to Update Photos

All placeholder photography is sourced from **Unsplash** under the free commercial Unsplash License. Source links, photographer attributions, and IDs are documented in [public/images/CREDITS.md](file:///home/sanjay/DineshRoomBoy/public/images/CREDITS.md).

### How the Owner Can Replace Photos:
1. Copy photos into `public/images/`.
2. Name them to match the corresponding villa/gallery files:
   - `swimming-pool.webp` / `swimming-pool.jpg`
   - `villa-exterior.webp` / `villa-exterior.jpg`
   - `villa-bedroom.webp` / `villa-bedroom.jpg`
   - `lawn-night.webp` / `lawn-night.jpg`
   - `sunset.webp` / `sunset.jpg`
   - `villa-pool-1.webp` through `villa-pool-4.webp`
   - `gallery-1.webp` through `gallery-9.webp`
3. No React components or code edits are required! If a photo fails to load, `public/images/fallback-villa.svg` automatically displays as a graceful fallback.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Run Unit Tests (Edge Cases)
```bash
npm test
```
Validates weekend rules (Friday & Saturday nights), month-end rollovers, year-end stays, and leap year calculations.

### 4. Build for Production
```bash
npm run build
```
Generates route-split production assets in `dist/`.

---

## 🌐 Deploying to Vercel (Step-by-Step)

1. **Commit and Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Dinesh Boy Villa website with animated logo, real photography & WCAG AA contrast"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/dinesh-room-boy.git
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Log in to [Vercel](https://vercel.com) and click **"Add New..."** → **"Project"**.
   - Select your `dinesh-room-boy` repository.
   - Vercel automatically selects:
     - **Framework**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click **Deploy**.

3. **Custom Domain**:
   - In Vercel Project Dashboard, navigate to **Settings** → **Domains**.
   - Add your domain (e.g. `dineshboyvillas.com`).
   - Add the `A` record pointing to `76.76.21.21` (or `CNAME` pointing to `cname.vercel-dns.com` for subdomains).

---

## 🧪 Test Checklist

1. **Logo & Favicon**:
   - Desktop and mobile headers display the new SVG logo.
   - On page load, the sun rises and wave draws.
   - Favicon displays the vector icon in browser tab, and 512x512 PNG renders when shared.
2. **Typography & Animations**:
   - Hero "Dinesh Boy" letters stagger upward on load.
   - Tagline displays a smooth typewriter effect.
   - Pricing numbers count up smoothly from 0.
   - "Book Now" buttons display a subtle shimmer effect on text.
   - With `prefers-reduced-motion` enabled in OS/browser, all animations remain still and legible.
3. **WCAG AA Text Contrast**:
   - Tested in both light mode and dark mode.
   - All body text exceeds 4.5:1; headings exceed 7:1.
   - No marigold text on white backgrounds.
   - Photos with text have dark gradient overlays.
4. **UPI & WhatsApp Booking Flow**:
   - UPI deep links (GPay, PhonePe, Paytm) pass `pa=lalithadinesh05-3@okicici`, `pn=Dinesh Boy`, exact 50% advance, and Booking ID (`DB-YYMMDD-XXXX`).
   - WhatsApp message preserves formatted lines and includes "Please share the room details. I am attaching my payment screenshot."
# Villa_room

# JJK Web - Theme Refinement & Missing Assets Plan

## Goal
Polish the existing dark/purple JJK theme, fix broken nav link, and implement a consistent placeholder system for 32 missing assets (23 S2 thumbnails, 5 character images, 3 domain videos).

## Scope
- Visual polish only (colors, spacing, typography, animations)
- Placeholder system for missing assets
- Fix broken `jjk.html` nav link
- No theme switching, no JSON data layer, no new features

---

## Tasks

### 1. Fix Broken Navigation Link
- **File**: `index.html:14`
- **Change**: `<a href="jjk.html"` → `<a href="index.html"`
- **Why**: Current link points to non-existent file

### 2. Inline SVG Placeholder System (No CSS Classes Needed)
- **Approach**: Replace missing `<img>` tags with inline `<svg>` placeholders directly in HTML
- **SVG Template** (theme-matched, no external dependencies):
  ```html
  <svg class="placeholder-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder for [NAME]">
    <defs>
      <linearGradient id="placeholderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#8a4fff;stop-opacity:0.2" />
        <stop offset="100%" style="stop-color:#d62828;stop-opacity:0.2" />
      </linearGradient>
    </defs>
    <rect width="300" height="400" fill="url(#placeholderGrad)" rx="8"/>
    <rect x="2" y="2" width="296" height="396" fill="none" stroke="#8a4fff" stroke-opacity="0.25" stroke-width="2" stroke-dasharray="8,6" rx="6"/>
    <text x="150" y="180" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="#8a4fff" fill-opacity="0.6" text-transform="uppercase" letter-spacing="1">[LABEL]</text>
    <text x="150" y="210" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="11" fill="#fff" fill-opacity="0.35">[SUBLABEL]</text>
  </svg>
  ```
- **Styling**: Add minimal CSS for `.placeholder-svg { width: 100%; height: 100%; display: block; }` to `style.css`

### 3. Apply SVG Placeholders to Missing Assets
| File | Count | Replacement | Label/SubLabel |
|------|-------|-------------|----------------|
| `index.html` | 23 (S2 episodes) | `<img src="assets/epX-s2.png">` → inline SVG | "EP XX" / "SEASON 2" |
| `characters.html` | 5 (characters) | `<div class="char-placeholder">X</div>` → inline SVG | Name initial / Full name |
| `domain.html` | 3 (domain videos) | `<div class="slide-placeholder">X</div>` → inline SVG | "VIDEO" / Domain name |

### 4. Expand & Enhance Characters Page
- **Expand roster**: 11 → 16 characters (add Toge, Panda, Maki, Mai, Naobito, Choso, Kenjaku)
- **Structure**: 3 sections — Tokyo Students (7), Teachers/Kyoto (5), Major Curses (4)
- **Data accuracy**: Verify grades, techniques, descriptions against JJK wiki
- **Layout**: Keep card grid, add section headers with character count badges

### 4. Theme Polish (CSS Variables & Refinements)
- **File**: `css/style.css:1-14` → Add CSS custom properties at top
  ```css
  :root {
    --bg-void: #06010c;
    --bg-card: rgba(18,6,30,0.6);
    --bg-card-hover: rgba(255,255,255,0.08);
    --accent-primary: #8a4fff;
    --accent-primary-glow: rgba(138,79,255,0.6);
    --accent-secondary: #d62828;
    --text-primary: #fff;
    --text-muted: #b3b3b3;
    --border-subtle: rgba(138,79,255,0.2);
    --border-hover: #a173ff;
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 25px;
    --shadow-card: 0 0 15px rgba(161,115,255,0.5), 0 0 30px rgba(138,79,255,0.3), 0 10px 30px rgba(0,0,0,0.7);
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s cubic-bezier(0.25,0.8,0.25,1);
    --transition-slow: 0.4s ease;
  }
  ```
- **Replace** hardcoded values throughout `style.css` with variables
- **Tune**:
  - Card hover: reduce `translateY(-6px)` → `-4px` for subtlety
  - Navbar scrolled: reduce `box-shadow` spread from `20px` → `15px`
  - Episode grid gap: `25px` → `20px` (tighter)
  - Season title border-left: `5px` → `4px`

### 5. Micro-Animations
- **Add** to `style.css`:
  ```css
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .episode-card { animation: fade-in-up 0.5s var(--transition-normal) both; }
  .episode-card:nth-child(1)  { animation-delay: 0.05s; }
  .episode-card:nth-child(2)  { animation-delay: 0.1s; }
  /* ... up to nth-child(12) for visible batch */
  .nav-btn { animation: fade-in-up 0.4s var(--transition-normal) both; }
  ```

### 6. Typography Polish
- **Font stack**: Add `'Cinzel Decorative', 'Segoe UI', sans-serif` for headings (JJK title feel)
- **Line-height**: `1.6` for body, `1.3` for headings
- **Letter-spacing**: `0.5px` on `.episode-info p`, `1px` on `.season-title`

### 7. Focus/Accessibility
- **Add** visible focus rings:
  ```css
  .nav-btn:focus-visible,
  .card-link:focus-visible,
  .nav-arrow:focus-visible,
  .audio-btn:focus-visible,
  .audio-toggle-btn:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }
  ```
- **Ensure** `prefers-reduced-motion` disables animations:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
  ```

### 8. Season 2 Duplicate Link Fix
- **File**: `index.html:423` (Episode 6)
- **Current**: Same URL as Episode 5 (`premature-death/1271461748/watch`)
- **Action**: Verify correct Hotstar URL for Episode 6 ("It's Like That") and update

---

## Validation Checklist
- [ ] No 404s for referenced assets (all missing → placeholders)
- [ ] Nav link on Home works (index.html → index.html)
- [ ] Season 2 episode links unique
- [ ] Theme variables used consistently (no hardcoded colors remain)
- [ ] Cards animate in on load (staggered)
- [ ] Focus rings visible on keyboard nav
- [ ] Reduced motion respected
- [ ] No console errors on load

---

## Out of Scope
- Light/dark theme toggle
- JSON data layer for episodes/characters
- New pages or features
- Actual asset sourcing (placeholders only)
- Build tooling / bundling

---

## File Changes Summary
| File | Changes |
|------|---------|
| `index.html` | Fix nav href, 23 S2 `<img>` → inline SVG placeholders, fix Ep 6 link |
| `characters.html` | Rewrite: 16 characters in 3 sections, 5 placeholder divs → inline SVGs, accurate data |
| `domain.html` | 3 placeholder divs → inline SVGs |
| `css/style.css` | CSS variables, replace hardcoded values, `.placeholder-svg` class, animations, focus styles, reduced-motion |
| `js/script.js` | No changes needed |

---

## Execution Order
1. Add CSS variables + `.placeholder-svg` class to `style.css`
2. Update `index.html` (nav link, 23 S2 SVGs, Ep 6 link)
3. Rewrite `characters.html` (16 chars, 3 sections, 5 SVGs)
4. Update `domain.html` (3 SVGs)
5. Apply variable refactor across `style.css`
6. Add animations, focus styles, reduced-motion
7. Validate in browser
# Mobile Responsive Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the seven-page site's mobile layout and add an accessible hamburger navigation without changing the desktop presentation.

**Architecture:** Add a dependency-free Node contract test that checks shared HTML, JavaScript, and CSS invariants. Implement one shared menu initializer in `js/common.js`, add the same accessible menu button to each page, and append scoped `max-width: 780px` overrides to `css/style.css` so existing desktop rules remain authoritative above the breakpoint.

**Tech Stack:** Static HTML, CSS media queries, vanilla JavaScript, Node.js built-in test runner, in-app browser responsive verification.

---

### Task 1: Add the mobile layout contract test

**Files:**
- Create: `tests/mobile-layout.test.js`
- Modify: `package.json`
- Test: `tests/mobile-layout.test.js`

- [ ] **Step 1: Write the failing HTML and JavaScript contract tests**

Create `tests/mobile-layout.test.js` with Node's built-in `node:test`, loading all seven HTML files and asserting:

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const pages = [
    "index.html",
    "guide.html",
    "service.html",
    "about.html",
    "login.html",
    "register.html",
    "profile.html"
];

function read(file) {
    return fs.readFileSync(path.join(root, file), "utf8");
}

test("every page exposes one accessible mobile navigation toggle", () => {
    for (const page of pages) {
        const html = read(page);
        assert.equal((html.match(/class="nav-toggle"/g) || []).length, 1, page);
        assert.match(html, /aria-expanded="false"/, page);
        assert.match(html, /aria-controls="primary-navigation"/, page);
        assert.match(html, /id="primary-navigation"/, page);
    }
});

test("shared script initializes and closes the mobile navigation", () => {
    const script = read("js/common.js");
    assert.match(script, /initMobileNavigation\(\)/);
    assert.match(script, /aria-expanded/);
    assert.match(script, /Escape/);
    assert.match(script, /is-nav-open/);
});
```

- [ ] **Step 2: Write the failing CSS contract tests**

Append assertions that require a final mobile override block and reject the malformed media query token:

```js
test("mobile CSS overrides the high-specificity home hero grid", () => {
    const css = read("css/style.css");
    assert.doesNotMatch(css, /@media \(max-width: 720px\) \{`r`n/);
    assert.match(
        css,
        /@media \(max-width: 780px\)[\s\S]*?\.home-showcase-bg \.hero\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)/
    );
    assert.match(css, /\.nav-toggle\s*\{/);
    assert.match(css, /\.navbar\.is-nav-open \.nav-links/);
});

test("mobile CSS covers page-specific single-column layouts", () => {
    const css = read("css/style.css");
    for (const selector of [
        ".auth-page",
        ".profile-layout",
        ".profile-form-grid",
        ".guide-hero",
        ".service-page .service-layout",
        ".about-page .dashboard"
    ]) {
        assert.ok(css.lastIndexOf(selector) > css.lastIndexOf("@media (max-width: 780px)"), selector);
    }
});
```

- [ ] **Step 3: Add and run the test command**

Add `"test": "node --test tests/*.test.js"` to `package.json`.

Run:

```powershell
npm test
```

Expected: FAIL because the pages have no `.nav-toggle`, `common.js` has no `initMobileNavigation`, and the final mobile override does not exist.

- [ ] **Step 4: Commit the red tests**

```powershell
git add -- package.json tests/mobile-layout.test.js
git commit -m "test: define mobile layout contracts"
```

### Task 2: Implement the shared accessible mobile navigation

**Files:**
- Modify: `index.html`
- Modify: `guide.html`
- Modify: `service.html`
- Modify: `about.html`
- Modify: `login.html`
- Modify: `register.html`
- Modify: `profile.html`
- Modify: `js/common.js`
- Test: `tests/mobile-layout.test.js`

- [ ] **Step 1: Add the shared HTML structure**

In each page, set the existing link container to:

```html
<div class="nav-links" id="primary-navigation">
```

Insert this button between `.brand` and `.nav-links`:

```html
<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="打开主导航">
    <span></span>
    <span></span>
    <span></span>
</button>
```

- [ ] **Step 2: Add the shared JavaScript initializer**

Call `initMobileNavigation()` from `DOMContentLoaded`. Add a function that:

```js
function initMobileNavigation() {
    var navbar = document.querySelector(".navbar");
    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("primary-navigation");
    if (!navbar || !toggle || !links) {
        return;
    }

    function closeMenu() {
        navbar.classList.remove("is-nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "打开主导航");
    }

    toggle.addEventListener("click", function () {
        var opening = toggle.getAttribute("aria-expanded") !== "true";
        navbar.classList.toggle("is-nav-open", opening);
        toggle.setAttribute("aria-expanded", opening ? "true" : "false");
        toggle.setAttribute("aria-label", opening ? "关闭主导航" : "打开主导航");
    });

    links.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    document.addEventListener("click", function (event) {
        if (!navbar.contains(event.target)) {
            closeMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 780) {
            closeMenu();
        }
    });
}
```

- [ ] **Step 3: Run the focused tests**

Run:

```powershell
npm test
node --check js/common.js
```

Expected: navigation tests PASS; CSS tests still FAIL.

- [ ] **Step 4: Commit navigation**

```powershell
git add -- index.html guide.html service.html about.html login.html register.html profile.html js/common.js
git commit -m "feat: add accessible mobile navigation"
```

### Task 3: Add shared and page-specific mobile CSS

**Files:**
- Modify: `css/style.css`
- Test: `tests/mobile-layout.test.js`

- [ ] **Step 1: Repair the malformed media query**

Replace the literal malformed line:

```css
@media (max-width: 720px) {`r`n
```

with:

```css
@media (max-width: 720px) {
```

- [ ] **Step 2: Add the desktop-safe toggle base styles**

Append base rules that keep `.nav-toggle` hidden above the mobile breakpoint and style its three bars:

```css
.nav-toggle {
    display: none;
}
```

- [ ] **Step 3: Append the final `max-width: 780px` override**

Add one final mobile block that:

- displays `.nav-toggle`;
- changes `.navbar` to a three-column header row;
- hides `.nav-links` by default and displays it under `.navbar.is-nav-open`;
- preserves `.nav-actions` in the first row;
- forces `.home-showcase-bg .hero` to `grid-template-columns: minmax(0, 1fr)`;
- restores `.hero-content`, search, actions, cards, images, tables, and long text to usable widths;
- makes `.auth-page`, `.profile-layout`, `.profile-form-grid`, `.guide-hero`, `.service-page .service-layout`, and `.about-page .dashboard` single-column;
- lowers oversized mobile headings and removes harmful mobile negative margins;
- constrains floating assistant panels and the like button to the viewport.

- [ ] **Step 4: Run tests and syntax checks**

Run:

```powershell
npm test
npm run check
```

Expected: all contract tests PASS and all JavaScript syntax checks PASS.

- [ ] **Step 5: Commit CSS**

```powershell
git add -- css/style.css
git commit -m "fix: stabilize mobile layouts across site"
```

### Task 4: Responsive browser verification and cleanup

**Files:**
- Modify if required by a reproduced regression: `css/style.css`, `js/common.js`, or the affected HTML page
- Test: `tests/mobile-layout.test.js`

- [ ] **Step 1: Verify all pages at 390×844**

Open each page and record:

- `document.documentElement.scrollWidth === document.documentElement.clientWidth`;
- no meaningful text container under 70px wide;
- menu starts closed, opens with one click, and closes with `Escape`;
- forms, cards, media, and buttons remain inside the viewport.

- [ ] **Step 2: Verify narrow widths**

Repeat the automated geometry checks at 375×812 and 360×800. If a regression appears, add a failing assertion or reproducible geometry check before changing production CSS.

- [ ] **Step 3: Verify desktop preservation**

Reset to 1280×720 and confirm:

- `.nav-toggle` is hidden;
- `.nav-links` is visible;
- homepage Hero remains its intended desktop two-column/background composition;
- auth, guide, service, about, and profile desktop grids remain unchanged.

- [ ] **Step 4: Run the final verification suite**

Run:

```powershell
npm test
npm run check
git status --short
```

Expected: tests and checks PASS; status contains only intentional implementation changes, if any remain uncommitted.

- [ ] **Step 5: Commit any browser-driven regression fixes**

```powershell
git add -- css/style.css js/common.js *.html tests/mobile-layout.test.js
git commit -m "fix: polish responsive browser regressions"
```

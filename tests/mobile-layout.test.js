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
    const mobileOverrideStart = css.lastIndexOf("@media (max-width: 780px)");
    assert.notEqual(mobileOverrideStart, -1);

    for (const selector of [
        ".auth-page",
        ".profile-layout",
        ".profile-form-grid",
        ".guide-hero",
        ".service-page .service-layout",
        ".about-page .dashboard"
    ]) {
        assert.ok(css.lastIndexOf(selector) > mobileOverrideStart, selector);
    }
});

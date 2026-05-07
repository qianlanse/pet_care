const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

test("project is migrated to Next.js App Router with expected scripts", () => {
  assert.ok(!exists("index.html"), "legacy root index.html should be removed");
  assert.ok(exists("legacy-index.html"), "previous static index.html should be backed up");
  assert.match(read("legacy-index.html"), /<!DOCTYPE html>/);

  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.scripts.dev, "next dev");
  assert.equal(pkg.scripts.build, "next build");
  assert.equal(pkg.scripts.start, "next start");
  assert.equal(pkg.scripts.lint, "eslint");
  assert.equal(pkg.scripts.test, "node --test");

  assert.ok(pkg.dependencies.next);
  assert.ok(pkg.dependencies.react);
  assert.ok(pkg.dependencies["react-dom"]);
  assert.ok(pkg.devDependencies.typescript);
  assert.ok(pkg.devDependencies.tailwindcss);
  assert.ok(pkg.devDependencies["@tailwindcss/postcss"]);
  assert.ok(exists("app/layout.tsx"));
  assert.ok(exists("app/page.tsx"));
  assert.ok(exists("app/globals.css"));
  assert.ok(exists("app/components/EnvironmentCarousel.tsx"));
  assert.ok(exists("app/components/BookingForm.tsx"));
});

test("pet grooming landing page keeps expected copy, assets, and carousel markers", () => {
  const layout = read("app/layout.tsx");
  const page = read("app/page.tsx");
  const carousel = read("app/components/EnvironmentCarousel.tsx");
  const styles = read("app/globals.css");
  const source = [layout, page, carousel, styles].join("\n");

  assert.match(layout, /lang="zh-CN"/);
  assert.match(source, /宠物洗护/);
  assert.match(source, /预约洗护/);
  assert.match(source, /服务项目/);
  assert.match(source, /护理流程/);
  assert.match(source, /店内环境/);
  assert.match(source, /价格套餐/);
  assert.match(source, /门店地址/);
  assert.match(source, /上海市宜川路街道陕西北路 1620 号/);
  assert.match(source, /陕西北路 1620 号/);
  assert.match(source, /\/imagegen\/store-location-map\.png/);
  assert.match(source, /\/imagegen\/reception-lounge\.png/);
  assert.match(source, /\/imagegen\/wash-zone\.png/);
  assert.match(source, /\/imagegen\/drying-styling-zone\.png/);
  assert.match(carousel, /data-carousel-track/);
  assert.match(carousel, /useState/);
  assert.match(carousel, /接待区/);
  assert.match(carousel, /洗护区/);
  assert.match(carousel, /吹护区/);
  assert.match(styles, /@import "tailwindcss"/);
  assert.doesNotMatch(source, /<svg\b/);

  assert.ok(exists("public/imagegen/reception-lounge.png"));
  assert.ok(exists("public/imagegen/wash-zone.png"));
  assert.ok(exists("public/imagegen/drying-styling-zone.png"));
  assert.ok(exists("public/imagegen/store-location-map.png"));
});

test("page has purposeful motion hooks with reduced-motion fallback", () => {
  const page = read("app/page.tsx");
  const carousel = read("app/components/EnvironmentCarousel.tsx");
  const reveal = read("app/components/ScrollReveal.tsx");
  const styles = read("app/globals.css");
  const source = [page, carousel, reveal, styles].join("\n");

  assert.match(page, /<ScrollReveal \/>/);
  assert.match(source, /data-animate/);
  assert.match(reveal, /IntersectionObserver/);
  assert.match(carousel, /is-active/);
  assert.match(styles, /--ease-out-quart/);
  assert.match(styles, /@keyframes hero-float/);
  assert.match(styles, /@keyframes paw-pulse/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

test("pricing cards expose animated hover selection styles", () => {
  const styles = read("app/globals.css");

  assert.match(styles, /\.pricing-card::after/);
  assert.match(styles, /\.pricing-card:hover::after/);
  assert.match(styles, /@keyframes pricing-shadow-sweep/);
  assert.match(styles, /\.pricing-card:hover\s*{[^}]*background:/s);
  assert.match(styles, /\.pricing-card:hover \.section-label/);
  assert.match(styles, /\.pricing-card:hover strong/);
  assert.match(styles, /\.pricing-card\.featured:hover/);
  assert.match(styles, /animation: none !important/);
  assert.doesNotMatch(styles, /mask-composite: exclude/);
});

test("pricing grid moves the featured class to the hovered plan", () => {
  assert.ok(exists("app/components/PricingGrid.tsx"));

  const page = read("app/page.tsx");
  const pricingGrid = read("app/components/PricingGrid.tsx");

  assert.match(page, /<PricingGrid plans={pricing} \/>/);
  assert.match(pricingGrid, /"use client"/);
  assert.match(pricingGrid, /useState/);
  assert.match(pricingGrid, /onMouseEnter/);
  assert.match(pricingGrid, /setActiveIndex\(index\)/);
  assert.match(pricingGrid, /onMouseLeave/);
  assert.match(pricingGrid, /className={`pricing-card\${activeIndex === index \? " featured" : ""}`}/);
});

test("review section appears before pricing section", () => {
  const page = read("app/page.tsx");
  const reviewIndex = page.indexOf('<div className="section-label">到店反馈</div>');
  const pricingIndex = page.indexOf('<div className="section-label">价格套餐</div>');

  assert.ok(reviewIndex > -1);
  assert.ok(pricingIndex > -1);
  assert.ok(reviewIndex < pricingIndex);
});

test("review cards include ratings, customer avatars, and names", () => {
  const page = read("app/page.tsx");
  const styles = read("app/globals.css");
  const source = [page, styles].join("\n");

  assert.match(source, /review-carousel/);
  assert.match(source, /review-track/);
  assert.match(source, /review-set/);
  assert.match(styles, /\.review-carousel\s*\{[^}]*width: 100vw/s);
  assert.match(styles, /\.review-carousel\s*\{[^}]*margin-inline: calc\(50% - 50vw\)/s);
  assert.match(styles, /@keyframes review-scroll/);
  assert.match(styles, /animation-play-state: paused/);
  assert.match(source, /review-rating/);
  assert.match(source, /review-avatar/);
  assert.match(source, /review-person/);
  assert.match(source, /陈女士/);
  assert.match(source, /李先生/);
  assert.match(source, /赵女士/);
  assert.match(source, /周先生/);
  assert.match(source, /王女士/);
  assert.match(source, /林小姐/);
  assert.match(source, /孙先生/);
  assert.match(source, /何女士/);
  assert.match(source, /4\.9/);
  assert.match(source, /5\.0/);
  assert.match(source, /4\.8/);
});

test("hero uses full-bleed image background with an appointment form overlay", () => {
  const page = read("app/page.tsx");
  const form = read("app/components/BookingForm.tsx");
  const styles = read("app/globals.css");
  const source = [page, form, styles].join("\n");

  assert.match(page, /<BookingForm \/>/);
  assert.match(page, /hero-background/);
  assert.match(page, /hero-content/);
  assert.match(styles, /\.hero-background/);
  assert.match(styles, /\.hero-content/);
  assert.match(styles, /position: absolute/);
  assert.match(styles, /margin-inline: calc\(50% - 50vw\)/);
  assert.match(styles, /width: 100vw/);
  assert.match(styles, /border-radius: 0/);
  assert.match(styles, /min-height: 820px/);
  assert.match(styles, /overflow: visible/);
  assert.match(form, /联系人/);
  assert.match(form, /手机号/);
  assert.match(form, /期望到店时间/);
  assert.match(form, /宠物类型/);
  assert.match(form, /服务项目/);
  assert.match(form, /备注/);
  assert.match(form, /onSubmit/);
  assert.match(source, /booking-form/);
  assert.match(source, /预约已收到/);
});

test("booking form places expected arrival time below contact and phone", () => {
  const form = read("app/components/BookingForm.tsx");
  const styles = read("app/globals.css");
  const contactIndex = form.indexOf('name="contactName"');
  const phoneIndex = form.indexOf('name="phone"');
  const arrivalIndex = form.indexOf('name="arrivalTime"');
  const petTypeIndex = form.indexOf('name="petType"');

  assert.ok(contactIndex > -1);
  assert.ok(phoneIndex > contactIndex);
  assert.ok(arrivalIndex > phoneIndex);
  assert.ok(petTypeIndex > arrivalIndex);
  assert.match(form, /booking-wide/);
  assert.match(styles, /\.booking-wide/);
});

test("location section uses a full-bleed map image with absolute store info overlay", () => {
  const page = read("app/page.tsx");
  const styles = read("app/globals.css");
  const source = [page, styles].join("\n");

  assert.match(page, /location-map-background/);
  assert.match(page, /location-overlay/);
  assert.match(styles, /\.location-section/);
  assert.match(styles, /\.location-map-background/);
  assert.match(styles, /\.location-overlay/);
  assert.match(styles, /margin-inline: calc\(50% - 50vw\)/);
  assert.match(styles, /width: 100vw/);
  assert.match(styles, /\.location-copy[\s\S]*position: absolute/);
  assert.match(styles, /\.location-copy[\s\S]*right: 0/);
  assert.match(styles, /\.location-map-background[\s\S]*position: absolute/);
  assert.match(source, /\/imagegen\/store-location-map\.png/);
});

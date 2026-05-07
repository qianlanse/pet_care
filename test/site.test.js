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

test("review cards include ratings, customer avatars, and names", () => {
  const page = read("app/page.tsx");
  const styles = read("app/globals.css");
  const source = [page, styles].join("\n");

  assert.match(source, /review-rating/);
  assert.match(source, /review-avatar/);
  assert.match(source, /review-person/);
  assert.match(source, /陈女士/);
  assert.match(source, /李先生/);
  assert.match(source, /赵女士/);
  assert.match(source, /4\.9/);
  assert.match(source, /5\.0/);
  assert.match(source, /4\.8/);
});

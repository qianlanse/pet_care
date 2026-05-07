# Review Carousel Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Expand the customer feedback section and turn it into an animated carousel.

**Architecture:** Keep review data in `app/page.tsx` and render it twice inside a CSS-driven marquee track for a seamless loop. Keep all motion in `app/globals.css`, including hover/focus pause and `prefers-reduced-motion` fallback.

**Tech Stack:** Next.js App Router, React, CSS keyframes, Node test runner.

---

### Task 1: Add Failing Coverage

**Files:**
- Modify: `test/site.test.js`

**Step 1: Write the failing test**

Add assertions that the review section includes more customer names and carousel-specific CSS markers.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because carousel class names and new reviews do not exist yet.

### Task 2: Implement Review Carousel

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Step 1: Expand data**

Add more review items covering first visit, cat care, grooming detail, sensitive pets, membership return, and transparent communication.

**Step 2: Render carousel markup**

Wrap the cards in `.review-carousel`, `.review-track`, and `.review-set`, rendering the review list twice with `aria-hidden` on the duplicate set.

**Step 3: Add CSS animation**

Create a horizontal track with stable card widths, `@keyframes review-scroll`, gradient edge masks, hover/focus pause, responsive widths, and reduced-motion fallback.

### Task 3: Verify

Run:
- `npm test`
- `npm run lint`
- `npm run build`

Expected: all commands exit 0.

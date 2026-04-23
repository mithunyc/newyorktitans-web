# REVIEW_CHECKLIST.md

## Purpose

This checklist is the quality gate for the New York Titans website.

Use it during:

- product review
- design review
- implementation review
- pre-launch review
- post-build audit

A page or release should not be considered ready just because it looks polished at first glance. It must pass the checks below.

---

## 1. Strategic Fit

- [ ] Does the site clearly present New York Titans as a nonprofit/community-first cricket institution rather than just another team page?
- [ ] Is the mission legible within the first few seconds?
- [ ] Does the site feel sponsor-ready, not hobbyist?
- [ ] Does the site make sense for the club’s actual current stage?
- [ ] Is there strong alignment between public presentation and internal values/code of conduct? fileciteturn0file0
- [ ] Does the site avoid pretending to be bigger or more operationally complex than it is?

---

## 2. Scope Discipline

- [ ] Is the release aligned with `OUT_OF_SCOPE.md`?
- [ ] Has any new feature been explicitly approved in `DECISION_LOG.md`?
- [ ] Are there any signs of “just one more feature” drift?
- [ ] Has unnecessary backend or data complexity been avoided?
- [ ] Is the product still low-ops and maintainable?

---

## 3. Homepage Quality

- [ ] Is the homepage message immediately clear?
- [ ] Is there one dominant headline and not several competing messages?
- [ ] Is the primary CTA obvious?
- [ ] Is the sponsor/partner path visible?
- [ ] Does the homepage create trust and emotional pull?
- [ ] Does it feel premium because of discipline, not clutter?
- [ ] Would a first-time sponsor take this seriously?

---

## 4. Conversion Clarity

- [ ] Can a sponsor quickly understand why to partner?
- [ ] Can a sponsor find the inquiry path without hunting?
- [ ] Can a player or parent understand what the club stands for?
- [ ] Can a prospective player express interest easily?
- [ ] Can a volunteer/supporter understand how to help?
- [ ] If donation is present, is the flow clear and trustworthy?

---

## 5. Information Architecture

- [ ] Is navigation simple and calm?
- [ ] Are page labels obvious and human?
- [ ] Is the structure easy to understand on first visit?
- [ ] Is there a clear distinction between About, Team, Community, Sponsors, Join, and Support content?
- [ ] Are there any redundant pages or sections?
- [ ] Does each page have a clear purpose?

---

## 6. Visual Design Quality

- [ ] Does the site look like a real brand, not a template?
- [ ] Is typography strong, consistent, and intentional?
- [ ] Is spacing generous and disciplined?
- [ ] Is the color system controlled?
- [ ] Does the site avoid AI-slop patterns?
- [ ] Does imagery feel real, relevant, and emotionally grounded?
- [ ] Are sponsor logos handled elegantly?
- [ ] Does the design feel premium on both mobile and desktop?

---

## 7. DESIGN.md Compliance

- [ ] Does the implementation follow `DESIGN.md`?
- [ ] Is premium restraint visible across all pages?
- [ ] Is motion subtle and purposeful?
- [ ] Are banned patterns absent?
- [ ] Are hero sections clean and focused?
- [ ] Are card layouts used only where appropriate?
- [ ] Does every section have one strong idea?

---

## 8. Copy Quality

- [ ] Is the copy clear and human?
- [ ] Is the tone proud, warm, and disciplined?
- [ ] Does the copy avoid empty hype?
- [ ] Is jargon minimized?
- [ ] Are headlines concise and memorable?
- [ ] Does each page reinforce trust, belonging, action, or community purpose?
- [ ] Are values reflected naturally rather than dumped as filler?

---

## 9. Mobile Experience

- [ ] Does the site feel designed for mobile rather than merely compressed?
- [ ] Are hero sections still powerful on small screens?
- [ ] Is navigation easy to use one-handed?
- [ ] Are tap targets large enough?
- [ ] Are cards, sections, and forms easy to scan?
- [ ] Are images cropped well on mobile?
- [ ] Is text readable without zooming?

---

## 10. Accessibility Basics

- [ ] Is contrast strong enough for readable body text and CTAs?
- [ ] Are focus states visible?
- [ ] Can core navigation be used by keyboard?
- [ ] Do forms have labels and understandable errors?
- [ ] Do images have meaningful alt text?
- [ ] Is heading hierarchy logical?
- [ ] Does the site respect reduced-motion preferences?
- [ ] Is meaning never conveyed by color alone?

---

## 11. Performance and Technical Quality

- [ ] Does the site load quickly on normal mobile conditions?
- [ ] Are images appropriately sized and optimized?
- [ ] Is animation lightweight?
- [ ] Is there unnecessary JavaScript that could be avoided?
- [ ] Are routes working correctly?
- [ ] Are there obvious layout shifts or broken states?
- [ ] Is the build/deploy path clear and stable?

---

## 12. Content Operations Reality

- [ ] Can the site remain credible even if news updates are infrequent?
- [ ] Can the team maintain this site without a full-time webmaster?
- [ ] Does the site rely on unrealistic photo or content volume?
- [ ] Are update points simple and understandable?
- [ ] Could a future operator understand what needs updating?

---

## 13. Sponsor Readiness

- [ ] Is the sponsor page compelling, not generic?
- [ ] Does the site show why partnership matters?
- [ ] Is there a strong community/value proposition?
- [ ] Is the visual presentation credible enough for outreach?
- [ ] Is there a clean inquiry form or contact path?
- [ ] Are there no embarrassing placeholders or weak filler claims?

---

## 14. Trust and Authenticity

- [ ] Does the site feel honest?
- [ ] Are there no fake counters, inflated claims, or invented statistics?
- [ ] Is the nonprofit/community emphasis credible?
- [ ] Does the team story feel specific to New York Titans?
- [ ] Would a parent, sponsor, or player believe this organization is serious and values-driven?

---

## 15. Launch Readiness

- [ ] Primary pages complete
- [ ] Contact paths tested
- [ ] Sponsor inquiry path tested
- [ ] Join/player interest path tested
- [ ] Mobile QA complete
- [ ] Accessibility basics checked
- [ ] Metadata and social preview images set
- [ ] Domain and redirects configured
- [ ] Deployment stable
- [ ] No visible placeholder junk remains

---

## Final Gate

A release is launch-ready only if all of the following are true:

- [ ] sponsor-ready
- [ ] low-ops
- [ ] mobile-first
- [ ] visually premium
- [ ] not AI slop
- [ ] credible to families and community
- [ ] faithful to mission and values
- [ ] future-ready without current overbuild

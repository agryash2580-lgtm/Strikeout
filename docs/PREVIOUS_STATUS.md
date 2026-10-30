# Strikeout

Strikeout connects incident notes, evidence, reviewed requests and a narrowly scoped public-contact repair workflow. Pop is its pixel cat companion.

## Run locally, including without internet

Dependencies are installed in this checkout. Run `npm run dev` and open **http://localhost:3002**. Local development stores account records and published demonstration material in the ignored `.data/` folder. Restarting the server does not reset them. Fonts, artwork, PDF tools, QR generation/decoding and the extension download are bundled locally.

Internet is required for GitHub public-profile queries, Gemini wording assistance and official external resources. Provider failures are displayed as failures. They never become fabricated results. A browser must reach the local server; this is not an offline service-worker installation.

## Product flow

New visitors meet Pop in an original pixel scene. The navigation, homepage cat card and replay control open `/meet-pop`, which always displays the introduction regardless of previous completion or skipping. Every stage has a skip action and Back controls; sound is off by default. Direct incident/case links bypass the introduction. Pop moves between targets using a damped spring that preserves velocity, while reduced-motion users receive instant positioning and the same keyboard-accessible steps. Controls never wait for an animation.

The home screen has three actions: Log an incident, Check my exposure and My cases. Incident intake adapts to hacked accounts, impersonation, exposed contact information, suspicious links and uncertainty. A case is an internal Strikeout record, never an automatic official complaint.

The sample case opens immediately in an isolated guest workspace. Creating a full account uses real server-side authentication. Drafts survive the account step. A new account created from a guest session retains that guest's controlled publishing destination.

Each case has Your story, Evidence, Next steps, Requests and Progress. Reports expose their exact editable content and selected evidence before the user copies/downloads them. Submissions are recorded as user-reported, with outcomes pending.

## Actual repair mechanism

- Generate one public portfolio, one structured PDF résumé and supported vCard QR codes from synthetic adult data.
- Fetch the public responses. Parse HTML, extract PDF text, render the actual PDF and decode its QR image.
- Normalise the supplied number, then show source-linked occurrences for individual confirmation/rejection.
- Prepare a replacement that removes only confirmed selected occurrences. Retain work email, projects, links, rejected occurrences and the independent copy.
- Bind approval to a preview and source fingerprint. A changed source invalidates approval.
- Publish the updated source model. Public URLs serve only the current version; earlier private preview records are not exposed as old public copies.
- Fetch the public URLs again. Check text and decoded QR contents, the returned revision, work email and project content.
- Leave the independent simulated external copy flagged. A request draft or clean download never counts as source removal.

Only reserved fictional +1 202 555 0100–0199 numbers may be placed in public demo sources. Real incident details are never automatically seeded into that public material.

## Architecture

`src/main.tsx` implements the UI and case journeys. `src/Intro.tsx` owns the separate Pop introduction. `src/inspection.ts` inspects fetched content in the browser. `src/World.tsx`, `src/pop.tsx`, `src/motion.ts`, `src/styles.css` and `src/movement.css` implement original scenery, interaction, motion and sound.

`api/index.mjs` handles authentication, private cases, source control, publication, provider requests and optional AI. `api/core.mjs` contains deterministic matching/repair rules and generators. `api/store.mjs` selects durable local files in development and private Vercel Blob on Vercel. Private reads bypass the storage cache; conditional writes reject stale source revisions. Account data versions reject stale tab saves.

Passwords use salted scrypt hashes. Session tokens are random, stored as hashes server-side and sent through HTTP-only, SameSite cookies. Hosted cookies are Secure. Credentials never enter frontend source. Signed-in case data is not shown from an unauthenticated browser cache.

`src/useWorkspaceSave.ts` keeps the loaded version and a recovery copy in the signed-in tab. It avoids unchanged writes, serialises saves, retries temporary failures and resumes after reconnecting. On a version conflict, a three-way merge combines separate edits without replacing another tab's work. Conflicting fields require a side-by-side review; the comparison survives refresh. Pending work can be downloaded, and sign-out waits for a successful save. Older pending drafts are retained for review.

Blob JSON reads explicitly request identity encoding: compressed responses produce weak ETags, which cannot be used for conditional writes. Strong ETags preserve compare-and-swap behaviour for large evidence records. SDK errors are checked by class rather than `error.name`, because the SDK's conflict error uses the ordinary `Error` name. Both cloud and local stale writes return HTTP 409. Operational errors log only a generated reference, route and error type, never case bodies or credentials.

The hosted project is the existing Vercel `strikeout` project. `BLOB_READ_WRITE_TOKEN` and `GEMINI_API_KEY` belong in Vercel environment variables. Gemini defaults to the verified available `gemini-3.1-flash-lite`; `GEMINI_MODEL` may explicitly override it. AI is limited to approved selected text and cannot change case state, publish, fetch arbitrary destinations or submit anything.

## Live search

The connected live adapter queries GitHub's public-profile API for selected usernames after disclosure and approval. It returns actual source URLs, retrieved excerpts, times, exact-username confidence and explained impact. Ownership is always unverified until the user reviews it. A public profile is not evidence of harm.

Instagram/Facebook identifiers, emails, phone numbers and aliases can be managed, but have no connected live search provider in this release. The interface labels that limitation. Phone exposure inspection operates on the separate controlled demonstration sources. There is no private-profile access, leaked-credential collection or general people-search engine.

## Pop extension

Download `/pop-extension.zip` from the website or load the `extension/` folder directly:

1. Open `chrome://extensions` or `edge://extensions`.
2. Enable Developer mode.
3. Choose Load unpacked and select `D:\mu20\strikeout-final\extension`.
4. Open Pop's toolbar popup. Inspect a supplied link, or deliberately bring the pet to the current ordinary website.

The Manifest V3 package requests storage, activeTab, scripting and contextMenus. It does not request persistent host access, browsing history, or access to forms. Browser-internal pages cannot host the pet. Hover/focus help is opt-in; it inspects link labels/destinations without visiting the target. The pet can be dragged, moved with arrow keys, minimised, snoozed or disabled for a site. Site disabling can be reversed in the popup. Mute-quips and reduced-motion settings are respected.

The context menu and popup explain observable local signals. A reviewed handoff removes destination queries/fragments before opening a Strikeout incident draft. No link is clicked, no form submitted and no extension installed automatically. This is an unpacked developer package, not a Chrome Web Store listing.

## Verification

Run `npm test` for deterministic matching, supported repair preservation, actual PDF generation, source escaping, link signals, account isolation, preview ownership, approval enforcement, stale-source rejection and consent boundaries.

Run `npm run test:browser` for the real published HTML/PDF/QR repair journey, independent-copy isolation, persisted progress, rejected-match preservation, failed-fetch handling, skippable/replayable intro, direct-link bypass and mobile reduced motion. Tests use the installed Edge browser and the local server on port 3002. Set `TEST_URL` to exercise another running deployment.

`node tests/cloud-storage.integration.mjs` explicitly checks real private Blob records at 3 KB, 100 KB and 650 KB. Each size must save correctly and reject a stale replacement. These three checks passed using isolated synthetic records that were removed afterwards. This integration check requires the configured Blob token and is separate from the default test suite.

`npm run build` creates the production frontend. `npm audit --omit=dev` checks dependencies. Validation passed 15 backend/core tests and 14 browser journeys, including repeat visits to Meet Pop, measured cat movement, immediate skipping at every stage, keyboard-only reduced-motion navigation, automatic retry after storage and malformed-response failures, two-tab merge/conflict resolution, reconnect and legacy-draft recovery. The complete publish/PDF/QR verification journey also passed against the production URL, and production Gemini returned a real generated answer using gemini-3.1-flash-lite. Browser screenshots and separate extension checks live in `qa/` or are generated by the browser tests.

## Limits and delivery honesty

This is a hackathon prototype, not an independently audited security service. It has no Strikeout password-reset service, email verification, automatic reports/takedowns, Gmail cleanup or global removal guarantee. Rate limits are instance-local rather than a distributed abuse-control system. Follow-up dates are in-app records, not background notifications. Source verification covers only the listed checks at the recorded time.

Use fictional information for demonstrations. Deletion does not remove downloads or third-party/provider copies. Guest sessions and accounts retain records until explicitly deleted; there is no automatic background retention job. Existing earlier-version browser vault data is not erased or represented as migrated.

The old implementation remains in `D:\mu20\strikeout` for recovery; this replacement lives in `D:\mu20\strikeout-final`. No claim is made that all code was authored during the event. Present only measured results and real implemented modules.

## Asset provenance

The pixel scenery is original SVG code; the encounter wording and synthesised melody are original. Pop uses the user's supplied cat reference, with CSS state animations. Fonts are locally hosted DM Sans and Pixelify Sans; their licence files are retained in `public/art/`. Reference screenshots informed the visual direction, and were not copied into the shipped UI.

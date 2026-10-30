## Fresh-clone setup and environment

Use Node.js 22 or newer and npm. The normal source checkout does not need the historical backup key.

```sh
git clone https://github.com/agryash2580-lgtm/Strikeout.git
cd Strikeout
npm ci
```

In PowerShell:

```powershell
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3002. The blank template contains no live credentials. Basic local cases and controlled repair work without cloud or AI keys. A fresh dependency installation needs internet; the captured Windows node_modules is not a portable substitute for npm ci.

| Variable | Purpose |
| --- | --- |
| PORT | Local port, default 3002 |
| GEMINI_API_KEY | Optional server-side AI provider key |
| GEMINI_MODEL | Default gemini-3.1-flash-lite; override deliberately |
| BLOB_READ_WRITE_TOKEN | Private hosted storage credential |
| STORAGE_BACKEND=blob | Explicit cloud override for development/integration checks |
| VERCEL | Platform-set hosted behavior and Secure cookies |
| NODE_ENV=production | Local static serving of a previously built dist |
| TEST_URL | Browser-test base URL override |

server.mjs loads .env.local and mounts Vite middleware on Express. Do not accidentally start standalone Vite: vite.config.ts retains an old standalone proxy target at port 3000, while the integrated development server defaults to 3002.

```powershell
npm run build
$env:NODE_ENV='production'
npm start
```

Unset NODE_ENV or use a fresh terminal to return to development. Local tools work while this server is reachable; there is no offline service worker or universal offline installation.

## Vercel handover

The existing owner-controlled project is strikeout. vercel.json builds the React static frontend and Express serverless API, routes /api/* and /published/* to the API, and uses the SPA fallback for application deep links. Hosted persistence needs a private Blob token; AI additionally needs Gemini. The private Blob store was created in Mumbai.

GitHub access does not grant Vercel access. The teammate must receive project access or deploy a separate copy with their own environment/storage. This upload has **not automatically linked the new GitHub repo to the existing Vercel deployment**.

```sh
vercel link
vercel env pull .env.local
npm run build
vercel --prod
```

Use the official CLI and check the project before deploying. The original .vercel linkage and .env.local are preserved in the encrypted backup. The save-fix deployment recorded in this session was dpl_5Vhm3v29xrmdj5WtneCQ82ZX1jbL. That is historical metadata, not a credential or a guarantee that the alias will remain unchanged.

## Data model, authentication and limits

Users are private JSON records containing ID, username, salt/password hash where applicable, workspace ID, guest flag, cases, identifiers and data version. Sessions contain user ID and expiry. Controlled workspaces hold the public source model. Previews contain owner, before/after models, fields, supplied number/country, source hash and creation time. This is application JSON, not a relational schema with a migration framework.

Cases use UUIDs, story fields, created/updated dates, evidence and activity entries, plus optional scan, report, preview, publication and verification records. Inspect actual components before changing formats.

Usernames are normalized and restricted to 3-32 letters/numbers/underscore/hyphen. Passwords are 10-128 characters and use random salts plus scrypt. Comparisons are timing safe. Sessions use random 32-byte tokens stored as hashes server-side, seven-day HTTP-only SameSite Strict cookies, and Secure cookies on Vercel. No password reset, email verification or user MFA exists yet.

Guest samples require no signup; account creation can retain the guest's controlled destination and pending work. Neither establishes real identity. Strikeout does not need the victim's Instagram/Google password, OTP or recovery codes.

Cloud records live in private strikeout/users/, sessions/, workspaces/ and previews/ paths. Local records live under .data. Local writes use temporary files, atomic rename, a per-key process-local queue and version checks, with short Windows file-lock retries. Cloud reads bypass cache and preserve strong ETags for conditional writes. Internal _etag metadata is non-enumerable and omitted from normal JSON responses.

Autosave uses a roughly 650 ms debounce, a server baseline, numeric dataVersion and a serialized queue. It avoids unchanged writes, retries temporary failures and resumes on reconnect. A tab-local sessionStorage envelope contains baseline, pending data and unresolved conflicts. This recovery copy is not claimed to be encrypted or permanent.

Three-way merge combines separate edits and ID-based additions; same-field and delete-versus-edit conflicts require review. The comparison survives refresh. Choosing a field preserves unrelated edits. Users can retry/download pending work; sign-out waits for a successful save. Older pending formats are retained for review.

Hosted headers include nosniff, no-referrer, restricted camera/microphone/geolocation, same-origin framing and a self-origin CSP. Cross-site writes are rejected. These are safeguards, not a completed audit.

Limits include 2 MB request parsing, 20 cases, 30 identifiers, roughly 1.5 million serialized request characters per workspace and 500 KB per UI screenshot. Rate limits are instance-local. Deletion cannot erase prior exports, external/provider copies or records downloaded by someone else. There is no automatic retention cleanup.

## Backend API map

All routes live in api/index.mjs. Private routes require a session cookie; writes require the expected same-origin context. Source is authoritative for exact shapes.

| Method/path | Purpose |
| --- | --- |
| GET /api/health | Runtime/storage configuration; not a full end-to-end health check |
| GET /api/auth/me | Safe user information or null |
| POST /api/demo/start | Start/reuse guest sample |
| POST /api/auth/register | Username/password; may inherit guest destination |
| POST /api/auth/login | Username/password |
| POST /api/auth/logout | Remove current session/clear cookie |
| GET /api/data | Cases, identifiers, dataVersion |
| PUT /api/data | Workspace and expected version; identical repeats are idempotent |
| DELETE /api/account | Remove current user/workspace and current session |
| GET /api/source | Controlled model, fingerprint and public base |
| POST /api/source/reset | Reset synthetic source with new revision |
| PATCH /api/source | Reserved fictional number only |
| POST /api/repair/preview | Number, country, fields, expected revision |
| GET /api/repair/:id/resume | Owner-only PDF preview |
| POST /api/repair/publish | Preview ID and explicit approved=true |
| GET /published/:id/:file | Listed controlled public files |
| POST /api/search/github | Selected username and explicit approval |
| POST /api/link | Label/destination for local signals |
| POST /api/ai | Approved reviewed task/context |

Errors include 401 authentication, 409 conflict, 413 size, 429 rate and 503 expected temporary failure. Unknown errors return safe text and an opaque reference. Operational logs record route/method/error type/code, not case bodies or keys.

## Extension internals and actual boundaries

manifest.json declares the worker, popup, permissions and Pop image resource. background.js installs the right-click menu. panel.html/css/js implement analysis, consent, handoff and page-companion controls. pet.js injects the optional UI into a closed shadow root.

The popup checks visible-domain mismatch, HTTP, a shortener allowlist, international xn-- domains and user-info before @. The shortener list is bit.ly, tinyurl.com, t.co and shorturl.at. These are explained signs, not a malicious/safe verdict. Shorteners are not resolved. Context-menu invocation passes the destination; visible-label comparison may require supplying the optional label in the popup.

Optional page hover/focus help inspects link text/destination locally. Pop can be dragged, arrow-key moved, minimized, snoozed five minutes, disabled per site and re-enabled in the popup. Local mute/reduced-motion preferences are supported. It is not passively injected everywhere.

The approved handoff strips query/fragment information, puts reviewed origin/path and signals in a URL-hash incident draft, and opens the website. It does not submit a complaint. Update extension/panel.js if changing the domain. Rebuild public/pop-extension.zip after source edits or the download will remain stale.

There is no reputation feed, antivirus, universal blocking, automatic recovery or 2FA setup. Page-level contact-number inspection was proposed but is not implemented. A closed shadow root is not a security boundary against a hostile page. Cross-site and accessibility testing remain necessary for public release.

## AI request details

The browser sends approved selected text to Express, which uses the server-side Gemini key. The panel exposes task/context before sending; editing revokes approval. Unrelated cases, screenshots and third-party passwords are not automatically attached.

The server bounds context to 6,000 characters and task to 300, requests up to 600 output tokens at temperature 0.3 and uses a 22-second provider timeout. Instructions restrict Pop to explaining/summarizing/drafting reviewed supplied facts, without fabricated identity, outcomes or actions. Results are suggestions, copied manually rather than silently committed.

This is an API connection, not a downloaded model. Quotas, billing, availability and provider data policies apply. Discussed model names are not proof of provider support. AI does not control matching, approval, publication or verification.

## Design evolution and problems encountered

### Visual brief and implementation

The team requested an original retro encounter, flat purple/yellow pixel art, readable body text, asymmetric layouts and useful interactive product evidence. It rejected generic centered SaaS hero/three-card layouts, bento filler, glassmorphism, glowing gradients and Inter/Geist/Space Grotesk. The implementation uses Pixelify Sans, DM Sans, local art and original SVG scenery.

Pop uses the supplied cat reference with CSS state animation and spring movement. The optional original synthesized melody starts off and stops on exit. No franchise artwork/music is claimed. The simulated prize message compares prizes.example with totally-a-prize.invalid. Recruiting Pop does not install anything or activate protection.

### Broken Meet Pop route

Meet Pop originally linked to /extension, while the encounter appeared only on / before a local completion flag. Returning visitors therefore saw installation instructions. The fix extracted Intro.tsx, created always-replayable /meet-pop, connected nav/cat-card/replay, and retained direct incident/case bypass. Returning-visitor reload behavior is tested.

### Movement that disrupted clicks

A hover translation moved a button upward. A pointer at the previous click's boundary repeatedly entered/left the new target, creating oscillation. Outer hit areas now stay still while inner arrows, artwork and shadows move. Controls never wait for animations.

Pop uses requestAnimationFrame with a damped spring, persistent velocity, stiffness 155, damping 19 and capped frame deltas. Reduced motion snaps to the target and removes ambient/entry animation. Small mouse parallax is disabled for touch/reduced motion. Narrow-screen clamping keeps Pop inside the scene.

### The large-case save bug

Small cloud records saved, but compressed JSON downloads of larger cases returned weak W/ ETags. Conditional replacements need the original strong If-Match tag. Storage therefore rejected legitimate saves even without another editor.

The reader now requests accept-encoding: identity, bypasses the cache and retains the strong version tag. The issue was reproduced at 3 KB, 100 KB and 650 KB. After the fix, all sizes saved and genuinely stale replacements were rejected.

The cause was hidden by another bug: the SDK's BlobPreconditionFailedError uses the ordinary Error name. Comparing error.name to its class name missed it and returned generic HTTP 500. instanceof now recognizes the real class and returns 409. The same class-based approach handles temporary storage errors.

### Save recovery, Windows writes and false success

The old queue could keep retrying a stale version. The replacement stores a baseline, merges separate edits, exposes real conflicts, retries temporary failures and preserves pending work across refresh. Identical API saves are idempotent. Unreadable successful responses do not falsely become saved. Local writes gained conditional checks and bounded Windows rename retries.

Unavailable sources and QR failures remain incomplete; rejected matches remain unchanged; independent archives remain unresolved. A report draft, user-recorded submission or HTTP save is not substituted for a checked outcome.

### Product scope and maintenance

Broad ambitions mixed account recovery, automatic hardening, AI and browser security. The reliable demonstration was narrowed to supported selective repair and fresh verification. An LLM cannot create platform privileges. The broader incident modules organize help rather than perform every external action.

main.tsx is dense, CSS has override layers and JSON records have no formal migration system. The owner still disliked the product/interface and asked a teammate to continue. Improve information architecture and visual execution without breaking confirmed approvals/status boundaries. Accessibility checks are useful but not a complete WCAG audit.

## Detailed verification history

The final full local run passed 15 Node tests and 14 browser journeys, plus the frontend build. These are measured session results, not a guarantee for every future checkout/machine.

Core/API tests cover matching, selective preservation, invalid selections, actual PDF generation, HTML escaping, URL signals, account isolation, private previews, approval enforcement, stale source rejection, guest transfer, merge/conflict resolution, local conditional writes and simultaneous/idempotent saves.

Browser tests cover the full HTML/PDF/QR publish/verify path, independent-copy isolation, persisted progress, rejected matches, failed fetches, exact report evidence/stale review, replay/direct bypass, actual Pop movement, skip at every stage, mobile keyboard/reduced motion, transient/malformed-response retry, two tabs, reconnect and legacy pending drafts.

The explicit real-Blob check saves 3 KB, 100 KB and 650 KB synthetic records, rejects stale replacements and deletes the diagnostic records. All passed after the fix. qa/verify-save.mjs exercised the hosted API with three HTTP 200 writes, final stored content of 650,001 synthetic characters and dataVersion=3; its diagnostic guest account was deleted.

Hosted retry/recovery checks passed, including an isolated two-tab run. An earlier parallel run exceeded the 15-second save expectation while a large-upload check was also running. The isolated rerun passed; that coincidence does not establish the delay's cause, and latency needs further measurement.

The full repair flow was previously tested on production too. Gemini returned a real hosted generated response. The unpacked Edge worker, popup and approved handoff were separately exercised. That is not comprehensive pet testing or a store-approved release. Permanent screenshots live in qa; Playwright recreates test-results. Upload success does not itself establish new runtime behavior.

## Known gaps and continuation priorities

- No arbitrary WordPress/GitHub Pages/Drive/existing-resume adapter.
- No arbitrary multi-page PDF redaction, OCR or hidden-layer/metadata sanitization.
- No whole-internet/private-profile search, Gmail cleanup or leaked-credential collection.
- Only GitHub has a live identifier lookup. Other types are stored UI data.
- No automatic platform account recovery, password changes, session termination or 2FA enrollment.
- No automatic complaints, acknowledgments, takedowns, background reminders or global monitoring.
- No extension reputation backend, universal blocking or Web Store release; page-level contact scanning remains proposed.
- No end-to-end encrypted case vault, password reset, email verification or distributed rate limits.
- No universal client request-timeout policy; backend provider calls have their own timeouts.
- No automatic retention cleanup or general old-vault migration.
- No independent audit, representative user study, verified novelty claim or winner guarantee.

Recommended order: run the sample; agree the priority flow; split route components/data types; improve explanations/mobile/contrast; preserve approvals and incomplete states; design a properly authorized owned-site adapter; add consented extension page inspection; rebuild the extension ZIP; run relevant tests; verify actual hosting; update this README around the final behavior.

The fictional demonstration is /sample -> inspect -> review five occurrences -> preview four supported owned repairs -> approve/publish -> fetch again -> show complete owned text/QR checks while the external number remains. Reports and optional AI support the story; they are not the verification mechanism.

## Complete original workspace backup

The owner explicitly requested all files. handoff/ contains an authenticated encrypted chunked snapshot of the whole local D:\mu20 workspace: older versions, installed dependencies, generated builds, environment/linkage files, local saved records, tests, screenshots, resources, inspiration and presentation assets present at capture. It is not just another source ZIP.

The repository is public, so live credentials/private records are included inside that encrypted snapshot rather than exposed in plaintext. The restore key is saved separately on the owner's computer and must be shared privately. The ordinary editable source does not need that key. All chunks and recorded hashes are needed to restore the backup.

See handoff/RESTORE.md, handoff/manifest.json and scripts/restore-workspace.mjs. This is a local filesystem snapshot, not an export of every live production Blob record. Later writes are not included. Extract into a new directory rather than overwriting work. Original absolute paths/vendor binaries may not be portable; npm ci is preferred.

Inside the snapshot, mu20/strikeout is the legacy version and mu20/strikeout-final is the current implementation. The repository root exposes the current version. The captured dependency/build copies are backup evidence, not the recommended editing surface.

## Team, sources and asset rights

Submitted responsibilities: Yash Kumar Agrawal, research/reporting resources; Kush Nahar, interface/UX; Swarit Sawarkar, workflow/testing; Vrinda Agrawal, integration/presentation. Later messages assigned Yash the website while teammates worked on the PPT. The owner is handling the collaboration invitation separately.

Original proposal sources:

- https://arxiv.org/html/2202.11168v2
- https://support.google.com/websearch/answer/9673730?hl=en
- https://aarambhindia.org/meri-trustline-6363176363-indias-bharosemand-helpline-for-reporting-online-risks/
- Counselling information linked by the product: https://icallhelpline.org/.

These are sources/referrals, not integrations or current-availability guarantees. Check official procedures before real use. Original scenery/wording/melody were implemented for this project. Pop uses the owner's supplied reference; no new redistribution license for third-party art is established. Font licenses remain under public/art; dependencies retain their own licenses. No blanket project license is invented. The original inspiration/resource folders are in the complete backup. Presentation assets do not imply an approved final presentation.

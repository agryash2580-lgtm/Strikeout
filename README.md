# Strikeout: complete website and extension handoff

Handoff date: **30 October 2026**. Repository owner: **agryash2580-lgtm**. The owner is handing development to a teammate and is managing Kush's collaborator invitation separately. This upload does not claim that invitation has been accepted.

**Live website:** https://strikeout-wheat.vercel.app/  
**Replay Pop:** https://strikeout-wheat.vercel.app/meet-pop  
**Extension:** https://strikeout-wheat.vercel.app/extension

This README records the product context, implementation, setup, decisions, bugs, tests, limitations and continuation work. The owner rejected the current visual/product quality and asked a teammate to take over. This is continuation material, not an approved final design or an independently audited security service. The current implementation is the repository root; earlier implementations and every original local workspace file are preserved in the encrypted full-workspace backup described at the end.

The code was built iteratively with Codex assistance in the owner's Windows workspace. Do not represent every file as manually authored without tools or entirely built during the competition. The original shorter status document is retained in `docs/PREVIOUS_STATUS.md`.

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

## Original proposal and why the website exists

The submitted proposal was **Strikeout**, in **Civic Services**, for the MU20 Opportunity Summit 2026 Hackathon Challenge. Its opening problem was that finding help after cybercrime can itself be confusing: which service to contact, what evidence to collect, which information to share, and how to know what happened after submitting a request.

The initial proposed users were adult students and young professionals in India dealing with impersonation or exposed contact information. The proposed private workspace would contain a reviewed incident summary, evidence timeline, recipient-specific report drafts, clear next steps, progress tracking, limited selected-page exposure checks and links to specialist/counselling support. AI would organize and explain information, while explicit rules controlled confirmations and status. A matching name or phone number would not prove identity.

The owner subsequently explicitly added hacked accounts to the intended scope. The discussion also explored automatic password/2FA setup, broader browser security, local Llama/Gemma models and alternative concepts. Those discussions are not implementations. The current AI uses the Gemini API. There is no general automatic account-recovery or account-hardening integration.

### The team's narrowed technical MVP

Swarit locked the practical contribution as **removing exposed personal contact details while keeping useful public content online**. The example was: give us a portfolio and resume, remove the personal phone number, preserve projects and work email.

The agreed demonstration was a complete flow: **find -> confirm -> preview -> approve -> repair -> publish -> fetch again -> verify**. It would support text and contact QR codes on one controlled portfolio and a structured resume. External copies receive a removal-request draft and remain unresolved. A clean download never counts as fixing an older public copy. Broad internet scanning and Gmail cleanup were outside that MVP.

Original teammate messages are retained where available in `docs/TEAM_BRIEF_SWARIT.md` and `docs/TEAM_BRIEF_KUSH.md`. They explain intended scope; actual source and this implementation description determine what currently works.

The current navigation is broader than that MVP because it also supports incident organization, reports and Pop. The deterministic cleanup path is the most complete technical mechanism. Do not present every incident category as an equally deep platform integration.

### Why this is more than an AI conversation

The non-AI system stores structured cases, validates supported repair targets, generates actual HTML/PDF/QR material, binds approval to a source version, publishes an approved replacement and checks the public result. An LLM does not decide whether publication happened or whether verification passed. Pop supplies optional explanations and wording. It has no autonomous control over those actions.

That is an implementation distinction, not proof of novelty or a competition advantage. No representative user study, first-ever claim, real-world takedown outcome or winner guarantee was established.

## Feature-by-feature behavior

| Feature | What it currently does | What it does not establish |
| --- | --- | --- |
| Incident intake | Hacked account, impersonation, exposed details, suspicious message/link and uncertainty | An official complaint was submitted |
| Story | Editable summary, platform/profile reference, supplied phone/country and work email | Independent verification of facts or identity |
| Evidence | Notes, links, supplied dates and optional PNG/JPEG screenshot | Forensic authenticity or an unrestricted evidence vault |
| Official routes | Links to recovery/report guidance for Instagram, Facebook and Google | Direct control of those accounts or complaint systems |
| Contact inspection | Fetches supported HTML/PDF and decodes contact QR contents | Whole-internet coverage or arbitrary document support |
| Match decisions | Confirm, reject or leave a result undecided | A matching number identifies its owner |
| Selective preview | Removes selected confirmed supported occurrences, preserving useful fields | An external copy has changed |
| Approved publication | Updates the controlled source model and its served files | The entire internet is clean |
| Fresh verification | Checks returned text/QR, revision, email and project retention | Guaranteed permanence or unrestricted PDF coverage |
| Reports | Editable purpose-specific drafts with selected evidence | Automatic submission, acknowledgment or takedown |
| Progress | Activity history, publication/check states and follow-up date | A background reminder/monitoring service |
| Gemini Pop | Suggestions based on explicitly approved selected text | Autonomous action, verified facts or legal conclusions |
| Public-profile lookup | Real disclosed GitHub username lookup | Other identifier types have connected search providers |
| Accounts | Private server-side records and HTTP-only sessions | Email verification, password reset or production audit |
| Export/deletion | Case exports and case/account controls | Third-party/provider/downloaded copies are erased |
| Guest sample | Isolated fictional Mira workspace without signup | Real victim data or platform activity |
| Extension | User-triggered local link signals and reviewed handoff | Antivirus, a threat feed or universal link blocking |

## Exact controlled repair data and checks

`api/core.mjs` seeds a structured source with `id`, `revision`, `updatedAt`, `name`, `role`, `email`, a supplied phone, projects and separately addressable contact fields:

- `portfolioText`: visible HTML contact line and telephone link.
- `portfolioQr`: telephone entry in the HTML page's vCard QR.
- `resumeText`: visible contact text in the generated PDF.
- `resumeQr`: telephone entry in the PDF's embedded contact QR.
- `externalPhone`: independent simulated archive text.

Only the first four can be repaired directly. The independent archive remains deliberately outside that adapter. Sample data is Mira Rao, `mira.work@example.com`, reserved fictional `+1 (202) 555-0147`, and fictional projects at example.com. Public source customization accepts only `+1 202 555 0100-0199`. The intended Indian audience does not make the public fixture a real Indian phone number.

### Inspecting the returned files

`src/inspection.ts` restricts source fetching to same-origin `/published/` URLs. Requests use fresh check identifiers and no-store behavior. It does not follow arbitrary user-supplied remote URLs as a scanner.

For HTML, it parses the actual returned document, removes script/style inspection text, checks the supported contact element, retrieves the QR PNG and decodes it through jsQR. It checks that work email, project text and project links remain.

For the resume, it retrieves actual PDF bytes, loads PDF.js, extracts the first page's text, renders that page on a canvas and decodes the QR from the rendered pixels. The resume is a generated structured one-page document. This is not a general multi-page/OCR/redaction engine.

Phone candidates are normalized with libphonenumber-js after the implemented digit/spacing/punctuation extraction. Formatting variants can match. Arbitrary obfuscation, screenshots of numbers or every possible phone format are not covered. Exact normalized matching does not verify identity.

Each source result records its URL, retrieval/check time and complete/incomplete outcome. A missing source or failed QR decode cannot count as an absence result.

### Preview, ownership, approval and publication

`prepare()` validates each selected target against the supplied phone and allowlisted owned field names, clears only those fields, increments the source revision and preserves projects/email/rejected occurrences.

The server stores an owner-bound private preview with before/after models, selected fields, source hash and creation time. Preview access requires the owning account. Publication requires explicit approval, a preview under 30 minutes old and a fingerprint matching the current source. A changed source invalidates prior approval. Conditional storage writes reject concurrent source changes. The instance-local publish lock is not itself a distributed lock.

Publication updates the model used by the actual public routes. HTML, PDF and QR are generated from that current version. It does not simply download a new resume, and historical private previews are not exposed as old public versions.

### What verification means

After publication, fresh responses are checked again for the supplied number, QR contents, current revision, retained work email and retained project content/links. Both owned sources need complete passing checks. The independent source remains a separate result. A server save response, a request draft or a recorded submission is never substituted for verification.

## Every page and public route

| Path | Purpose |
| --- | --- |
| `/` | First-visit introduction, normal home after local completion/skipping |
| `/home` | Home, incident/exposure/cases actions and introduction replay |
| `/meet-pop` | Always-available four-stage introduction |
| `/incident` | Conditional intake; direct entry bypasses introduction |
| `/sample` | Starts/opens fictional sample and enters its case |
| `/cases` | Saved cases, export/delete and sample entry |
| `/exposure` | Identifier management, disclosures and GitHub lookup |
| `/case/:id/story` | Editable account of the incident and review confirmation |
| `/case/:id/evidence` | Evidence notes, URL/date and sample screenshot |
| `/case/:id/steps` | Official routes/local link check and supported inspection |
| `/case/:id/requests` | Editable reports, selected evidence, repair preview and approval |
| `/case/:id/progress` | Publication, verification, activity, follow-up and support |
| `/extension` | Developer-package download and manual installation |
| `/privacy` | Storage, sharing, permissions and limits |
| `/pop-extension.zip` | Downloadable unpacked extension |
| `/published/:id/portfolio` | Actual supported public HTML |
| `/published/:id/resume.pdf` | Actual generated PDF |
| `/published/:id/contact.png` | Actual portfolio contact QR |
| `/published/:id/external` | Independent simulated archive |
| `/published/:id/impersonation-example` | Explicit fictional profile evidence |

Routing uses the History API and React state rather than a router library. Direct deep links use the SPA fallback. Browser back updates the route. Cases are looked up inside the current account's loaded workspace.

## File map and stack

```text
React / TypeScript / Vite browser UI
  |-- cases, consent, Pop introduction and assistant
  |-- browser-side HTML/PDF/QR inspection
  |-- recoverable autosave and merge
  +--> Express API
         |-- auth, sessions, private cases and previews
         |-- deterministic source/repair generators
         |-- controlled public HTML/PDF/QR
         |-- selected GitHub and Gemini requests
         +--> local private files OR private Vercel Blob

Separate Manifest V3 extension
  +--> local link signals and optional page companion
  +--> reviewed incident-draft handoff
```

| Source | Responsibility |
| --- | --- |
| `src/main.tsx` | Main app, routes, auth dialog, intake, case screens, discovery, AI panel and link UI |
| `src/Intro.tsx` | Optional encounter, stage focus, sound, skip and next actions |
| `src/World.tsx` | Original code-drawn pixel landscape |
| `src/pop.tsx` | Mascot state, scene placement and optional synthesized melody |
| `src/motion.ts` | Position/velocity-preserving damped spring |
| `src/styles.css` | Base visual system and responsive layout |
| `src/movement.css` | Scene, route and interaction transitions |
| `src/useWorkspaceSave.ts` | Baseline tracking, queue, retry, recovery and rebase |
| `src/SaveNotice.tsx`, `src/saving.css` | Pending-state retry/export and conflict comparison |
| `src/inspection.ts` | API helper and fetched HTML/PDF/QR checks |
| `shared/workspace.mjs` | Equality, three-way merge and conflict resolution |
| `api/index.mjs` | Express routes, auth, limits, provider calls, preview and publish |
| `api/core.mjs` | Seeds, generators, normalization, selective repair and URL signals |
| `api/store.mjs` | Private cloud/local persistence and conditional writes |
| `server.mjs` | Local environment loading, Express and Vite/static serving |
| `vercel.json` | Static/serverless routing and browser headers |
| `vite.config.ts` | Frontend build and old standalone proxy configuration |
| `playwright.config.ts` | Browser test configuration and Edge channel |
| `tests/` | Core, API, storage, merge and browser regressions |
| `extension/` | Full editable browser-extension source |
| `public/` | Fonts, licenses, cat art, favicon and extension ZIP |
| `qa/` | Retained screenshots and explicit verification scripts |
| `docs/` | Historical status and supplied teammate briefs |
| `handoff/` | Complete encrypted original workspace and restore instructions |

The stack is React 19, Vite 7, Express 5 and frontend TypeScript. pdf-lib generates PDFs, PDF.js reads/renders them, qrcode creates QR images, jsQR decodes them, libphonenumber-js normalizes numbers and @vercel/blob stores hosted private records. The lockfile preserves installed versions. Vite transpilation is not a separate strict TypeScript type-check. `main.tsx` is still too dense and should be split into components during continuation.

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

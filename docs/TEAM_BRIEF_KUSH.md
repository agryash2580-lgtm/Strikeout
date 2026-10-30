STRIKEOUT helps people respond to hacked accounts, impersonation, and exposed personal information. Its companion is Pop, an animated pixel cat. Rename all existing references to Pip to Pop, preserving stored data where necessary.
1. Opening demo and tutorial

The first thing new visitors see should be a short, interactive introduction with the atmosphere of encountering and recruiting a creature in a retro adventure game. Use original artwork and effects.

Sequence:

    A fictional suspicious message appears in a pixel-art browser world.

    Pop peeks out: “A wild Pop appeared.”

    The visitor inspects a fictional link with Pop.

    Pop identifies a specific warning sign and makes a relevant quip.

    The visitor chooses “Team up with Pop.”

    Pop joins them, and the home screen appears.

Keep it approximately 20–30 seconds, with user-controlled advancement.

Always show “Skip → Log a complaint.” It must immediately open the incident flow. No forced animation, signup, or tutorial completion.

Remember completion or skipping locally. Returning users and direct case links bypass the intro. Offer replay from the home screen. Support reduced motion, keyboard navigation, and muted-by-default sound.

Clearly label the demonstration as simulated. Recruiting Pop in the tutorial does not install an extension or activate browsing protection.
2. A beautiful, extremely simple home screen

Use three prominent actions:

    Log a complaint

    Check my exposure

    My cases

Pop should be present without obstructing the interface. Include a small secondary entry for the Pop extension.

Keep detailed features inside these flows. The home screen should not overwhelm visitors with every tool, disclaimer, or dashboard statistic.

Use progressive disclosure: reveal relevant options when the user needs them. Do not conceal consent, account requirements, or what an action actually does.
3. “Log a complaint” flow

Start with a dropdown labelled “What happened?”

Options:

    My account was hacked.

    Someone is impersonating me.

    My personal information is exposed.

    I received a suspicious link or message.

    I’m not sure.

After selection, reveal only the relevant questions and menus.

Examples:

    Hacked account: platform, account identifier, whether access remains, recovery-email access, evidence, and official recovery steps.

    Impersonation: real profile, suspected fake profile, supporting evidence, and reporting options.

    Exposed information: affected detail, source page, ownership confirmation, and removal options.

    Suspicious message: supplied link or message, explainable findings, and next steps.

Let users begin describing the incident before registration. Integrate sign-in/account creation when they choose to save and continue, explaining why an account is needed. Preserve their draft through authentication.

Creating an account must use a real authentication flow. Never request passwords or recovery codes for Instagram, Facebook, email, or other third-party accounts.

Explain near submission that “Log a complaint” creates a STRIKEOUT case; it does not automatically file a complaint with a platform, police, or another authority.
4. Case workspace

Each case should follow:
Your story → Evidence → Next steps → Requests → Progress

Relevant menus should appear within the case rather than as unrelated global destinations.

Include:

    An editable incident summary.

    Evidence with screenshots, links, notes, dates, and provenance.

    A prominent next action.

    Official recovery/reporting routes appropriate to the problem.

    Recipient-specific, editable drafts.

    A preview of information and attachments before sharing.

    Follow-up dates and an activity timeline.

    Clear distinctions between drafted, user-marked submitted, independently checked, and resolved.

Saving evidence should make it available when preparing a request. Recording an action should update the timeline and next step. Preserve drafts during navigation.
5. “Check my exposure”: public-source discovery

Build a defensive exposure-search feature for the user’s own identifiers. Use the approachable label “Check my exposure”, with a short explanation of public-source searching.

Allow users to add and manage:

    Instagram usernames.

    Facebook usernames or profile URLs.

    Other supported public account identifiers.

    Email addresses.

    Phone numbers.

    Optional names or aliases to help disambiguate results.

Let users label identifiers, edit them, remove them, and choose which to include in a search. Do not imply ownership is verified merely because an identifier was entered.

Before searching, show:

    Selected identifiers.

    Sources or providers to be queried.

    Information sent to those providers.

    Search limitations.

    A clear approval action.

Search supported public sources through actual integrations. AI should help interpret retrieved evidence, explain possible matches, and suggest next steps. AI must not invent search results, profile ownership, sources, or findings.

Do not promise access to private profiles, platform-wide coverage, or a complete internet scan. Do not bypass logins, access restrictions, or platform protections. If a provider is unavailable, show that limitation instead of substituting fabricated results.

Keep controlled demo results visibly labelled and separate from live searches.
Findings

Present findings as understandable points of interest. Every finding should include:

    Source URL and source name.

    Retrieval/check time.

    Relevant excerpt or supported evidence.

    Identifier matched.

    Match confidence and its explanation.

    Potential severity and its explanation.

    Recommended next action.

Keep match confidence separate from potential severity. A high-impact finding may still be an uncertain identity match.

Use explainable severity categories such as low, medium, and high, with documented criteria. Avoid arbitrary numerical danger scores and sensational language. A public profile alone is not proof of harm.

Allow the user to mark:

    This is me.

    This is not me.

    I’m not sure.

    I want this public.

    I want help removing this.

Offer actions to save evidence, create or attach to a case, prepare a removal request, or recheck a supported page.

An unsuccessful search means “nothing found in the checked sources,” not “your information is safe.” Failed checks must remain distinguishable from successful checks with no match.
6. Pop: companion and assistant

Pop should be a consistent companion across the website and browser extension.

Personality:

    Funny, observant, and supportive.

    Jokes about suspicious situations, never victims.

    Calm and practical when someone reports harm.

    Occasional relevant quips, not constant interruptions.

Examples:

    “That domain is wearing a fake moustache.”

    “That’s a lot of urgency for a link we just met.”

    “Okay. One thing at a time. I’m here.”

Give Pop distinct animated states: idle, walking, curious, inspecting, concerned, celebrating, and sleeping.

Inside STRIKEOUT, Pop should help with the current task: clarify missing details, explain a finding, summarise selected notes, or help draft wording.

Show what context will be shared before an AI request. Let users remove information. Treat page content and retrieved evidence as untrusted input, never instructions that authorise actions.

Pop must not claim to recover accounts, submit reports, or guarantee removal.
7. Pop browser extension

Build a Chromium Manifest V3 extension with Pop as a small, draggable browser pet.

Include:

    Minimise, snooze, mute-quips, and disable-on-this-site controls.

    User-invoked link inspection through a context menu or Pop panel.

    Optional hover/focus assistance with a short dwell and explicit opt-in.

    A compact explanation of observed link signals.

    A reviewed handoff into a STRIKEOUT case.

Start with minimal permissions. Request additional site access only when the corresponding feature needs it.

Use local URL analysis where possible. Unusual domains, shortened links, or redirects are signals to investigate, not automatic proof of a scam. Do not automatically visit suspicious destinations.

Do not collect browsing history by default or read passwords, authentication codes, payment details, or unrelated form inputs. Explain any optional remote reputation checks and avoid sending sensitive URL parameters.

Never navigate, click links, submit forms, or install anything on behalf of the user without a deliberate user action.
8. Visual design and motion

Make this feel like a carefully designed product with personality.

Retain purple, lavender, warm yellow, and original pixel artwork. Use pixel typography for branding and short expressive headings, with readable typography for longer text and forms.

Build a consistent system for spacing, typography, colours, borders, controls, and interaction states.

Use different layouts for different work:

    Evidence: thumbnails and previews.

    Exposure: findings with highlighted source excerpts.

    Requests: document editor and disclosure preview.

    Progress: chronological timeline.

Add meaningful motion:

    Pop reacts to actual application events.

    Evidence settles into its collection.

    Case steps transition smoothly.

    Search stages reflect actual processing.

    Reviewed findings become case evidence.

    Timeline entries appear when actions are recorded.

Avoid fake progress, unnecessary loading delays, constant bouncing, excessive particles, and repeated generic card grids.

Make mobile layouts, keyboard navigation, visible focus, contrast, and reduced motion part of the implementation.
9. Architecture and privacy

Separate:

    Website UI and onboarding.

    Authentication and user accounts.

    Case management and persistence.

    Evidence storage.

    Identifier management and consent.

    Search-provider adapters and background jobs.

    Finding normalisation, deduplication, and severity rules.

    Server-side AI integrations.

    Extension content scripts, UI, and service worker.

    Shared types and validation.

Use explicit state models for cases, searches, findings, and Pop’s animations. Keep credentials server-side. Enforce per-user access to cases and evidence. Minimise stored personal data and explain retention, export, and deletion.

Handle offline, empty, loading, permission-denied, provider-failure, partial-result, and retry states. Rate-limit external requests and use safe URL handling for server-side page checks.

Do not implement invasive people-search capabilities, collection of leaked credentials, or tools for tracking another person. Keep exposure searches scoped to the user’s own information.
10. Implementation and delivery

Inspect the existing project and briefly map what can be reused. Then implement the work, making routine design decisions independently.

Prioritise:

    Pip-to-Pop migration and visual system.

    Skippable intro and simple three-action home.

    Complaint intake with integrated account creation and draft preservation.

    One complete case journey.

    Identifier management and a genuine, limited public-source search integration.

    Explainable findings and case handoff.

    Pop extension and contextual assistance.

    Animation, accessibility, and responsive polish.

Ask only for decisions that materially affect scope, required credentials, or external costs. If an integration is blocked, finish independent work and identify the missing dependency clearly.

Test the complete flows, authentication boundaries, data isolation, consent, search failures, persistence, and extension permissions.

Deliver:

    The working implementation.

    Extension loading instructions.

    A short architecture explanation.

    Working features versus pending integrations.

    Test results and any material limitations.

Do not describe mocked searches, unconnected buttons, or simulated AI responses as completed functionality.
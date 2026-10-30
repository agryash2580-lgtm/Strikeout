Yo Yash,

You're taking the website. We're working on the PPT. Here's the final Strikeout build brief so we're all building and presenting the same thing.
1. Final idea

Strikeout helps someone report impersonation and repair exposed personal contact information, while keeping useful public content online.

One fictional adult case: someone discovers a fake profile using their identity. Their personal phone number is also exposed through their portfolio and linked résumé. They want to report the fake profile, remove their number, and keep their projects and work email public.

This is a refinement of our submitted Civic Services proposal: incident summary, reporting support, limited exposure checking, and honest progress tracking. The main technical feature is approved repair followed by checking the actual published result.
2. Four connected screens

A. My incident
Collect a short description, impersonating-profile URL, evidence links or optional sample screenshot, and the personal number the user wants to protect. Include the work email they want to keep. Show an editable incident summary and missing information. Don't invent facts or treat a URL as proof of impersonation.

B. My exposure
Inspect explicitly selected supported pages and a linked demo résumé. Match the supplied number in text and supported contact QR codes, including ordinary formatting differences such as spaces and hyphens. Each finding must show its source, matching text or decoded value, and location where available. Ask the user to confirm or reject the match. A rejected match must remain rejected. Clearly show unsupported or failed checks.

C. Take action
Two actions in the same case:

    Impersonation report: prepare an editable draft using only reviewed incident information. Show exactly which details will be shared, allow removal of unnecessary details, and provide a verified official reporting link for one chosen platform. Let the user copy/download the draft and report manually. We do not submit reports automatically.
    Repair owned material: show a before/after preview removing the personal number and updating the contact QR code while preserving projects and work email. Require explicit approval before publishing to our supported controlled demo website.

D. Check progress
Show a simple evidence/action timeline. After publishing, fetch the public page and résumé again and inspect their contents. Only mark the specific exposure as resolved after a successful fresh check. Show which sources and checks were covered, when they ran, and anything unresolved.

For an external page we cannot edit, prepare a removal-request draft. It stays pending after the user records submission. Include a small section linking to verified qualified support resources.
3. Scope and implementation boundaries

    One controlled portfolio website, one structured résumé template, and contact QR codes generated from supported fields.
    Use synthetic adult data and a clearly labelled demonstration mode. Do not seed real private information.
    Regenerate the résumé from structured fields. Do not attempt arbitrary uploaded-PDF redaction.
    Actually read supported source content. Do not hardcode findings or success counters.
    Publish to one destination we control. Downloading a repaired file alone does not fix the old public copy.
    For the prototype, inspect only explicitly selected/allowlisted demo sources. Do not build an unrestricted URL-fetching service.
    Keep the calculation of matches and all status changes deterministic. AI is optional for wording or summaries; the complete flow must work without it.
    No Gmail integration, broad internet crawling, automatic platform takedowns, automatic report submission, or claims that an entire person/account is now safe.

4. Status rules — these matter

    Exposure: found → user confirmed/rejected → repair prepared → published → verification passed/failed/incomplete.
    Report: draft → ready for user → user-reported submission → outcome pending. A recorded submission is not proof of removal.
    A failed fetch or unsupported format means “could not verify,” never “removed.”
    If the controlled copy is repaired but an external copy still contains the number, show both outcomes separately.
    Save case progress and allow reset/delete. For a local demo, persist only synthetic case data; don't store secrets in browser code or the repository.

5. UI direction

Make it calm, clear, and credible for someone dealing with online harm. Use a simple four-step navigation, readable type, strong contrast, and evidence cards showing source → finding → action → status. Make the before/after repair preview the visual centrepiece. Use plain labels such as “Review exposure,” “Preview repair,” “Approve and publish,” and “Check published copy.” Avoid hacker graphics, fake threat scores, scary animations, and a blanket green “You're safe” badge. Design direction is flexible; working behaviour comes first.
6. Build order

    Case data, incident form, editable summary, and saved progress.
    Controlled portfolio and structured résumé fixtures with visible text and contact QR code.
    Source inspection and evidence-backed findings, including user confirmation/rejection.
    Repair preview, approval, publishing, and fresh verification. This is the core engineering priority.
    Editable report/removal drafts, verified official links, and honest status tracking.
    Failure states, acceptance tests, then visual polish.

Use tools you understand. If using React/TypeScript, keep scanning, repair, publishing, and verification separate from UI components. Keep publishing credentials server-side and use separate demo setup/reset controls. The published source must be read again rather than trusting a successful save response.
7. Demo sequence

    Open a fictional incident and show the goal: protect a personal number, preserve projects and work email.
    Inspect the controlled portfolio and résumé; show the exact text/QR evidence.
    Confirm the finding and preview the repair.
    Approve and publish. Open the actual published result.
    Fetch and check again: the selected number is absent from supported checks, the work email and project content remain.
    Show an unchanged external copy still unresolved and its removal-request draft.
    Show the impersonation-report preview and pending status.

Let someone change the contact details in the supported demo source before scanning. The findings must follow the actual input. Keep fictional impersonation material local/controlled; don't create a real impersonating social account.
8. Acceptance tests

    Change the demo number: the scanner detects the new supplied number rather than a hardcoded one.
    Test a number in text and a supported contact QR code separately.
    Reject a match: it must not be changed or quietly reconfirmed.
    Approve a repair: project content and work email remain intact.
    Download without publishing: the public-source finding remains open.
    Publish failure or fetch failure: no success state.
    Leave another selected copy unchanged: it remains flagged.
    Refresh: case state survives. Reset/delete: case data clears.
    Edit the incident: dependent drafts update or are clearly marked for regeneration/review.
    AI unavailable: the core flow still works.

9. What we need for the PPT

As modules become real, share the running URL, actual screenshots, chosen stack, what each teammate implemented, and measured test results. Clearly separate working features from planned ones and simulated external actions. We'll explain the same case, show the before/after result, and acknowledge scope limits. Don't claim interviews, accuracy, takedowns, or novelty we haven't established.

The guide requires the submitted implementation to be built from scratch during the hackathon. Use the preparation time for source checks, sketches, test cases, and environment setup.

Scope is locked. Make one complete flow work: find → confirm → approve → repair → publish → verify.

Swarit

# Threat Model

## Project Overview

CMRSync is a React 19 + Vite single-page marketing and product demo site for AI-assisted extraction of data from uploaded CMR waybill images. The production application is a small Express 5 server in `api-server.mjs` that serves the static frontend, accepts unauthenticated image uploads at `/api/free-scan`, forwards them to Anthropic for document extraction, and collects lead details through `/api/leads`.

Production scope for this scan assumes `NODE_ENV=production`, TLS is handled by the platform, and mockup/sandbox-only environments are not deployed. The practical production attack surface is the public SPA plus the Express API. Most `src/components/ui/*` files are shared presentational components with little direct security significance unless they render attacker-controlled data.

## Assets

- **Uploaded document images and extracted CMR data** — may contain names, addresses, signatures, vehicle plates, contact details, shipment details, and other business-sensitive logistics information.
- **Lead information** — company names, work emails, phone numbers, fleet-size metadata, and timestamps submitted through the results gate.
- **Anthropic API key and billable API usage** — compromise or abuse can create direct financial impact and service disruption.
- **Service availability** — the public demo endpoint can be abused to exhaust memory, CPU, or paid LLM quota.
- **Marketing site integrity** — users must receive the intended SPA and not unexpected third-party code or altered static assets.

## Trust Boundaries

- **Browser to Express API** — all client input is untrusted, including uploaded files and JSON lead submissions.
- **Express API to Anthropic API** — the backend sends user-provided document content to a third-party model using a secret API key and paid quota.
- **Public to protected business data boundary** — although the app currently has no real authenticated user model, any endpoint that exposes collected leads or uploaded-document-derived data still crosses a confidentiality boundary and must be intentionally protected.
- **Frontend local state to server enforcement boundary** — `localStorage` and client-side gating are advisory only and cannot enforce production security or billing rules.
- **Dev vs production boundary** — Vite dev-server behavior and purely local UI state should not be treated as production protections.

## Scan Anchors

- **Production entry points:** `api-server.mjs`, `src/main.tsx`, `src/router.tsx`, `src/routes/index.tsx`, `index.html`
- **Highest-risk code areas:** `api-server.mjs`, `src/components/landing/CmrScanWidget.tsx`, `src/components/landing/CmrResultModal.tsx`
- **Public surfaces:** `/api/free-scan`, `/api/leads`, all SPA routes under `src/routes/`
- **Usually ignore unless reachability changes:** generated router output (`src/routeTree.gen.ts`), static assets in `public/`, generic presentational components under `src/components/ui/`

## Threat Categories

### Tampering

The application accepts untrusted multipart uploads and JSON lead submissions from the public internet. The server must validate file type, size, and structure conservatively, and any business rule that limits usage of the free scan feature must be enforced server-side rather than in `localStorage` or other client-controlled state.

### Information Disclosure

Uploaded document content and submitted lead details are sensitive business and personal data. Public endpoints, logs, and error responses must not expose this data to unauthorized callers, and lead-export or debug endpoints must not be left open on the public internet.

### Denial of Service

`/api/free-scan` is a public, unauthenticated endpoint that performs memory-heavy upload handling and triggers paid third-party processing. The system must bound request volume, concurrency, body sizes, and upstream usage so one attacker cannot exhaust server resources or run up external API costs.

### Spoofing

This project currently lacks user authentication, so it should not trust origin claims, client-side unlock state, or caller identity inferred only from request headers. If IP-based limits are used, they must account for reverse-proxy behavior and spoofable forwarding headers.

### Repudiation

Because the app collects leads and may eventually process customer documents, operational logs should be sufficient to investigate abuse without unnecessarily retaining raw personal data. Logging must balance accountability with data minimization; logs should not become an unprotected copy of collected leads.

# EventsPlatform — Frontend

Angular client for **EventsPlatform** — an events/news platform (think of it as a lightweight blog for event announcements). Talks to the EventsPlatform backend (ASP.NET Core, Clean Architecture) over a REST API.

## What it does

- Browse published events without logging in — search by name, paginated.
- Open a single event to see its full description, date, and author.
- Register / log in (JWT-based auth).
- View and edit your own profile.
- Manage your own events: create a draft, edit it, upload a picture, publish/unpublish, delete.
- "My Events" page lists both drafts and published events, with publish/unpublish/delete actions inline.

## Stack

- **Angular 22**, standalone components, [Signals](https://angular.dev/guide/signals) for state — the app runs without `zone.js`, so any state that drives a template has to be a signal for change detection to pick it up.
- **Server-side rendering** (`@angular/ssr`). Public pages (event list, event detail) render on the server; pages that need `localStorage` (profile, my events, create/edit forms) render client-only (`RenderMode.Client`), since SSR has no access to browser storage.
- **Reactive Forms** for every form (login, register, profile, event create/edit).
- Auth via a JWT stored in `localStorage`, attached to outgoing requests through an `HttpInterceptorFn`, with a `CanActivateFn` guard protecting private routes.

## Project structure

```
src/app/
  models/       — TypeScript interfaces matching the backend's request/response DTOs
  services/     — HTTP calls (auth, events, profile, file upload)
  guards/       — route guards
  interceptors/ — HTTP interceptors
  login/, register/, profile/ — auth & account pages
  events/
    event-list/   — public list, search + pagination
    event-detail/ — single event page
    my-events/    — the current user's own events (drafts + published)
    event-form/   — shared create/edit form
  shared/components/nav-bar/ — app-wide navigation
```

## Running locally

Needs the EventsPlatform backend running on `http://localhost:5056` — requests to `/api` and `/uploads` are proxied there in dev mode (see `proxy.conf.json`).

```bash
npm install
npm start
```

Opens on `http://localhost:4200`.

### Tests

```bash
npm test
```

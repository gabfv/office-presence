# office-presence

## Description

Simple web app to display the presence of people in the office.

## Features

### Currently planned

- [ ] Display the presence of people in the office
- [ ] Add an usual workday
- [ ] Add an unusual workday for the current week (with allowing to select which usual workday to override, if any)
- [ ] Create a team
- [ ] Set default team if belonging to multiple teams
- [ ] Select a team to display the presence of people in the office for that team if belonging to multiple teams
- [ ] Edit a team
- [ ] Delete a team
- [ ] Add a person to a team (send an email to the person to invite them to the app if they are not already registered)
- [ ] Remove a person from a team
- [ ] Manage team leaders (add/remove; only team leaders can add/remove people from their team)
- [ ] Add translation support
- [ ] Add a language selector
- [ ] Delete user account
- [ ] Add light mode support (dark mode by default)

### Future Features

- [ ] TBD

## Tech Stack

Nuxt 3 using Supabase as a backend + Vercel for hosting.

## Environment Variables

- `ACCEPTED_EMAIL_DOMAINS_CSV` : Comma-separated list of accepted email domains
- `CORS_ORIGIN` : Origin to allow CORS requests from (your own domain or Vercel's assigned domain to your app)

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

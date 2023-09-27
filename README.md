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

### Future Features
- [ ] Add light mode support (dark mode by default)

## Tech Stack

Vue 3 in Vite using Supabase as a backend + Vercel for hosting.

## Environment Variables

### Possibly Required for Vercel (if not using Vercel's built-in Supabase integration)

- `VITE_SUPABASE_URL` : URL of your Supabase project
- `VITE_SUPABASE_ANON_KEY` : Anon key of your Supabase project

### Required for Supabase edge functions

- `ACCEPTED_EMAIL_DOMAINS_CSV` : Comma-separated list of accepted email domains
- `CORS_ORIGIN` : Origin to allow CORS requests from (your own domain or Vercel's assigned domain to your app)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

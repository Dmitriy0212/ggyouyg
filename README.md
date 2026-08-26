# TravelTrucks

Frontend for the TravelTrucks camper rental service, built with Next.js, TypeScript and TanStack Query.

## Features

- Home page with CTA
- Camper catalog
- Backend filtering by location, body type, engine and transmission
- `useInfiniteQuery` pagination with 4 campers per request
- Camper details with gallery and reviews
- Five-star review display
- Booking form with success/error notifications
- Details pages open in a new browser tab

## Run locally

```bash
npm install
npm run dev
```

The default API is `https://campers-api.goit.study`. To override it, create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://campers-api.goit.study
```

## Build

```bash
npm run build
npm start
```

## Deployment

The project is ready for deployment to Vercel or Netlify.

## Author

Dmitriy — GitHub: https://github.com/Dmitriy0212

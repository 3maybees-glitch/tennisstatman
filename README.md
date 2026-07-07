# TennisStatMan

A fan-inspired professional tennis analytics website covering **ATP** and **WTA** tours with innovative stats beyond the traditional box score.

## Vision

TennisStatMan aims to surface the invisible forces in tennis — momentum swings, clutch performance under pressure, mental resilience, and external factors like weather and court conditions.

## Features (Current)

- **Homepage** with hero, featured match analysis, and live rankings snapshot
- **Official Rankings page** (`/rankings`) with ATP + WTA singles tables
- **API routes** at `/api/rankings/atp` and `/api/rankings/wta`
- **ATP & WTA tour pages** with top-20 live rankings
- **Stats Lab** showcasing current and upcoming innovative metrics
- **Momentum Swing Index** — interactive preview tracking win-probability shifts game-by-game

Rankings refresh hourly from official tour sources, with Tennis API (RapidAPI) as a fallback and primary ATP source when configured:
- **WTA**: parsed from the official rankings page at `wtatennis.com`
- **ATP**: Tennis API when `RAPIDAPI_KEY` is set, otherwise the official ATP rankings API
- **Free tier note**: Tennis API responses are cached for 24 hours (50 requests/day limit). No live endpoints are used.

### Tennis API setup (optional, free tier)

1. Subscribe to [Tennis API on RapidAPI](https://rapidapi.com/jjrm365-kIFr3Nx_odV/api/tennis-api-atp-wta-itf)
2. Copy `.env.example` to `.env.local` and add your key:

```bash
RAPIDAPI_KEY=your_key_here
```

3. Available adapter routes (non-live, free-tier friendly):
   - `GET /api/tennis/rankings/atp` or `/wta`
   - `GET /api/tennis/player/atp/{playerId}`
   - `GET /api/tennis/h2h/atp/{player1Id}/{player2Id}`
   - `GET /api/tennis/fixtures/atp?date=YYYY-MM-DD`
   - `GET /api/tennis/fixtures/atp?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

## Upcoming Metrics

- Clutch Factor Score
- Mental Resilience Map
- External Factor Index (heat, wind, court speed)
- Serve Momentum Chain
- Crowd Influence Delta

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) for data visualization
- [Framer Motion](https://www.framer.com/motion/) for animations

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deploy

Deploy easily on [Vercel](https://vercel.com):

```bash
npm run build
```

## License

Private project — [3maybees-glitch/tennisstatman](https://github.com/3maybees-glitch/tennisstatman)

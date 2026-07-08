export const TENNIS_API_BASE_URL =
  "https://tennis-api-atp-wta-itf.p.rapidapi.com";

export const TENNIS_API_HOST = "tennis-api-atp-wta-itf.p.rapidapi.com";

/** Default: refresh once per week (free tier is very limited). Override via env. */
export const TENNIS_API_REVALIDATE_SECONDS = (() => {
  const fromEnv = Number(process.env.TENNIS_API_REVALIDATE_SECONDS);
  if (fromEnv > 0) return fromEnv;
  return 60 * 60 * 24 * 7;
})();

export const TENNIS_API_CACHE_CONTROL = `public, s-maxage=${TENNIS_API_REVALIDATE_SECONDS}, stale-while-revalidate=${TENNIS_API_REVALIDATE_SECONDS}`;

export const TENNIS_API_DOCS_URL = "https://docs.tennis-api.com/";

export const TENNIS_API_RAPIDAPI_URL =
  "https://rapidapi.com/jjrm365-kIFr3Nx_odV/api/tennis-api-atp-wta-itf";

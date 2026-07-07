export const RANKINGS_REVALIDATE_SECONDS = 60 * 60 * 24;

export const RANKINGS_TOP_COUNT = 100;

export const OFFICIAL_SOURCES = {
  ATP: {
    page: "https://www.atptour.com/en/rankings/singles",
    api: "https://www.atptour.com/-/api/rankings/singles?rankRange=0-499",
  },
  WTA: {
    page: "https://www.wtatennis.com/rankings/singles",
    api: "https://api.wtatennis.com",
  },
} as const;

export const DEFAULT_BROWSER_HEADERS = {
  Accept: "application/json, text/html, */*",
  "Accept-Language": "en-US,en;q=0.9",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
};

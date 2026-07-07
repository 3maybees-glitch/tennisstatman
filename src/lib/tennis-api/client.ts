import {
  TENNIS_API_BASE_URL,
  TENNIS_API_HOST,
  TENNIS_API_REVALIDATE_SECONDS,
} from "./constants";

export class TennisApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "TennisApiError";
    this.status = status;
  }
}

export function isTennisApiConfigured(): boolean {
  return Boolean(process.env.RAPIDAPI_KEY?.trim());
}

type RequestOptions = {
  params?: Record<string, string | number | boolean | undefined>;
  revalidate?: number;
};

export async function tennisApiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const apiKey = process.env.RAPIDAPI_KEY?.trim();

  if (!apiKey) {
    throw new TennisApiError(
      "RAPIDAPI_KEY is not configured. Subscribe at RapidAPI and add your key to .env.local.",
    );
  }

  const url = new URL(`${TENNIS_API_BASE_URL}${path}`);

  if (options.params) {
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": TENNIS_API_HOST,
      Accept: "application/json",
    },
    next: {
      revalidate: options.revalidate ?? TENNIS_API_REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    let detail = "";
    try {
      detail = await response.text();
    } catch {
      detail = "";
    }

    throw new TennisApiError(
      `Tennis API request failed (${response.status}) for ${path}${detail ? `: ${detail.slice(0, 200)}` : ""}`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

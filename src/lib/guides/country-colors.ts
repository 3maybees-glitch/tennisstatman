/** Accent colors for stylized player art by country code. */
export const COUNTRY_COLORS: Record<string, { primary: string; secondary: string }> = {
  ARG: { primary: "#74ACDF", secondary: "#FFFFFF" },
  AUS: { primary: "#FFCD00", secondary: "#00843D" },
  BEL: { primary: "#FDDA24", secondary: "#EF3340" },
  BLR: { primary: "#CE1126", secondary: "#007C30" },
  BRA: { primary: "#009C3B", secondary: "#FFDF00" },
  BUL: { primary: "#00966E", secondary: "#D62612" },
  CAN: { primary: "#FF0000", secondary: "#FFFFFF" },
  CHI: { primary: "#0039A6", secondary: "#D52B1E" },
  CHN: { primary: "#DE2910", secondary: "#FFDE00" },
  CRO: { primary: "#171796", secondary: "#FF0000" },
  CZE: { primary: "#11457E", secondary: "#D7141A" },
  DEN: { primary: "#C8102E", secondary: "#FFFFFF" },
  ESP: { primary: "#AA151B", secondary: "#F1BF00" },
  FRA: { primary: "#002395", secondary: "#ED2939" },
  GBR: { primary: "#012169", secondary: "#C8102E" },
  GER: { primary: "#DD0000", secondary: "#FFCE00" },
  GRE: { primary: "#0D5EAF", secondary: "#FFFFFF" },
  ITA: { primary: "#009246", secondary: "#CE2B37" },
  JPN: { primary: "#BC002D", secondary: "#FFFFFF" },
  KAZ: { primary: "#00AFCA", secondary: "#FEC50C" },
  LAT: { primary: "#9E3039", secondary: "#FFFFFF" },
  NED: { primary: "#21468B", secondary: "#AE1C28" },
  NOR: { primary: "#BA0C2F", secondary: "#00205B" },
  NZL: { primary: "#00247D", secondary: "#CC142B" },
  POL: { primary: "#DC143C", secondary: "#FFFFFF" },
  POR: { primary: "#006600", secondary: "#FF0000" },
  ROU: { primary: "#002B7F", secondary: "#CE1126" },
  RUS: { primary: "#0039A6", secondary: "#D52B1E" },
  SRB: { primary: "#C6363C", secondary: "#0C4076" },
  SUI: { primary: "#FF0000", secondary: "#FFFFFF" },
  UKR: { primary: "#0057B7", secondary: "#FFD700" },
  USA: { primary: "#3C3B6E", secondary: "#B22234" },
};

export function getCountryColors(code: string): {
  primary: string;
  secondary: string;
} {
  return COUNTRY_COLORS[code] ?? { primary: "#D4AF37", secondary: "#40916C" };
}

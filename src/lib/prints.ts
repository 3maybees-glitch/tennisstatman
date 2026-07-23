export type PrintTour = "ATP" | "WTA";

export type PrintSlam =
  | "australian-open"
  | "wimbledon"
  | "french-open"
  | "us-open";

export type PrintProduct = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  slam: PrintSlam;
  tour: PrintTour;
  tourLabel: string;
  imageSrc: string;
  imageAlt: string;
  etsyUrl: string;
};

export const PRINT_PRODUCTS: PrintProduct[] = [
  {
    id: "australian-open-mens-legend-land",
    title: "Australian Open Men's Legend Land",
    subtitle: "Melbourne Park · Men's Singles",
    description:
      "The Happy Slam as fantasy Legend Land — Rod Laver Arena, dynasty peaks, and the champions who owned summer in Melbourne.",
    slam: "australian-open",
    tour: "ATP",
    tourLabel: "Men's Singles",
    imageSrc: "/prints/australian-open-mens-legend-land.jpg",
    imageAlt: "Australian Open Men's Legend Land map print",
    etsyUrl:
      "https://www.etsy.com/listing/4542519943/mens-australian-open-legend-land-fantasy",
  },
  {
    id: "australian-open-womens-legend-land",
    title: "Australian Open Women's Legend Land",
    subtitle: "Melbourne Park · Women's Singles",
    description:
      "Women's Happy Slam history mapped in Legend Land style — Court, Serena, Graf, Barty, Sabalenka, and the landmarks between them.",
    slam: "australian-open",
    tour: "WTA",
    tourLabel: "Women's Singles",
    imageSrc: "/prints/australian-open-womens-legend-land.jpg",
    imageAlt: "Australian Open Women's Legend Land map print",
    etsyUrl:
      "https://www.etsy.com/listing/4542536394/womens-australian-open-legend-land",
  },
  {
    id: "wimbledon-mens-legend-land",
    title: "Wimbledon Men's Legend Land",
    subtitle: "The Championships · Men's Singles",
    description:
      "Every gentleman who lifted the singles trophy, mapped into one championship story. A wall print for fans who live the fortnight all year.",
    slam: "wimbledon",
    tour: "ATP",
    tourLabel: "Gentlemen's Singles",
    imageSrc: "/prints/wimbledon-mens-legend-land.png",
    imageAlt: "Wimbledon Men's Championship Legend Land map print on a desk",
    etsyUrl:
      "https://www.etsy.com/listing/4530542997/wimbledon-mens-championship-legend-land",
  },
  {
    id: "wimbledon-womens-legend-land",
    title: "Wimbledon Women's Legend Land",
    subtitle: "The Championships · Women's Singles",
    description:
      "The ladies who wrote Centre Court history, charted as a legend map. Hang the championship lineage where you can see it every day.",
    slam: "wimbledon",
    tour: "WTA",
    tourLabel: "Ladies' Singles",
    imageSrc: "/prints/wimbledon-womens-legend-land.png",
    imageAlt: "Wimbledon Women's Championship Legend Land map print on a desk",
    etsyUrl:
      "https://www.etsy.com/listing/4530751760/wimbledon-womens-championship-legend",
  },
  {
    id: "french-open-mens-legend-land",
    title: "French Open Men's Legend Land",
    subtitle: "Roland-Garros · Men's Singles",
    description:
      "Clay-court kings mapped across a Paris championship landscape. The gentlemen's Roland-Garros story, ready for your wall.",
    slam: "french-open",
    tour: "ATP",
    tourLabel: "Men's Singles",
    imageSrc: "/prints/french-open-mens-legend-land.jpg",
    imageAlt: "French Open Men's Legend Land map print",
    etsyUrl:
      "https://www.etsy.com/listing/4541091213/french-open-mens-legend-land-map",
  },
  {
    id: "french-open-womens-legend-land",
    title: "French Open Women's Legend Land",
    subtitle: "Roland-Garros · Women's Singles",
    description:
      "The queens of clay, charted as fantasy Legend Land art. A printable hall of fame for every Roland-Garros fan.",
    slam: "french-open",
    tour: "WTA",
    tourLabel: "Women's Singles",
    imageSrc: "/prints/french-open-womens-legend-land.jpg",
    imageAlt: "French Open Women's Legend Land map print",
    etsyUrl:
      "https://www.etsy.com/listing/4541115001/french-open-womens-legend-land-map",
  },
  {
    id: "us-open-mens-legend-land",
    title: "US Open Men's Legend Land",
    subtitle: "Flushing Meadows · Men's Singles",
    description:
      "New York Grand Slam history as a fantasy map — the gentlemen who owned hard courts under the lights.",
    slam: "us-open",
    tour: "ATP",
    tourLabel: "Men's Singles",
    imageSrc: "/prints/us-open-mens-legend-land.jpg",
    imageAlt: "US Open Men's Legend Land map print",
    etsyUrl:
      "https://www.etsy.com/listing/4541129069/mens-us-open-legend-land-map-guidebook",
  },
  {
    id: "us-open-womens-legend-land",
    title: "US Open Women's Legend Land",
    subtitle: "Flushing Meadows · Women's Singles",
    description:
      "Women's tennis history at the US Open, mapped in Legend Land style. A printable hall of fame for New York nights.",
    slam: "us-open",
    tour: "WTA",
    tourLabel: "Women's Singles",
    imageSrc: "/prints/us-open-womens-legend-land.jpg",
    imageAlt: "US Open Women's Legend Land map print",
    etsyUrl:
      "https://www.etsy.com/listing/4541144836/womens-us-open-tennis-legend-land-map",
  },
];

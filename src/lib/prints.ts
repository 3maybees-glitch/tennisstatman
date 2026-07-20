export type PrintTour = "ATP" | "WTA";

export type PrintProduct = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tour: PrintTour;
  tourLabel: string;
  imageSrc: string;
  imageAlt: string;
  etsyUrl: string;
};

export const PRINT_PRODUCTS: PrintProduct[] = [
  {
    id: "wimbledon-mens-legend-land",
    title: "Gentlemen's Championship Legend Land",
    subtitle: "Wimbledon · Men's Singles",
    description:
      "Every gentleman who lifted the singles trophy, mapped into one championship story. A wall print for fans who live the fortnight all year.",
    tour: "ATP",
    tourLabel: "Gentlemen's Singles",
    imageSrc: "/prints/wimbledon-mens-legend-land.svg",
    imageAlt:
      "Wimbledon Men's Championship Legend Land map print preview",
    etsyUrl:
      "https://www.etsy.com/listing/4530542997/wimbledon-mens-championship-legend-land",
  },
  {
    id: "wimbledon-womens-legend-land",
    title: "Ladies' Championship Legend Land",
    subtitle: "Wimbledon · Women's Singles",
    description:
      "The ladies who wrote Centre Court history, charted as a legend map. Hang the championship lineage where you can see it every day.",
    tour: "WTA",
    tourLabel: "Ladies' Singles",
    imageSrc: "/prints/wimbledon-womens-legend-land.svg",
    imageAlt:
      "Wimbledon Women's Championship Legend Land map print preview",
    etsyUrl:
      "https://www.etsy.com/listing/4530751760/wimbledon-womens-championship-legend",
  },
];

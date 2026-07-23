import { X_PROFILE_URL } from "@/lib/social";
import { absoluteUrl } from "./site";

export type FaqItem = {
  question: string;
  answer: string;
};

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TennisStatMan",
    url: absoluteUrl("/"),
    description:
      "Next-generation ATP and WTA tennis analytics with player cards, PULSE form scores, legend comparisons, and a full tournament calendar.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/players")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TennisStatMan",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/opengraph-image"),
    description:
      "Fan-inspired professional tennis analytics covering ATP and WTA tours.",
    sameAs: [X_PROFILE_URL],
  };
}

export function definedTermJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name,
    description,
    url,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "TennisStatMan Stats Lab Metrics",
      url: absoluteUrl("/stats"),
    },
  };
}

export function personJsonLd(player: {
  id: string;
  name: string;
  countryName: string;
  tour: "ATP" | "WTA";
  rank: number;
  verdict: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: player.name,
    nationality: player.countryName,
    description: player.verdict,
    url: absoluteUrl(`/players/${player.id}`),
    jobTitle: "Professional Tennis Player",
    memberOf: {
      "@type": "SportsOrganization",
      name: player.tour,
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Official Tour Rank",
      value: player.rank,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "TennisStatMan Courtside Membership",
    description:
      "Premium tennis analytics membership with unlimited legend comparisons, PULSE archives, skill leaderboards, and ITF-level scouting.",
    brand: {
      "@type": "Brand",
      name: "TennisStatMan",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Fan",
        price: "0",
        priceCurrency: "USD",
        description: "Free tier with player cards, rankings, calendar, and 3 daily legend comparisons.",
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/pricing"),
      },
      {
        "@type": "Offer",
        name: "Courtside",
        price: "6",
        priceCurrency: "USD",
        description: "Monthly membership with unlimited comparisons, PULSE archives, and skill leaderboards.",
        availability: "https://schema.org/PreOrder",
        url: absoluteUrl("/pricing"),
      },
    ],
  };
}

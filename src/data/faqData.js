/**
 * faqData.js Single source of truth for all FAQ data
 * AlphaWaves brand system
 *
 * Structural metadata only. Localised question/answer strings
 * are injected at render time via useTranslatedFAQs().
 *
 * When Directus is ready, replace FAQS_META with a fetch from:
 * https://your-directus.com/items/faqs?filter[status]=published&sort=display_order
 */

import { useTranslation } from "react-i18next";

export const FAQS_META = [
  { id: 1,  category: "services", status: "published", display_order: 1, is_featured: true  },
  { id: 2,  category: "services", status: "published", display_order: 2, is_featured: false },
  { id: 3,  category: "services", status: "published", display_order: 3, is_featured: false },
  { id: 4,  category: "services", status: "published", display_order: 4, is_featured: true  },
  { id: 5,  category: "services", status: "published", display_order: 5, is_featured: false },
  { id: 6,  category: "pricing",  status: "published", display_order: 1, is_featured: true  },
  { id: 7,  category: "pricing",  status: "published", display_order: 2, is_featured: false },
  { id: 8,  category: "pricing",  status: "published", display_order: 3, is_featured: false },
  { id: 9,  category: "pricing",  status: "published", display_order: 4, is_featured: true  },
  { id: 10, category: "process",  status: "published", display_order: 1, is_featured: false },
  { id: 11, category: "process",  status: "published", display_order: 2, is_featured: true  },
  { id: 12, category: "process",  status: "published", display_order: 3, is_featured: false },
  { id: 13, category: "process",  status: "published", display_order: 4, is_featured: false },
  { id: 14, category: "tech",     status: "published", display_order: 1, is_featured: false },
  { id: 15, category: "tech",     status: "published", display_order: 2, is_featured: false },
  { id: 16, category: "tech",     status: "published", display_order: 3, is_featured: true  },
  { id: 17, category: "africa",   status: "published", display_order: 1, is_featured: true  },
  { id: 18, category: "africa",   status: "published", display_order: 2, is_featured: false },
  { id: 19, category: "africa",   status: "published", display_order: 3, is_featured: false },
  { id: 20, category: "support",  status: "published", display_order: 1, is_featured: false },
  { id: 21, category: "support",  status: "published", display_order: 2, is_featured: false },
  { id: 22, category: "support",  status: "published", display_order: 3, is_featured: false },
];

// Map id → i18n key all prefixed with FAQPage. to match en.json / fr.json structure
const ID_TO_KEY = {
  1:  "FAQPage.faqs.services.q1",
  2:  "FAQPage.faqs.services.q2",
  3:  "FAQPage.faqs.services.q3",
  4:  "FAQPage.faqs.services.q4",
  5:  "FAQPage.faqs.services.q5",
  6:  "FAQPage.faqs.pricing.q6",
  7:  "FAQPage.faqs.pricing.q7",
  8:  "FAQPage.faqs.pricing.q8",
  9:  "FAQPage.faqs.pricing.q9",
  10: "FAQPage.faqs.process.q10",
  11: "FAQPage.faqs.process.q11",
  12: "FAQPage.faqs.process.q12",
  13: "FAQPage.faqs.process.q13",
  14: "FAQPage.faqs.tech.q14",
  15: "FAQPage.faqs.tech.q15",
  16: "FAQPage.faqs.tech.q16",
  17: "FAQPage.faqs.africa.q17",
  18: "FAQPage.faqs.africa.q18",
  19: "FAQPage.faqs.africa.q19",
  20: "FAQPage.faqs.support.q20",
  21: "FAQPage.faqs.support.q21",
  22: "FAQPage.faqs.support.q22",
};

/**
 * useTranslatedFAQs returns FAQS_META with localised question + answer
 * injected from the active i18n language.
 *
 * Usage:
 *   import { useTranslatedFAQs } from "../../data/faqData.js";
 *   const FAQS = useTranslatedFAQs();
 */
export const useTranslatedFAQs = () => {
  const { t } = useTranslation(); // no namespace uses default "translation"
  return FAQS_META.map((item) => ({
    ...item,
    question: t(`${ID_TO_KEY[item.id]}.question`),
    answer:   t(`${ID_TO_KEY[item.id]}.answer`),
  }));
};

/**
 * FAQS legacy export used only by FAQSchema (Google rich snippets).
 * Stays in English intentionally for SEO consistency.
 * Do not use this in any rendered component.
 */
export const FAQS = FAQS_META.map((item) => ({
  ...item,
  question: "",
  answer:   "",
}));
/**
 * portfolioData.js — Single source of truth for Portfolio page
 * AlphaWaves brand system
 *
 * When Directus is ready, replace each array with:
 * fetch("https://your-directus.com/items/portfolio?filter[status]=published&sort=display_order")
 */

export const PROJECTS = [
  { id: 1, slug: "ecommerce-fashion-retailer",    industry_category: "ecommerce",   project_type: "web",    featured: true,  status: "published", display_order: 1, client_confidential: false },
  { id: 2, slug: "agricultural-marketplace",      industry_category: "agriculture", project_type: "mobile", featured: false, status: "published", display_order: 2, client_confidential: false },
  { id: 3, slug: "healthcare-appointment-system", industry_category: "healthcare",  project_type: "web",    featured: false, status: "published", display_order: 3, client_confidential: false },
  { id: 4, slug: "fintech-lending-platform",      industry_category: "finance",     project_type: "ai",     featured: true,  status: "published", display_order: 4, client_confidential: false },
  { id: 5, slug: "hotel-booking-system",          industry_category: "hospitality", project_type: "web",    featured: false, status: "published", display_order: 5, client_confidential: false },
  { id: 6, slug: "education-lms-platform",        industry_category: "education",   project_type: "web",    featured: false, status: "published", display_order: 6, client_confidential: false },
];

export const CATEGORIES = [
  { id: "all"         },
  { id: "ecommerce"   },
  { id: "finance"     },
  { id: "agriculture" },
  { id: "healthcare"  },
  { id: "education"   },
  { id: "hospitality" },
];

export const SERVICE_FILTERS = [
  { id: "all"    },
  { id: "web"    },
  { id: "mobile" },
  { id: "ai"     },
];

export const INDUSTRIES = [
  { id: 1, icon: "cart",      projects: 12 },
  { id: 2, icon: "finance",   projects: 8  },
  { id: 3, icon: "leaf",      projects: 6  },
  { id: 4, icon: "health",    projects: 5  },
  { id: 5, icon: "book",      projects: 4  },
  { id: 6, icon: "hotel",     projects: 7  },
  { id: 7, icon: "briefcase", projects: 9  },
  { id: 8, icon: "truck",     projects: 5  },
];

export const PORTFOLIO_STATS = [
  { id: 1, value: 50,  suffix: "+" },
  { id: 2, value: 8,   suffix: "+" },
  { id: 3, value: 10,  suffix: "+" },
  { id: 4, value: 98,  suffix: "%" },
];

export const IMPACT_METRICS = [
  { id: 1, value: 10,  suffix: "M+", prefix: "$" },
  { id: 2, value: 200, suffix: "K+", prefix: ""  },
  { id: 3, value: 500, suffix: "K+", prefix: ""  },
  { id: 4, value: 50,  suffix: "+",  prefix: ""  },
  { id: 5, value: 98,  suffix: "%",  prefix: ""  },
  { id: 6, value: 300, suffix: "%+", prefix: ""  },
];
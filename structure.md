alphawaves-website/
│
├── src/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── common/          ← Truly reusable (0 page-specific logic)
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Accordion.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Container.jsx
│   │   │   ├── SectionTitle.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── sections/        ← Page sections, reusable
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── ServiceGrid.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectGrid.jsx
│   │   │   ├── TeamSection.jsx
│   │   │   ├── TestimonialCard.jsx
│   │   │   ├── ProcessTimeline.jsx
│   │   │   ├── StatsSection.jsx
│   │   │   ├── FAQAccordion.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── forms/
│   │   │   ├── ContactForm.jsx
│   │   │   ├── SearchForm.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── features/        ← Complex, interactive components
│   │   │   ├── ProjectCarousel.jsx
│   │   │   ├── ServiceFilter.jsx
│   │   │   ├── ImageGallery.jsx
│   │   │   ├── InteractiveMap.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── middleware/      ← NEW
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── ErrorFallback.jsx
│   │   │   ├── LoadingFallback.jsx
│   │   │   └── index.js
│   │   │
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/               ← ONLY top-level page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── ServiceDetail.jsx
│   │   ├── Portfolio.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── Contact.jsx
│   │   ├── FAQ.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── Terms.jsx
│   │   └── NotFound.jsx
│   │
│   ├── hooks/
│   │   ├── useProjects.js
│   │   ├── useServices.js
│   │   ├── useTeam.js
│   │   ├── useFetch.js      ← NEW: Generic fetch hook
│   │   ├── useLocalStorage.js ← NEW
│   │   ├── useMediaQuery.js ← NEW
│   │   ├── useContactForm.js
│   │   └── index.js
│   │
│   ├── context/
│   │   ├── AppContext.jsx
│   │   ├── DirectusContext.jsx
│   │   ├── NotificationContext.jsx ← NEW
│   │   └── index.js
│   │
│   ├── services/            ← Enhanced
│   │   ├── directus/
│   │   │   ├── client.js    ← SDK config
│   │   │   ├── collections/
│   │   │   │   ├── projects.js
│   │   │   │   ├── services.js
│   │   │   │   ├── team.js
│   │   │   │   ├── testimonials.js
│   │   │   │   ├── faq.js
│   │   │   │   ├── leads.js
│   │   │   │   └── index.js
│   │   │   ├── queries.js
│   │   │   └── utils.js
│   │   │
│   │   ├── email.js
│   │   ├── analytics.js
│   │   ├── seo.js
│   │   └── index.js
│   │
│   ├── lib/
│   │   └── directusClient.js
│   │
│   ├── config/              ← NEW: Centralized config
│   │   ├── env.js
│   │   ├── site.config.js
│   │   ├── seo.config.js
│   │   ├── directus.config.js
│   │   └── constants.js
│   │
│   ├── utils/               ← Enhanced
│   │   ├── helpers.js
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   ├── errorHandler.js  ← NEW
│   │   ├── cache.js         ← NEW
│   │   ├── imageOptimization.js ← NEW
│   │   └── index.js
│   │
│   ├── types/               ← NEW: JSDoc types
│   │   ├── project.types.js
│   │   ├── service.types.js
│   │   └── common.types.js
│   │
│   ├── router/              ← NEW: Dedicated router folder
│   │   ├── routes.jsx
│   │   └── routeConfig.js
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   ├── tailwind.css
│   │   └── animations.css
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── videos/
│   │   └── fonts/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── __tests__/               ← NEW: Test mirror structure
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   └── setup.js
│
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── manifest.json
│   └── sitemap.xml
│
├── .env.example
├── .env.local
├── .gitignore
├── .prettierrc
├── .eslintrc.cjs
├── package.json
├── pnpm-lock.yaml           ← Use pnpm instead of npm
├── vite.config.js
├── vitest.config.js         ← NEW: Testing
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── README.md
└── docs/
    ├── ARCHITECTURE.md      ← NEW
    ├── API_INTEGRATION.md   ← NEW
    ├── CONTRIBUTING.md
    ├── DEPLOYMENT.md
    └── content/
        ├── HOMEPAGE.md
        ├── SERVICES.md
        └── PORTFOLIO.md
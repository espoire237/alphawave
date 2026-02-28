/**
 * faqData.js — Single source of truth for all FAQ data
 * AlphaWaves brand system
 *
 * Structured exactly like the Directus FAQs collection.
 * When Directus is ready, replace this array with:
 *
 * export const FAQS = await fetch(
 *   "https://your-directus.com/items/faqs?filter[status]=published&sort=display_order"
 * ).then(r => r.json()).then(r => r.data);
 */

export const FAQS = [
  // ── Services & Solutions ──────────────────────────────────
  {
    id:            1,
    question:      "What services does AlphaWaves offer?",
    answer:        "We offer five core service areas: Custom Software Development, AI & Business Intelligence, Digital Marketing & SEO, Cloud & DevOps Infrastructure, and Mobile-First Solutions. Each service is designed to solve specific business challenges end-to-end — from strategy to deployment.",
    category:      "services",
    status:        "published",
    display_order: 1,
    is_featured:   true,
  },
  {
    id:            2,
    question:      "Can you handle our entire project from start to finish?",
    answer:        "Yes. AlphaWaves is a full-service technology company. Our multidisciplinary team handles strategy, design, development, AI integration, deployment, and post-launch optimization under one roof — no vendor coordination chaos.",
    category:      "services",
    status:        "published",
    display_order: 2,
    is_featured:   false,
  },
  {
    id:            3,
    question:      "Do you build mobile apps?",
    answer:        "Absolutely. We specialize in mobile-first development for iOS and Android. Our solutions are optimized for varying connectivity conditions and device capabilities across African markets.",
    category:      "services",
    status:        "published",
    display_order: 3,
    is_featured:   false,
  },
  {
    id:            4,
    question:      "Can you integrate mobile money payments (MTN MoMo, Orange Money, Airtel Money)?",
    answer:        "Yes — this is one of our core strengths. We architect unified payment infrastructures that seamlessly handle MTN MoMo, Orange Money, Airtel Money, and international gateways like Stripe in a single solution.",
    category:      "services",
    status:        "published",
    display_order: 4,
    is_featured:   true,
  },
  {
    id:            5,
    question:      "Do you offer AI solutions for small businesses?",
    answer:        "Yes. We don't retrofit AI onto existing systems — we architect intelligence from the ground up. Our AI solutions range from executive analytics dashboards and predictive models to intelligent automation workflows, all scaled to your budget and stage of growth.",
    category:      "services",
    status:        "published",
    display_order: 5,
    is_featured:   false,
  },

  // ── Pricing & Budgets ─────────────────────────────────────
  {
    id:            6,
    question:      "How much does a project cost?",
    answer:        "Every project is unique. Our solutions start from $500 for simple web projects up to enterprise-level builds. We follow a modular approach — you can start with core functionality and scale as your business grows. Share your requirements and we'll give you a transparent, no-surprise quote.",
    category:      "pricing",
    status:        "published",
    display_order: 1,
    is_featured:   true,
  },
  {
    id:            7,
    question:      "Are there hidden costs?",
    answer:        "No. We believe in transparent pricing. All costs are clearly documented before any work begins. If scope changes during the project, we discuss it openly and agree before proceeding.",
    category:      "pricing",
    status:        "published",
    display_order: 2,
    is_featured:   false,
  },
  {
    id:            8,
    question:      "Do you offer payment plans?",
    answer:        "Yes. We structure payment milestones tied to project delivery phases — typically a deposit upfront, then payments at key milestones. We'll agree on the structure during your free consultation.",
    category:      "pricing",
    status:        "published",
    display_order: 3,
    is_featured:   false,
  },
  {
    id:            9,
    question:      "Is the initial consultation really free?",
    answer:        "Yes, completely free and with no obligation. We'll discuss your project, assess your needs, and give you an honest recommendation — even if the answer is that you don't need us yet.",
    category:      "pricing",
    status:        "published",
    display_order: 4,
    is_featured:   true,
  },

  // ── Process & Timeline ────────────────────────────────────
  {
    id:            10,
    question:      "How does your process work?",
    answer:        "We follow a 5-step delivery process: Discovery → Strategy & Design → Agile Development → Launch & Deploy → Optimize & Scale. Every project starts with understanding your business goals and ends with measurable results.",
    category:      "process",
    status:        "published",
    display_order: 1,
    is_featured:   false,
  },
  {
    id:            11,
    question:      "How long does a project take?",
    answer:        "Timelines depend on complexity. A simple website takes 2–4 weeks. A mobile app or e-commerce platform typically takes 6–12 weeks. Enterprise-level systems can take 3–6 months. We'll give you a clear timeline during your free consultation.",
    category:      "process",
    status:        "published",
    display_order: 2,
    is_featured:   true,
  },
  {
    id:            12,
    question:      "Will I be involved during development?",
    answer:        "Absolutely. We use agile sprint-based delivery with regular client check-ins and feedback sessions. You'll always know exactly where your project stands.",
    category:      "process",
    status:        "published",
    display_order: 3,
    is_featured:   false,
  },
  {
    id:            13,
    question:      "What happens after my project launches?",
    answer:        "We provide post-launch support, performance monitoring, and continuous improvement. We're your long-term strategic technology partner — not a one-time vendor.",
    category:      "process",
    status:        "published",
    display_order: 4,
    is_featured:   false,
  },

  // ── Technology & Technical ────────────────────────────────
  {
    id:            14,
    question:      "What technologies do you use?",
    answer:        "Our stack includes React, Vue, Next.js (Frontend), Node.js, Python, PHP (Backend), React Native & Flutter (Mobile), PostgreSQL, MongoDB, MySQL (Databases), AWS, Azure, Google Cloud (Infrastructure), and TensorFlow, PyTorch, scikit-learn (AI/ML).",
    category:      "tech",
    status:        "published",
    display_order: 1,
    is_featured:   false,
  },
  {
    id:            15,
    question:      "Can you work with our existing systems?",
    answer:        "Yes. We regularly integrate with existing platforms, legacy systems, and third-party APIs. We'll assess your current infrastructure during the discovery phase.",
    category:      "tech",
    status:        "published",
    display_order: 2,
    is_featured:   false,
  },
  {
    id:            16,
    question:      "Will my solution work in areas with slow internet?",
    answer:        "Yes. We specialize in offline-first architecture and low-bandwidth optimization — critical for African markets. Our solutions are engineered to perform under real African infrastructure conditions.",
    category:      "tech",
    status:        "published",
    display_order: 3,
    is_featured:   true,
  },

  // ── African Market & Payments ─────────────────────────────
  {
    id:            17,
    question:      "Why choose an African tech company for an African market?",
    answer:        "International agencies import solutions that fail under African infrastructure conditions, payment ecosystems, and connectivity patterns. We engineer systems designed to thrive in these environments from day one. Our deep expertise in Cameroon — Africa's bilingual hub — gives us unmatched insight into both Francophone and Anglophone markets.",
    category:      "africa",
    status:        "published",
    display_order: 1,
    is_featured:   true,
  },
  {
    id:            18,
    question:      "Do you work with businesses outside Cameroon?",
    answer:        "Yes. We serve Cameroonian enterprises, pan-African organizations, and international companies entering African markets. We've built solutions that scale across Francophone and Anglophone Africa.",
    category:      "africa",
    status:        "published",
    display_order: 2,
    is_featured:   false,
  },
  {
    id:            19,
    question:      "Can you build bilingual (French/English) solutions?",
    answer:        "Absolutely. As a company based in Cameroon — Africa's bilingual hub — building bilingual digital solutions is second nature to us.",
    category:      "africa",
    status:        "published",
    display_order: 3,
    is_featured:   false,
  },

  // ── Support & After Launch ────────────────────────────────
  {
    id:            20,
    question:      "Do you offer ongoing support after launch?",
    answer:        "Yes. We offer post-launch support packages covering bug fixes, performance monitoring, feature updates, and strategic guidance as your business scales.",
    category:      "support",
    status:        "published",
    display_order: 1,
    is_featured:   false,
  },
  {
    id:            21,
    question:      "What if something breaks after launch?",
    answer:        "We stand behind our work. Critical issues are addressed as a priority. All projects include a post-launch warranty period during which bugs are fixed at no extra charge.",
    category:      "support",
    status:        "published",
    display_order: 2,
    is_featured:   false,
  },
  {
    id:            22,
    question:      "Can we add new features later?",
    answer:        "Yes — and we design for this from the start. Our modular approach means your solution can grow with your business. Adding features later is always seamless.",
    category:      "support",
    status:        "published",
    display_order: 3,
    is_featured:   false,
  },
];
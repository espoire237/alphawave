/**
 * portfolioData.js — Single source of truth for Portfolio page
 * AlphaWaves brand system
 *
 * When Directus is ready, replace each array with:
 * fetch("https://your-directus.com/items/portfolio?filter[status]=published&sort=display_order")
 */

export const PROJECTS = [
  {
    id: 1,
    slug: "ecommerce-fashion-retailer",
    industry_category: "ecommerce",
    project_type: "web",
    featured: true,
    status: "published",
    display_order: 1,
    client_confidential: false,
    client_name: "StyleHub Cameroon",
    project_name: "StyleHub E-Commerce Platform",
    short_description:
      "A full-featured online fashion retail platform built for the Central African market, with mobile money payments and real-time inventory management.",
    challenge_description:
      "StyleHub was operating entirely through WhatsApp and cash on delivery, losing customers due to no online presence, no payment automation, and zero inventory visibility.",
    solution_description:
      "We built a complete e-commerce platform with product catalogue, cart, checkout, MTN MoMo and Orange Money integration, an admin dashboard, and automated order notifications via SMS.",
    technologies: ["React.js", "Node.js", "MongoDB", "MTN MoMo", "Orange Money", "SMS Integration"],
    results: [
      { label: "Increase in monthly orders", value: "340%" },
      { label: "Revenue in first 6 months", value: "$120K" },
      { label: "Active customers", value: "2,400+" },
      { label: "Order processing time", value: "-80%" },
    ],
    testimonial: {
      quote: "AlphaWaves transformed our business completely. We went from managing orders on WhatsApp to running a professional platform our customers love.",
      author: "Marie Nguemo",
      title: "CEO",
      company: "StyleHub Cameroon",
      rating: 5,
      fr: {
        quote: "AlphaWaves a complètement transformé notre activité. Nous sommes passés de la gestion des commandes sur WhatsApp à une plateforme professionnelle que nos clients adorent.",
        title: "PDG",
      },
    },
  },
  {
    id: 2,
    slug: "agricultural-marketplace",
    industry_category: "agriculture",
    project_type: "mobile",
    featured: false,
    status: "published",
    display_order: 2,
    client_confidential: false,
    client_name: "AgroConnect Africa",
    project_name: "AgroConnect Marketplace",
    short_description:
      "A mobile marketplace connecting farmers directly to buyers across Cameroon, eliminating middlemen and increasing farmer income.",
    challenge_description:
      "Smallholder farmers had no way to reach buyers directly, were forced to sell through exploitative middlemen, and had no visibility into market prices.",
    solution_description:
      "We developed a React Native mobile app with real-time price listings, direct farmer-to-buyer messaging, mobile money payments, and GPS-based delivery coordination.",
    technologies: ["React Native", "Node.js", "PostgreSQL", "MTN MoMo", "Google Maps API"],
    results: [
      { label: "Farmers onboarded", value: "1,200+" },
      { label: "Increase in farmer income", value: "60%" },
      { label: "Transactions processed", value: "8,500+" },
      { label: "Avg. time to sell produce", value: "-3 days" },
    ],
    testimonial: null,
  },
  {
    id: 3,
    slug: "healthcare-appointment-system",
    industry_category: "healthcare",
    project_type: "web",
    featured: false,
    status: "published",
    display_order: 3,
    client_confidential: false,
    client_name: "MediCare Clinics",
    project_name: "MediCare Appointment System",
    short_description:
      "A digital appointment and patient management system for a network of private clinics, replacing paper-based records and phone bookings.",
    challenge_description:
      "MediCare was managing all appointments by phone and paper, leading to double bookings, lost patient records, and long wait times that were driving patients away.",
    solution_description:
      "We built a web-based platform allowing patients to book online, doctors to manage schedules, and administrators to track patient history, billing, and clinic performance in real time.",
    technologies: ["React.js", "Node.js", "PostgreSQL", "SMS Integration"],
    results: [
      { label: "Reduction in no-shows", value: "65%" },
      { label: "Appointments booked online", value: "900+" },
      { label: "Admin time saved per week", value: "20hrs" },
      { label: "Patient satisfaction score", value: "4.8/5" },
    ],
    testimonial: {
      quote: "Our staff used to spend hours on the phone. Now patients book themselves and we focus entirely on care.",
      author: "Dr. Paul Essomba",
      title: "Medical Director",
      company: "MediCare Clinics",
      rating: 5,
      fr: {
        quote: "Notre personnel passait des heures au téléphone. Maintenant les patients réservent eux-mêmes et nous nous concentrons entièrement sur les soins.",
        title: "Directeur Médical",
      },
    },
  },
  {
    id: 4,
    slug: "fintech-lending-platform",
    industry_category: "finance",
    project_type: "ai",
    featured: true,
    status: "published",
    display_order: 4,
    client_confidential: false,
    client_name: "QuickCredit Cameroon",
    project_name: "QuickCredit AI Lending Platform",
    short_description:
      "An AI-powered micro-lending platform that assesses creditworthiness without a credit history, using alternative data to serve the unbanked population.",
    challenge_description:
      "Millions of Cameroonians are excluded from formal credit because they have no credit history, no collateral, and no bank account — making traditional lending models completely unworkable.",
    solution_description:
      "We built an AI scoring engine that analyses mobile money transaction history, airtime usage, and behavioural patterns to assess credit risk, approve loans in minutes, and disburse directly via mobile money.",
    technologies: ["Python", "FastAPI", "React.js", "PostgreSQL", "MTN MoMo", "Orange Money", "AI/ML"],
    results: [
      { label: "Loans disbursed", value: "5,000+" },
      { label: "Average approval time", value: "4 mins" },
      { label: "Repayment rate", value: "91%" },
      { label: "Total value disbursed", value: "$2.1M" },
    ],
    testimonial: {
      quote: "This platform gave credit access to people our traditional system would have rejected. The AI model is genuinely impressive.",
      author: "Jean-Pierre Mballa",
      title: "Managing Director",
      company: "QuickCredit Cameroon",
      rating: 5,
      fr: {
        quote: "Cette plateforme a donné accès au crédit à des personnes que notre système traditionnel aurait rejetées. Le modèle d'IA est vraiment impressionnant.",
        title: "Directeur Général",
      },
    },
  },
  {
    id: 5,
    slug: "hotel-booking-system",
    industry_category: "hospitality",
    project_type: "web",
    featured: false,
    status: "published",
    display_order: 5,
    client_confidential: false,
    client_name: "Résidence Les Palmiers",
    project_name: "Les Palmiers Booking System",
    short_description:
      "A complete hotel management and online booking system for a boutique hotel group, with room management, guest profiles, and integrated payments.",
    challenge_description:
      "The hotel was taking all reservations by phone and WhatsApp, had no way to manage room availability in real time, and was losing bookings to hotels with online presence.",
    solution_description:
      "We delivered a full booking engine with real-time availability, automated confirmation emails and SMS, a front-desk management dashboard, and mobile money plus card payment support.",
    technologies: ["React.js", "Node.js", "MySQL", "Booking Engine API", "MTN MoMo", "Stripe"],
    results: [
      { label: "Online bookings in year 1", value: "1,800+" },
      { label: "Increase in occupancy rate", value: "42%" },
      { label: "Revenue growth year-on-year", value: "78%" },
      { label: "Overbooking incidents", value: "0" },
    ],
    testimonial: null,
  },
  {
    id: 6,
    slug: "education-lms-platform",
    industry_category: "education",
    project_type: "web",
    featured: false,
    status: "published",
    display_order: 6,
    client_confidential: false,
    client_name: "AcademiaPro",
    project_name: "AcademiaPro Learning Platform",
    short_description:
      "A full learning management system for a Cameroonian ed-tech startup, enabling instructors to sell courses and students to learn on any device.",
    challenge_description:
      "AcademiaPro had course content but no platform to deliver it — they were sharing PDFs over WhatsApp and collecting payments manually via mobile money with no receipts or tracking.",
    solution_description:
      "We built a complete LMS with course creation tools, video streaming, student progress tracking, certificate generation, mobile money payment integration, and an instructor revenue dashboard.",
    technologies: ["React.js", "Node.js", "PostgreSQL", "Video Streaming", "MTN MoMo", "Orange Money"],
    results: [
      { label: "Students enrolled", value: "3,200+" },
      { label: "Courses published", value: "48" },
      { label: "Course completion rate", value: "74%" },
      { label: "Instructor payouts processed", value: "$85K" },
    ],
    testimonial: {
      quote: "We went from sending PDFs on WhatsApp to running a proper education platform. AlphaWaves understood exactly what we needed.",
      author: "Sandrine Atangana",
      title: "Founder",
      company: "AcademiaPro",
      rating: 5,
      fr: {
        quote: "Nous sommes passés de l'envoi de PDFs sur WhatsApp à une vraie plateforme éducative. AlphaWaves a compris exactement ce dont nous avions besoin.",
        title: "Fondatrice",
      },
    },
  },
];

export const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "finance", label: "Fintech" },
  { id: "agriculture", label: "Agriculture" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "hospitality", label: "Hospitality" },
];

export const SERVICE_FILTERS = [
  { id: "all", label: "All Services" },
  { id: "web", label: "Web Development" },
  { id: "mobile", label: "Mobile Development" },
  { id: "ai", label: "Artificial Intelligence" },
];

export const INDUSTRIES = [
  { id: 1, icon: "cart", projects: 12 },
  { id: 2, icon: "finance", projects: 8 },
  { id: 3, icon: "leaf", projects: 6 },
  { id: 4, icon: "health", projects: 5 },
  { id: 5, icon: "book", projects: 4 },
  { id: 6, icon: "hotel", projects: 7 },
  { id: 7, icon: "briefcase", projects: 9 },
  { id: 8, icon: "truck", projects: 5 },
];

export const PORTFOLIO_STATS = [
  { id: 1, value: 50, suffix: "+" },
  { id: 2, value: 8, suffix: "+" },
  { id: 3, value: 10, suffix: "+" },
  { id: 4, value: 98, suffix: "%" },
];

export const IMPACT_METRICS = [
  { id: 1, value: 10, suffix: "M+", prefix: "$" },
  { id: 2, value: 200, suffix: "K+", prefix: "" },
  { id: 3, value: 500, suffix: "K+", prefix: "" },
  { id: 4, value: 50, suffix: "+", prefix: "" },
  { id: 5, value: 98, suffix: "%", prefix: "" },
  { id: 6, value: 300, suffix: "%+", prefix: "" },
];

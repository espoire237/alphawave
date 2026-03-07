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
    project_name: "E-Commerce Platform",
    client_name: "Leading Fashion Retailer, Douala",
    client_confidential: false,
    industry_category: "ecommerce",
    project_type: "web",
    short_description: "Complete e-commerce platform with seamless mobile money integration, inventory management, and customer analytics.",
    challenge_description: "A growing fashion retailer had zero online presence and was losing sales to competitors. Accepting only cash payments was limiting their customer base.",
    solution_description: "Built a full e-commerce platform with MTN MoMo and Orange Money integration, real-time inventory management, and an analytics dashboard.",
    technologies: ["React.js", "Node.js", "MongoDB", "MTN MoMo", "Orange Money"],
    results: [
      { label: "Revenue Increase",        value: "250%" },
      { label: "Transactions Processed",  value: "15,000+" },
      { label: "Inventory Cost Reduction",value: "40%" },
    ],
    featured: true,
    status: "published",
    display_order: 1,
    testimonial: {
      quote: "AlphaWaves transformed our retail business completely. The mobile money integration alone increased our online sales by 250% in just three months.",
      author: "Jean-Paul Kamga",
      title: "CEO",
      company: "Fashion Boutique Douala",
      rating: 5,
    },
  },
  {
    id: 2,
    slug: "agricultural-marketplace",
    project_name: "Agricultural Marketplace",
    client_name: "Regional Farmer Cooperative",
    client_confidential: false,
    industry_category: "agriculture",
    project_type: "mobile",
    short_description: "Mobile-first marketplace connecting farmers directly to buyers, eliminating middlemen and increasing farmer profits.",
    challenge_description: "Farmers were losing 60% of potential profits to middlemen with no direct access to buyers or market pricing information.",
    solution_description: "Built a React Native marketplace app with real-time pricing, GPS-based buyer/seller matching, and mobile money payments.",
    technologies: ["React Native", "Python", "PostgreSQL", "Google Maps API"],
    results: [
      { label: "Farmers Onboarded",  value: "500+" },
      { label: "Buyers Registered",  value: "2,000+" },
      { label: "Farmer Income Boost",value: "35%" },
    ],
    featured: false,
    status: "published",
    display_order: 2,
    testimonial: {
      quote: "Working with AlphaWaves was seamless. The platform now connects over 500 farmers to buyers, increasing farmer income by 35%.",
      author: "Marie Nkolo",
      title: "Director",
      company: "Agricultural Cooperative",
      rating: 5,
    },
  },
  {
    id: 3,
    slug: "healthcare-appointment-system",
    project_name: "Healthcare Appointment System",
    client_name: "Private Medical Clinic Network",
    client_confidential: false,
    industry_category: "healthcare",
    project_type: "web",
    short_description: "Patient management and appointment scheduling system with SMS reminders, reducing no-shows and improving clinic efficiency.",
    challenge_description: "A clinic network had 40% no-show rates and was managing appointments manually via phone — losing hours daily to admin work.",
    solution_description: "Built a web-based patient management system with automated SMS reminders, online booking, and doctor schedule management.",
    technologies: ["Vue.js", "Node.js", "MySQL", "SMS Integration"],
    results: [
      { label: "Reduction in No-Shows",   value: "60%" },
      { label: "Daily Appointments",      value: "200+" },
      { label: "Patient Satisfaction",    value: "4.8/5" },
    ],
    featured: false,
    status: "published",
    display_order: 3,
    testimonial: null,
  },
  {
    id: 4,
    slug: "fintech-lending-platform",
    project_name: "AI Lending Platform",
    client_name: "Microfinance Institution",
    client_confidential: false,
    industry_category: "finance",
    project_type: "ai",
    short_description: "AI-powered credit scoring and loan management platform enabling faster approval and lower default rates.",
    challenge_description: "Manual loan processing took 2 weeks and had a 30% default rate due to poor credit assessment methods.",
    solution_description: "Built an AI credit scoring engine using alternative data points, reducing approval time and default rates dramatically.",
    technologies: ["React.js", "Python", "FastAPI", "AI/ML", "PostgreSQL"],
    results: [
      { label: "Faster Loan Approval", value: "70%" },
      { label: "Default Rate Reduction",value: "25%" },
      { label: "Loans Processed",       value: "10,000+" },
    ],
    featured: true,
    status: "published",
    display_order: 4,
    testimonial: {
      quote: "The AI-powered credit scoring system reduced our loan approval time by 70% while lowering default rates. AlphaWaves didn't just build software — they transformed our entire lending operation.",
      author: "Dr. Emmanuel Fon",
      title: "Managing Director",
      company: "Microfinance Institution",
      rating: 5,
    },
  },
  {
    id: 5,
    slug: "hotel-booking-system",
    project_name: "Hotel Booking & Management",
    client_name: "Boutique Hotel Chain",
    client_confidential: false,
    industry_category: "hospitality",
    project_type: "web",
    short_description: "Complete hotel management system with online booking, payment processing, and operational analytics dashboard.",
    challenge_description: "A hotel chain was losing bookings to OTA platforms and paying 20% commissions. No direct booking capability existed.",
    solution_description: "Built a direct booking engine with Stripe integration, room management dashboard, and revenue analytics.",
    technologies: ["Next.js", "Node.js", "Stripe", "Booking Engine API"],
    results: [
      { label: "Online Bookings Increase", value: "180%" },
      { label: "Operational Cost Reduction",value: "45%" },
      { label: "Uptime Maintained",         value: "99.9%" },
    ],
    featured: false,
    status: "published",
    display_order: 5,
    testimonial: null,
  },
  {
    id: 6,
    slug: "education-lms-platform",
    project_name: "University LMS Platform",
    client_name: "Private University",
    client_confidential: false,
    industry_category: "education",
    project_type: "web",
    short_description: "Learning management system enabling online courses, student portals, and progress tracking for 5,000+ students.",
    challenge_description: "A university needed to move to hybrid learning post-pandemic with no digital infrastructure in place.",
    solution_description: "Built a full LMS with course management, video streaming, student progress tracking, and mobile-responsive design.",
    technologies: ["React.js", "Node.js", "MongoDB", "Video Streaming"],
    results: [
      { label: "Students Enrolled",    value: "5,000+" },
      { label: "Course Completion Rate",value: "95%" },
      { label: "Cost Reduction",        value: "40%" },
    ],
    featured: false,
    status: "published",
    display_order: 6,
    testimonial: null,
  },
];

export const CATEGORIES = [
  { id: "all",         label: "All Projects"           },
  { id: "ecommerce",   label: "E-commerce & Retail"    },
  { id: "finance",     label: "Financial Services"     },
  { id: "agriculture", label: "Agriculture"            },
  { id: "healthcare",  label: "Healthcare"             },
  { id: "education",   label: "Education"              },
  { id: "hospitality", label: "Hospitality & Tourism"  },
];

export const SERVICE_FILTERS = [
  { id: "all",    label: "All Services"        },
  { id: "web",    label: "Web Applications"    },
  { id: "mobile", label: "Mobile Apps"         },
  { id: "ai",     label: "AI & Data Analytics" },
];

export const INDUSTRIES = [
  { id: 1, name: "E-commerce & Retail",    icon: "cart",     projects: 12, metric: "$2M+ in sales enabled"          },
  { id: 2, name: "Financial Services",     icon: "finance",  projects: 8,  metric: "50,000+ transactions processed" },
  { id: 3, name: "Agriculture",            icon: "leaf",     projects: 6,  metric: "1,500+ farmers empowered"       },
  { id: 4, name: "Healthcare",             icon: "health",   projects: 5,  metric: "100,000+ patients served"       },
  { id: 5, name: "Education",              icon: "book",     projects: 4,  metric: "10,000+ students enrolled"      },
  { id: 6, name: "Hospitality & Tourism",  icon: "hotel",    projects: 7,  metric: "95% avg occupancy boost"        },
  { id: 7, name: "Professional Services",  icon: "briefcase",projects: 9,  metric: "200+ businesses digitized"      },
  { id: 8, name: "Logistics",              icon: "truck",    projects: 5,  metric: "40% efficiency improvement"     },
];

export const PORTFOLIO_STATS = [
  { id: 1, value: 50,  suffix: "+",  label: "Projects Delivered"  },
  { id: 2, value: 8,   suffix: "+",  label: "Industries Served"   },
  { id: 3, value: 10,  suffix: "+",  label: "Countries"           },
  { id: 4, value: 98,  suffix: "%",  label: "Client Satisfaction" },
];

export const IMPACT_METRICS = [
  { id: 1, value: 10,     suffix: "M+", prefix: "$", label: "Revenue Generated for Clients"  },
  { id: 2, value: 200,    suffix: "K+", prefix: "",  label: "Users Served Across Platforms"  },
  { id: 3, value: 500,    suffix: "K+", prefix: "",  label: "Transactions Processed"         },
  { id: 4, value: 50,     suffix: "+",  prefix: "",  label: "Projects Delivered"             },
  { id: 5, value: 98,     suffix: "%",  prefix: "",  label: "Client Satisfaction Rate"       },
  { id: 6, value: 300,    suffix: "%+", prefix: "",  label: "Average Client ROI"             },
];
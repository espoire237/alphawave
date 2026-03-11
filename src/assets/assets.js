// src/assets/images/index.js

// ── Hero Images ───────────────────────────
import heroHome      from "./images/pic5.jpg";
import heroAbout     from "./images/pic6.jpg";
import heroServices  from "./images/pic2.jpg";
import heroPortfolio from "./images/hero-portfolio.jpg"; 
import heroContact   from "./images/pic4.jpg";
import heroFaq from "./images/hero-faq.jpg";
import heroBlog from "./images/hero-blog.jpg";
import heroService from "./images/hero-service.jpg";

// // ── Team Images ───────────────────────────
// import member1 from "./team/member-1.jpg";
// import member2 from "./team/member-2.jpg";

// // ── Portfolio Images ──────────────────────
// import project1 from "./portfolio/project-1.jpg";
// import project2 from "./portfolio/project-2.jpg";

// // ── Logo ──────────────────────────────────
// import logo from "./logo/alphawaves-logo.png";

//---------icon-------------

import map from "./icons/africa_map.png";




export const IMAGES = {
  hero: {
    home:      heroHome,
    about:     heroAbout,
    services:  heroServices,
    portfolio: heroPortfolio,
    contact:   heroContact,
    faq:       heroFaq,
    blog:      heroBlog,
    service:   heroService,

  },
//   team: {
//     member1,
//     member2,
//   },
//   portfolio: {
//     project1,
//     project2,
//   },
//   logo,
};

export const ICONS = {
  map,
};
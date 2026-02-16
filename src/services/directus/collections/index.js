/**
 * Directus Collections Index
 * Central export point for all collection services
 */

export * from './projects';
export * from './services';
export * from './team';
export * from './faq';
export * from './leads';

export {
  default as projectsService,
} from './projects';

export {
  default as servicesService,
} from './services';

export {
  default as teamService,
} from './team';

export {
  default as faqService,
} from './faq';

export {
  default as leadsService,
} from './leads';

/**
 * Directus Configuration
 * Settings for Directus CMS integration
 */

import env from './env';

export const directusConfig = {
  // API Configuration
  url: env.DIRECTUS_URL,
  timeout: 30000,
  
  // Collections
  collections: {
    SERVICES: 'services',
    PROJECTS: 'projects',
    TEAM: 'team',
    TESTIMONIALS: 'testimonials',
    FAQ: 'faq',
    LEADS: 'leads',
    TECHNOLOGIES: 'technologies',
    AWARDS: 'awards',
  },

  // Default Query Fields
  fields: {
    services: [
      'id',
      'service_name',
      'slug',
      'icon',
      'short_description',
      'full_description',
      'key_features',
      'use_cases',
      'technologies_used',
      'starting_price',
      'status',
      'order',
      'related_services',
      'created_at',
      'updated_at',
    ],

    projects: [
      'id',
      'project_name',
      'slug',
      'client_name',
      'client_confidential',
      'industry_category',
      'project_type',
      'status',
      'short_description',
      'full_description',
      'challenge_description',
      'solution_description',
      'featured_image',
      'hero_image',
      'gallery_images',
      'demo_video_url',
      'result_metrics',
      'technologies_used',
      'key_features',
      'project_timeline',
      'team_size',
      'launch_date',
      'client_testimonial',
      'related_projects',
      'created_at',
      'updated_at',
    ],

    team: [
      'id',
      'name',
      'role',
      'bio',
      'expertise_areas',
      'photo',
      'linkedin_url',
      'team_category',
      'order',
      'status',
    ],

    faq: [
      'id',
      'question',
      'answer',
      'category',
      'status',
      'display_order',
      'is_featured',
      'created_at',
      'updated_at',
    ],

    leads: [
      'id',
      'full_name',
      'email',
      'phone',
      'company_name',
      'service_interested_in',
      'budget_range',
      'project_description',
      'timeline_urgency',
      'how_did_you_find_us',
      'status',
      'assigned_to',
      'notes',
      'created_at',
      'updated_at',
    ],
  },

  // Filter Presets
  filters: {
    published: { status: { _eq: 'published' } },
    active: { status: { _eq: 'active' } },
    featured: { featured: { _eq: true } },
  },

  // Sort Options
  sorts: {
    newest: '-created_at',
    oldest: 'created_at',
    featured: '-featured',
    order: 'order',
    name: 'name',
  },

  // Pagination
  pagination: {
    limit: 12,
    page: 1,
  },

  // Image Settings
  images: {
    assetPath: '/assets/',
    thumbnailParams: '?width=400&height=300&fit=cover',
    fullParams: '?width=1200&height=800&fit=cover',
  },
};

export default directusConfig;

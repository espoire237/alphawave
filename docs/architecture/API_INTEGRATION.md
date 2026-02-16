/**
 * API Integration Guide
 * How to integrate and use the Directus API
 */

# API Integration Guide

## 🚀 Getting Started

### 1. Configure Environment
Create `.env.local` file:
```bash
VITE_DIRECTUS_URL=https://your-directus-instance.com
VITE_SITE_URL=https://localhost:5173
VITE_GOOGLE_MAPS_API=your_api_key
VITE_RECAPTCHA_SITE_KEY=your_key
VITE_ANALYTICS_ID=G-xxxxx
```

### 2. Client Initialization
The Directus client is automatically initialized:
```javascript
import directus from '@/services/directus/client';
// Client is ready to use
```

## 📡 Making API Calls

### Pattern 1: Using Services Directly
```javascript
import { getProjectBySlug } from '@/services';

const project = await getProjectBySlug('my-project');
```

### Pattern 2: Using Custom Hooks
```javascript
import { useProjectBySlug } from '@/hooks';

function ProjectDetail() {
  const { data: project, loading, error } = useProjectBySlug('my-project');
  
  if (loading) return <Loader />;
  if (error) return <Error />;
  return <ProjectContent project={project} />;
}
```

### Pattern 3: Direct Query Building
```javascript
import directus from '@/services/directus/client';
import { buildReadQuery } from '@/services/directus/queries';

const projects = await directus.request(
  buildReadQuery('projects', {
    filter: { status: { _eq: 'published' } },
    limit: 12,
    page: 1,
  })
);
```

## 🔄 Available Services

### Projects
```javascript
import {
  getAllProjects,      // Get all projects with pagination
  getProjectBySlug,    // Get single project by URL slug
  getProjectById,      // Get single project by ID
  getFeaturedProjects, // Get featured projects for homepage
  getProjectsByCategory, // Filter by industry category
  searchProjects,      // Full-text search
  getRelatedProjects,  // Get related projects
} from '@/services';

// Example usage
const projects = await getAllProjects({
  filter: { industry_category: 'ai' },
  limit: 12,
  page: 1,
});
```

### Services
```javascript
import {
  getAllServices,      // Get all services
  getServiceBySlug,    // Get single service
  getServiceById,      // Get by ID
  getFeaturedServices, // Get top services
  getRelatedServices,  // Get related services
} from '@/services';

// Example usage
const services = await getServiceBySlug('custom-software-development');
```

### Team
```javascript
import {
  getAllTeamMembers,
  getTeamMemberById,
  getTeamMembersByCategory,
  getTeamLeaders,
  searchTeamMembers,
} from '@/services';

const leaders = await getTeamLeaders(5);
```

### FAQ
```javascript
import {
  getAllFAQs,
  getFAQsByCategory,
  getFAQById,
  getFeaturedFAQs,
  searchFAQs,
  getFAQsByAllCategories,
} from '@/services';

const faqsByCategory = await getFAQsByAllCategories();
```

### Leads (Contact Form)
```javascript
import { submitLead } from '@/services';

const lead = await submitLead({
  full_name: 'John Doe',
  email: 'john@example.com',
  service_interested_in: 'Custom Software Development',
  budget_range: '$10,000 – $50,000',
  project_description: 'We need a web app...',
  timeline_urgency: '1-2 Months',
  how_did_you_find_us: 'Google Search',
});
```

## 📝 Error Handling

### For Services
```javascript
import { handleError } from '@/utils/errorHandler';

try {
  const project = await getProjectBySlug(slug);
} catch (error) {
  const errorObj = handleError(error, 'ProjectDetail');
  console.log(errorObj.message); // User-friendly message
  console.log(errorObj.status);  // HTTP status
  console.log(errorObj.code);    // Error code
}
```

### For Hooks
```javascript
import { useProjectBySlug } from '@/hooks';

const { data, loading, error } = useProjectBySlug(slug);

if (error) {
  return <div className="error">{error.message}</div>;
}
```

## 💾 Caching Strategy

### Automatic Caching in Hooks
```javascript
import { useProjectBySlug } from '@/hooks';

// Automatically cached for 1 hour (by default)
const { data } = useProjectBySlug(slug);
```

### Manual Cache Control
```javascript
import { getFromCache, setCache, clearCache } from '@/utils/cache';

// Get from cache
const cached = getFromCache('projects_all');

// Set cache (expires in 1 hour)
setCache('projects_all', projectsData, 1000 * 60 * 60);

// Clear specific cache
clearCache('projects_all');

// Clear all cache
clearAllCache();
```

## 🔐 Authentication

### Setup
```javascript
import { initializeAuth, setAuthToken, clearAuth } from '@/services';

// On app startup
initializeAuth();

// After login
setAuthToken(jwtToken);

// On logout
clearAuth();
```

## 📊 Pagination Example

```javascript
import { useState } from 'react';
import { useAllProjects } from '@/hooks';

function ProjectsList() {
  const [page, setPage] = useState(1);
  const { data: projects, loading } = useAllProjects({
    limit: 12,
    page,
  });

  return (
    <>
      {projects?.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
      
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={Math.ceil(projects?.length / 12)}
      />
    </>
  );
}
```

## 🔍 Filtering & Search

### Basic Filtering
```javascript
const projects = await getAllProjects({
  filter: {
    status: { _eq: 'published' },
    industry_category: { _eq: 'ai' },
  },
});
```

### Advanced Filtering
```javascript
const projects = await searchProjects('payment', 12);
```

### Multiple Filters
```javascript
const projects = await getAllProjects({
  filter: {
    status: { _eq: 'published' },
    featured: { _eq: true },
    _or: [
      { project_name: { _icontains: 'search' } },
      { short_description: { _icontains: 'search' } },
    ],
  },
  limit: 10,
});
```

## 🎯 Directus Filter Operators

```javascript
// Comparison
{ _eq: value }      // equals
{ _neq: value }     // not equals
{ _gt: value }      // greater than
{ _gte: value }     // greater than or equal
{ _lt: value }      // less than
{ _lte: value }     // less than or equal

// String
{ _icontains: value }   // case-insensitive contains
{ _contains: value }    // case-sensitive contains
{ _starts_with: value } // starts with
{ _ends_with: value }   // ends with

// Array
{ _in: [value1, value2] }    // in list
{ _nin: [value1, value2] }   // not in list

// Logical
{ _or: [...] }   // OR condition
{ _and: [...] }  // AND condition
```

## 📧 Email Notifications

### Send Contact Form Notification
```javascript
import { sendContactFormNotification } from '@/services';

const leadData = {
  full_name: 'John Doe',
  email: 'john@example.com',
  // ... other fields
};

await sendContactFormNotification(leadData);
```

### Send Client Confirmation
```javascript
import { sendClientConfirmation } from '@/services';

await sendClientConfirmation(email, leadData);
```

## 📊 Analytics Tracking

### Track Events
```javascript
import { trackEvent, trackFormSubmission, trackCTAClick } from '@/services';

// Generic event
trackEvent('Engagement', 'CTA Click', 'Get Started Button', null);

// Form submission
trackFormSubmission('Contact Form');

// CTA click
trackCTAClick('Schedule Now', current_page);
```

## 🧪 Testing API Calls

### Mock Data for Testing
```javascript
import { vi } from 'vitest';
import { projectsService } from '@/services';

// Mock the service
vi.mock('@/services', () => ({
  projectsService: {
    getProjectBySlug: vi.fn().mockResolvedValue({
      id: '1',
      project_name: 'Test Project',
      // ... mock data
    }),
  },
}));

// Use in test
test('should load project', async () => {
  const project = await projectsService.getProjectBySlug('test');
  expect(project.project_name).toBe('Test Project');
});
```

## ⚡ Performance Tips

1. **Cache Aggressive**ly
   - Cache services for 1 hour
   - Cache team for 24 hours
   - Cache FAQs for 24 hours

2. **Lazy Load Pages**
   - Use code splitting with React.lazy()
   - Load heavy components on demand

3. **Batch Requests**
   - Request related data together
   - Use `Promise.all()` for parallel requests

4. **Pagination**
   - Always paginate large datasets
   - Default limit is 12 items

## 🐛 Debugging

### Enable Debug Logging
```javascript
// In your service call
import directus from '@/services/directus/client';

// Directus will log requests in console
if (import.meta.env.DEV) {
  window.directus = directus;
  console.log('Directus client available at window.directus');
}
```

### Check Cache
```javascript
import { getCacheSize } from '@/utils/cache';

console.log(`Cache size: ${getCacheSize()} items`);
```

---

**Last Updated**: February 16, 2026

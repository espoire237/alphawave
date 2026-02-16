/**
 * Architecture Documentation
 * Overview of the application structure and best practices
 */

# AlphaWaves Website - Architecture Guide

## 📁 Folder Structure Overview

```
src/
├── config/              ← All configuration files
├── services/            ← API calls organized by domain
├── components/          ← Reusable UI components
├── pages/               ← Page-level components
├── hooks/               ← Custom React hooks
├── context/             ← React Context for state
├── router/              ← Routing configuration
├── utils/               ← Utility functions
├── types/               ← JSDoc type definitions
├── styles/              ← Global styles
└── assets/              ← Images, icons, fonts
```

## 🎯 Key Principles

### 1. **Separation of Concerns**
- **Config**: Environment variables and settings
- **Services**: API calls and external operations
- **Components**: Presentation layer only
- **Hooks**: Business logic and state management

### 2. **Component Organization**
```
components/
├── layout/       ← Header, Footer, Navigation
├── common/       ← Truly reusable (0 page-specific logic)
├── sections/     ← Page sections usable across pages
├── forms/        ← All form components
├── features/     ← Complex interactive components
└── middleware/   ← Error boundaries, loading states
```

**Rule**: Pages should only be 10-20 lines of composition logic.

### 3. **Services Layer Pattern**
```javascript
// ✅ GOOD: Organized by domain
services/
├── directus/
│   ├── collections/
│   │   ├── projects.js
│   │   ├── services.js
│   │   ├── team.js
│   │   └── faq.js
│   ├── client.js
│   ├── queries.js
│   └── utils.js
├── email.js
├── analytics.js
└── index.js (exports everything)
```

**Usage**:
```javascript
import { getProjectBySlug, getAllServices } from '@/services';

const project = await getProjectBySlug('my-project');
const services = await getAllServices();
```

### 4. **Hook Pattern for Data Fetching**
```javascript
import { useFetch } from '@/hooks';
import { getProjectBySlug } from '@/services';

function ProjectDetail() {
  const { data: project, loading, error } = useFetch(
    () => getProjectBySlug(slug),
    [slug],
    {
      cacheKey: `project_${slug}`,
      cacheDuration: CACHE_DURATION.PROJECTS,
    }
  );

  if (loading) return <Loader />;
  if (error) return <Error message={error.message} />;
  return <ProjectContent project={project} />;
}
```

### 5. **Error Handling**
```javascript
import { handleError } from '@/utils/errorHandler';

try {
  const data = await fetchData();
} catch (error) {
  const errorObj = handleError(error, 'ComponentName');
  toast.error(errorObj.message); // User-friendly message
}
```

### 6. **Configuration Management**
```javascript
import { env, siteConfig, ROUTES } from '@/config';

// Environment variables (validated on startup)
api.baseURL = env.DIRECTUS_URL;

// Site configuration
const appName = siteConfig.name;

// Constants
const route = ROUTES.HOME; // '/home'
```

## 🔄 Data Flow

```
Page Component
    ↓
Custom Hook (useFetch)
    ↓
Service Layer (getProjectBySlug)
    ↓
Directus Client
    ↓
API Response
    ↓
Cache Layer
    ↓
Component State
    ↓
UI Render
```

## 🎨 Component Example

```jsx
/**
 * ProjectCard.jsx
 * @type {React.FC<ProjectCardProps>}
 */
import { Link } from 'react-router-dom';

/**
 * Display a single project preview
 * @param {ProjectCardProps} props - Component props
 * @returns {JSX.Element}
 */
const ProjectCard = ({ id, title, slug, image, category }) => {
  return (
    <article className="card hover:shadow-lg transition">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="text-gray-600 text-sm">{category}</p>
      <Link to={`/portfolio/${slug}`} className="text-primary mt-4">
        View Details →
      </Link>
    </article>
  );
};

export default ProjectCard;
```

## 📊 State Management Strategy

### Global State (Context API)
- Authentication
- App notifications
- User preferences

### Local State (useState)
- Form inputs
- UI toggles (dropdowns, modals)

### Server State (useQuery/useFetch)
- Projects, services, team (cached)
- FAQs (cached)

### URL State (useParams)
- Dynamic routes (projects/:slug)
- Filters (?category=ai)

## 🧪 Testing Structure

```
__tests__/
├── components/
│   ├── ProjectCard.test.jsx
│   └── ContactForm.test.jsx
├── hooks/
│   └── useFetch.test.js
├── services/
│   └── projects.test.js
└── setup.js
```

## 🚀 Performance Best Practices

### Code Splitting
✅ Lazy load pages with `React.lazy()` and `Suspense`

### Caching
✅ Cache API responses with configurable TTL
✅ Use cache key patterns: `'projects_1_12'`

### Memoization
✅ Memoize expensive components
```javascript
import { memo } from 'react';
export default memo(ProjectCard);
```

### Image Optimization
✅ Use native lazy loading
```jsx
<img src={image} loading="lazy" alt="..." />
```

### Bundle Size
✅ Monitor with Vite analyzer
```bash
npm run build -- --debug=bandwidth
```

## 📋 Development Workflow

1. **Create Page Component**
```jsx
// src/pages/NewPage.jsx
import { useState } from 'react';
import { useNewData } from '@/hooks';

function NewPage() {
  const { data, loading, error } = useNewData();
  return <div>{/* Render */}</div>;
}
export default NewPage;
```

2. **Create API Service**
```javascript
// src/services/directus/collections/newCollection.js
export const getNewData = async (options) => {
  // Fetch from Directus
};
```

3. **Create Custom Hook**
```javascript
// src/hooks/useNewData.js
export const useNewData = (options) => {
  return useFetch(() => getNewData(options), ...);
};
```

4. **Add Route**
Update `src/router/routes.jsx` with new page route

5. **Update Navigation**
Add link in `src/components/layout/Navigation.jsx`

## 🔐 Security Best Practices

- ✅ Never store sensitive data in localStorage
- ✅ Sanitize user input
- ✅ Use environment variables for secrets
- ✅ Validate form data on both frontend and backend
- ✅ Implement CSRF protection for forms
- ✅ Use HTTPS only in production

## 📚 Resources

- [React Router Documentation](https://reactrouter.com)
- [Directus Documentation](https://docs.directus.io)
- [Tailwind CSS Documentation](https://tailwindcss.com)

---

**Last Updated**: February 16, 2026

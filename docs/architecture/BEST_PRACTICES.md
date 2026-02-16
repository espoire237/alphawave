# AlphaWaves Website - Best Practices Guide

## 🎯 Code Quality Standards

### Component Standards
1. **Keep components small** (< 200 lines)
2. **One responsibility per component**
3. **Use JSDoc comments** for props and returns
4. **Memoize expensive components** with React.memo()
5. **Avoid prop drilling** - use Context API

### Naming Conventions
```javascript
// ✅ Components (PascalCase)
ProjectCard.jsx
ServiceGrid.jsx
ContactForm.jsx

// ✅ Hooks (camelCase with 'use' prefix)
useFetch.js
useProjects.js
useLocalStorage.js

// ✅ Utilities (camelCase)
errorHandler.js
formatters.js
validators.js

// ✅ Constants (UPPER_SNAKE_CASE)
MAX_ITEMS = 100
API_TIMEOUT = 30000
CACHE_DURATION = { ... }
```

### File Organization
```
Feature/
├── Component.jsx      ← Main component
├── Component.module.css ← Styles
├── Component.test.jsx  ← Tests
└── index.js           ← Export
```

## 🔒 Security Best Practices

### Environment Variables
- ✅ Never commit `.env.local`
- ✅ Use `.env.example` as template
- ✅ Validate env vars on startup
- ✅ Prefix with `VITE_` for Vite apps

### Data Handling
```javascript
// ❌ Bad
const sensitiveData = localStorage.getItem('password');

// ✅ Good
const authToken = sessionStorage.getItem('auth_token');
// Only store JWT tokens, not passwords
```

### Form Security
```javascript
// ✅ Good: Validate and sanitize
const validateForm = (data) => {
  if (!data.email.includes('@')) return false;
  if (data.message.length < 10) return false;
  return true;
};

// ✅ Good: Use CSRF protection
<form method="POST">
  <input type="hidden" name="csrf_token" value={csrfToken} />
</form>
```

## 📈 Performance Guidelines

### Code Splitting
```javascript
// ✅ Good: Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));

// Use with Suspense
<Suspense fallback={<LoadingFallback />}>
  <Home />
</Suspense>
```

### Image Optimization
```jsx
// ✅ Good: Native lazy loading
<img src={url} loading="lazy" alt="description" />

// ✅ Good: Responsive images
<img
  src={url}
  srcSet={`${url}?w=400 400w, ${url}?w=800 800w`}
  sizes="(max-width: 600px) 400px, 800px"
  alt="description"
/>
```

### Memoization
```javascript
// ✅ Memoize if props don't change often
export default memo(ProjectCard);

// ✅ Memoize expensive calculations
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

## 🧪 Testing Guidelines

### Unit Test Example
```javascript
// useFetch.test.js
import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '@/hooks';

test('should load data', async () => {
  const mockFn = vi.fn().mockResolvedValue({ id: 1 });
  
  const { result } = renderHook(() => useFetch(mockFn, []));
  
  await waitFor(() => {
    expect(result.current.data).toEqual({ id: 1 });
  });
});
```

### Component Test Example
```javascript
// ProjectCard.test.jsx
import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/sections/ProjectCard';

test('should render project card', () => {
  render(
    <ProjectCard
      id="1"
      title="Test Project"
      image="/image.jpg"
      slug="test"
    />
  );
  
  expect(screen.getByText('Test Project')).toBeInTheDocument();
});
```

## 🔄 Git Workflow

### Commit Message Format
```
feat: Add project filter functionality
fix: Resolve caching issue in projects hook
docs: Update API integration guide
style: Format error handler utility
refactor: Reorganize services layer
test: Add tests for useFetch hook
```

### Branch Naming
```
feature/add-project-filtering
bugfix/fix-cache-expiry
docs/update-readme
```

## 📋 Common Patterns

### Fetching Data Pattern
```javascript
function ProjectsList() {
  const { data: projects, loading, error } = useAllProjects({
    limit: 12,
    page: 1,
  });

  if (loading) return <Loader />;
  if (error) return <Error message={error.message} />;
  if (!projects?.length) return <Empty />;

  return (
    <Grid>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Grid>
  );
}
```

### Form Submission Pattern
```javascript
function ContactForm() {
  const { handleSubmit, register, errors } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await submitLead(data);
      toast.success('Message sent!');
      reset();
    } catch (error) {
      const errorObj = handleError(error, 'ContactForm');
      toast.error(errorObj.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
```

### Error Handling Pattern
```javascript
try {
  const data = await apiCall();
  setData(data);
} catch (error) {
  const errorObj = handleError(error, 'ComponentName');
  setError(errorObj);
  logToAnalytics('error', errorObj.code);
}
```

## 📚 Documentation Standards

### JSDoc Comments
```javascript
/**
 * Fetch all projects with optional filtering
 * @param {Object} options - Query options
 * @param {string} [options.category] - Filter by category
 * @param {number} [options.limit=12] - Items per page
 * @returns {Promise<Array<Project>>} Array of projects
 * @throws {Error} If request fails
 * @example
 * const projects = await getAllProjects({ limit: 24 });
 */
export const getAllProjects = async (options = {}) => {
  // Implementation
};
```

### README Format
```markdown
# Feature Name

## Overview
Brief description of what this does

## Usage
```javascript
import { feature } from '@/path';
const result = feature(options);
```

## API Reference
Document all exported functions

## Examples
Provide 2-3 real-world examples
```

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Build succeeds without warnings
- [ ] All tests passing
- [ ] All config files validated
- [ ] SEO meta tags configured
- [ ] Error tracking (Sentry) configured
- [ ] Analytics initialized
- [ ] CORS properly configured
- [ ] Security headers set
- [ ] Cache headers configured
- [ ] Database backups scheduled
- [ ] Monitoring alerts set up

---

**Last Updated**: February 16, 2026

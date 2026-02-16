# Architecture Documentation

Welcome to the AlphaWaves website architecture documentation. This folder contains comprehensive guides for understanding and working with the codebase.

## 📚 Documentation Files

### 1. [ARCHITECTURE.md](./ARCHITECTURE.md)
**Start here to understand the overall system design.**

Topics:
- Folder structure overview
- Key architectural principles
- Component organization patterns
- Services layer pattern
- Hook-based data fetching
- Error handling approach
- State management strategy
- Testing structure
- Performance best practices
- Development workflow

**Read this first if you're new to the project.**

---

### 2. [API_INTEGRATION.md](./API_INTEGRATION.md)
**Learn how to integrate with the Directus API.**

Topics:
- Getting started with API
- Available services and functions
- Making API calls (3 patterns)
- Error handling examples
- Caching strategies
- Authentication setup
- Pagination and filtering
- Email notifications
- Analytics tracking
- Testing API code
- Performance tips
- Debugging tips

**Use this when implementing data-driven features.**

---

### 3. [BEST_PRACTICES.md](./BEST_PRACTICES.md)
**Guidelines for maintaining code quality.**

Topics:
- Code quality standards
- Naming conventions
- File organization
- Security best practices
- Performance guidelines
- Testing patterns
- Git workflow
- Common coding patterns
- Documentation standards
- Deployment checklist

**Reference this for code reviews and when writing new code.**

---

## 🎯 Quick Navigation

### I want to...

- **Understand the overall architecture**  
  → Read [ARCHITECTURE.md](./ARCHITECTURE.md)

- **Fetch data from the API**  
  → Read [API_INTEGRATION.md](./API_INTEGRATION.md) - Section "Making API Calls"

- **Add a new page**  
  → Read [ARCHITECTURE.md](./ARCHITECTURE.md) - Section "Development Workflow"

- **Handle errors properly**  
  → Read [API_INTEGRATION.md](./API_INTEGRATION.md) - Section "Error Handling"

- **Implement caching**  
  → Read [API_INTEGRATION.md](./API_INTEGRATION.md) - Section "Caching Strategy"

- **Write better code**  
  → Read [BEST_PRACTICES.md](./BEST_PRACTICES.md)

- **Test my code**  
  → Read [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Section "Testing Guidelines"

- **Deploy to production**  
  → Read [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Section "Deployment Checklist"

---

## 🚀 Getting Started (Step-by-Step)

### 1. **First Time Setup**
```bash
cp .env.example .env.local
# Edit .env.local with your Directus URL
npm install
npm run dev
```

### 2. **Understand the Architecture**
Read [ARCHITECTURE.md](./ARCHITECTURE.md) - Estimated time: 20 minutes

### 3. **Learn the API Integration**
Read [API_INTEGRATION.md](./API_INTEGRATION.md) - Estimated time: 30 minutes

### 4. **Review Best Practices**
Read [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Estimated time: 15 minutes

### 5. **Create Your First Component**
Follow the "Development Workflow" in [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 📊 Architecture at a Glance

```
User Interface (Pages & Components)
           ↓
Custom Hooks (useFetch, useProjects, etc)
           ↓
Services Layer (getProjectBySlug, getAllServices, etc)
           ↓
Directus Client (SDK + Configuration)
           ↓
Directus CMS API
           ↓
Collections (Projects, Services, Team, FAQ, Leads)
```

---

## 🎓 Key Concepts

### Pages
- React components that render entire pages
- Located in `src/pages/`
- Should be lightweight (10-20 lines of composition logic)
- Lazy-loaded for better performance

### Components
- Reusable UI elements
- Located in `src/components/`
- Organized by type: layout, common, sections, forms, features
- No page-specific logic

### Hooks
- Custom React hooks for data and logic
- Located in `src/hooks/`
- Examples: `useFetch`, `useProjects`, `useServices`
- Reusable across components

### Services
- API calls organized by domain/collection
- Located in `src/services/`
- Examples: projects.js, services.js, team.js
- Abstract the Directus SDK

### Configuration
- Environment variables and settings
- Located in `src/config/`
- Validated on app startup
- Never hardcode values

---

## 🔗 File Structure

```
docs/architecture/
├── ARCHITECTURE.md          ← System design
├── API_INTEGRATION.md       ← API usage guide
├── BEST_PRACTICES.md        ← Code standards
└── README.md                ← This file

src/
├── config/                  ← Configuration layer
├── services/                ← API calls (organized by domain)
├── components/              ← Reusable UI components
├── pages/                   ← Page components
├── hooks/                   ← Custom React hooks
├── router/                  ← Routing configuration
├── types/                   ← Type definitions
└── utils/                   ← Utility functions
```

---

## 💡 Common Tasks

### Fetch Data in a Component
```javascript
import { useProjectBySlug } from '@/hooks';

function ProjectDetail({ slug }) {
  const { data: project, loading, error } = useProjectBySlug(slug);
  
  if (loading) return <Loader />;
  if (error) return <Error message={error.message} />;
  return <ProjectContent project={project} />;
}
```

### Add a New Service Function
1. Create file: `src/services/directus/collections/yourCollection.js`
2. Import Directus: `import directus from '../client'`
3. Write function: `export const getYourData = async () => { ... }`
4. Export in index: Export from `src/services/index.js`

### Create a New Hook
1. Create file: `src/hooks/useYourData.js`
2. Import useFetch: `import { useFetch } from './useFetch'`
3. Write hook: `export const useYourData = () => { ... }`
4. Export in index: Export from `src/hooks/index.js`

### Add a New Page
1. Create page: `src/pages/YourPage.jsx`
2. Add route: Update `src/router/routes.jsx`
3. Add link: Update navigation in Layout/Navigation

---

## 🛠️ Troubleshooting

### API not returning data?
1. Check `.env.local` has correct `VITE_DIRECTUS_URL`
2. Check Directus is running and accessible
3. Review [API_INTEGRATION.md](./API_INTEGRATION.md) error handling section

### Component not rendering?
1. Check browser console for errors
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) component patterns
3. Check error boundary is wrapping the component

### Performance issues?
1. Check caching is enabled in hooks
2. Review [BEST_PRACTICES.md](./BEST_PRACTICES.md) performance section
3. Check bundle size with `npm run build -- --debug=bandwidth`

---

## 📞 Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Directus Documentation](https://docs.directus.io)
- [Tailwind CSS Documentation](https://tailwindcss.com)

---

## ✅ Checklist for New Features

- [ ] Read relevant section in [ARCHITECTURE.md](./ARCHITECTURE.md)
- [ ] Check [API_INTEGRATION.md](./API_INTEGRATION.md) if using API
- [ ] Follow patterns in [BEST_PRACTICES.md](./BEST_PRACTICES.md)
- [ ] Add JSDoc comments to functions
- [ ] Test with multiple browsers
- [ ] Test error states
- [ ] Optimize images
- [ ] Check accessibility
- [ ] Update documentation if adding new patterns

---

## 📝 Version Info

- **Created**: February 16, 2026
- **Last Updated**: February 16, 2026
- **Status**: ✅ Active Development
- **Maintainers**: AlphaWaves Team

---

**Happy Coding! 🚀**

If you have questions, refer to the relevant documentation file above, or review the examples in the `src/` folder.

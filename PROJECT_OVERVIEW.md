# niceSchool-fe: Project Overview

## Introduction

`niceSchool-fe` is a comprehensive, modern frontend application for school management and engagement. It is designed to provide a seamless experience for students, alumni, staff, and visitors, covering admissions, events, news, dashboards, and more. The project leverages Next.js and TypeScript for scalability, maintainability, and performance.

## Navigation & Page Mapping

Below is the navigation structure (`navs`) used in the app. Each item represents a page or section, with notes on backend requirements and missing frontend features.

### Main Navigation

| Title            | Path              | Backend Needs / Notes |
|------------------|------------------|-----------------------|
| Home             | `/`              | School info, featured news/events, stats. Needs API for homepage content. |
| About            | `/about`         | School profile, history, mission. Needs API for about content. |
| Admissions       | `/admissions`    | Requirements, deadlines, forms. Needs endpoints for requirements, application submission, status tracking. |
| Academics        | `/academics`     | Programs, courses, departments. Needs API for academic programs, course lists. |
| Faculty & Staff  | `/faculty`       | Staff profiles, departments. Needs API for faculty/staff directory. |
| Campus & Facilities | `/campus`     | Campus map, facilities info. Needs API for campus details, images. |
| Students Life    | `/students-life` | Clubs, activities, resources. Needs API for student activities, club lists. |
| News             | `/news`          | News articles, categories. Needs API for news list, details, search. |
| Events           | `/events`        | Event list, registration. Needs API for events, registration, reminders. |
| Alumni           | `/alumni`        | Alumni stories, events. Needs API for alumni profiles, events, networking. |
| News Details     | `/news-details`  | Individual news article. Needs API for article details by ID. |
| Event Details    | `/event-details` | Individual event info. Needs API for event details by ID. |
| Privacy          | `/privacy`       | Static/legal content. No backend needed unless dynamic. |
| Terms of Service | `/terms`         | Static/legal content. No backend needed unless dynamic. |
| Starter Page     | `/starter`       | Demo/blank page. No backend needed. |
| Contact          | `/contact`       | Contact form, info. Needs API for submitting messages, listing contacts. |

#### Example NavItem
```ts
const navs: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", subItems: [ ... ] },
  ...
];
```

---

## Technology Stack

- **Framework:** Next.js (React-based)
- **Language:** TypeScript
- **Styling:** CSS, PostCSS
- **UI Components:** Custom components in `/components` and `/src/components`
- **Assets:** Images, icons, and videos in `/public`
- **Routing:** File-based routing via Next.js
- **State Management:** React hooks and context (custom)

---

## Project Structure

```text
components.json
next-env.d.ts
next.config.ts
package.json
postcss.config.mjs
README.md
PROJECT_OVERVIEW.md   # <-- This file
src/
  app/
    ...               # Main application pages and layouts
  components/
    ...               # Feature-specific and shared components
  hooks/
    ...               # Custom React hooks
  lib/
    ...               # Utility libraries
  utils/
    ...               # Validation and helper functions
public/
  ...                 # Images, icons, videos, and static assets
```

---

## Key Folders & Files

### `/src/app/`

This folder contains all main pages and layouts for the application, organized by feature. Each subfolder represents a route in the app, and may contain its own layout and page components.

- **dashboard/**: Dashboard layout and content for logged-in users. Displays personalized information, quick links, and widgets.
- **admissions/**: Admissions information, requirements, and application forms. Users can view deadlines and submit applications.
- **alumni/**: Alumni events, highlights, and stories. Connects past students and showcases their impact.
- **apply/**: Application forms and instructions for prospective students.
- **contact/**: Contact information and forms for reaching out to school administration.
- **events/**: School events and activities, with details and registration options.
- **login/**: Login page and authentication logic.
- **news/**: News articles and updates about the school.
- **privacy/**, **terms/**: Legal and policy pages for compliance.
- **students-life/**: Information about student life, clubs, and activities.

#### Example: Page Component
```tsx
// src/app/admissions/page.tsx
import AdmissionsMain from '../../components/admissions-components/AdmissionsMain';

export default function AdmissionsPage() {
  return (
    <main>
      <AdmissionsMain />
    </main>
  );
}
```

### `/src/components/`

Reusable and feature-specific React components. Organized by feature for maintainability.

- **LoginForm.tsx**: Login form UI, handles user authentication.
- **admissions-components/**: Admissions-related UI components (requirements, deadlines, info requests).
- **alumni-components/**: Alumni-related UI components (events, hero sections, impact stories).
- **application-component/**: Application process components (forms, instructions).
- **contact-components/**: Contact page components (forms, info cards).
- **dashboard/**: Dashboard widgets and UI (charts, quick links).
- **events-components/**: Event-related UI (event cards, registration forms).
- **news-components/**: News article components (listings, details).
- **privacy-components/**: Privacy policy UI.
- **students-components/**: Student life UI (activity cards, club info).
- **ui/**: Shared UI elements (buttons, calendar, modals, etc.).

#### Example: UI Button Component
```tsx
// src/components/ui/button.tsx
import React from 'react';

export default function Button({ children, ...props }) {
  return (
    <button className="btn" {...props}>
      {children}
    </button>
  );
}
```

### `/src/hooks/`

Custom React hooks for form handling, toast notifications, and other reusable logic.

- **UseForm.ts**: Manages form state, validation, and submission.
- **UseToast.tsx**: Handles toast notifications for user feedback.

#### Example: useForm Hook
```ts
// src/hooks/UseForm.ts
import { useState } from 'react';

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  // ...handle changes, validation, submission
  return { values, setValues };
}
```

### `/src/lib/`

Utility libraries for shared logic and helpers.

- **utils.ts**: General utility functions (e.g., formatting, calculations).

### `/src/utils/`

Validation and helper functions for forms and data.

- **validation.ts**: Form and input validation logic (e.g., email, password strength).

### `/public/`

Static assets used throughout the app.

- **Images**: `.webp` files for activities, campus, education, events, blog, students, and more.
- **Icons**: `.svg` files for UI elements.
- **Video**: `video.mp4` for media content.
- **Favicon and Apple Touch Icon**: For browser and mobile support.

---

## Main Features

- **Admissions:** View requirements, deadlines, and apply online. Users can fill out forms, upload documents, and track application status.
- **Alumni:** Explore alumni events, connect with other alumni, and read impact stories. Event registration and networking features.
- **Dashboard:** Personalized dashboard for users, showing relevant info, quick actions, and notifications.
- **Events:** Browse and participate in school events. Event details, registration, and reminders.
- **News:** Stay updated with the latest school news, articles, and announcements.
- **Student Life:** Discover student activities, clubs, and resources. Join clubs and participate in activities.
- **Authentication:** Secure login for users, with form validation and error handling.
- **Contact:** Get in touch with school administration via forms and contact info.
- **Legal:** Privacy and terms pages for compliance and transparency.

---

## Example User Flows

### Admissions Application
1. User visits `/admissions` to view requirements and deadlines.
2. Clicks "Apply Now" to go to `/apply`.
3. Fills out the application form (using components from `application-component/`).
4. Submits the form; receives confirmation and can track status via dashboard.

### Event Registration
1. User browses events on `/events`.
2. Selects an event to view details.
3. Registers for the event using a form from `events-components/`.
4. Receives a confirmation and reminder notification.

### Dashboard Experience
1. After login, user is redirected to `/dashboard`.
2. Sees personalized widgets: upcoming events, application status, news highlights.
3. Can navigate to other features from quick links.

---

## How to Run the Project

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open in browser:**

   Visit `http://localhost:3000` to view the app. locally, and `https://nice-school-fe.vercel.app/` on vercel

---

## Development Notes

- All pages use Next.js file-based routing for easy navigation and scalability.
- Components are modular, reusable, and organized by feature for maintainability.
- Static assets are optimized for fast loading and responsiveness.
- TypeScript provides type safety and helps prevent runtime errors.
- Custom hooks simplify state management and user feedback.
- CSS and PostCSS allow for advanced styling and responsive design.

---

## Customization & Extension

- **Add new features:** Create new components in `/src/components` and new pages in `/src/app`.
- **Update styles:** Edit `/src/app/globals.css` or use PostCSS for custom styling.
- **Add assets:** Place images, icons, or videos in `/public` for use in any part of the app.
- **Integrate APIs:** Connect to backend services for dynamic data (e.g., admissions status, event info).
- **Localization:** Add support for multiple languages by organizing content and using i18n libraries.
- **Accessibility:** Ensure all components are accessible (ARIA roles, keyboard navigation).

---

## Best Practices & Design Decisions

- **Modular Architecture:** Each feature is separated into its own folder for clarity and scalability.
- **Reusable UI:** Shared UI components (buttons, modals, forms) are placed in `/src/components/ui`.
- **Type Safety:** TypeScript is used throughout for safer code and easier refactoring.
- **Performance:** Static assets are optimized, and code splitting is leveraged via Next.js.
- **Responsive Design:** All pages and components are designed to work on desktop and mobile.

---

## Example: Extending the Project

Suppose you want to add a "Faculty" section:

1. Create a new folder `/src/app/faculty/` with `page.tsx` and any needed components.
2. Add UI components in `/src/components/faculty-components/`.
3. Update navigation to include links to the new section.
4. Add images or documents to `/public` as needed.

---

## Summary

`niceSchool-fe` is a robust, scalable frontend application designed to cover all aspects of school management and engagement. Its modular structure, modern tech stack, and comprehensive feature set make it easy to maintain, extend, and use for any educational institution. The project is ready for customization and further development, supporting a wide range of user needs and workflows.

For more details, explore the folders and files described above, review the example code snippets, or reach out to the project maintainers.

---

## Backend Developer Guide

For each major page/feature, backend developers should provide:

- **RESTful APIs** for all dynamic content (CRUD for news, events, admissions, etc.)
- **Authentication endpoints** (login, registration, session management)
- **Role-based access control** (admin, student, alumni, staff)
- **File upload support** (documents for admissions, images for news/events)
- **Pagination, filtering, and search** for lists (news, events, faculty)
- **Error handling and validation** (clear error messages, status codes)
- **Notifications** (email, in-app for events, admissions status)

### Example API Endpoints Needed

| Feature         | Endpoint Example                | Method | Description |
|-----------------|---------------------------------|--------|-------------|
| News List       | `/api/news`                    | GET    | Get all news articles |
| News Details    | `/api/news/:id`                | GET    | Get single article |
| Events List     | `/api/events`                  | GET    | Get all events |
| Event Register  | `/api/events/:id/register`     | POST   | Register for event |
| Admissions Req. | `/api/admissions/requirements` | GET    | Get requirements |
| Apply           | `/api/apply`                   | POST   | Submit application |
| Faculty List    | `/api/faculty`                 | GET    | Get faculty profiles |
| Contact Submit  | `/api/contact`                 | POST   | Submit contact form |

---

## Missing or Needed Frontend Features

- **Academics page**: `/academics` route and UI components are missing. Needs backend API for programs/courses.
- **Faculty & Staff page**: `/faculty` route and UI components are missing. Needs backend API for staff directory.
- **Campus & Facilities page**: `/campus` route and UI components are missing. Needs backend API for campus info.
- **News Details & Event Details**: Dynamic routing and detail pages for individual news/events. Needs backend API for fetching by ID.
- **Starter Page**: `/starter` exists as a template, but can be customized for demos.
- **Authentication**: Ensure login/register flows are fully integrated with backend.
- **Role-based dashboards**: Different dashboard views for students, staff, alumni, admin.
- **Notifications**: UI for in-app and email notifications.
- **Search and filtering**: For news, events, faculty, etc.
- **Error handling**: User-friendly error messages for failed API calls.
- **Loading states**: Skeletons/spinners for async data.

---

## Backend Data Models (Suggestions)

### News
```ts
interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  category?: string;
}
```

### Event
```ts
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  registrationOpen: boolean;
}
```

### Admission Application
```ts
interface Application {
  id: string;
  applicantName: string;
  email: string;
  documents: string[];
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: string;
}
```

### Faculty
```ts
interface Faculty {
  id: string;
  name: string;
  department: string;
  profileImage?: string;
  bio?: string;
}
```

---

## Integration Recommendations

- Use JWT or OAuth for authentication and session management.
- Document all API endpoints with OpenAPI/Swagger for easy frontend integration.
- Provide mock data or API documentation for frontend development.
- Use consistent naming conventions and error formats.
- Enable CORS for frontend-backend communication during development.
- Set up CI/CD for backend deployment and API versioning.

---

## Collaboration Workflow

1. **Define API contracts**: Frontend and backend agree on endpoints, data models, and error formats.
2. **Mock APIs**: Use tools like Mockoon or Swagger to simulate backend during frontend development.
3. **Iterative integration**: Backend exposes endpoints, frontend consumes and tests them.
4. **Regular syncs**: Weekly meetings to review progress, blockers, and new requirements.
5. **Documentation**: Keep API docs and frontend usage guides up to date.

---

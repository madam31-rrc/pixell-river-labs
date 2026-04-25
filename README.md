# Pixell River Financial - Labs

Staff and Organization application for Pixell River Financial company.

## Project Overview
This project is a series of labs building a full-stack employee directory application, 
starting with basic HTML/CSS and progressing to a React application with state management 
and form handling.


## Labs
- Lab 1.1: Employee Directory (HTML/CSS and React versions)
**Branch:** `fs_lab-1.1`

Created a static employee directory using:
- Semantic HTML5 (header, main, footer)
- CSS styling with modern design
- JavaScript to dynamically populate employee lists from data
- Organized employees by departments

### Lab 1.2: Employee Directory (React Version)
**Branch:** `fs_lab-1.2`

Recreated the employee directory using React with TypeScript:
- Initialized React app with Vite
- Created reusable React components (Header, Footer, EmployeeList, DepartmentSection)
- Implemented TypeScript interfaces for type safety
- Component-based architecture for maintainability

### Lab 2.1: Add Employee Form with State Management
**Branch:** `fs_lab-2.1`

Extended the React application with interactive form functionality:
- Implemented React state management using `useState`
- Created form to add new employees dynamically
- Added real-time form validation
- Lifted state to App component for shared data access

### Lab 2.2: React Router Navigation
**Branch:** `fs_lab-2.2`

Implemented client-side routing to navigate between multiple pages:
- Installed and configured React Router DOM
- Created Organization page displaying leadership and management
- Built navigation system with shared layout
- Implemented proper route structure

### Lab 3.1: Hook-Service-Repository Architecture
**Branch:** `fs_lab-3.1`

### Lab 3.2: Organization Management with Architecture Pattern
**Branch:** `fs_lab-3.2`

Applied the Hook-Service-Repository architecture pattern to the Organization page, mirroring the pattern from Lab 3.1:

**Architecture Implementation:**

1. **Repository Layer** (`organizationRepo`)
   - Manages leadership/role data
   - Checks if roles are already occupied
   - Prevents duplicate role assignments
   - Single source of truth for organization data

2. **Service Layer** (`organizationService`)
   - Validates role data before creation
   - Ensures first name has at least 3 characters
   - Prevents adding people to already-occupied roles
   - Returns structured validation results

3. **Hook Layer** (`useRoleFormInput`)
   - Manages form state for adding new roles
   - Handles form submission and validation
   - Displays error messages
   - Clears form after successful submission

**Key Features:**
- **Add Leadership Role Form** with validation
- **Duplicate Role Prevention**: Cannot add someone to an already-occupied role
- **Real-time Validation**: Shows errors immediately
- **Consistent Architecture**: Same pattern as employee management
- **Type Safety**: TypeScript interfaces throughout

**Validation Rules:**
- First name must be at least 3 characters
- Last name is required
- Role is required (text input)
- Role must not already be occupied by another person

**File Structure:**
```
src/
├── hooks/
│   └── useRoleFormInput.ts         # Role form state management
├── services/
│   └── organizationService.ts      # Role validation logic
├── repositories/
│   └── organizationRepo.ts         # Organization data management
└── components/
    └── AddRoleForm.tsx             # Form component for adding roles
```

**Concepts Reinforced:**
- Reusability of architectural patterns
- Separation of concerns across different features
- Consistent code organization
- TypeScript for type safety
- Custom validation logic (role uniqueness)

**Deployed:** [View Live Application](https://pixell-river-labs-cyan.vercel.app/)

---

### Lab 4.2: Database, Full-Stack Integration, and Authentication
**Branch:** `fs_lab-4.2`

#### What change I wanted to make in my application

The application had been entirely stateless — data lived in hardcoded TypeScript arrays in both the frontend and the backend, meaning every page refresh reset the state and the two sides of the app were never actually talking to each other. I wanted to replace all of that with a real database-backed system: a PostgreSQL database managed through Prisma ORM, a live REST API the frontend actually fetches from, and an authentication layer so that not everyone on the internet could add or delete entries. The end goal was to turn a static prototype into something that behaves like a real production application — persisted data, protected routes, and users who have distinct roles and permissions.

#### What tools I made use of to make this change

The primary tool was **Prisma ORM**, which I used to define the `Department`, `Employee`, and `OrganizationRole` database models in a schema file, generate and run SQL migrations against a local **PostgreSQL** database, and write a seed script that populated the database with all the data that had previously been hardcoded in the frontend. On the backend I updated the repository layer to use `PrismaClient` with the `@prisma/adapter-pg` driver adapter for the PostgreSQL connection. For authentication and authorization I integrated **Clerk**, specifically `@clerk/react` on the frontend and `@clerk/express` on the backend. Clerk handles the full sign-in/sign-up flow, issues session tokens, and manages the concept of Organizations and Roles (`org:admin`, `org:member`). On the frontend a **Vite proxy** was configured so all `/api` requests forward to the Express server without any hardcoded URLs or CORS issues.

#### How this change affects the user experience

Before this lab, users saw the same hardcoded list every time and any employee they added disappeared on the next reload. Now the data is real and persistent — employees and roles survive page refreshes and are shared across every browser that connects to the app. Authentication adds a clear distinction between what different visitors can do: unauthenticated guests can browse the directory but both form areas show a polished "Sign In Required" card instead of the form, making the restriction obvious rather than confusing. Signed-in members gain the ability to add new entries. Users who hold the `org:admin` role in the Clerk organization see inline Edit and Delete controls appear on every employee row and every leadership role card, letting them modify or remove records directly in the list without navigating away. The result is a layered, role-aware experience where the interface itself reflects what each person is allowed to do.

#### How this change affects my understanding of the application

Working through this lab forced me to think of the application as three genuinely separate systems — a browser client, a stateless API server, and a database — rather than one monolithic React app that happened to have a backend file nearby. The Prisma schema made me formalize something I had only thought about loosely before: what the data actually *is*, not just what it looks like on screen. Writing migrations and a seed script clarified that the shape of the database is a deliberate design decision that needs to be versioned and reproducible. Clerk's organization model pushed me further by adding a fourth dimension — *identity* — to the architecture. The fact that a route can be simultaneously public, authenticated-only, and admin-only depending on which middleware sits in front of it changed how I think about APIs. Authorization is not an afterthought you add at the end; it is part of the route design from the beginning. The whole lab reframed the app in my mind from "a React component tree that displays data" to "a system with boundaries, permissions, and a durable state that exists independently of any single user's session."
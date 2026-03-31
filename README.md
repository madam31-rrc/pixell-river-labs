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
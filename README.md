# Maskan AI — Frontend Platform

An AI-powered student housing platform engineered for university students, property owners, and administrators in Egypt. Built with **React 18**, **TypeScript**, and **TailwindCSS**, following the **Warm Earthy Minimalist** design system.

---

## Key Features

- **Natural Language Search**: Extracts search constraints (budget, walking distance, bedrooms, amenities) from free-form text via AI.
- **AI Match Score**: Calculates compatibility between student preferences, academic faculty gates, and property features.
- **AI Lease Analyzer**: Evaluates lease agreement drafts (PDF/TXT) for predatory clauses, risk scoring, and legal recommendations.
- **Property Comparison Matrix**: Side-by-side comparison for student roommates (rent per student share, deposit, walk distance, amenities).
- **Tour Scheduling & Direct Messaging**: Real-time messaging with verified landlords and guided tour requests.
- **Role-Based Portals**: Tailored interfaces for `STUDENT`, `OWNER`, and `ADMIN`/`SUPERVISOR`.

---

## Architecture & Folder Structure

The project follows a **Feature-Based Modular Architecture** with strict separation of concerns:

```text
src/
├── api/                   # API client (Axios + interceptors) & services per domain
├── components/            # Shared reusable UI primitives and layout shells
│   ├── layout/            # Navbar, Footer, ProtectedRoute
│   └── ui/                # Button, Input, Modal, FileUpload, Card, Badge, Toast
├── context/               # State management (Auth, Favorites, Compare, Toast)
├── features/              # Decoupled domain feature modules
│   ├── auth/              # Login, Register, Role onboarding
│   ├── home/              # Hero, Search, Campus neighborhoods, Featured
│   ├── explore/           # Advanced filters, Search results, Listing cards
│   ├── details/           # Property details, Photos, Financial breakdown, Modals
│   ├── compare/           # Cohort sync, AI recommendations, Comparison table
│   ├── lease-analyzer/    # Document upload, Risk gauge, Clause breakdown
│   ├── ai-match/          # Academic compatibility quiz & ranking
│   ├── messages/          # Direct chat threads with landlords
│   ├── viewings/          # Tour appointments and feedback
│   ├── owner-dashboard/   # Property wizard, Document verification upload
│   └── admin-dashboard/   # Verification queue, User management, Moderation
├── types/                 # Unified TypeScript interfaces
└── utils/                 # Formatters and validation utilities
```

---

## Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KhaledYasser3/Maskan_AI-.git
   cd Maskan_AI-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   *Default API URL:* `VITE_API_BASE_URL=https://student-housing-backend-api.azurewebsites.net/api/v1`

4. **Start development server:**
   ```bash
   npm run dev
   ```
   The application runs on `http://localhost:3000/`.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## Quick Demo Accounts

The login page (`/login`) includes one-click access for all three roles:
- **Student**: `student@cu.edu.eg` / `password123`
- **Owner**: `owner@dokki-realestate.com` / `password123`
- **Admin**: `admin@maskan-ai.edu.eg` / `password123`

---

## License

This project is licensed under the MIT License.
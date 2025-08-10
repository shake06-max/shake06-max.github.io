# Liquor Quest - Kenya's Premier Online Liquor Store

## Overview

Liquor Quest is a full-stack e-commerce platform specifically designed for the Kenyan liquor market. The application enables customers to browse, search, and purchase premium wines, spirits, and beers with delivery across Nairobi and major cities. The platform features user authentication, shopping cart functionality, order management, and an admin panel for inventory management.

The application serves the Kenyan market with localized features including M-Pesa payment integration support, Kenyan phone number validation (+254 format), and region-specific product categorization. It emphasizes responsible drinking (18+ only) and provides a premium shopping experience for liquor enthusiasts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing, chosen over React Router for simplicity
- **State Management**: TanStack Query (React Query) for server state management, eliminating the need for Redux/Zustand for most use cases
- **UI Framework**: shadcn/ui components built on Radix UI primitives and Tailwind CSS for consistent, accessible design
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for the REST API
- **Language**: TypeScript throughout the stack for consistency and type safety
- **Authentication**: Replit Auth integration with session-based authentication using PostgreSQL session storage
- **API Design**: RESTful endpoints with proper HTTP status codes and JSON responses
- **Middleware**: Custom logging middleware for API request tracking and error handling

### Database Design
- **Primary Database**: PostgreSQL with Neon serverless hosting for scalability
- **ORM**: Drizzle ORM chosen for type safety, performance, and excellent TypeScript integration
- **Schema Design**: Relational model with proper foreign key constraints
  - Users table (mandatory for Replit Auth)
  - Categories and Products with hierarchical relationship  
  - Shopping cart with user-product associations
  - Orders and OrderItems for transaction management
  - Sessions table for authentication state

### Authentication & Authorization
- **Provider**: Replit Auth with OpenID Connect flow
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Authorization**: Role-based access control with admin privileges
- **Security**: HTTP-only cookies, CSRF protection, and secure session handling

### Build & Development Tools
- **Build Tool**: Vite for fast development and optimized production builds
- **Package Manager**: npm with package-lock.json for reproducible installs
- **TypeScript**: Strict configuration with path aliases for clean imports
- **Code Quality**: ESBuild for production bundling with platform-specific optimizations

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production scalability
- **Connection Pool**: @neondatabase/serverless with WebSocket support for serverless environments

### Authentication Services  
- **Replit Auth**: Integrated OpenID Connect authentication provider
- **Passport.js**: Authentication middleware for Express with OpenID Connect strategy

### UI Component Library
- **Radix UI**: Comprehensive set of accessible, unstyled React components
- **Lucide Icons**: Modern icon library for consistent iconography
- **Font Awesome**: Additional icons for enhanced visual design

### Development & Build Tools
- **Vite Plugins**: React plugin, runtime error overlay, and Replit-specific cartographer
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer plugins

### Form & Data Management
- **React Hook Form**: Performance-optimized form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **TanStack Query**: Powerful data fetching and caching solution for React

### Styling & Design
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Class Variance Authority**: Utility for managing component variants
- **clsx & tailwind-merge**: Conditional className utilities for dynamic styling

### Date & Utility Libraries
- **date-fns**: Modern date utility library for JavaScript
- **nanoid**: URL-safe unique string ID generator for session management

The architecture prioritizes type safety, developer experience, and scalability while maintaining simplicity in deployment and maintenance. The choice of serverless-first technologies (Neon, Vercel-compatible build) ensures cost-effective scaling for the Kenyan market.
# FlowrSpot

A Next.js web application designed to help users explore and discover various flowers in their surroundings.

---

## Installation

Follow these steps to set up the project:

### Prerequisites

- **Node.js** (v18 or higher is recommended)
- **npm** (comes with Node.js)

### Steps to Install

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Webpage: http://localhost:3000
4. API Endopint: http://localhost:3000/swagger

---

## Scripts

The project contains various npm scripts for different tasks:

| Command              | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| `npm run`**`dev`**   | Runs the app in development mode using **Turbopack** for faster builds |
| `npm run`**`build`** | Builds the production-ready app                                        |
| `npm run`**`start`** | Starts the built app in production mode                                |
| `npm run`**`test`**  | Runs the tests in watch mode using Jest                                |

---

## Libraries

This project leverages a curated set of libraries to enhance functionality and development efficiency:

| Library               | Version | Purpose                                       |
| --------------------- | ------- | --------------------------------------------- |
| **`Next`**            | 15.1.5  | React framework for server-rendered apps      |
| **`React`**           | 19.0.0  | Library for building user interfaces          |
| **`TypeScript`**      | 5       | Typed superset of JavaScript                  |
| **`Axios`**           | 1.7.9   | HTTP client for API requests                  |
| **`Zustand`**         | 5.0.3   | Lightweight state management                  |
| **`react-hook-form`** | 7.54.2  | Flexible form handling                        |
| **`Zod`**             | 3.24.1  | Schema validation library                     |
| **`TailwindCSS`**     | 3.4.1   | Utility-first CSS framework                   |
| **`Shadcn`**          | N/A     | Pre-built UI components based on Radix UI     |
| **`Jest`**            | 29.7.0  | Testing framework for unit and snapshot tests |

---

## Folder Structure

The project is organized to ensure scalability and maintainability.

```
flowrspot/
├── app/                # Next.js pages and routes
├── assets/             # Static assets such as images and icons
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks for shared logic
├── lib/                # Utility functions and API client
├── schemas/            # Zod schemas for validation
├── store/              # Zustand state management
├── styles/             # Global and Tailwind CSS styles
├── tests/              # Test files (unit and snapshot tests)
├── types/              # TypeScript type definitions
├── components.json     # Shadcn component configuration
├── jest.config.js      # Jest configuration for testing
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

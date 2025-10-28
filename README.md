# IT Legend Task - Course Details Page

An assessment task for IT Legend showcasing a comprehensive course details page built with Next.js 15. The page features video lessons, interactive quizzes, leaderboards, and community engagement through comments, all powered by DummyJSON and mock data.

🔗 **Live Demo**: [https://it-legend-task-omega.vercel.app/](https://it-legend-task-omega.vercel.app/)

## 🚀 Features

### Core Functionality
- **📚 Course Management**: Browse and access course content with dynamic routing
- **🎥 Video Player**: Watch course videos with an integrated video player using Vidstack
- **📝 Interactive Topics**: Navigate through course topics with progress tracking
- **❓ Quiz System**: Test your knowledge with interactive quizzes and instant feedback
- **🏆 Leaderboard**: Compete with other learners and track your ranking
- **💬 Comments Section**: Engage with the community through course comments

### Technical Features
- **State Management**: Efficient state handling with Zustand
- **Data Fetching**: React Query (TanStack Query) for server state management
- **Mock Data Integration**: DummyJSON API and custom mock data for demonstration
- **Form Handling**: Formik with Zod validation for robust form management
- **Error Boundaries**: Graceful error handling with React Error Boundary
- **Modern UI**: Responsive design with Tailwind CSS and Radix UI components
- **Type Safety**: Full TypeScript support for enhanced developer experience

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.5.5](https://nextjs.org/) with Turbopack
- **Language**: TypeScript 5
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4 with custom animations
- **State Management**: Zustand 5.0.8
- **Data Fetching**: TanStack React Query 5.90.5
- **Form Management**: Formik 2.4.6 + Zod 4.1.12
- **Video Player**: Vidstack React 1.12.13
- **UI Components**: Radix UI (Dialog, Visually Hidden)
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── courses/[id]/      # Dynamic course pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (redirects to courses)
│   └── provider.tsx       # App providers (React Query, etc.)
├── components/            # Reusable UI components
├── features/              # Feature-based modules
│   ├── comments/          # Comments functionality
│   ├── course/            # Course details and materials
│   ├── leaderboard/       # Leaderboard system
│   ├── questions/         # Questions module
│   └── topics/            # Topics and video player
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── lib/                   # Third-party library configurations
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🚦 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hussein-AbdElRazek/it-legend-task.git
cd it-legend-task
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your environment variables:
```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

The app will automatically redirect to the first course (`/courses/1`).

### Build

Build the application for production:

```bash
npm run build
# or
yarn build
```

### Production

Start the production server:

```bash
npm start
# or
yarn start
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
# or
yarn lint
```

## 🎯 Key Features Breakdown

### Course Page (`/courses/[id]`)
The main course page includes:
- **Topic Video Player**: Watch the current topic's video
- **Topics Section**: Navigate through all course topics, files and quizzes
- **Comments**: Engage with other learners
- **Questions Modal**: Access questions
- **Leaderboard**: View rankings and compete

## 🔧 Development Tools

- **React Query Devtools**: Enabled in development for debugging server state
- **Turbopack**: Fast bundler for development and production builds
- **ESLint**: Code quality and consistency
- **TypeScript**: Type checking and IntelliSense

## 📦 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

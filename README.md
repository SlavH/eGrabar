# Egrabar

Egrabar is a comprehensive educational platform dedicated to the preservation and teaching of Grabar (Classical Armenian). Built with a modern tech stack, it provides a centralized hub for linguistic resources, courses, video content, and organizational updates.

## Core Features

- **Digital Library:** Access and browse a collection of digital books and classical resources.
- **Course Management:** Platform for hosting and managing classical Armenian educational courses.
- **Video Hub:** Media center featuring presentations, lectures, and educational videos.
- **Multilingual Support:** Seamless localization between Armenian and English.
- **Dynamic News Feed:** Real-time updates and announcements from the community center.
- **Admin Dashboard:** Intuitive content management system to manage books, courses, events, and news articles.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React/TypeScript)
- **Database/Backend:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Content Management:** CKEditor 5
- **Payments:** Stripe Integration

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/SlavH/eGrabar.git
   cd eGrabar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env.local` file in the root directory.
   - Add your environment-specific variables:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     STRIPE_SECRET_KEY=your_stripe_key
     ```

4. Database Setup:
   - Apply the SQL scripts located in the root directory to your Supabase project to ensure Row Level Security (RLS) is correctly configured:
     - `fix_storage_rls.sql`
     - `remove_descriptions.sql`

5. Development server:
   ```bash
   npm run dev
   ```

## Deployment
This project is built for production deployment on platforms supporting Next.js, such as [Vercel](https://vercel.com/). Ensure all environment variables are correctly configured in your deployment settings.

To create a production build:
```bash
npm run build
```

## Licensing
This project is for educational use. Please check with the maintainers for specific usage permissions.

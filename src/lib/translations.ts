export const translations = {
  "en": {
    "nav": {
      "home": "Home",
      "library": "Library",
      "videos": "Video Hub",
      "presentations": "Presentations",
      "courses": "Courses",
      "news": "News",
      "contacts": "Contacts",
      "amaras": "Amaras Center",
      "donate": "Donate"
    },
    "home": {
      "tagline": "Preserving Armenian Scientific Heritage",
      "title": "eGrabar",
      "subtitle": "A sanctuary for Armenian scholarship, preserving centuries of scientific achievement and cultural knowledge for future generations.",
      "explore": "Explore the Library",
      "about": "About eGrabar",
      "scroll": "Scroll to explore"
    },
    "sections": {
      "library": "Library",
      "libraryDesc": "Access thousands of research papers, manuscripts, and historical documents.",
      "videoHub": "Video Hub",
      "videoHubDesc": "Watch educational lectures, documentary videos and scientific presentations.",
      "courses": "Courses",
      "coursesDesc": "Join upcoming courses and seminars with leading Armenian scholars."
    },
    "library": {
      "search": "Search books, papers, manuscripts...",
      "noResults": "No books found",
      "noResultsHint": "Try adjusting your search or filter criteria",
      "preview": "Preview",
      "download": "Download"
    },
    "common": {
      "learnMore": "Learn more",
      "viewAll": "View all"
    }
  },
  "hy": {
    "nav": {
      "home": "Գլխավոր",
      "library": "Գրադարան",
      "videos": "Տեսանյութեր",
      "presentations": "Ներկայացումներ",
      "courses": "Դասընթացներ",
      "news": "Լրաշար",
      "contacts": "Կոնտակտներ",
      "amaras": "Ամարաս",
      "donate": "Նվիրաբերեք"
    },
    "home": {
      "tagline": "Պահպանելով դարերի գիտական նվաճումները և մշակութային գիտելիքները սերունդների համար:",
      "title": "eGrabar",
      "subtitle": "A sanctuary for Armenian scholarship",
      "explore": "Explore Library",
      "about": "About eGrabar",
      "scroll": "Scroll"
    },
    "sections": {
      "library": "Library",
      "libraryDesc": "Access thousands of documents",
      "videoHub": "Video Hub",
      "videoHubDesc": "Watch videos",
      "courses": "Courses",
      "coursesDesc": "Join courses"
    },
    "library": {
      "search": "Search",
      "noResults": "No results",
      "noResultsHint": "Try adjusting",
      "preview": "Preview",
      "download": "Download"
    },
    "common": {
      "learnMore": "Learn more",
      "viewAll": "View all"
    }
  }
} as const;

export type Language = 'en' | 'hy';

type Nav = { home: string; library: string; videos: string; presentations: string; courses: string; news: string; contacts: string; amaras: string; donate: string };
type Home = { tagline: string; title: string; subtitle: string; explore: string; about: string; scroll: string };
type Sections = { library: string; libraryDesc: string; videoHub: string; videoHubDesc: string; courses: string; coursesDesc: string };
type Library = { search: string; noResults: string; noResultsHint: string; preview: string; download: string };
type Common = { learnMore: string; viewAll: string };

export interface Translation {
  nav: Nav;
  home: Home;
  sections: Sections;
  library: Library;
  common: Common;
}
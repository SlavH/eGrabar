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
    "contacts": {
      "contactUsAt": "Contact us at:",
      "whatsappViber": "Whatsapp Viber",
      "facebook": "Facebook",
      "instagram": "Instagram"
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
      "presentations": "Presentations",
      "presentationsDesc": "Access PowerPoint presentations and slides from our educational programs.",
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
      "viewAll": "View all",
      "noVideosYet": "No videos yet",
      "noVideosHint": "Check back soon for educational content",
      "noPresentationsYet": "No presentations yet",
      "noPresentationsHint": "Check back soon for slide decks",
      "noEventsYet": "No upcoming events",
      "noEventsHint": "Check back soon for scheduled courses and seminars",
      "instructor": "Instructor:",
      "join": "Join",
      "download": "Download",
      "noNews": "No news yet."
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
    "contacts": {
      "contactUsAt": "Կապնվեք մեզ հետ՝",
      "whatsappViber": "Whatsapp Viber",
      "facebook": "Facebook",
      "instagram": "Instagram"
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
      "library": "Գրադարան",
      "libraryDesc": "Մուտք գործեք հազարավոր հետազոտությունների, ձեռագրերի և պատմական փաստաթղթերի:",
      "videoHub": "Տեսանյութեր",
      "videoHubDesc": "Դիտեք կրթություն դասընթացներ, փաստագրական տեսանյութեր և գիտական ներկայացումներ:",
      "presentations": "Ներկայացումներ",
      "presentationsDesc": "Մուտք գործեք PowerPoint ներկայացումներ և սլայդեր մեր կրթական ծրագրերից:",
      "courses": "Դասընթացներ",
      "coursesDesc": "Միանացեք գալիք դասընթացներին և սեմինարներին հայ գիտնականների հետ:"
    },
    "common": {
      "learnMore": "Իմանալ ավելին",
      "viewAll": "Տեսնել բոլորը",
      "noVideosYet": "Դեռ տեսանյութեր չկան",
      "noVideosHint": "Ստուգեք շուտով կրթական բովանդակությունը",
      "noPresentationsYet": "Դեռ ներկայացումներ չկան",
      "noPresentationsHint": "Ստուգեք շուտով սլայդերի հավաքածուն",
      "noEventsYet": "Դեռ իրադարձություններ չկան",
      "noEventsHint": "Ստուգեք շուտով նախատեսված դասընթացներն ու սեմինարները",
      "instructor": "Վարորդ",
      "join": "Միանալ",
      "download": "Ներբեռնել",
      "noNews": "Լրումներ չկան"
    },
    "library": {
      "search": "Որոնել գրքեր, հոդվածներ, ձեռագրեր...",
      "noResults": "Գրքեր չեն գտնվել",
      "noResultsHint": "Փորձեք փոխել որոնման չափանիշները",
      "preview": "Դիտել",
      "download": "Ներբեռնել"
    }
  }
} as const;

export type Language = 'en' | 'hy';

type Nav = { home: string; library: string; videos: string; presentations: string; courses: string; news: string; contacts: string; amaras: string; donate: string };
type Contacts = { contactUsAt: string; whatsappViber: string; facebook: string; instagram: string };
type Home = { tagline: string; title: string; subtitle: string; explore: string; about: string; scroll: string };
type Sections = { library: string; libraryDesc: string; videoHub: string; videoHubDesc: string; presentations: string; presentationsDesc: string; courses: string; coursesDesc: string };
type Library = { search: string; noResults: string; noResultsHint: string; preview: string; download: string };
type Common = { learnMore: string; viewAll: string; noVideosYet: string; noVideosHint: string; noPresentationsYet: string; noPresentationsHint: string; noEventsYet: string; noEventsHint: string; instructor: string; join: string; download: string; noNews: string };

export interface Translation {
  nav: Nav;
  contacts: Contacts;
  home: Home;
  sections: Sections;
  library: Library;
  common: Common;
}
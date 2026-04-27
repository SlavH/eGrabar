export const translations = {
  en: {
    nav: {
      home: 'Home',
      library: 'Library',
      videos: 'Video Hub',
      presentations: 'Presentations',
      history: 'History',
      courses: 'Courses',
      news: 'News',
      contacts: 'Contacts',
      amaras: 'Amaras Center',
      donate: 'Donate',
    },
    home: {
      tagline: 'Preserving Armenian Scientific Heritage',
      title: 'eGrabar',
      subtitle: 'A sanctuary for Armenian scholarship, preserving centuries of scientific achievement and cultural knowledge for future generations.',
      explore: 'Explore the Library',
      about: 'About eGrabar History',
      scroll: 'Scroll to explore',
    },
    sections: {
      library: 'Library',
      libraryDesc: 'Access thousands of research papers, manuscripts, and historical documents.',
      videoHub: 'Video Hub',
      videoHubDesc: 'Watch educational lectures, documentary videos and scientific presentations.',
      courses: 'Courses',
      coursesDesc: 'Join upcoming courses and seminars with leading Armenian scholars.',
    },
    library: {
      search: 'Search books, papers, manuscripts...',
      noResults: 'No books found',
      noResultsHint: 'Try adjusting your search or filter criteria',
      preview: 'Preview',
      download: 'Download',
    },
    common: {
      learnMore: 'Learn more',
      viewAll: 'View all',
    },
  },
  hy: {
    nav: {
      home: 'Գլխավոր',
      library: 'Գրադարան',
      videos: 'Տեսանյութեր',
      presentations: 'Ներկայացումներ',
      history: 'Պատմություն',
      courses: 'Դասընթացներ',
      news: 'Լրաշ',
      contacts: 'Կապ',
      amaras: 'Ամարաս կենտրոն',
      donate: 'Նվիրաբերեք',
    },
    home: {
      tagline: 'Պահպանելով հայկական գիտական ժառանգությունը',
      title: 'Լրաշ',
      subtitle: 'Հայկական գիտության տաճար, պահպանելով դարերի գիտական նվաճումները և մշակութային գիտելիքները սերունդների համար.',
      explore: 'Ուսումնասիրել Գրադարանը',
      about: 'Լրաշ պատմության մասին',
      scroll: 'Սահեք ուսումնասիրելու համար',
    },
    sections: {
      library: 'Գրադարան',
      libraryDesc: 'Մուտք գործեք հազարավոր հետազոտությունների, ձեռագրերի և պատմական փաստաթղթերի:',
      videoHub: 'Տեսանյութեր',
      videoHubDesc: 'Դիտեք կրթական դասախոսություններ, դոկումենտալ տեսանյութեր և գիտական ներկայացումներ:',
      courses: 'Դասընթացներ',
      coursesDesc: 'Միակցվեք վերջին դասընթացներին և սեմինարներին հայտնի հայ գիտնականների հետ:',
    },
    library: {
      search: 'Որոնել գրքեր, հոդվածներ, ձեռագրեր...',
      noResults: 'Գրքեր չեն գտնվել',
      noResultsHint: 'Փորձեք որոնումը կամ ֆիլտրի չափանիշները փոփոխել',
      preview: 'Դիտել',
      download: 'Ներբեռնել',
    },
    common: {
      learnMore: 'Ավելին իմանալ',
      viewAll: 'Տեսնել բոլորը',
    },
  },
} as const;

export type Language = 'en' | 'hy';

type Nav = { home: string; library: string; videos: string; presentations: string; history: string; courses: string; news: string; contacts: string; amaras: string; donate: string };
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
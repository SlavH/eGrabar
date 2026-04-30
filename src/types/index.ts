export interface Book {
  id: string;
  title_en: string;
  title_hy: string;
  author_en: string;
  author_hy: string;
  description_en: string;
  description_hy: string;
  pdf_file: string;
  created_at: string;
}

export interface Video {
  id: string;
  title_en: string;
  title_hy: string;
  description_en: string;
  description_hy: string;
  created_at: string;
}

export interface Presentation {
  id: string;
  title_en: string;
  title_hy: string;
  description_en: string;
  description_hy: string;
  pdf_file: string;
  created_at: string;
}

export interface Event {
  id: string;
  title_en: string;
  title_hy: string;
  description_en: string;
  description_hy: string;
  date: string;
  time: string;
  link: string;
  instructor_en: string;
  instructor_hy: string;
  created_at: string;
}

export interface News {
  id: string;
  title_en: string;
  title_hy: string;
  content_en: string;
  content_hy: string;
  created_at: string;
}

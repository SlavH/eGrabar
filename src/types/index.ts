export interface Book {
  id: string;
  title: string;
  title_en?: string;
  title_hy?: string;
  author: string;
  author_en?: string;
  author_hy?: string;
  description: string;
  description_en?: string;
  description_hy?: string;
  category: string;
  category_en?: string;
  category_hy?: string;
  cover_url: string;
  pdf_url: string;
  created_at: string;
  views: number;
}

export interface Video {
  id: string;
  title: string;
  title_en?: string;
  title_hy?: string;
  description: string;
  description_en?: string;
  description_hy?: string;
  thumbnail_url: string;
  video_url: string;
  youtube_id?: string;
  duration: number;
  created_at: string;
  views: number;
}

export interface Presentation {
  id: string;
  title: string;
  title_en?: string;
  title_hy?: string;
  description: string;
  description_en?: string;
  description_hy?: string;
  thumbnail_url: string;
  pptx_url: string;
  created_at: string;
  views: number;
}

export interface Event {
  id: string;
  title: string;
  title_en?: string;
  title_hy?: string;
  description: string;
  description_en?: string;
  description_hy?: string;
  date: string;
  time: string;
  zoom_link: string;
  instructor: string;
  instructor_en?: string;
  instructor_hy?: string;
  created_at: string;
}

export interface News {
  id: string;
  title: string;
  title_en?: string;
  title_hy?: string;
  content: string;
  content_en?: string;
  content_hy?: string;
  created_at: string;
}

export interface Donation {
  id: string;
  donor_name: string;
  amount: number;
  message?: string;
  created_at: string;
  anonymous: boolean;
}

export interface DonationGoal {
  id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  description: string;
}
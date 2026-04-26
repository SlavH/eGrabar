export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  cover_url: string;
  pdf_url: string;
  created_at: string;
  views: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
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
  description: string;
  thumbnail_url: string;
  pptx_url: string;
  created_at: string;
  views: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  zoom_link: string;
  instructor: string;
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

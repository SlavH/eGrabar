-- Add youtube_url to videos
ALTER TABLE videos ADD COLUMN IF NOT EXISTS youtube_url TEXT;

-- Update terminology (SQL comments/metadata would go here, but this is DB level)

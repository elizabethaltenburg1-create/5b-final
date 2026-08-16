export type Webinar = {
  id: number;
  webinar_name: string;
  webinar_date: string;
  registrations: number;
  attendees: number;
  engagement_score: string | null;
  lead_priority: string | null;
  bdr_guidance?: string | null;
  guidance_generated_at?: string | null;
  last_updated?: string | null;
};

export type PriorityStatus = "Hot" | "Warm" | "Cold";

export type BdrGuidance = {
  id: number;
  webinar_id: number;
  generated_text: string;
  date_generated: string;
};

export type WebinarSummary = {
  id: number;
  webinar_id: number;
  summary_text: string;
  key_takeaways: string;
  date_generated: string;
};

export type WebinarWithCounts = Webinar & {
  registration_count: number;
  attendance_count: number;
};

export type EngagementSummary = {
  averageScore: number | null;
  hotCount: number;
  warmCount: number;
  coldCount: number;
  flaggedCount: number;
  leadCount: number;
};

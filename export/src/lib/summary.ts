import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateText } from "@/lib/claude";
import { getWebinarOrThrow } from "@/lib/webinars";
import type { WebinarSummary } from "@/lib/types";

function buildPrompt(webinar: any): string {
  return `Create:

1. A professional webinar summary (100-150 words).
2. Exactly 5 key takeaways.

Webinar Name: ${webinar.webinar_name}
Webinar Date: ${webinar.webinar_date}
Registrations: ${webinar.registrations}
Attendees: ${webinar.attendees}
Engagement Score: ${webinar.engagement_score ?? "N/A"}
Lead Priority: ${webinar.lead_priority ?? "N/A"}

Format:

Summary:
[summary]

Key Takeaways:
- takeaway 1
- takeaway 2
- takeaway 3
- takeaway 4
- takeaway 5`;
}

export async function generateSummaryForWebinar(
  webinarId: number
): Promise<WebinarSummary> {
  const supabase = getSupabaseAdmin();

  const webinar = await getWebinarOrThrow(webinarId);

  const generatedText = await 

import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateText } from "@/lib/claude";
import { getWebinarOrThrow } from "@/lib/webinars";
import type { WebinarSummary } from "@/lib/types";

function buildPrompt(webinar: any): string {
  return `Create the following for this webinar:

1. A concise executive summary of 40-60 words.
2. Exactly 3 key takeaways.
3. Use concise business language.
4. Focus on business value and audience engagement.
5. Avoid unnecessary detail and repetition.

Webinar Name: ${webinar.webinar_name}
Webinar Date: ${webinar.webinar_date}
Registrations: ${webinar.registrations}
Attendees: ${webinar.attendees}
Engagement Score: ${webinar.engagement_score ?? "N/A"}
Lead Priority: ${webinar.lead_priority ?? "N/A"}

Format your response exactly as:

Summary:
[summary]

Key Takeaways:
- takeaway 1
- takeaway 2
- takeaway 3`;
}

export async function generateSummaryForWebinar(
  webinarId: number
): Promise<WebinarSummary> {
  const supabase = getSupabaseAdmin();

  const webinar = await getWebinarOrThrow(webinarId);

  const generatedText = await generateText(
    buildPrompt(webinar),
    500
  );

  const { data: saved, error } = await supabase
    .from("webinar_summaries")
    .insert({
      webinar_id: webinarId,
      summary_text: generatedText,
      key_takeaways: generatedText,
      date_generated: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error || !saved) {
    throw new Error(
      error?.message ?? "Failed to save webinar summary"
    );
  }

  return saved as WebinarSummary;
}

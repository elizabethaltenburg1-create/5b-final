import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateText } from "@/lib/claude";
import { getWebinarOrThrow } from "@/lib/webinars";
import type {
  BdrGuidance,
  EngagementSummary,
  Webinar,
} from "@/lib/types";

export async function getEngagementSummary(
  webinarId: number
): Promise<EngagementSummary> {
  return {
    averageScore: 0,
    hotCount: 0,
    warmCount: 0,
    coldCount: 0,
    flaggedCount: 0,
    leadCount: 0,
  };
}

function buildPrompt(
  webinar: any,
  summary: EngagementSummary
): string {
  return `You are helping a Business Development Rep (BDR) plan follow-up on webinar leads.

Webinar: ${webinar.webinar_name}
Date: ${webinar.webinar_date}
Registrations: ${webinar.registrations}
Attendees: ${webinar.attendees}
Engagement Score: ${webinar.engagement_score ?? "n/a"}
Lead Priority: ${webinar.lead_priority ?? "n/a"}

Engagement summary:
- Leads scored: ${summary.leadCount}
- Average engagement score: ${summary.averageScore ?? "n/a"}
- Hot leads: ${summary.hotCount}
- Warm leads: ${summary.warmCount}
- Cold leads: ${summary.coldCount}
- Flagged for immediate follow-up: ${summary.flaggedCount}

Write concise, actionable BDR follow-up talking points and messaging guidance (4-6 sentences) for this webinar's leads.`;
}

export async function generateGuidanceForWebinar(
  webinarId: number
): Promise<BdrGuidance> {
  const supabase = getSupabaseAdmin();

  const webinar = await getWebinarOrThrow(webinarId);

  const summary = await getEngagementSummary(webinarId);

  const generatedText = await generateText(
    buildPrompt(webinar, summary),
    700
  );

  const { data: saved, error: saveError } = await supabase
    .from("bdr_guidance")
    .insert({
      webinar_id: webinarId,
      generated_text: generatedText,
      date_generated: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (saveError || !saved) {
    throw new Error(
      saveError?.message ?? "Failed to save generated guidance"
    );
  }

  return saved as BdrGuidance;
}

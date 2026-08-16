"use client";

import { useState } from "react";
import type {
  BdrGuidance,
  EngagementSummary,
  Webinar,
  WebinarSummary,
} from "@/lib/types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function WebinarDetailsPanel({
  webinar,
  summary,
  initialGuidance,
  initialSummary,
}: {
  webinar: Webinar;
  summary: EngagementSummary;
  initialGuidance: BdrGuidance | null;
  initialSummary: WebinarSummary | null;
}) {
  const [guidance, setGuidance] = useState(initialGuidance);
  const [generatingGuidance, setGeneratingGuidance] = useState(false);
  const [guidanceError, setGuidanceError] = useState("");

  const [webinarSummary, setWebinarSummary] = useState(initialSummary);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState("");

  async function handleGenerateGuidance() {
    setGeneratingGuidance(true);
    setGuidanceError("");

    try {
      const response = await fetch(
        `/api/webinars/${webinar.id}/generate-guidance`,
        {
          method: "POST",
        }
      );

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error ?? "Failed to generate guidance");
      }

      setGuidance(body.guidance as BdrGuidance);
    } catch (err) {
      setGuidanceError(
        err instanceof Error ? err.message : "Failed to generate guidance"
      );
    } finally {
      setGeneratingGuidance(false);
    }
  }

  async function handleGenerateSummary() {
    setGeneratingSummary(true);
    setSummaryError("");

    try {
      const response = await fetch(
        `/api/webinars/${webinar.id}/generate-summary`,
        {
          method: "POST",
        }
      );

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error ?? "Failed to generate summary");
      }

      setWebinarSummary(body.summary as WebinarSummary);
    } catch (err) {
      setSummaryError(
        err instanceof Error ? err.message : "Failed to generate summary"
      );
    } finally {
      setGeneratingSummary(false);
    }
  }

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-semibold text-gray-900">
        {webinar.webinar_name}
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        {formatDate(webinar.webinar_date)}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg border border-gray-200 p-4 text-sm">
        <div>
          <strong>Registrations:</strong> {webinar.registrations}
        </div>

        <div>
          <strong>Attendees:</strong> {webinar.attendees}
        </div>

        <div>
          <strong>Engagement Score:</strong>{" "}
          {webinar.engagement_score ?? "N/A"}
        </div>

        <div>
          <strong>Lead Priority:</strong>{" "}
          {webinar.lead_priority ?? "N/A"}
        </div>
      </div>

      <section className="mt-6 rounded-lg border border-gray-200 p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold text-gray-900">
            Webinar Summary
          </h2>

          <button
            onClick={handleGenerateSummary}
            disabled={generatingSummary}
            className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white"
          >
            {generatingSummary
              ? "Generating..."
              : webinarSummary
              ? "Regenerate Summary"
              : "Generate Summary"}
          </button>
        </div>

        {summaryError && (
          <p className="mt-2 text-xs text-red-600">{summaryError}</p>
        )}

        {webinarSummary ? (
          <>
            <p className="mt-3 whitespace-pre-wrap text-sm text-gray-700">
              {webinarSummary.summary_text}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Generated {formatDateTime(webinarSummary.date_generated)}
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm text-gray-500">
            No summary generated yet.
          </p>
        )}
      </section>

      <section className="mt-6 rounded-lg border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-900">
          Engagement Score
        </h2>

        <p className="mt-3 text-sm text-gray-700">
          Average Score: {summary.averageScore ?? 0}
        </p>
      </section>

      <section className="mt-6 rounded-lg border border-gray-200 p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold text-gray-900">
            BDR Guidance
          </h2>

          <button
            onClick={handleGenerateGuidance}
            disabled={generatingGuidance}
            className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white"
          >
            {generatingGuidance
              ? "Generating..."
              : guidance
              ? "Regenerate BDR Guidance"
              : "Generate BDR Guidance"}
          </button>
        </div>

        {guidanceError && (
          <p className="mt-2 text-xs text-red-600">{guidanceError}</p>
        )}

        {guidance ? (
          <>
            <p className="mt-3 whitespace-pre-wrap text-sm text-gray-700">
              {guidance.generated_text}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Generated {formatDateTime(guidance.date_generated)}
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm text-gray-500">
            No guidance generated yet.
          </p>
        )}
      </section>
    </div>
  );
}

"use client";

import type { Webinar } from "@/lib/types";

function formatDate(value: string | null) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function WebinarDashboard({
  initialWebinars,
}: {
  initialWebinars: Webinar[];
}) {
  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Webinar Dashboard
      </h1>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Webinar
              </th>

              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Date
              </th>

              <th className="px-4 py-3 text-right font-medium text-gray-600">
                Registrations
              </th>

              <th className="px-4 py-3 text-right font-medium text-gray-600">
                Attendees
              </th>

              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Engagement Score
              </th>

              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Lead Priority
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {initialWebinars.map((webinar) => (
              <tr key={webinar.id}>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {webinar.webinar_name}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {formatDate(webinar.webinar_date)}
                </td>

                <td className="px-4 py-3 text-right text-gray-600">
                  {webinar.registrations}
                </td>

                <td className="px-4 py-3 text-right text-gray-600">
                  {webinar.attendees}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {webinar.engagement_score ?? "—"}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {webinar.lead_priority ?? "—"}
                </td>
              </tr>
            ))}

            {initialWebinars.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No webinars found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

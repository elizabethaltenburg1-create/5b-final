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
        Webinar BDR Guidance
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Review completed webinars and generate follow-up content.
      </p>

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
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Presenter
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Recording
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {initialWebinars.map((webinar) => (
              <tr key={webinar.id}>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {webinar.title}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {formatDate(webinar.date)}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {webinar.presenter_name ?? "—"}
                </td>

                <td className="px-4 py-3">
           {webinar.recording_link ? (
  {webinar.recording_link}
    View Recording
  </a>
) : (
  "—"
)}
                </td>
              </tr>
            ))}

            {initialWebinars.length === 0 && (
              <tr>
                <td
                  colSpan={4}
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

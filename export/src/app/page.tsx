import { getCompletedWebinarsWithCounts } from "@/lib/webinars";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Dashboard() {
  let webinars: Awaited<
    ReturnType<typeof getCompletedWebinarsWithCounts>
  > = [];

  let loadError: string | null = null;

  try {
    webinars = await getCompletedWebinarsWithCounts();
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to load webinars";
  }

  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Completed Webinars
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Webinar summary and key takeaway generator
      </p>

      {loadError ? (
        <p className="mt-4 text-red-600">{loadError}</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Webinar</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Registrations</th>
                <th className="px-4 py-3 text-right">Attendees</th>
                <th className="px-4 py-3 text-left">Engagement</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {webinars.map((webinar) => (
                <tr key={webinar.id}>
                  <td className="px-4 py-3">
                    {webinar.webinar_name}
                  </td>

                  <td className="px-4 py-3">
                    {formatDate(webinar.webinar_date)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {webinar.registrations}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {webinar.attendees}
                  </td>

                  <td className="px-4 py-3">
                    {webinar.engagement_score ?? "—"}
                  </td>

                  <td className="px-4 py-3">
                    {webinar.lead_priority ?? "—"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {`/webinars/${webinar.id}`}
                      View Details
                    </a>
                  </td>
                </tr>
              ))}

              {webinars.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No webinars found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

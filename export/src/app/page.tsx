import Link from "next/link";
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
  const webinars = await getCompletedWebinarsWithCounts();

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Completed Webinars
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Select a webinar to review engagement and generate BDR follow-up guidance.
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Webinar</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Registrations</th>
              <th className="px-4 py-3 text-right">Attendees</th>
              <th className="px-4 py-3 text-right">Actions</th>
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
                  {webinar.registration_count}
                </td>

                <td className="px-4 py-3 text-right">
                  {webinar.attendance_count}
                </td>

                <td className="px-4 py-3 text-right">
                  {`/webinars/${webinar.id}`}
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

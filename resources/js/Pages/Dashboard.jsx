import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
  total_pending_tasks,
  my_pending_tasks,
  total_in_progress_tasks,
  my_in_progress_tasks,
  total_completed_tasks,
  my_completed_tasks,
  active_tasks,
}) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="mt-4">
        {/* Main grid container with 3 columns on medium screens */}
        <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl sm:px-6 lg:px-8 md:grid-cols-3">
          {/* Pending Tasks Card */}
          <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg hover:shadow-xl rounded-xl dark:bg-gray-800">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-amber-600 dark:text-amber-500">
                  Pending Tasks
                </h3>
                {/* Clock icon */}
                <span className="p-2 rounded-lg text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </div>
              {/* Task count - My tasks / Total tasks */}
              <p className="mt-6 text-3xl font-bold text-gray-700 dark:text-gray-200">
                {my_pending_tasks}{" "}
                <span className="text-base font-normal text-gray-400">
                  / {total_pending_tasks}
                </span>
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your pending tasks
              </p>
            </div>
          </div>

          {/* In Progress Tasks Card */}
          <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg hover:shadow-xl rounded-xl dark:bg-gray-800">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-sky-600 dark:text-sky-500">
                  In Progress Tasks
                </h3>
                {/* Lightning bolt icon */}
                <span className="p-2 rounded-lg text-sky-600 bg-sky-100 dark:bg-sky-900/30 dark:text-sky-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </span>
              </div>
              {/* Task count - My tasks / Total tasks */}
              <p className="mt-6 text-3xl font-bold text-gray-700 dark:text-gray-200">
                {my_in_progress_tasks}{" "}
                <span className="text-base font-normal text-gray-400">
                  / {total_in_progress_tasks}
                </span>
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your in-progress tasks
              </p>
            </div>
          </div>

          {/* Completed Tasks Card */}
          <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg hover:shadow-xl rounded-xl dark:bg-gray-800">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-green-600 dark:text-green-500">
                  Completed Tasks
                </h3>
                {/* Checkmark icon */}
                <span className="p-2 text-green-600 bg-green-100 rounded-lg dark:bg-green-900/30 dark:text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </div>
              {/* Task count - My tasks / Total tasks */}
              <p className="mt-6 text-3xl font-bold text-gray-700 dark:text-gray-200">
                {my_completed_tasks}{" "}
                <span className="text-base font-normal text-gray-400">
                  / {total_completed_tasks}
                </span>
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your completed tasks
              </p>
            </div>
          </div>
        </div>

        {/* Active Tasks Section */}
        <div className="gap-6 mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
          {/* Active Tasks Card */}
          <div className="overflow-hidden bg-white shadow-lg rounded-xl dark:bg-gray-800">
            <div className="p-6">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Active Tasks
                </h3>
              </div>

              {/* Tasks Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Table Header */}
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Title
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Status
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Assigned To
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {active_tasks.data.map((task) => (
                      <tr key={task.id}>
                        {/* Task Name */}
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200 hover:underline">
                          <Link href={route("task.show", task.id)}>
                            {task.name}
                          </Link>
                        </td>
                        {/* Task Status Badge */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              task.status === "pending"
                                ? "text-yellow-700 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-500"
                                : "text-blue-700 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-500"
                            }`}
                          >
                            {task.status === "pending"
                              ? "Pending"
                              : "In Progress"}
                          </span>
                        </td>
                        {/* Assigned User */}
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                          {task.assignedUser?.name}
                        </td>
                        {/* Due Date */}
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {task.due_date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

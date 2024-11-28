import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function Index({
  auth,
  tasks,
  queryParams = null,
  success = null,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-white">
            Tasks
          </h2>
          <Link
            href={route("task.create")}
            className="px-2 py-1 text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            + New Task
          </Link>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="w-full mx-auto mt-4 sm:px-6 lg:px-8">
        <TasksTable
          tasks={tasks}
          queryParams={queryParams}
          success={success}
          hideProjectColumn={true}
        />
      </div>
    </AuthenticatedLayout>
  );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import TasksTable from "@/Pages/Task/TasksTable";

export default function MyTasks({ auth, tasks }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-white">
          My Tasks
        </h2>
      }
    >
      <Head title="My Tasks" />

      <div className="py-12">
        <div className="w-full mx-auto sm:px-6 lg:px-8">
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <TasksTable
              tasks={tasks}
              hideProjectColumn={false}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

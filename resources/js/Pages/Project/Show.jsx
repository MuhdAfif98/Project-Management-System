import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import TasksTable from "@/Pages/Task/TasksTable";

export default function Show({ auth, project, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-white">
          {`Project: ${project.name}`}
        </h2>
      }
    >
      <Head title={project.name} />

      <div className="py-12">
        <div className="w-full mx-auto sm:px-6 lg:px-8">
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div>
              <img
                src={project.image_path}
                alt={project.name}
                className="object-cover w-full h-64"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid grid-cols-2 gap-1 mt-2">
                <div>
                  <label className="text-lg font-bold">Project ID</label>
                  <p className="mt-2 text-gray-400">{project.id}</p>
                </div>
                <div className="mt-4">
                  <label className="text-lg font-bold">Due Date</label>
                  <p className="mt-2 text-gray-400">{project.due_date}</p>
                </div>
                <div className="mt-4">
                  <label className="text-lg font-bold">Project Name</label>
                  <p className="mt-2 text-gray-400">{project.name}</p>
                </div>
                <div className="mt-4">
                  <label className="text-lg font-bold">Created Date</label>
                  <p className="mt-2 text-gray-400">{project.created_at}</p>
                </div>
                <div className="mt-4">
                  <label className="text-lg font-bold">Project Status</label>
                  <p className="mt-2 text-gray-400">
                    <span
                      className={`px-2 py-1 text-white rounded ${
                        PROJECT_STATUS_CLASS_MAP[project.status]
                      }`}
                    >
                      {PROJECT_STATUS_TEXT_MAP[project.status]}
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <label className="text-lg font-bold">Created By</label>
                  <p className="mt-2 text-gray-400">{project.createdBy.name}</p>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-lg font-bold">Project Description</label>
                <p className="mt-2 text-gray-400">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto sm:px-6 lg:px-8">
        <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <TasksTable
              tasks={tasks}
              queryParams={queryParams}
              hideProjectName={true}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

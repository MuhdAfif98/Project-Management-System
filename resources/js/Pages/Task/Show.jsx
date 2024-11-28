import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "@/Pages/Task/TasksTable";

export default function Show({ auth, task, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-white">
          {`Task: ${task.name}`}
        </h2>
      }
    >
      <Head title={task.name} />

      <div className="py-12">
        <div className="w-full mx-auto sm:px-6 lg:px-8">
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div>
              <img
                src={task.image_path}
                alt={task.name}
                className="object-cover w-full h-64"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid grid-cols-2 gap-1 mt-2">
                {/* Task identifier */}
                <div>
                  <label className="text-lg font-bold">Task ID</label>
                  <p className="mt-2 text-gray-400">{task.id}</p>
                </div>

                {/* Task deadline */}
                <div className="mt-4">
                  <label className="text-lg font-bold">Due Date</label>
                  <p className="mt-2 text-gray-400">{task.due_date}</p>
                </div>

                {/* Task title */}
                <div className="mt-4">
                  <label className="text-lg font-bold">Task Name</label>
                  <p className="mt-2 text-gray-400">{task.name}</p>
                </div>

                {/* Creation date */}
                <div className="mt-4">
                  <label className="text-lg font-bold">Created Date</label>
                  <p className="mt-2 text-gray-400">{task.created_at}</p>
                </div>

                {/* Task Status */}
                <div className="mt-4">
                  <label className="text-lg font-bold">Task Status</label>
                  <p className="mt-2 text-gray-400">
                    <span
                      className={`px-2 py-1 text-white rounded ${
                        TASK_STATUS_CLASS_MAP[task.status]
                      }`}
                    >
                      {TASK_STATUS_TEXT_MAP[task.status]}
                    </span>
                  </p>
                </div>

                {/* Task Priority */}
                <div className="mt-4">
                  <label className="text-lg font-bold">Task Priority</label>
                  <p className="mt-2 text-gray-400">
                    <span
                      className={`px-2 py-1 text-white rounded ${
                        TASK_PRIORITY_CLASS_MAP[task.priority]
                      }`}
                    >
                      {TASK_PRIORITY_TEXT_MAP[task.priority]}
                    </span>
                  </p>
                </div>

                {/* Task Project */}
                <div className="mt-4">
                  <label className="text-lg font-bold">Task Project</label>
                  <p className="mt-2 text-gray-400">
                    <Link
                      href={route("project.show", task.project.id)}
                      className="text-gray-400 hover:text-gray-200 hover:underline"
                    >
                      {task.project.name}
                    </Link>
                  </p>
                </div>

                {/* Assigned User */}
                <div className="mt-4">
                  <label className="text-lg font-bold">Assigned User</label>
                  <p className="mt-2 text-gray-400">{task.assignedUser.name}</p>
                </div>

                {/* Creator */}
                <div className="mt-4">
                  <label className="text-lg font-bold">Created By</label>
                  <p className="mt-2 text-gray-400">{task.createdBy.name}</p>
                </div>
              </div>

              {/* Task details */}
              <div className="mt-4">
                <label className="text-lg font-bold">Task Description</label>
                <p className="mt-2 text-gray-400">{task.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

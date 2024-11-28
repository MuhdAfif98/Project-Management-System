import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";

export default function Show({ auth, user, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-white">
          {`User: ${user.name}`}
        </h2>
      }
    >
      <Head title={user.name} />

      <div className="py-12">
        <div className="w-full mx-auto sm:px-6 lg:px-8">
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div>
              <img
                src={user.image_path}
                alt={user.name}
                className="object-cover w-full h-64"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid grid-cols-2 gap-1 mt-2">
                <div>
                  <label className="text-lg font-bold">User ID</label>
                  <p className="mt-2 text-gray-400">{user.id}</p>
                </div>
                <div className="mt-4">
                  <label className="text-lg font-bold">User Name</label>
                  <p className="mt-2 text-gray-400">{user.name}</p>
                </div>
                <div className="mt-4">
                  <label className="text-lg font-bold">Born Date</label>
                  <p className="mt-2 text-gray-400">{user.created_at}</p>
                </div>
                <div className="mt-4">
                  <label className="text-lg font-bold">User Status</label>
                  <p className="mt-2 text-gray-400">
                    <span
                      className={`px-2 py-1 text-white rounded ${
                        USER_STATUS_CLASS_MAP[user.status]
                      }`}
                    >
                      {USER_STATUS_TEXT_MAP[user.status]}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

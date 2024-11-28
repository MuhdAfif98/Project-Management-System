import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({
  auth,
  users,
  queryParams = null,
  success = null,
}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("user.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key === "Enter") {
      searchFieldChanged(name, e.target.value);
    }
  };

  const sortFieldChanged = (name) => {
    if (queryParams.sort_field === name) {
      queryParams.sort_direction =
        queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (user) => {
    if (confirm("Are you sure you want to delete this user?")) {
      router.delete(route("user.destroy", user.id));
    } else {
      return;
    }
  };

  const editUser = (user) => {
    router.get(route("user.edit", user));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-white">
            Users
          </h2>
          <Link
            href={route("user.create")}
            className="px-2 py-1 text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            + New User
          </Link>
        </div>
      }
    >
      <Head title="Users" />

      <div className="w-full mx-auto mt-4 sm:px-6 lg:px-8">
        {success && (
          <div
            className="px-4 py-2 mx-auto my-2 text-white rounded bg-emerald-500"
            style={{ animation: "fadeOut 5s forwards" }}
          >
            {success}
          </div>
        )}
        <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <table className="w-full overflow-auto text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-nowrap">
                  {/* User ID */}
                  <TableHeading
                    name="id"
                    sort_field={queryParams.sort_field}
                    sort_direction={queryParams.sort_direction}
                    sortFieldChanged={sortFieldChanged}
                  >
                    ID
                  </TableHeading>

                  {/* User Image */}
                  <TableHeading sortable={false}>Image</TableHeading>

                  {/* User Name */}
                  <TableHeading
                    name="name"
                    sort_field={queryParams.sort_field}
                    sort_direction={queryParams.sort_direction}
                    sortFieldChanged={sortFieldChanged}
                  >
                    Name
                  </TableHeading>

                  {/* User Email */}
                  <TableHeading
                    name="email"
                    sort_field={queryParams.sort_field}
                    sort_direction={queryParams.sort_direction}
                    sortFieldChanged={sortFieldChanged}
                  >
                    Email
                  </TableHeading>

                  {/* User Create Date */}
                  <TableHeading
                    name="created_at"
                    sort_field={queryParams.sort_field}
                    sort_direction={queryParams.sort_direction}
                    sortFieldChanged={sortFieldChanged}
                  >
                    Create Date
                  </TableHeading>

                  {/* Actions */}
                  <th scope="col">
                    <div className="px-6 py-3 text-end">Actions</div>
                  </th>
                </tr>
              </thead>

              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-nowrap">
                  <th scope="col" className="px-6 py-3"></th>

                  <th scope="col" className="px-6 py-3"></th>
                  {/* Search by Name */}
                  <th scope="col" className="px-6 py-3">
                    <TextInput
                      defaultValue={queryParams.name}
                      onBlur={(e) => searchFieldChanged("name", e.target.value)}
                      onKeyPress={(e) => onKeyPress("name", e)}
                      name="name"
                      placeholder="Search by name"
                      className="w-full"
                    />
                  </th>

                  {/* Search by Email */}
                  <th scope="col" className="px-6 py-3">
                    <TextInput
                      defaultValue={queryParams.email}
                      onBlur={(e) =>
                        searchFieldChanged("email", e.target.value)
                      }
                      onKeyPress={(e) => onKeyPress("email", e)}
                      name="email"
                      placeholder="Search by email"
                      className="w-full"
                    />
                  </th>

                  <th scope="col" className="px-6 py-3"></th>

                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {users.data.map((user, index) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {/* User ID */}
                    <td className="px-3 py-3">{index + 1}</td>

                    {/* User Image */}
                    <td className="px-3 py-3">
                      <img
                        src={user.image}
                        alt={`${user.name} avatar`}
                        className="w-10 h-10 rounded-full justify-self-center"
                      />
                    </td>

                    {/* User Name */}
                    <th className="px-3 py-3 text-white text-nowrap hover:underline">
                      <Link href={route("user.show", user.id)}>
                        {user.name}
                      </Link>
                    </th>

                    {/* User Email */}
                    <td className="px-3 py-3 text-white text-nowrap">
                      {user.email}
                    </td>

                    {/* User Create Date */}
                    <td className="px-3 py-3">{user.created_at}</td>

                    {/* User Actions */}
                    <td className="flex gap-2 px-3 py-3 text-center">
                      <PrimaryButton onClick={(e) => editUser(user)}>
                        Edit
                      </PrimaryButton>
                      <DangerButton onClick={(e) => deleteUser(user)}>
                        Delete
                      </DangerButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination links={users.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

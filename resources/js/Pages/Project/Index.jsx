import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({
  auth,
  projects,
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

    router.get(route("project.index"), queryParams);
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

    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (project) => {
    if (confirm("Are you sure you want to delete this project?")) {
      router.delete(route("project.destroy", project.id));
    } else {
      return;
    }
  };

  const editProject = (project) => {
    router.get(route("project.edit", project));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-white">
            Projects
          </h2>
          <Link
            href={route("project.create")}
            className="px-2 py-1 text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            + New Project
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="w-full mx-auto sm:px-6 lg:px-8">
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
                  <TableHeading
                    name="id"
                    sort_field={queryParams.sort_field}
                    sort_direction={queryParams.sort_direction}
                    sortFieldChanged={sortFieldChanged}
                  >
                    ID
                  </TableHeading>
                  <TableHeading sortable={false}>Image</TableHeading>
                  <TableHeading
                    name="name"
                    sort_field={queryParams.sort_field}
                    sort_direction={queryParams.sort_direction}
                    sortFieldChanged={sortFieldChanged}
                  >
                    Name
                  </TableHeading>
                  <TableHeading
                    name="status"
                    sort_field={queryParams.sort_field}
                    sort_direction={queryParams.sort_direction}
                    sortFieldChanged={sortFieldChanged}
                  >
                    Status
                  </TableHeading>
                  <TableHeading
                    name="created_at"
                    sort_field={queryParams.sort_field}
                    sort_direction={queryParams.sort_direction}
                    sortFieldChanged={sortFieldChanged}
                  >
                    Create Date
                  </TableHeading>
                  <TableHeading
                    name="due_date"
                    sort_field={queryParams.sort_field}
                    sort_direction={queryParams.sort_direction}
                    sortFieldChanged={sortFieldChanged}
                  >
                    Due Date
                  </TableHeading>
                  <TableHeading sortable={false}>Created By</TableHeading>
                  <th scope="col">
                    <div className="px-6 py-3 text-end">Actions</div>
                  </th>
                </tr>
              </thead>

              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-nowrap">
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
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
                  <th scope="col" className="px-6 py-3">
                    <SelectInput
                      defaultValue={queryParams.status}
                      className="w-full"
                      onChange={(e) =>
                        searchFieldChanged("status", e.target.value)
                      }
                    >
                      <option value="">All</option>
                      {Object.keys(PROJECT_STATUS_TEXT_MAP).map((status) => (
                        <option value={status} key={status}>
                          {PROJECT_STATUS_TEXT_MAP[status]}
                        </option>
                      ))}
                    </SelectInput>
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {projects.data.map((project, index) => (
                  <tr
                    key={project.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {/* Project ID */}
                    <td className="px-3 py-3">{index + 1}</td>

                    {/* Project Image */}
                    <td className="px-3 py-3">
                      <img
                        src={project.image_path}
                        alt={`${project.name} thumbnail`}
                        className="w-10 h-10 rounded-full justify-self-center"
                      />
                    </td>

                    {/* Project Name */}
                    <th className="px-3 py-3 text-white text-nowrap hover:underline">
                      <Link href={route("project.show", project.id)}>
                        {project.name}
                      </Link>
                    </th>

                    {/* Project Status */}
                    <td className="px-3 py-3 text-center">
                      <span
                        className={
                          "px-2 py-1 text-white rounded " +
                          PROJECT_STATUS_CLASS_MAP[project.status]
                        }
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </td>

                    {/* Project Create Date */}
                    <td className="px-3 py-3">{project.created_at}</td>

                    {/* Project Due Date */}
                    <td className="px-3 py-3">{project.due_date}</td>

                    {/* Project Created By */}
                    <td className="px-3 py-3 text-center">
                      {project.createdBy.name}
                    </td>

                    {/* Project Actions */}
                    <td className="flex gap-2 px-3 py-3 text-center">
                      <PrimaryButton onClick={(e) => editProject(project)}>
                        Edit
                      </PrimaryButton>
                      <DangerButton onClick={(e) => deleteProject(project)}>
                        Delete
                      </DangerButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination links={projects.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

import { Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP } from "@/constants";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";

export default function TasksTable({
  tasks,
  queryParams = null,
  hideProjectColumn = false,
  success = null,
}) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
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

    router.get(route("task.index"), queryParams);
  };

  const editTask = (task) => {
    router.get(route("task.edit", task));
  };

  const deleteTask = (task) => {
    router.delete(route("task.destroy", task));
  };

  return (
    <div>
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
                {!hideProjectColumn && (
                  <TableHeading sortable={false}>Project Name</TableHeading>
                )}
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
                  <div className="px-6 py-3">Actions</div>
                </th>
              </tr>
            </thead>

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-nowrap">
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
                {!hideProjectColumn && (
                  <th scope="col" className="px-6 py-3"></th>
                )}
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
                    {Object.keys(TASK_STATUS_TEXT_MAP).map((status) => (
                      <option value={status} key={status}>
                        {TASK_STATUS_TEXT_MAP[status]}
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
              {tasks.data.map((task, index) => (
                <tr
                  key={task.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-3 py-3">{task.id}</td>
                  <td className="px-3 py-3">
                    <img
                      src={task.image_path}
                      alt={`${task.name} thumbnail`}
                      className="w-10 h-10 rounded-full justify-self-center"
                    />
                  </td>
                  {!hideProjectColumn && (
                    <td className="px-3 py-3 text-nowrap">
                      {task.project.name}
                    </td>
                  )}
                  <td className="px-3 py-3 text-white text-nowrap hover:underline">
                    <Link href={route("task.show", task.id)}>{task.name}</Link>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className={
                        "px-2 py-1 text-white rounded " +
                        TASK_STATUS_CLASS_MAP[task.status]
                      }
                    >
                      {TASK_STATUS_TEXT_MAP[task.status]}
                    </span>
                  </td>
                  <td className="px-3 py-3">{task.created_at}</td>
                  <td className="px-3 py-3">{task.due_date}</td>
                  <td className="px-3 py-3 text-center">
                    {task.createdBy.name}
                  </td>
                  <td className="flex gap-2 px-3 py-3 text-center">
                    <PrimaryButton onClick={(e) => editTask(task)}>
                      Edit
                    </PrimaryButton>
                    <DangerButton onClick={(e) => deleteTask(task)}>
                      Delete
                    </DangerButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination links={tasks.meta.links} />
        </div>
      </div>
    </div>
  );
}

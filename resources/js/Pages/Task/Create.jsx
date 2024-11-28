import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import { TASK_PRIORITY_TEXT_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create({ auth, users, projects }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    description: "",
    due_date: "",
    status: "",
    assigned_user_id: "",
    project_id: "",
    priority: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("task.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-white">
          Create New Task
        </h2>
      }
    >
      <Head title="Create Task" />

      <div className="py-12">
        <div className="w-full mx-auto sm:px-6 lg:px-8">
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <form
              onSubmit={onSubmit}
              className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
            >
              {/* Task Project */}
              <div>
                <InputLabel htmlFor="project_id" value="Project" />

                <SelectInput
                  id="project_id"
                  name="project_id"
                  value={data.project}
                  className="block w-full mt-1"
                  onChange={(e) => setData("project_id", e.target.value)}
                >
                  <option value="">Please select a project</option>
                  {projects.data.map((project) => (
                    <option value={project.id} key={project.id}>
                      {project.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.project_id} className="mt-2" />
              </div>

              {/* Task Image */}
              <div className="mt-4">
                <InputLabel htmlFor="task_image_path" value="Task Image" />

                <TextInput
                  id="task_image_path"
                  type="file"
                  name="image"
                  className="block w-full mt-1"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              {/* Task Name */}
              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Task Name" />

                <TextInput
                  id="task_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="block w-full mt-1"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              {/* Task Description */}
              <div className="mt-4">
                <InputLabel htmlFor="task_description" value="Description" />

                <TextAreaInput
                  id="task_description"
                  type="text"
                  name="description"
                  value={data.description}
                  className="block w-full mt-1"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              {/* Task Due Date */}
              <div className="mt-4">
                <InputLabel htmlFor="task_due_date" value="Task Deadline" />

                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  className="block w-full mt-1"
                  value={data.due_date}
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              {/* Task Status */}
              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Task Status" />

                <SelectInput
                  id="task_status"
                  name="status"
                  value={data.status}
                  className="block w-full mt-1"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Please select a status</option>
                  {Object.entries(TASK_STATUS_TEXT_MAP).map(([key, value]) => (
                    <option value={key} key={key}>
                      {value}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>

              {/* Task Priority */}
              <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Priority" />

                <SelectInput
                  id="task_priority"
                  name="priority"
                  value={data.priority}
                  className="block w-full mt-1"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="">Please select a priority</option>
                  {Object.entries(TASK_PRIORITY_TEXT_MAP).map(
                    ([key, value]) => (
                      <option value={key} key={key}>
                        {value}
                      </option>
                    )
                  )}
                </SelectInput>
                <InputError message={errors.priority} className="mt-2" />
              </div>

              {/* Assigned User */}
              <div className="mt-4">
                <InputLabel htmlFor="assigned_user_id" value="Assigned User" />

                <SelectInput
                  id="assigned_user_id"
                  name="assigned_user_id"
                  value={data.assigned_user_id}
                  className="block w-full mt-1"
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  <option value="">Please select an user</option>
                  {users.data.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError
                  message={errors.assigned_user_id}
                  className="mt-2"
                />
              </div>

              {/* Submit Button */}
              <div className="items-center mt-4 space-x-2 text-right">
                <Link
                  href={route("task.index")}
                  className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white uppercase transition duration-150 ease-in-out bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 dark:focus:ring-offset-gray-800 "
                >
                  Cancel
                </Link>
                <PrimaryButton
                  type="submit"
                  className="!bg-green-500 !text-white hover:!bg-green-600 !transition-colors !duration-150 !ease-in-out"
                >
                  Create
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

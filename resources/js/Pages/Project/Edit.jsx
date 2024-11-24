import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import { PROJECT_STATUS_TEXT_MAP } from "@/constants";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({ auth, project }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: project.name || "",
    status: project.status || "",
    description: project.description || "",
    due_date: project.due_date || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("project.update", project));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-white">
          Edit Project "{project.name}"
        </h2>
      }
    >
      <Head title="Edit Project" />

      <div className="py-12">
        <div className="w-full mx-auto sm:px-6 lg:px-8">
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <form
              onSubmit={onSubmit}
              className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
            >
              {project.image_path && (
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={project.image_path}
                    alt="Project Image"
                    className="w-64 h-64 rounded-md"
                  />
                </div>
              )}
              {/* Project Image */}
              <div>
                <InputLabel
                  htmlFor="project_image_path"
                  value="Project Image"
                />

                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="block w-full mt-1"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              {/* Project Name */}
              <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Project Name" />

                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="block w-full mt-1"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              {/* Project Description */}
              <div className="mt-4">
                <InputLabel htmlFor="project_description" value="Description" />

                <TextAreaInput
                  id="project_description"
                  type="text"
                  name="description"
                  value={data.description}
                  className="block w-full mt-1"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              {/* Project Due Date */}
              <div className="mt-4">
                <InputLabel htmlFor="project_due_date" value="Due Date" />

                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  className="block w-full mt-1"
                  value={data.due_date ? new Date(data.due_date).toISOString().split('T')[0] : ''}
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              {/* Project Status */}
              <div className="mt-4">
                <InputLabel htmlFor="project_status" value="Status" />

                <SelectInput
                  id="project_status"
                  name="status"
                  value={data.status}
                  className="block w-full mt-1"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Please select a status</option>
                  {Object.entries(PROJECT_STATUS_TEXT_MAP).map(
                    ([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    )
                  )}
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>

              {/* Submit Button */}
              <div className="items-center mt-4 space-x-2 text-right">
                <Link
                  href={route("project.index")}
                  className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white uppercase transition duration-150 ease-in-out bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 dark:focus:ring-offset-gray-800 "
                >
                  Cancel
                </Link>
                <PrimaryButton
                  type="submit"
                  className="!bg-green-500 !text-white hover:!bg-green-600 !transition-colors !duration-150 !ease-in-out"
                >
                  Update
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

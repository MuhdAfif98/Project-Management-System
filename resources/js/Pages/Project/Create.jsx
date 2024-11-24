import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import { PROJECT_STATUS_TEXT_MAP } from "@/constants";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("project.create"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-white">
          Create New Project
        </h2>
      }
    >
      <Head title="Create Project" />

      <div className="py-12">
        <div className="w-full mx-auto sm:px-6 lg:px-8">
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <form
              onSubmit={onSubmit}
              className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
            >
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
                  value={data.image}
                  className="block w-full mt-1"
                  onChange={(e) => setData("image", e.target.value)}
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
                  value={data.due_date}
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
                  {Object.entries(PROJECT_STATUS_TEXT_MAP).map(
                    ([key, value]) => (
                      <option value={key}>{value}</option>
                    )
                  )}
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

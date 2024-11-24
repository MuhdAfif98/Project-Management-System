import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function TableHeading({
  name,
  children,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortFieldChanged = () => {},
}) {
  return (
    <th scope="col">
      <div
        onClick={() => sortFieldChanged(name)}
        className="flex items-center justify-between gap-1 px-6 py-3 cursor-pointer"
      >
        {children}
        {sortable && (
          <div>
            <ChevronUpIcon
              className={
                "w-4 " +
                (sort_field === name && sort_direction === "asc"
                  ? "text-white"
                  : "")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 " +
                (sort_field === name && sort_direction === "desc"
                  ? "text-white"
                  : "")
              }
            />
          </div>
        )}
      </div>
    </th>
  );
}

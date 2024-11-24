import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav>
      <ul className="flex items-center justify-center mt-4 space-x-1">
        {links.map((link) => (
          <Link
            preserveScroll
            className={
              "inline-block px-3 py-2 rounded-lg text-gray-200 text-xs " +
              (link.active ? "bg-gray-950 text-white " : "") +
              (!link.url
                ? "!text-gray-500 opacity-75 cursor-not-allowed"
                : "hover:bg-gray-950")
            }
            dangerouslySetInnerHTML={{ __html: link.label }}
            key={link.label}
            href={link.url || ""}
          ></Link>
        ))}
      </ul>
    </nav>
  );
}

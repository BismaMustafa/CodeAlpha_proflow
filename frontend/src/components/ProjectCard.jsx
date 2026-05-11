import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/board/${project.id}`}
      className="block bg-white border border-gray-200 p-6 rounded-3xl shadow-sm hover:border-indigo-500 transition"
    >
      <h2 className="text-2xl font-semibold mb-2 text-slate-900">
        {project.name}
      </h2>

      <p className="text-gray-500 leading-relaxed mb-4">
        {project.description || "No description available."}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{project.tasks || 0} tasks</span>
        <span>{project.status || "Active"}</span>
      </div>
    </Link>
  )
}
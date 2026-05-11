import { useState } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments";

export default function TaskCard({ task, projectId }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 p-4 mt-2 rounded-3xl bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div
          className="font-semibold text-slate-900 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {task.title}
        </div>
        <Link
          to={`/task/${task.id}`}
          className="text-indigo-600 text-sm hover:underline"
        >
          Details
        </Link>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {task.assignedTo || "Unassigned"} • {task.dueDate || "No due date"}
      </p>

      {open && (
        <Comments projectId={projectId} taskId={task.id} />
      )}
    </div>
  );
}
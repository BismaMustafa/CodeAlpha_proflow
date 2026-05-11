import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FolderKanban } from 'lucide-react'

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-[260px] bg-white border border-gray-200 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-10 text-slate-900">
        TaskFlow
      </h2>

      <div className="space-y-4">
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-3 w-full p-3 rounded-xl ${
            isActive('/dashboard') 
              ? 'bg-indigo-100 text-indigo-900' 
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link 
          to="/board" 
          className={`flex items-center gap-3 w-full p-3 rounded-xl ${
            isActive('/board') || location.pathname.startsWith('/board/')
              ? 'bg-indigo-100 text-indigo-900' 
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FolderKanban size={20} />
          Projects
        </Link>
      </div>
    </div>
  )
}
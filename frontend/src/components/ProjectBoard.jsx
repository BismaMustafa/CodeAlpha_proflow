// ProjectBoard.jsx
import React from "react";

const ProjectBoard = () => {
  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen overflow-hidden font-sans">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-indigo-900">ProFlow</h1>

          <div className="hidden md:flex items-center bg-[#e5eeff] px-4 py-2 rounded-full w-72">
            <span className="material-symbols-outlined text-gray-500 mr-2">
              search
            </span>
            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {["notifications", "help", "settings"].map((item, i) => (
            <button
              key={i}
              className="material-symbols-outlined p-2 rounded-full hover:bg-[#e5eeff]"
            >
              {item}
            </button>
          ))}

          <img
            src="https://i.pravatar.cc/40"
            alt=""
            className="w-9 h-9 rounded-full border"
          />
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 pt-20 w-[280px] h-screen bg-[#eff4ff] border-r border-gray-200 flex flex-col">
        <div className="px-6">
          <div className="flex gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-indigo-800 text-white flex items-center justify-center">
              <span className="material-symbols-outlined">grid_view</span>
            </div>

            <div>
              <h3 className="font-semibold">Project Workspace</h3>
              <p className="text-sm text-gray-500">Enterprise Plan</p>
            </div>
          </div>

          <button className="w-full bg-indigo-900 text-white py-3 rounded-lg font-medium hover:shadow-lg transition">
            + Create Project
          </button>
        </div>

        <nav className="mt-8 flex-1 space-y-1">
          {[
            "Dashboard",
            "Projects",
            "Team",
            "Calendar",
            "Reports",
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className={`block px-6 py-3 ${
                item === "Projects"
                  ? "bg-indigo-100 border-l-4 border-indigo-900 text-indigo-900 font-semibold"
                  : "text-gray-600 hover:bg-white"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="border-t p-6 text-gray-500 space-y-3">
          <p>Help Center</p>
          <p>Settings</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-[280px] pt-16 h-screen flex flex-col">
        {/* Header */}
        <div className="h-20 px-8 flex items-center justify-between bg-white border-b shadow-sm">
          <div>
            <h2 className="text-3xl font-bold">Redesign 2.0 Launch</h2>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-2 border rounded-lg bg-white hover:bg-gray-50">
              Share / Invite
            </button>

            <button className="px-5 py-2 bg-indigo-900 text-white rounded-lg">
              View Options
            </button>
          </div>
        </div>

        {/* Board */}
        <div className="flex-1 overflow-x-auto p-8">
          <div className="flex gap-6 min-w-max h-full">
            {[
              {
                title: "To Do",
                count: 3,
                tasks: [
                  "Architecture review and technical documentation update",
                  "Draft initial wireframes for user onboarding flow",
                ],
              },
              {
                title: "In Progress",
                count: 2,
                tasks: ["API Integration for core module dashboard"],
              },
              {
                title: "Review",
                count: 4,
                tasks: ["Mobile responsiveness audit on Safari/iOS"],
              },
              {
                title: "Done",
                count: 12,
                tasks: ["User research interviews - Wave 1"],
              },
            ].map((column, index) => (
              <div
                key={index}
                className="w-[320px] bg-[#eff4ff] rounded-xl border border-gray-200 p-4 flex flex-col"
              >
                <div className="flex justify-between mb-5">
                  <h3 className="font-semibold text-lg">
                    {column.title} ({column.count})
                  </h3>
                  <span className="material-symbols-outlined">
                    more_horiz
                  </span>
                </div>

                <div className="space-y-4 flex-1">
                  {column.tasks.map((task, i) => (
                    <div
                      key={i}
                      className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md"
                    >
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                        Priority
                      </span>

                      <h4 className="mt-3 font-medium">{task}</h4>

                      <div className="mt-4 flex justify-between text-sm text-gray-500">
                        <span>Oct 24</span>
                        <img
                          src={`https://i.pravatar.cc/30?img=${i + 2}`}
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-4 border-2 border-dashed rounded-xl py-3 text-gray-500 hover:bg-white">
                  + Add Task
                </button>
              </div>
            ))}

            {/* Add Column */}
            <div className="w-[320px] h-[120px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-500 hover:bg-[#eff4ff] cursor-pointer">
              <span className="material-symbols-outlined text-3xl">
                add_circle
              </span>
              Add Column
            </div>
          </div>
        </div>
      </main>

      {/* Floating Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-indigo-900 text-white shadow-xl text-3xl hover:scale-105 transition">
        +
      </button>
    </div>
  );
};

export default ProjectBoard;
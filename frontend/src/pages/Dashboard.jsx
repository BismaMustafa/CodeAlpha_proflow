

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import ProjectCard from "../components/ProjectCard";
import Sidebar from "../components/Sidebar";
import NotificationBell from "../components/NotificationBell";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, login, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubProjects();
  }, []);

  useEffect(() => {
    const unsubTasks = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubTasks();
  }, []);

  const totalTasks = tasks.length;
  const completed = tasks.filter((task) => task.status === "Done").length;
  const inProgress = tasks.filter((task) => task.status === "In Progress").length;
  const toDo = tasks.filter((task) => task.status === "To Do").length;
  const progressPercent = totalTasks ? Math.round((completed / totalTasks) * 100) : 0;
  const featuredProject = projects[0] || null;

  const projectCards = useMemo(
    () => projects.map((project) => <ProjectCard key={project.id} project={project} />),
    [projects]
  );

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0b1c30] overflow-hidden">
      
      {/* TOP NAVBAR */}
      <header className="fixed top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 flex justify-between items-center px-8 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-700">ProFlow</h1>

        <div className="hidden md:block flex-1 max-w-xl mx-10">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full bg-[#eff4ff] px-5 py-3 rounded-full outline-none"
          />
        </div>

        <div className="flex gap-4 items-center">
          <NotificationBell />
          <span className="material-symbols-outlined cursor-pointer">help</span>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

          <img
            src={user?.photoURL || "https://i.pravatar.cc/100"}
            className="w-10 h-10 rounded-full"
            alt=""
          />
        </div>
      </header>

      <div className="flex pt-[80px]">
        <Sidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 md:ml-[260px] py-8 pr-8 overflow-y-auto ">

          {/* WELCOME */}
          <div className="flex justify-between items-center flex-wrap gap-5 mb-8">
            <div>
              <h1 className="text-4xl font-bold">
                Welcome back, {user?.displayName || "User"}
              </h1>
              <p className="text-gray-500 mt-2">
                Here is what's happening with your projects today.
              </p>
            </div>

            <div className="flex gap-3">
              <button className="border px-5 py-3 rounded-lg">
                Filter
              </button>

              <Link
                to="/board"
                className="bg-indigo-700 text-white px-5 py-3 rounded-lg"
              >
                View All Projects
              </Link>
            </div>
          </div>

          {/* GRID */}
          <div className="grid xl:grid-cols-12 gap-6">

            {/* LEFT */}
            <section className="xl:col-span-8 space-y-6">

              {/* FEATURED CARD */}
              <div className="bg-white rounded-2xl p-6 shadow border">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex justify-center items-center text-indigo-700">
                      🚀
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {featuredProject?.name || "Project Workspace"}
                      </h3>
                      <span className="text-green-600 text-sm font-semibold">
                        {featuredProject?.status || "Active Development"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xl text-gray-400">⋮</span>
                </div>

                <p className="text-gray-500 mt-4">
                  {featuredProject?.description ||
                    "Track your top project and keep your team aligned with the latest milestones."}
                </p>

                <div className="mt-5">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span className="text-indigo-700 font-bold">{progressPercent}%</span>
                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full">
                    <div
                      className="h-3 rounded-full bg-indigo-700"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* TASK CARDS */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow border">
                  <h3 className="font-bold text-lg">Tasks to do</h3>
                  <p className="text-gray-500 mt-2">Open work items waiting for action.</p>
                  <div className="mt-5 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 rounded-full bg-orange-500"
                      style={{ width: totalTasks ? `${(toDo / totalTasks) * 100}%` : "0%" }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{toDo} items</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow border">
                  <h3 className="font-bold text-lg">In Progress</h3>
                  <p className="text-gray-500 mt-2">Work moving through the team.</p>
                  <div className="mt-5 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: totalTasks ? `${(inProgress / totalTasks) * 100}%` : "0%" }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{inProgress} items</p>
                </div>
              </div>

              {/* STATS */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 p-6 rounded-xl">
                  <p className="text-sm text-gray-500">Completed</p>
                  <h1 className="text-4xl font-bold text-indigo-700">{completed}</h1>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <p className="text-sm text-gray-500">In Progress</p>
                  <h1 className="text-4xl font-bold">{inProgress}</h1>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <p className="text-sm text-gray-500">Total Projects</p>
                  <h1 className="text-4xl font-bold">{projects.length}</h1>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow border p-6">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-bold">Your Projects</h3>
                    <p className="text-gray-500 mt-1">Open any project to see its board.</p>
                  </div>
                  <Link to="/create-project" className="text-indigo-600 hover:underline">
                    + Add Project
                  </Link>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {projects.length ? (
                    projectCards
                  ) : (
                    <div className="rounded-3xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
                      No projects yet. Create your first project.
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* RIGHT SIDE */}
            {/* <aside className="xl:col-span-4 space-y-6"> */}

              {/* DEADLINES */}
              {/* <div className="bg-white rounded-2xl p-6 shadow border">
                <h3 className="font-bold text-xl mb-4">
                  Upcoming Deadlines
                </h3>

                <div className="space-y-4">
                  <div className="border p-4 rounded-xl">
                    <p className="font-bold">12 Oct</p>
                    <p>Beta Phase Submission</p>
                  </div>

                  <div className="border p-4 rounded-xl">
                    <p className="font-bold">15 Oct</p>
                    <p>Final Assets Delivery</p>
                  </div>

                  <div className="border p-4 rounded-xl">
                    <p className="font-bold">18 Oct</p>
                    <p>Monthly Sync Call</p>
                  </div>
                </div>
              </div> */}

              {/* ACTIVITY */}
              {/* <div className="bg-white rounded-2xl p-6 shadow border">
                <h3 className="font-bold text-xl mb-4">
                  Recent Activity
                </h3>

                <div className="space-y-4 text-sm">
                  <p>✔ Sarah Connor completed Infrastructure Review</p>
                  <p>💬 Marcus Wright commented on UX Audit</p>
                  <p>📎 You uploaded 3 files to Assets Folder</p>
                </div>
              </div>

            </aside> */}

          </div>
        </main>
      </div>
    </div>
  );
}
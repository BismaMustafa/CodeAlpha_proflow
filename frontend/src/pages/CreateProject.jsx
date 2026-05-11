

import React, { useState } from "react";
import {
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import {
  LayoutDashboard,
  LayoutGrid,
} from "lucide-react";

export default function CreateProject() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Kanban");
  const [privacy, setPrivacy] = useState("Private");
  const [loading, setLoading] = useState(false);

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      alert("Please enter project name");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "projects"), {
        name: projectName,
        description,
        ownerEmail: email,
        projectType,
        privacy,
        status: "Active",
        createdAt: new Date(),
      });

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0b1c30]">
      {/* TOP NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">
          ProFlow
        </h1>

        <div className="hidden md:block w-[400px]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#eef2ff] px-5 py-3 rounded-full outline-none"
          />
        </div>

        <div className="flex gap-3 items-center">
          <img
            src="https://i.pravatar.cc/100"
            alt=""
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>

      <div className="flex pt-[78px]">
        {/* SIDEBAR */}
        <aside className="hidden md:flex fixed left-0 top-[78px] h-full w-[260px] bg-white border-r px-4 py-6 flex-col">
          <button className="w-full bg-indigo-700 text-white py-3 rounded-xl font-semibold mb-8">
            + Create Project
          </button>

          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 p-3 rounded-xl ${
                isActive("/dashboard")
                  ? "bg-indigo-100 text-indigo-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              to="/board"
              className={`flex items-center gap-3 p-3 rounded-xl ${
                isActive("/board")
                  ? "bg-indigo-100 text-indigo-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <LayoutGrid size={20} />
              Projects
            </Link>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 md:ml-[260px] px-6 py-8">
          <div className="max-w-[1100px] mx-auto">
            {/* PAGE HEADER */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold">
                Create New Project
              </h1>
              <p className="text-gray-500 mt-2">
                Setup your project workspace.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              {/* LEFT */}
              <div className="lg:col-span-7 space-y-6">
                {/* DETAILS */}
                <div className="bg-white rounded-2xl border shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">
                    Project Details
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block mb-2 text-sm text-gray-500">
                        Project Name
                      </label>

                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) =>
                          setProjectName(e.target.value)
                        }
                        placeholder="Enter project name"
                        className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-500">
                        Description
                      </label>

                      <textarea
                        rows="4"
                        value={description}
                        onChange={(e) =>
                          setDescription(e.target.value)
                        }
                        placeholder="Write description..."
                        className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* TYPE */}
                <div className="bg-white rounded-2xl border shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">
                    Project Type
                  </h2>

                  <div className="grid md:grid-cols-3 gap-4">
                    {["Kanban", "List", "Gantt"].map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          setProjectType(type)
                        }
                        className={`border rounded-xl p-5 font-semibold ${
                          projectType === type
                            ? "border-indigo-600 bg-indigo-50"
                            : "hover:border-indigo-400"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-5 space-y-6">
                {/* TEAM */}
                <div className="bg-white rounded-2xl border shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">
                    Invite Team
                  </h2>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="team@email.com"
                    className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* PRIVACY */}
                <div className="bg-white rounded-2xl border shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">
                    Privacy
                  </h2>

                  <div className="space-y-4">
                    <button
                      onClick={() =>
                        setPrivacy("Private")
                      }
                      className={`w-full text-left border rounded-xl p-4 ${
                        privacy === "Private"
                          ? "border-indigo-600 bg-indigo-50"
                          : ""
                      }`}
                    >
                      <p className="font-semibold">
                        Private Project
                      </p>
                      <p className="text-sm text-gray-500">
                        Only invited members
                      </p>
                    </button>

                    <button
                      onClick={() =>
                        setPrivacy("Public")
                      }
                      className={`w-full text-left border rounded-xl p-4 ${
                        privacy === "Public"
                          ? "border-indigo-600 bg-indigo-50"
                          : ""
                      }`}
                    >
                      <p className="font-semibold">
                        Public Workspace
                      </p>
                      <p className="text-sm text-gray-500">
                        Everyone can join
                      </p>
                    </button>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="space-y-3">
                  <button
                    onClick={handleCreateProject}
                    className="w-full bg-indigo-700 text-white py-4 rounded-2xl font-semibold"
                  >
                    {loading
                      ? "Creating..."
                      : "Create Project"}
                  </button>

                  <button
                    onClick={() =>
                      navigate("/dashboard")
                    }
                    className="w-full bg-white py-4 rounded-2xl border"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
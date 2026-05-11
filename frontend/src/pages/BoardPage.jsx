import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc
} from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { db } from "../firebase/firebaseConfig";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";

export default function BoardPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("All Projects");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubProjects();
  }, []);

  useEffect(() => {
    const tasksRef = collection(db, "tasks");
    const tasksQuery = id ? query(tasksRef, where("projectId", "==", id)) : tasksRef;

    const unsubTasks = onSnapshot(tasksQuery, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubTasks();
  }, [id]);

  useEffect(() => {
    if (!id || !projects.length) {
      setProjectName("All Projects");
      return;
    }

    const current = projects.find((project) => project.id === id);
    setProjectName(current?.name || "Project Board");
  }, [id, projects]);

  const addTask = async () => {
    if (!title.trim()) return;
    setLoading(true);

    try {
      await addDoc(collection(db, "tasks"), {
        title,
        status: "To Do",
        assignedTo: "Team",
        dueDate: "TBD",
        projectId: id || null,
        createdAt: new Date().toISOString(),
      });

      setTitle("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const statusMap = {
      "todo-column": "To Do",
      "progress-column": "In Progress",
      "done-column": "Done"
    };

    const newStatus = statusMap[destination.droppableId];

    try {
      const taskRef = doc(db, "tasks", draggableId);
      await updateDoc(taskRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const todo = tasks.filter((t) => t.status === "To Do");
  const progress = tasks.filter((t) => t.status === "In Progress");
  const done = tasks.filter((t) => t.status === "Done");

  const statusCounts = useMemo(
    () => ({
      todo: todo.length,
      progress: progress.length,
      done: done.length,
      total: tasks.length,
    }),
    [todo.length, progress.length, done.length, tasks.length]
  );

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 min-h-screen">
          <Navbar />

          <main className="p-8 md:ml-[260px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold">{projectName}</h1>
                <p className="text-gray-500 mt-2">
                  {id
                    ? "Tasks for this selected project board."
                    : "All tasks across all available projects."}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row items-start sm:items-center w-full sm:w-auto">
                <Link
                  to="/create-project"
                  className="px-5 py-3 bg-white border border-gray-200 rounded-xl text-slate-900 hover:shadow-sm"
                >
                  New Project
                </Link>
                <div className="flex gap-3 w-full sm:w-auto">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New task title"
                    className="rounded-xl border border-gray-200 px-4 py-3 w-full text-slate-900"
                  />
                  <button
                    onClick={addTask}
                    className="bg-indigo-700 text-white px-5 rounded-xl hover:bg-indigo-800"
                  >
                    {loading ? "Adding..." : "Add Task"}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500">To Do</p>
                <h2 className="text-3xl font-bold mt-3">{statusCounts.todo}</h2>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500">In Progress</p>
                <h2 className="text-3xl font-bold mt-3">{statusCounts.progress}</h2>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500">Done</p>
                <h2 className="text-3xl font-bold mt-3">{statusCounts.done}</h2>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500">Total Tasks</p>
                <h2 className="text-3xl font-bold mt-3">{statusCounts.total}</h2>
              </div>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid md:grid-cols-3 gap-6">
                <Droppable droppableId="todo-column">
                  {(provided) => (
                    <div
                      className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <h2 className="mb-4 text-xl font-bold">To Do</h2>
                      {todo.length ? (
                        todo.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TaskCard task={task} projectId={task.projectId} />
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <p className="text-gray-500">No tasks in this column.</p>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <Droppable droppableId="progress-column">
                  {(provided) => (
                    <div
                      className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <h2 className="mb-4 text-xl font-bold">In Progress</h2>
                      {progress.length ? (
                        progress.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TaskCard task={task} projectId={task.projectId} />
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <p className="text-gray-500">No tasks in this column.</p>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <Droppable droppableId="done-column">
                  {(provided) => (
                    <div
                      className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <h2 className="mb-4 text-xl font-bold">Done</h2>
                      {done.length ? (
                        done.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TaskCard task={task} projectId={task.projectId} />
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <p className="text-gray-500">No tasks in this column.</p>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>

        </main>
        </div>
      </div>
    </div>
  );
}
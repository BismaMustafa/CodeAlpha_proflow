import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Comments from "../components/Comments";

export default function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const taskRef = doc(db, "tasks", id);

        const unsubscribe = onSnapshot(
            taskRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    setTask({
                        id: snapshot.id,
                        ...snapshot.data(),
                    });
                } else {
                    setTask(null);
                }
                setLoading(false);
            },
            (error) => {
                console.log(error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [id]);

    // DELETE TASK
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "tasks", id));
            navigate("/board");
        } catch (error) {
            console.log("Delete error:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f9ff] flex justify-center items-center">
                <h1 className="text-2xl font-bold">Loading Task...</h1>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="min-h-screen bg-[#f8f9ff] flex flex-col justify-center items-center gap-5">
                <h1 className="text-3xl font-bold text-red-500">
                    Task Not Found
                </h1>

                <Link
                    to="/board"
                    className="px-6 py-3 bg-indigo-700 text-white rounded-xl"
                >
                    Back to Board
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">

            {/* Header */}
            <header className="bg-white shadow-sm border-b px-8 py-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        to="/board"
                        className="w-10 h-10 rounded-full bg-[#eef2ff] flex items-center justify-center"
                    >
                        ←
                    </Link>

                    <div>
                        <h1 className="text-3xl font-bold">Task Details</h1>
                        <p className="text-gray-500 text-sm">
                            View complete task information
                        </p>
                    </div>
                </div>

                {/* DELETE BUTTON */}
                <button
                    onClick={handleDelete}
                    className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                >
                    Delete Task
                </button>
            </header>

            {/* MAIN */}
            <div className="max-w-5xl mx-auto p-8">

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border">

                        <div className="flex justify-between items-start flex-wrap gap-3">

                            <div>
                                <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-600">
                                    {task.priority || "High"}
                                </span>

                                <h2 className="text-3xl font-bold mt-4">
                                    {task.title}
                                </h2>
                            </div>

                            <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl font-semibold">
                                {task.status}
                            </span>

                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-bold mb-3">Description</h3>
                            <p className="text-gray-600">
                                {task.description || "No description available."}
                            </p>
                        </div>

                        {/* COMMENTS */}
                        <div className="mt-10">
                            <h3 className="text-xl font-bold mb-4">Comments</h3>

                            <Comments
                                projectId={task.projectId || "defaultProject"}   // MUST exist
                                taskId={task.id}
                            />
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

                        <div className="bg-white rounded-3xl p-6 border shadow-sm">

                            <h3 className="text-xl font-bold mb-5">Task Info</h3>

                            <div className="space-y-4 text-sm">

                                <div>
                                    <p className="text-gray-500">Assigned To</p>
                                    <p className="font-semibold">
                                        {task.assignedTo || "Unassigned"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Due Date</p>
                                    <p className="font-semibold">
                                        {task.dueDate || "No date"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Task ID</p>
                                    <p className="font-semibold break-all">
                                        {task.id}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}
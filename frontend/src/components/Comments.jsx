import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot
} from "firebase/firestore";

export default function Comments({ projectId, taskId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 🛑 SAFE GUARD (IMPORTANT)
    if (!projectId || !taskId) return;

    const ref = collection(
      db,
      "projects",
      projectId,
      "tasks",
      taskId,
      "comments"
    );

    const unsub = onSnapshot(ref, (snap) => {
      setComments(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    });

    return () => unsub();
  }, [projectId, taskId]);

  const sendComment = async () => {
    if (!text.trim()) return;

    // 🛑 SAFE GUARD
    if (!projectId || !taskId) {
      console.log("Missing projectId or taskId");
      return;
    }

    const ref = collection(
      db,
      "projects",
      projectId,
      "tasks",
      taskId,
      "comments"
    );

    await addDoc(ref, {
      text,
      createdAt: new Date(),
    });

    setText("");
  };

  return (
    <div className="mt-2">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comment"
          className="border p-2 w-full rounded"
        />

        <button
          onClick={sendComment}
          className="bg-green-600 text-white px-3 rounded"
        >
          Send
        </button>
      </div>

      <div className="mt-2 space-y-1">
        {comments.map((c) => (
          <p key={c.id} className="text-sm">
            💬 {c.text}
          </p>
        ))}
      </div>
    </div>
  );
}
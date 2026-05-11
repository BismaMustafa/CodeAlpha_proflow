import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export default function Notifications() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "notifications"), (snap) => {
      setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  return (
    <div className="p-4">

      <h1 className="text-xl font-bold mb-3">Notifications</h1>

      {notes.map(n => (
        <div key={n.id} className="border p-2 mb-2">
          🔔 {n.message}
        </div>
      ))}

    </div>
  );
}
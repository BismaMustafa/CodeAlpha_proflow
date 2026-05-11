import NotificationBell from "./NotificationBell";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-6 bg-white border-b border-gray-200 shadow-sm">
      <h1 className="text-xl font-bold text-slate-900">
        TaskFlow
      </h1>

      <NotificationBell />
    </div>
  );
}
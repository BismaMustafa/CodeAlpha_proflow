import { useState } from "react";
import { FaBell } from "react-icons/fa";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Task Completed",
      message: "Your task 'Design Homepage' has been completed",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "New Comment",
      message: "John commented on 'API Integration'",
      time: "4 hours ago",
      read: false
    },
    {
      id: 3,
      title: "Project Update",
      message: "Project deadline extended to next week",
      time: "1 day ago",
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full"
      >
        <FaBell size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {notification.title}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {notification.message}
                      </p>
                      <p className="text-gray-400 text-xs mt-2">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-2"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-gray-200">
            <button className="text-indigo-600 text-sm hover:text-indigo-800 font-medium">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
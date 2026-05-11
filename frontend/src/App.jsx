import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BoardPage from "./pages/BoardPage";
import CreateProject from "./pages/CreateProject";
import TaskDetails from "./pages/TaskDetails";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/board" element={<ProtectedRoute><BoardPage /></ProtectedRoute>} />
      <Route path="/board/:id" element={<ProtectedRoute><BoardPage /></ProtectedRoute>} />
      <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
      <Route path="/task/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
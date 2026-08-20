import { Navigate, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import CandidateDashboard from "../pages/candidate/Dashboard";
// import SavedJobs from "../pages/candidate/saved-jobs/SavedJobs";
import EmployerDashboard from "../pages/employer/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute allowedRole="candidate">
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute allowedRole="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/candidate/saved-jobs"
        element={
          <ProtectedRoute allowedRole="candidate">
            <SavedJobs />
          </ProtectedRoute>
        }
      /> */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
import { Navigate, Routes, Route } from "react-router-dom";

import CandidateLogin from "../pages/auth/CandidateLogin";
import EmployerLogin from "../pages/auth/EmployerLogin";

import CandidateDashboard from "../pages/candidate/Dashboard";
import EmployerDashboard from "../pages/employer/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CandidateLogin />} />
      <Route path="/candidate-login" element={<CandidateLogin />} />
      <Route path="/employer-login" element={<EmployerLogin />} />

      <Route
        path="/candidate/dashboard"
        element={<CandidateDashboard />}
      />

      <Route
        path="/employer/dashboard"
        element={<EmployerDashboard />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

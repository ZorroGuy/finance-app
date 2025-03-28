import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutUsPage";
import "bootstrap/dist/css/bootstrap.min.css";

const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated() ? <Navigate to="/" replace /> : <LoginPage />
        }
      />
      <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
      <Route
        path="/about"
        element={<ProtectedRoute element={<AboutPage />} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default App;

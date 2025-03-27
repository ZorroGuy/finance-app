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

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

export default App;

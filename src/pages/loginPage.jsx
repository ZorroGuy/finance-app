import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider1 from "../assets/images/Business Plan-pana.png";
import Slider2 from "../assets/images/Investment data-amico.png";
import Slider3 from "../assets/images/Team goals-rafiki.png";

import { useNavigate } from "react-router-dom";

const images = [Slider1, Slider2, Slider3];

const LoginPage = () => {
  const navgator = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { email: "", password: "" };

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;

    setLoading(true);
    setTimeout(() => {
      console.log("User Data:", formData);
      setLoading(false);
      navgator("/");
    }, 2000);
  };

  return (
    <div className="container-fluid vh-100 d-flex p-0">
      {/* Left Side (Slider) */}
      <div className="d-none d-md-flex col-md-6 bg-primary text-white flex-column justify-content-center align-items-center p-5 position-relative">
        <div className="slider-container position-relative w-100">
          <img
            src={images[currentImage]}
            alt="Slide"
            className="img-fluid w-100"
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />
          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot mx-1 ${
                  index === currentImage ? "active-dot" : ""
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <div className="col-md-4 d-flex justify-content-center align-items-center p-4">
        <div className="w-100 w-md-75">
          <h2 className="fw-bold text-center mb-3">Welcome Back!</h2>
          <p className="text-center">
            Don't have an account?{" "}
            <a href="#ioi" className="text-primary">
              Create a new account
            </a>
            , it's FREE! Takes less than a minute.
          </p>
          <div className="d-flex justify-content-center">
            <div
              className="border rounded p-4 shadow-sm"
              style={{
                width: "500px",
                background: "none",
                borderColor: "#ccc",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email}</p>
                  )}
                </div>

                <div className="mb-3 position-relative">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-danger">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Additional CSS */}
      <style>
        {`
          .dot {
            height: 10px;
            width: 10px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            transition: background-color 0.3s;
          }
          .active-dot {
            background-color: white;
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;

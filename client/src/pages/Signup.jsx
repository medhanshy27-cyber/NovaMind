import { useState } from "react";
import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Signup() {
  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await axios.post(
            "https://novamind-backend-1b22.onrender.com/api/auth/signup",
            formData
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        navigate("/chat");
      } catch (
        error
      ) {
        alert(
          error.response
            ?.data
            ?.message ||
            "Signup Failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex">

      {/* Left Side */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#5B7FFF]/10 blur-[120px]" />

        <div className="z-10 max-w-xl px-12">

          <h1 className="text-7xl font-bold bg-gradient-to-r from-white via-[#A5B4FC] to-[#7A5CFA] bg-clip-text text-transparent">
            NovaMind
          </h1>

          <p className="text-2xl mt-6 text-[#9CA3AF]">
            Think Faster.
            Learn Smarter.
          </p>

          <div className="mt-10 space-y-5 text-[#9CA3AF]">

            <p>
              🧠 Smart AI learning
            </p>

            <p>
              💻 Coding assistant
            </p>

            <p>
              🚀 Career guidance
            </p>

            <p>
              🎨 Creative thinking
            </p>

          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-10">

        <div className="w-full max-w-md bg-[#111827] border border-white/[0.06] rounded-[32px] p-10 shadow-2xl">

          <h2 className="text-4xl font-semibold mb-8 text-[#F5F7FA]">
            Create Account
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              className="w-full p-5 rounded-2xl bg-[#1A1F2E] border border-white/[0.06] outline-none text-white placeholder-[#6B7280]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              className="w-full p-5 rounded-2xl bg-[#1A1F2E] border border-white/[0.06] outline-none text-white placeholder-[#6B7280]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              className="w-full p-5 rounded-2xl bg-[#1A1F2E] border border-white/[0.06] outline-none text-white placeholder-[#6B7280]"
            />

            <button
              type="submit"
              className="w-full p-5 rounded-2xl bg-gradient-to-r from-[#5B7FFF] to-[#7A5CFA] font-semibold hover:scale-[1.02] transition"
            >
              Create Account
            </button>

            <p className="text-center text-[#9CA3AF]">
              Already have an
              account?{" "}
              <Link
                to="/login"
                className="text-[#A5B4FC]"
              >
                Login
              </Link>
            </p>

          </form>

        </div>
      </div>

    </div>
  );
}

export default Signup;
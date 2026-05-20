import { useState } from "react";
import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Login() {
  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
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
            "https://novamind-backend-1b22.onrender.com/api/auth/login",
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
            "Login Failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex">

      {/* Left */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">

        <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px]" />

        <div className="z-10 max-w-xl px-12">

          <h1 className="text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            NovaMind
          </h1>

          <p className="text-2xl mt-6 text-gray-300">
            Think Faster.
            Learn Smarter.
          </p>

          <div className="mt-10 space-y-5 text-gray-400">

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

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-10">

        <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[2rem] p-10">

          <h2 className="text-4xl font-bold mb-8">
            Welcome Back
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >

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
              className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 outline-none"
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
              className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />

            <button
              type="submit"
              className="w-full p-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold hover:scale-[1.02] transition"
            >
              Login
            </button>

            <p className="text-center text-gray-400">
              New here?{" "}
              <Link
                to="/signup"
                className="text-cyan-400"
              >
                Create account
              </Link>
            </p>

          </form>

        </div>
      </div>

    </div>
  );
}

export default Login;
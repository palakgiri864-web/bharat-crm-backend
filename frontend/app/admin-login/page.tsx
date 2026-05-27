"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);

        alert("Login Successful");

        router.push("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center overflow-hidden relative">

      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
        }}
        className="absolute w-[450px] h-[450px] bg-orange-500/30 blur-[140px] rounded-full top-[-150px] left-[-100px]"
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        className="w-[420px] bg-[#18181c] border border-orange-500/10 rounded-[40px] p-10 shadow-2xl relative z-10"
      >

        <p className="text-orange-500 text-sm tracking-[4px] font-black">
          BHARAT CRM
        </p>

        <h1 className="text-5xl text-white font-black mt-4 leading-none">
          Admin Login
        </h1>

        <p className="text-zinc-500 mt-3 text-sm">
          Premium Real Estate Dashboard Access
        </p>

        <form
          onSubmit={loginAdmin}
          className="mt-10 space-y-5"
        >

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            className="w-full bg-[#111114] border border-orange-500/10 rounded-2xl px-5 py-4 outline-none text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            className="w-full bg-[#111114] border border-orange-500/10 rounded-2xl px-5 py-4 outline-none text-white"
          />

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-4 rounded-2xl font-black text-lg shadow-2xl"
          >
            Login
          </motion.button>

        </form>

      </motion.div>

    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "https://bharat-crm-backend.onrender.com";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("admin@bharatcrm.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const loginAdmin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      alert("Backend connection failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fff7f0] flex items-center justify-center">
      <form
        onSubmit={loginAdmin}
        className="bg-white w-[420px] p-8 rounded-[32px] shadow-2xl border border-orange-100"
      >
        <p className="text-orange-500 font-black tracking-[4px] text-xs">
          BHARAT CRM
        </p>

        <h1 className="text-5xl font-black mt-3 mb-3">
          Admin Login
        </h1>

        <p className="text-gray-500 mb-8 text-sm">
          Login to manage all real estate leads.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          className="w-full border border-orange-100 bg-orange-50 p-4 rounded-2xl mb-4 outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          className="w-full border border-orange-100 bg-orange-50 p-4 rounded-2xl mb-6 outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white p-4 rounded-2xl font-black"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
"use client";

import { useState } from "react";

export default function Home() {

  const [formData, setFormData] = useState({
    project: "The Legend",
    name: "",
    phone: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch("http://localhost:5000/api/leads", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)

      });

      const data = await response.json();

      console.log(data);

      alert("Lead Submitted Successfully");

      setFormData({
        project: "The Legend",
        name: "",
        phone: "",
        email: ""
      });

    } catch (error) {

      console.log(error);

      alert("Error Submitting Lead");

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-[400px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          The Legend
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-lg"
        >

          {loading ? "Submitting..." : "Submit Lead"}

        </button>

      </form>

    </div>

  );

}
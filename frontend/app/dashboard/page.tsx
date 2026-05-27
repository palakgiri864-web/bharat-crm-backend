"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const router = useRouter();

  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddLead, setShowAddLead] = useState(false);

  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin-login");
      return;
    }

    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/leads", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!data.success) {
      localStorage.removeItem("token");
      router.push("/admin-login");
      return;
    }

    setLeads(data.data || []);
  };

  const addLead = async (e: any) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLead),
    });

    setNewLead({
      name: "",
      phone: "",
      email: "",
      project: "",
    });

    setShowAddLead(false);
    fetchLeads();
  };

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/leads/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    fetchLeads();
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/leads/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchLeads();
  };

  const logoutAdmin = () => {
    localStorage.removeItem("token");
    router.push("/admin-login");
  };

  const projects = [
    "all",
    ...Array.from(new Set(leads.map((lead: any) => lead.project))),
  ];

  const filteredLeads = leads.filter((lead: any) => {
    const matchSearch = lead.name?.toLowerCase().includes(search.toLowerCase());
    const matchProject =
      projectFilter === "all" || lead.project === projectFilter;
    const matchStatus =
      statusFilter === "all" || lead.status === statusFilter;

    return matchSearch && matchProject && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#fff7f0] text-[#1a1a1a]">
      <div className="flex">
        <div className="w-[260px] min-h-screen bg-white/70 backdrop-blur-3xl border-r border-orange-100 p-6">
          <h1 className="text-4xl font-black text-orange-500">Bharat CRM</h1>
          <p className="text-sm text-[#777] mt-1 mb-10">Luxury Automation</p>

          {["Dashboard", "Leads", "Projects", "Analytics", "Settings"].map(
            (item, i) => (
              <motion.div
                key={item}
                whileHover={{ x: 10, scale: 1.03 }}
                whileTap={{ scale: 0.92 }}
                className={`px-5 py-4 rounded-2xl mb-3 cursor-pointer text-sm font-bold ${
                  i === 0
                    ? "bg-orange-500 text-white shadow-xl"
                    : "text-[#666] hover:bg-orange-50"
                }`}
              >
                {item}
              </motion.div>
            )
          )}
        </div>

        <div className="flex-1 p-7">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 border border-orange-100 backdrop-blur-3xl rounded-[40px] p-8 mb-6 shadow-xl"
          >
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs tracking-[5px] text-orange-500 font-black">
                  PREMIUM REAL ESTATE CRM
                </p>
                <h1 className="text-6xl font-black mt-3 leading-none">
                  Lead Universe
                </h1>
                <p className="text-[#666] mt-4 text-sm">
                  Add, filter and manage project-wise leads.
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <button
                  onClick={() => setShowAddLead(true)}
                  className="bg-orange-500 text-white px-6 py-4 rounded-2xl font-black"
                >
                  Add Lead
                </button>

                <button
                  onClick={logoutAdmin}
                  className="bg-red-500 text-white px-6 py-4 rounded-2xl font-black"
                >
                  Logout
                </button>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="bg-black text-white px-8 py-5 rounded-[30px] font-black shadow-2xl"
                >
                  {filteredLeads.length} Leads
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              placeholder="Search Leads..."
              className="bg-white border border-orange-100 rounded-[24px] px-5 py-4 outline-none text-sm shadow-lg"
            />

            <select
              value={projectFilter}
              onChange={(e: any) => setProjectFilter(e.target.value)}
              className="bg-white border border-orange-100 rounded-[24px] px-5 py-4 outline-none text-sm font-bold text-orange-500 shadow-lg"
            >
              {projects.map((project: any) => (
                <option key={project} value={project}>
                  {project === "all" ? "All Projects" : project}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
              className="bg-white border border-orange-100 rounded-[24px] px-5 py-4 outline-none text-sm font-bold text-orange-500 shadow-lg"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="site_visit">Site Visit</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-6">
            {filteredLeads.map((lead: any, index: number) => (
              <motion.div
                key={lead._id}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -14,
                  scale: 1.04,
                  boxShadow: "0 0 50px rgba(249,115,22,.25)",
                }}
                className="bg-white border border-orange-100 rounded-[34px] p-5 shadow-xl"
              >
                <h2 className="text-xl font-black">{lead.name}</h2>

                <p className="text-xs text-orange-500 font-bold mt-1">
                  {lead.project}
                </p>

                <div className="space-y-2 text-sm text-[#555] mt-4">
                  <p>📞 {lead.phone}</p>
                  <p className="truncate">📧 {lead.email}</p>
                </div>

                <select
                  value={lead.status}
                  onChange={(e: any) => updateStatus(lead._id, e.target.value)}
                  className="w-full mt-5 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-3 text-sm outline-none font-bold text-orange-500"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="site_visit">Site Visit</option>
                  <option value="closed">Closed</option>
                </select>

                <button
                  onClick={() => deleteLead(lead._id)}
                  className="mt-4 w-full bg-white border border-orange-100 py-3 rounded-2xl text-sm font-black text-orange-500"
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAddLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.form
              onSubmit={addLead}
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              className="bg-white rounded-[36px] p-8 w-[520px] shadow-2xl border border-orange-100"
            >
              <h2 className="text-4xl font-black">Add New Lead</h2>
              <p className="text-orange-500 font-bold mt-1">
                Manual lead entry
              </p>

              <div className="mt-8 space-y-4">
                <input
                  type="text"
                  placeholder="Client Name"
                  value={newLead.name}
                  onChange={(e: any) =>
                    setNewLead({ ...newLead, name: e.target.value })
                  }
                  className="w-full bg-orange-50 border border-orange-100 px-5 py-4 rounded-2xl outline-none"
                  required
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={newLead.phone}
                  onChange={(e: any) =>
                    setNewLead({ ...newLead, phone: e.target.value })
                  }
                  className="w-full bg-orange-50 border border-orange-100 px-5 py-4 rounded-2xl outline-none"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={newLead.email}
                  onChange={(e: any) =>
                    setNewLead({ ...newLead, email: e.target.value })
                  }
                  className="w-full bg-orange-50 border border-orange-100 px-5 py-4 rounded-2xl outline-none"
                />

                <input
                  type="text"
                  placeholder="Project Name"
                  value={newLead.project}
                  onChange={(e: any) =>
                    setNewLead({ ...newLead, project: e.target.value })
                  }
                  className="w-full bg-orange-50 border border-orange-100 px-5 py-4 rounded-2xl outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                  type="submit"
                  className="bg-orange-500 text-white py-4 rounded-2xl font-black"
                >
                  Save Lead
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddLead(false)}
                  className="bg-black text-white py-4 rounded-2xl font-black"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

const initialForm = {
  email: "",
  programCode: "",
  cohortCode: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  address: "",
};

export default function RegisterStudentPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [allPrograms, setAllPrograms] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
    // Fetch departments and all programs on mount
    useEffect(() => {
      async function fetchDepartmentsAndPrograms() {
        try {
          const deptRes = await api.get("/academics/departments");
          const deptList = Array.isArray(deptRes.data?.data) ? deptRes.data.data : deptRes.data;
          setDepartments(deptList || []);
          // Fetch all programs (not filtered by department)
          const progRes = await api.get("/academics/programs");
          const progList = Array.isArray(progRes.data?.data) ? progRes.data.data : progRes.data;
          setAllPrograms(progList || []);
        } catch (e) {
          setDepartments([]);
          setAllPrograms([]);
        }
      }
      fetchDepartmentsAndPrograms();
    }, []);
  // Fetch programs on mount
  // Filter programs by selected department
  useEffect(() => {
    if (!selectedDepartment) {
      setPrograms([]);
      setForm((prev) => ({ ...prev, programCode: "", cohortCode: "" }));
      setCohorts([]);
      return;
    }
    const filtered = allPrograms.filter((p) => p.departmentId === selectedDepartment);
    setPrograms(filtered);
    setForm((prev) => ({ ...prev, programCode: "", cohortCode: "" }));
    setCohorts([]);
  }, [selectedDepartment, allPrograms]);

  // Fetch cohorts when program changes
  useEffect(() => {
    async function fetchCohorts() {
      if (!form.programCode) {
        setCohorts([]);
        setForm((prev) => ({ ...prev, cohortCode: "" }));
        return;
      }
      try {
        // Find the selected program by code to get its id
        const selectedProgram = programs.find((p) => p.code === form.programCode);
        if (!selectedProgram) {
          setCohorts([]);
          setForm((prev) => ({ ...prev, cohortCode: "" }));
          return;
        }
        const res = await api.get(`/academics/programs/${selectedProgram.id}/cohorts`);
        const cohortList = Array.isArray(res.data?.data) ? res.data.data : res.data;
        setCohorts(cohortList || []);
        // If current cohortCode is not in new list, reset
        if (!cohortList?.some((c: any) => c.code === form.cohortCode)) {
          setForm((prev) => ({ ...prev, cohortCode: "" }));
        }
      } catch (e) {
        setCohorts([]);
        setForm((prev) => ({ ...prev, cohortCode: "" }));
      }
    }
    fetchCohorts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.programCode, programs]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:3001/api/academics/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message || "Student registered successfully.");
        setForm(initialForm);
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="w-full mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Register Admitted Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Email<span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="student@email.com"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Department<span className="text-red-500">*</span></label>
            <select
              value={selectedDepartment}
              onChange={e => setSelectedDepartment(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Program<span className="text-red-500">*</span></label>
            <select
              name="programCode"
              value={form.programCode}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              disabled={!selectedDepartment || programs.length === 0}
            >
              <option value="">{!selectedDepartment ? "Select Department First" : programs.length === 0 ? "No Programs" : "Select Program"}</option>
              {programs.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name} ({p.code})
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Cohort<span className="text-red-500">*</span></label>
            <select
              name="cohortCode"
              value={form.cohortCode}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              disabled={!form.programCode || cohorts.length === 0}
            >
              <option value="">{!form.programCode ? "Select Program First" : cohorts.length === 0 ? "No Cohorts" : "Select Cohort"}</option>
              {cohorts.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">First Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="First Name"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Last Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="+1234567890"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="123 Main St, City"
          />
        </div>
        {error && <div className="text-red-600 font-medium">{error}</div>}
        {success && <div className="text-green-600 font-medium">{success}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register Student"}
        </button>
      </form>
    </div>
  );
}

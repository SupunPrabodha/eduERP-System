import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    employeeid: "",
    name: "",
    age: "",
    department: "",
    email: "",
    mobile: "",
    status: "",
    address: "",
    salary: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`http://localhost:5555/staff`);
        const staff = res.data.staffM.find((s) => s._id === id);
        if (!staff) throw new Error("Staff member not found");
        setForm({
          employeeid: staff.employeeid || "",
          name: staff.name || "",
          age: staff.age || "",
          department: staff.department || "",
          email: staff.email || "",
          mobile: staff.mobile || "",
          status: staff.status || "",
          address: staff.address || "",
          salary: staff.salary || "",
        });
      } catch (err) {
        setError(err.message || "Failed to fetch staff member.");
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5555/staff/${id}`, form);
      Swal.fire("Updated!", "Staff member has been updated.", "success");
      navigate("/");
    } catch (err) {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Failed to update staff member.",
        "error"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Update Staff Member</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Employee ID</label>
            <input name="employeeid" value={form.employeeid} onChange={handleChange} className="border px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="border px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Age</label>
            <input name="age" value={form.age} onChange={handleChange} className="border px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Department</label>
            <input name="department" value={form.department} onChange={handleChange} className="border px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="border px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Mobile</label>
            <input name="mobile" value={form.mobile} onChange={handleChange} className="border px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Status</label>
            <input name="status" value={form.status} onChange={handleChange} className="border px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Address</label>
            <input name="address" value={form.address} onChange={handleChange} className="border px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Salary</label>
            <input name="salary" value={form.salary} onChange={handleChange} className="border px-2 py-1 w-full" required />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold">Update</button>
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded font-bold" onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateStaff;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DisplayStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleEditNavigate = (id) => {
    navigate(`/staff/update/${id}`);
  };

  const fetchStaff = async () => {
    setLoading(true);
    setError("");
    try {
  const res = await axios.get("http://localhost:5555/staff");
      setStaff(res.data.staffM || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch staff. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5555/staff/${id}`);
          Swal.fire("Deleted!", "Staff member has been deleted.", "success");
          fetchStaff();
        } catch (err) {
          Swal.fire(
            "Error!",
            err.response?.data?.message || "Failed to delete staff member.",
            "error"
          );
        }
      }
    });
  };

  const tableStyles = {
    actionButton: {
      padding: "6px 12px",
      backgroundColor: "#d33",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">All Staff Members</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : staff.length === 0 ? (
        <div>No staff members found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Employee ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Department</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Mobile</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Salary</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{s.employeeid}</td>
                  <td className="py-2 px-4 border">{s.name}</td>
                  <td className="py-2 px-4 border">{s.department}</td>
                  <td className="py-2 px-4 border">{s.email}</td>
                  <td className="py-2 px-4 border">{s.mobile}</td>
                  <td className="py-2 px-4 border">{s.status}</td>
                  <td className="py-2 px-4 border">{s.salary}</td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      style={{ ...tableStyles.actionButton, backgroundColor: '#3085d6', marginRight: 4 }}
                      onClick={() => handleEditNavigate(s._id)}
                    >
                      Edit
                    </button>
                    <button
                      style={tableStyles.actionButton}
                      onClick={() => handleDelete(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DisplayStaff;

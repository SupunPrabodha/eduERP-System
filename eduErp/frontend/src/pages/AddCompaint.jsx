import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const AddCompaint = () => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // Get logged-in user info
  const currentUser = authService.getCurrentUser();
  const userId = currentUser?.id || "";
  const name = currentUser?.name || currentUser?.firstName || "";
  const role = currentUser?.role || "";

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare form data for submission
    const formData = new FormData();
    formData.append("reason", reason);
    formData.append("description", description);
    if (picture) {
      formData.append("picture", picture);
    }
    formData.append("userId", userId); // still sent to backend, but not shown
    formData.append("name", name);
    formData.append("role", role);

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Complaint submitted successfully!");
        setTimeout(() => {
          navigate("/teacher-dashboard");
        }, 1000);
      } else {
        alert("Failed to submit complaint.");
        setTimeout(() => {
          navigate("/teacher-dashboard");
        }, 1000);
      }
    } catch (error) {
      alert("Error submitting complaint.");
      setTimeout(() => {
        navigate("/teacher-dashboard");
      }, 1000);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: 24, boxShadow: "0 2px 8px #ccc", borderRadius: 8 }}>
      <h2>Add Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Name:</label>
          <input type="text" value={name} disabled style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Role:</label>
          <input type="text" value={role} disabled style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Topic:</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            placeholder="Enter reason"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 4, minHeight: 80 }}
            placeholder="Enter description"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Picture (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
            style={{ display: "block", marginTop: 4 }}
          />
          {preview && (
            <img src={preview} alt="Preview" style={{ marginTop: 8, maxWidth: "100%", maxHeight: 200, borderRadius: 4 }} />
          )}
        </div>
        <button type="submit" style={{ padding: "8px 16px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4 }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCompaint;
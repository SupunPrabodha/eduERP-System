import React from "react";
import "./LeaveForm.css";

const LeaveForm = () => {
  return (
    <div>
      <form className="leave-form">
        <h2 className="leave-form-title">Leave Application Form</h2>
        <div className="leave-form-group">
          <label className="leave-form-label" htmlFor="name">Name:</label>
          <input type="text" className="leave-form-input" id="name" name="name" />
        </div>
        <div className="leave-form-group">
          <label className="leave-form-label" htmlFor="leaveType">Leave Type:</label>
          <select className="leave-form-input" id="leaveType" name="leaveType">
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="annual">Annual Leave</option>
          </select>
        </div>
        <div className="leave-form-row">
          <div className="leave-form-group">
            <label className="leave-form-label" htmlFor="fromDate">From:</label>
            <input type="date" className="leave-form-input" id="fromDate" name="fromDate" />
          </div>
          <div className="leave-form-group">
            <label className="leave-form-label" htmlFor="toDate">To:</label>
            <input type="date" className="leave-form-input" id="toDate" name="toDate" />
          </div>
        </div>
        <div className="leave-form-group">
          <label className="leave-form-label" htmlFor="reason">Reason:</label>
          <textarea className="leave-form-input" id="reason" name="reason" rows="3"></textarea>
        </div>
        <button type="submit" className="leave-form-submit">Submit</button>
      </form>
    </div>
  );
};

export default LeaveForm;

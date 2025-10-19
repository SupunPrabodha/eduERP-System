import React, { useEffect, useState } from "react";
import { studentService } from "../services/studentService";
import { teacherService } from "../services/teacherService";

const UserAnalysis = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Analysis results
  const [studentGroups, setStudentGroups] = useState({
    primary: 0,
    secondary: 0,
    advanced: 0,
  });
  const [teacherCount, setTeacherCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, teacherRes] = await Promise.all([
          studentService.getAllStudents(),
          teacherService.getAllTeachers()
        ]);
        console.log('Student API response:', studentRes);
        console.log('Teacher API response:', teacherRes);
        // Extract arrays from response objects
        const studentList = Array.isArray(studentRes)
          ? studentRes
          : studentRes.students || studentRes.data || [];
        const teacherList = Array.isArray(teacherRes)
          ? teacherRes
          : teacherRes.teachers || teacherRes.data || [];
        setStudents(studentList);
        setTeachers(teacherList);
        analyzeStudents(studentList);
        setTeacherCount(Array.isArray(teacherList) ? teacherList.length : 0);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const analyzeStudents = (data) => {
    let primary = 0,
      secondary = 0,
      advanced = 0;
    data.forEach((student) => {
      // Assume student.grade is a number
      if (student.grade >= 1 && student.grade <= 5) primary++;
      else if (student.grade >= 6 && student.grade <= 11) secondary++;
      else if (student.grade >= 12 && student.grade <= 13) advanced++;
    });
    setStudentGroups({ primary, secondary, advanced });
  };

  return (
    <div className="user-analysis-page">
      <h1>User Analysis</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="analysis-results">
          <h2>Student Analysis</h2>
          <ul>
            <li>Primary (Grade 1-5): {studentGroups.primary}</li>
            <li>Secondary (Grade 6-11): {studentGroups.secondary}</li>
            <li>Advanced Level (Grade 12-13): {studentGroups.advanced}</li>
          </ul>
          <h2>Teacher Analysis</h2>
          <p>Total Teachers: {teacherCount}</p>
        </div>
      )}
    </div>
  );
};

export default UserAnalysis;

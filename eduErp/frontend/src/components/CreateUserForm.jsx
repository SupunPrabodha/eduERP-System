import React, { useState, useEffect } from 'react';
import userService from '../services/userService.js';
import studentService from '../services/studentService.js';
import teacherService from '../services/teacherService.js';
import { useRef } from 'react';

const SECTION_OPTIONS = [
  "Primary",
  "Secondary",
  "Art",
  "Commerce",
  "Maths",
  "Science",
  "Technology"
];

const TEACHER_SECTION_OPTIONS = [
  "Primary",
  "Secondary",
  "Advance level"
];

const CreateUserForm = ({ onClose, onUserCreated }) => {
  const topRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    role: 'STUDENT',
    profile: {
      firstName: '',
      lastName: '',
      dob: '',
      gender: 'Male',
      address: ''
    },
    remarks: ''
  });
  const [admissionNo, setAdmissionNo] = useState('');
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState(SECTION_OPTIONS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [nextUserId, setNextUserId] = useState('');

  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [subjectInput, setSubjectInput] = useState('');
  const [teacherSection, setTeacherSection] = useState(TEACHER_SECTION_OPTIONS[0]);
  const [joinDate, setJoinDate] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [teacherNic, setTeacherNic] = useState('');
  
  const roleOptions = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'TEACHER', label: 'Teacher' },
    { value: 'STUDENT', label: 'Student' },
    { value: 'PRINCIPLE', label: 'Principle' },
    { value: 'NON-ACADEMIC STAFF', label: 'Non-Academic Staff' },
    { value: 'ACADEMIC STAFF', label: 'Academic Staff' }
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ];

  // Add subject to subjects array
  const handleAddSubject = () => {
    if (subjectInput.trim()) {
      setTeacherSubjects([...teacherSubjects, subjectInput.trim()]);
      setSubjectInput('');
    }
  };

  // Remove subject
  const handleRemoveSubject = (index) => {
    setTeacherSubjects(teacherSubjects.filter((_, i) => i !== index));
  };

  // Get next user ID when role changes
  useEffect(() => {
    if (formData.role) {
      getNextUserId(formData.role);
    }

    const fetchNextAdmissionNo = async () => {
      try {
        const response = await studentService.getNextAdmissionNo();
        const nextNo = response.nextAdmissionNo;
        setAdmissionNo(nextNo);
      } catch (error) {
        console.error('Error fetching next admission number:', error);
        setAdmissionNo('');
      }
    }

    if(formData.role === 'STUDENT'){
      fetchNextAdmissionNo();
    } else{
      setAdmissionNo('');
    }

  }, [formData.role]);

  const getNextUserId = async (role) => {
    try {
      const response = await userService.getNextUserId(role);
      setNextUserId(response.data.nextUserId);
    } catch (error) {
      console.error('Error getting next user ID:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('profile.')) {
      const profileField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          [profileField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } 
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.profile.firstName || !formData.profile.lastName || !formData.profile.dob) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    // Date of Birth cannot be in the future
    if (formData.profile.dob) {
      const dobDate = new Date(formData.profile.dob);
      const today = new Date();
      // Set time to 00:00:00 for both dates to compare only the date part
      dobDate.setHours(0,0,0,0);
      today.setHours(0,0,0,0);
      if (dobDate > today) {
        setError('DOB cannot be future Date');
        return false;
      }
    }
    return true;
  };

  // Validate NIC for teacher
  const validateNic = (nic) => {
    if (!nic) return false;
    if (nic.length === 10) {
      const firstNine = nic.substring(0, 9);
      const lastChar = nic[9].toUpperCase();
      return (/^\d{9}$/.test(firstNine) && lastChar === 'V');
    }
    if (nic.length === 12) {
      return /^\d{12}$/.test(nic);
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setIsLoading(false);
      if(topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Teacher NIC validation
    if (formData.role === 'TEACHER') {
      if (!teacherNic) {
        setError('NIC is required for teachers');
        setIsLoading(false);
        if(topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      if (!validateNic(teacherNic)) {
        setError('Invalid NIC Number Format.');
        setIsLoading(false);
        if(topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    try {
      const response = await userService.createUser(formData);
      const newUserId = response.data.user.id;
      // console.log(response.data.user._id);
      // console.log(response.data.user.userId);
      console.log(response.data.user.id);
      
      
      if (formData.role === 'STUDENT') {
        // Create student record
        await studentService.createStudent({
          newUserId,
          admissionNo,
          grade,
          section
        });
      }

      // Teacher logic...
      if (formData.role === 'TEACHER') {
        await teacherService.createTeacher({
          userId: newUserId,
          nic: teacherNic,
          subjects: teacherSubjects,
          section: teacherSection,
          joinDate,
          qualification,
          experience: Number(experience)
        });
      }
      
      setSuccess(`User created successfully! User ID: ${response.data.user.userId}`);
      if(topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' });
      // Clear form
      setFormData({
        email: '',
        phone: '',
        role: 'STUDENT',
        profile: {
          firstName: '',
          lastName: '',
          dob: '',
          gender: 'Male',
          address: ''
        },
        remarks: ''
      });
      setTeacherNic('');
      setTeacherSubjects([]);
      setSubjectInput('');
      setTeacherSection(TEACHER_SECTION_OPTIONS[0]);
      setJoinDate('');
      setQualification('');
      setExperience('');

      // Call callback to refresh user list
      if (onUserCreated) {
        onUserCreated();
      }

      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      setError(error.message || 'Failed to create user');
      if(topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto h-full w-full z-50">
      {/* Beautiful gradient background with blur */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-900/20 via-white-900/20 to-white-900/20 backdrop-blur-sm"></div>
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Modal container */}
      <div className="relative min-h-screen flex items-center justify-center p-4 "ref={topRef}>
        <div className="relative w-full max-w-2xl">
          {/* Modal card with glass effect */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Gradient header */}
            <div className="bg-gradient-to-r from-sky-600 via-black-600 to-green-600 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Create New User</h3>
                    <p className="text-indigo-100 text-sm">Add a new user to the system</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form content */}
            <div className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{success}</p>
                    </div>
                  </div>
                </div>
              )}

              {nextUserId && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Next User ID: <span className="font-mono font-semibold">{nextUserId}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role *
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      {roleOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="user@example.com"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="+94 711234567"
                    />
                  </div>

                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="profile.firstName"
                      value={formData.profile.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Amal"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="profile.lastName"
                      value={formData.profile.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Perera"
                      required
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="profile.dob"
                      value={formData.profile.dob}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="profile.gender"
                      value={formData.profile.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    >
                      {genderOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="profile.address"
                    value={formData.profile.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="123 Main Street, City, Country"
                  />
                </div>

                {formData.role === 'STUDENT' && (
                  <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admission Number:
                    </label>
                    <input
                      type="text"
                      value={admissionNo}
                      onChange={(e) => setAdmissionNo(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter Admission Number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade:
                    </label>
                    <input
                      type="text"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter grade"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section:
                    </label>
                    <select
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      required
                      >
                        <option value="">Select Section</option>
                        {SECTION_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                  </div>
                  </>
                )}

                {formData.role === 'TEACHER' && (
                  <>
                    {/* NIC */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NIC *
                      </label>
                      <input
                        type="text"
                        value={teacherNic}
                        onChange={e => setTeacherNic(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Enter NIC"
                        required
                      />
                    </div>

                    {/* Subjects */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subjects:
                      </label>
                      <div className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          value={subjectInput}
                          onChange={e => setSubjectInput(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Enter subject"
                        />
                        <button type="button" onClick={handleAddSubject} className="px-6 py-3 bg-gradient-to-r from-sky-600 to-green-600 hover:from-sky-700 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl">
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {teacherSubjects.map((subj, idx) => (
                          <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                            {subj}
                            <button type="button" onClick={() => handleRemoveSubject(idx)} className="ml-2 text-red-500">&times;</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section:
                      </label>
                      <select
                        value={teacherSection}
                        onChange={e => setTeacherSection(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        required
                      >
                        {TEACHER_SECTION_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Join Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Join Date:
                      </label>
                      <input
                        type="date"
                        value={joinDate}
                        onChange={e => setJoinDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>

                    {/* Qualification */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Qualification:
                      </label>
                      <textarea
                        value={qualification}
                        onChange={e => setQualification(e.target.value)}
                        rows="2"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="e.g. MSc in Mathematics"
                      />
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience (years):
                      </label>
                      <input
                        type="number"
                        value={experience}
                        onChange={e => setExperience(e.target.value)}
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Years of experience"
                      />
                    </div>
                  </>
                )}

                {/* Remarks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Additional notes about the user"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-sky-600 to-green-600 hover:from-sky-700 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      'Create User'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { IconButton } from '@mui/material';
import { api } from '../services/authService.js';
import { DataGrid } from '@mui/x-data-grid';

const roleFilter = [
  'ADMIN',
  'TEACHER',
  'PRINCIPLE',
  'NON-ACADEMIC STAFF',
  'ACADEMIC STAFF'
];

const PayrollDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilterValue, setRoleFilterValue] = useState('');
  const [statusFilterValue, setStatusFilterValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
      const fetchPayrolls = async () => {
        try {
          const month = new Date().getMonth() + 1;
          const year = new Date().getFullYear();
          const res = await api.get(`/payroll/reports/${month}/${year}`);
          console.log('Payroll API response:', res.data);
          console.log("Hello");
          
          // Restore role filtering and log actual roles for debugging
          // Normalize roles for robust filtering
          const normalizedRoleFilter = roleFilter.map(r => r.toUpperCase().trim());
          const filtered = res.data.filter(p => {
            const role = p.userId?.role ? p.userId.role.toUpperCase().trim() : '';
            return normalizedRoleFilter.includes(role);
          });
          setPayrolls(filtered);
        } catch (err) {
          console.error('Payroll API error:', err);
          setPayrolls([]);
        } finally {
          setLoading(false);
        }
      };
      if (user && (user.role === 'ADMIN' || user.role === 'PRINCIPLE')) {
        fetchPayrolls();
      }
    }, [user]);


  // Filtering logic
  const filteredPayrolls = payrolls.filter(row => {
    // Name filter
    const name = row.userId?.profile ? `${row.userId.profile.firstName} ${row.userId.profile.lastName}` : row.userId?.userId || '';
    const matchesName = name.toLowerCase().includes(searchTerm.toLowerCase());
    // Role filter
    const matchesRole = roleFilterValue ? (row.userId?.role === roleFilterValue) : true;
    // Status filter
    const matchesStatus = statusFilterValue ? (row.status === statusFilterValue) : true;
    // Month/year filter
    let matchesMonthYear = true;
    if (selectedDate) {
      const selectedMonth = selectedDate.getMonth() + 1;
      const selectedYear = selectedDate.getFullYear();
      matchesMonthYear = (row.month === selectedMonth && row.year === selectedYear);
    }
    return matchesName && matchesRole && matchesStatus && matchesMonthYear;
  });

  if (loading) {
    return <div>Loading payroll data...</div>;
  }

  if (!(user && (user.role === 'ADMIN' || user.role === 'PRINCIPLE'))) {
    return <div>Access denied.</div>;
  }

  const columns = [
    {
      field: 'userId',
      headerName: 'User',
      width: 220,
      renderCell: (params) => {
        // ...existing code...
        const profile = params.value?.profile;
        if (profile && profile.firstName && profile.lastName) {
          return `${profile.firstName} ${profile.lastName}`;
        }
        return params.value?.userId || '';
      }
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 160,
      renderCell: (params) => {
        return params.row.userId?.role || '';
      }
    },
    { field: 'basicSalary', headerName: 'Basic Salary', width: 120 },
    { field: 'allowances', headerName: 'Allowances', width: 120 },
    { field: 'deductions', headerName: 'Deductions', width: 120 },
    { field: 'overtime', headerName: 'Overtime', width: 120 },
    { field: 'netSalary', headerName: 'Net Salary', width: 140 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'review',
      headerName: 'Review',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={params.row.status === 'approved'}
          onClick={() => navigate(`/payroll-details/${params.row._id}`)}
        >
          Review
        </Button>
      )
    }
  ];

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path d="m9 18 6-12" />
                  <path d="m7 8-4 4 4 4" />
                  <path d="m17 8 4 4-4 4" />
                </svg>
              </div>
              <h1 className="ml-3 text-2xl font-semibold text-gray-900">eduERP Payroll Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.userId}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)', paddingTop: '40px' }}>
  <div style={{ minWidth: '1200px', maxWidth: '100%', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: '48px 40px', overflowX: 'auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '32px', fontWeight: 700, fontSize: '2.4rem', color: '#312e81', letterSpacing: '0.02em' }}>Payroll Summary</h2>
          {/* Search and filter controls */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', justifyContent: 'center', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '220px' }}
            />
            <select
              value={roleFilterValue}
              onChange={e => setRoleFilterValue(e.target.value)}
              style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '180px' }}
            >
              <option value="">All Roles</option>
              {roleFilter.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <select
              value={statusFilterValue}
              onChange={e => setStatusFilterValue(e.target.value)}
              style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '180px' }}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="paid">Paid</option>
            </select>
            <IconButton onClick={() => setShowDatePicker(true)} style={{ border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', padding: '8px' }}>
              <CalendarTodayIcon style={{ color: '#312e81' }} />
            </IconButton>
            {selectedDate && (
              <span style={{ marginLeft: '8px', fontWeight: 500, color: '#312e81' }}>
                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                <button style={{ marginLeft: '8px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setSelectedDate(null)}>Clear</button>
              </span>
            )}
            {showDatePicker && (
              <input
                type="month"
                style={{ marginLeft: '8px', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                onChange={e => {
                  const [year, month] = e.target.value.split('-');
                  setSelectedDate(new Date(year, month - 1));
                  setShowDatePicker(false);
                }}
                onBlur={() => setShowDatePicker(false)}
                autoFocus
              />
            )}
          </div>
          <div style={{ width: '100%', minWidth: '1200px' }}>
            <DataGrid
              rows={filteredPayrolls}
              columns={columns}
              getRowId={row => row._id}
              autoHeight
              pageSize={10}
              sx={{
                '& .MuiDataGrid-columnHeaders': { background: '#e0e7ff', fontWeight: 700, fontSize: '1.1rem', color: '#312e81' },
                '& .MuiDataGrid-cell': { fontSize: '1.08rem', color: '#374151', padding: '12px 8px' },
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                background: '#f8fafc',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PayrollDashboard;

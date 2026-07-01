import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./Sidebar.css";

import AuthContext from "../../context/AuthContext";

import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaBriefcase,
  FaFileAlt,
  FaUserTie,
  FaProjectDiagram,
  FaCalendarCheck,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChartLine,
  FaFolder,
  FaBuilding,
  FaShieldAlt,
  FaSitemap,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout, user, loading } = useContext(AuthContext);

  if (loading) {
    return null; // or return a loading spinner
  }
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: <FaHome />, text: "Dashboard", path: "/dashboard", roles: ["Admin", "HR Manager", "Employee", "Recruiter", "Payroll Manager", "HR_ADMIN"] },

    { icon: <FaUsers />, text: "Employees", path: "/employees", roles: ["Admin", "HR Manager", "HR_ADMIN"] },

    { icon: <FaUserPlus />, text: "Create Employee", path: "/employees/create", roles: ["Admin", "HR Manager", "HR_ADMIN"] },

    { icon: <FaUserPlus />, text: "Create User", path: "/users/create", roles: ["Admin", "HR Manager", "HR_ADMIN"] },

    { icon: <FaBriefcase />, text: "Recruitment", path: "/recruitment", roles: ["Admin", "Recruiter", "HR Manager"] },

    { icon: <FaFileAlt />, text: "Create Job", path: "/recruitment/create", roles: ["Admin", "Recruiter"] },

    { icon: <FaUserTie />, text: "Candidates", path: "/recruitment/candidates", roles: ["Admin", "Recruiter"] },

    { icon: <FaProjectDiagram />, text: "Candidate Pipeline", path: "/recruitment/pipeline", roles: ["Admin", "Recruiter"] },

    { icon: <FaCalendarCheck />, text: "Attendance", path: "/attendance", roles: ["Admin", "HR Manager", "Employee", "HR_ADMIN"] },

    { icon: <FaCalendarAlt />, text: "Leave Management", path: "/leave", roles: ["Admin", "HR Manager", "Employee", "HR_ADMIN"] },

    { icon: <FaMoneyBillWave />, text: "Payroll", path: "/payroll", roles: ["Admin", "Payroll Manager"] },

    { icon: <FaChartLine />, text: "Performance", path: "/performance", roles: ["Admin", "HR Manager", "Employee"] },

    { icon: <FaFolder />, text: "Documents", path: "/documents", roles: ["Admin", "HR Manager", "Employee"] },

    { icon: <FaBuilding />, text: "Organization", path: "/organization", roles: ["Admin"] },

    { icon: <FaShieldAlt />, text: "Organization Policies", path: "/organization-policies", roles: ["Admin"] },

    { icon: <FaSitemap />, text: "Departments", path: "/departments", roles: ["Admin"] },
  ];

  return (
    <div className="sidebar">

      <h2 className="sidebar-title">HRMS</h2>

      <hr className="sidebar-divider" />

      <div className="sidebar-menu">

        {menuItems
          .filter(
            (item) => !user || item.roles.includes(user.role)
          )
          .map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""
                }`}
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span>{item.text}</span>
            </Link>
          ))}



      </div>

      <button
        onClick={handleLogout}
        className="logout-btn"
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;
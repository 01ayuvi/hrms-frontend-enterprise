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
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: <FaHome />, text: "Dashboard", path: "/dashboard" },
    { icon: <FaUsers />, text: "Employees", path: "/employees" },
    { icon: <FaUserPlus />, text: "Create Employee", path: "/employees/create" },
    { icon: <FaUserPlus />, text: "Create User", path: "/users/create",},
    { icon: <FaBriefcase />, text: "Recruitment", path: "/recruitment" },
    { icon: <FaFileAlt />, text: "Create Job", path: "/recruitment/create" },
    { icon: <FaUserTie />, text: "Candidates", path: "/recruitment/candidates" },
    { icon: <FaProjectDiagram />, text: "Candidate Pipeline", path: "/recruitment/pipeline" },
    { icon: <FaCalendarCheck />, text: "Attendance", path: "/attendance" },
    { icon: <FaCalendarAlt />, text: "Leave Management", path: "/leave" },
    { icon: <FaMoneyBillWave />, text: "Payroll", path: "/payroll" },
    { icon: <FaChartLine />, text: "Performance", path: "/performance" },
    { icon: <FaFolder />, text: "Documents", path: "/documents" },
    { icon: <FaBuilding />, text: "Organization", path: "/organization" },
    { icon: <FaShieldAlt />, text: "Organization Policies", path: "/organization-policies" },
  ];

  return (
    <div className="sidebar">

      <h2 className="sidebar-title">HRMS</h2>

      <hr className="sidebar-divider" />

      <div className="sidebar-menu">

        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
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
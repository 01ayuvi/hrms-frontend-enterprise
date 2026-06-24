import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();

    navigate("/login");

  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#1f2937",
        color: "white",
        padding: "20px",
      }}
    > <h2>HRMS</h2>

      <div style={{ marginTop: "30px" }}>
        <p>
          <Link
            to="/dashboard"
            style={{ color: "white" }}
          >
            Dashboard
          </Link>
        </p>

        <p>
          <Link
            to="/employees"
            style={{ color: "white" }}
          >
            Employees
          </Link>
        </p>
        <p>
          <Link
            to="/employees/create"
            style={{ color: "white" }}
          >
            Create Employee
          </Link>
        </p>

        <p>
          <Link
            to="/recruitment"
            style={{ color: "white" }}
          >
            Recruitment
          </Link>
        </p>
        <p>
          <Link
            to="/recruitment/create"
            style={{ color: "white" }}
          >
            Create Job
          </Link>
        </p>
        <p>
          <Link
            to="/recruitment/candidates"
            style={{ color: "white" }}
          >
            Candidates
          </Link>
        </p>
        <p>
          <Link
            to="/recruitment/pipeline"
            style={{ color: "white" }}
          >
            Candidate Pipeline
          </Link>
        </p>

        <p>
          <Link
            to="/attendance"
            style={{ color: "white" }}
          >
            Attendance
          </Link>
        </p>

        <p>
          <Link
            to="/leave"
            style={{ color: "white" }}
          >
            Leave Management
          </Link>
        </p>

        <p>Payroll</p>

        <p>Performance</p>

        <p>Documents</p>

        <li>
          <Link to="/organization">
            Organization
          </Link>
        </li>
        <Link to="/organization-policies">
          Organization Policies
        </Link>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>


  );
}

export default Sidebar;

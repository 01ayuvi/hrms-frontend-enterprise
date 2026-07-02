import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../services/dashboardService";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaBuilding,
  FaFolder,
} from "react-icons/fa";

import "./DashboardPage.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";




function DashboardPage() {
  const [summary, setSummary] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data =
        await getDashboardSummary();

      setSummary(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!summary) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <h1 className="dashboard-title">
            Welcome back, {user?.username || "User"} 
          </h1>

          <p className="dashboard-subtitle">
            Here's an overview of your HRMS today.
          </p>
          <p className="dashboard-date">

            {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            })}

        </p>

        </div>

      </div>

      <div className="dashboard-grid">

        <div
            className="dashboard-card"
            onClick={() => navigate("/employees")}
        >
          <div className="card-header">
            <span className="card-title">
              Total Employees
            </span>

            <div className="card-icon blue">
              <FaUsers />
            </div>
          </div>

          <div className="card-value">
            {summary.total_employees}
          </div>
        </div>


        <div
            className="dashboard-card"
            onClick={() => navigate("/employees")}
        >
          <div className="card-header">
            <span className="card-title">
              Active Employees
            </span>

            <div className="card-icon green">
              <FaUserCheck />
            </div>
          </div>

          <div className="card-value">
            {summary.active_employees}
          </div>
        </div>

        <div
            className="dashboard-card"
            onClick={() => navigate("/employees")}
        >
          <div className="card-header">
            <span className="card-title">
              Inactive Employees
            </span>

            <div className="card-icon red">
              <FaUserTimes />
            </div>
          </div>

          <div className="card-value">
            {summary.inactive_employees}
          </div>
        </div>

        <div
            className="dashboard-card"
            onClick={() => navigate("/departments")}
        >
          <div className="card-header">
            <span className="card-title">
              Departments
            </span>

            <div className="card-icon orange">
              <FaBuilding />
            </div>
          </div>

          <div className="card-value">
            {summary.total_departments}
          </div>
        </div>

        <div
            className="dashboard-card"
            onClick={() => navigate("/documents")}
        >
          <div className="card-header">
            <span className="card-title">
              Documents
            </span>

            <div className="card-icon purple">
              <FaFolder />
            </div>
          </div>

          <div className="card-value">
            {summary.total_documents}
          </div>
        </div>

      </div>
      <div className="dashboard-section">

        <h2>Quick Actions</h2>

        <div className="quick-actions">

          <button
              onClick={() => navigate("/employees/create")}
          >
              Create Employee
          </button>

          <button
              onClick={() => navigate("/users/create")}
          >
              Create User
          </button>

          <button
              onClick={() => navigate("/recruitment/create")}
          >
              Create Job
          </button>

          <button
              onClick={() => navigate("/attendance")}
          >
              Attendance
          </button>

        </div>

      </div>
      <div className="dashboard-section">

        <h2>HR Summary</h2>

        <div className="summary-grid">

          <div className="summary-card">

            <h3>Employees</h3>

            <p>
              {summary.active_employees} Active /
              {" "}
              {summary.total_employees} Total
            </p>

          </div>

          <div className="summary-card">

            <h3>Departments</h3>

            <p>{summary.total_departments}</p>

          </div>

          <div className="summary-card">

            <h3>Documents</h3>

            <p>{summary.total_documents}</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;
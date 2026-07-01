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




function DashboardPage() {
  const [summary, setSummary] = useState(null);

  const { user } = useContext(AuthContext);

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

      <h1 className="dashboard-title">
        HRMS Dashboard
      </h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
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

        <div className="dashboard-card">
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

        <div className="dashboard-card">
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

        <div className="dashboard-card">
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

        <div className="dashboard-card">
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

    </div>
  );
}

export default DashboardPage;
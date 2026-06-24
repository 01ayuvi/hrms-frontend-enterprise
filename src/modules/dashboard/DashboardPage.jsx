import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../services/dashboardService";

function DashboardPage() {
  const [summary, setSummary] = useState(null);

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
    <div style={{ padding: "30px" }}>
      <h1>HRMS Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Employees</h3>
          <h1>
            {summary.total_employees}
          </h1>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Active Employees</h3>
          <h1>
            {summary.active_employees}
          </h1>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Inactive Employees</h3>
          <h1>
            {summary.inactive_employees}
          </h1>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Departments</h3>
          <h1>
            {summary.total_departments}
          </h1>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Documents</h3>
          <h1>
            {summary.total_documents}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
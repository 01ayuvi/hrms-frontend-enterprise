import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getEmployees,
  searchEmployees,
} from "../../services/employeeService";

import "./Employee.css";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [count, setCount] = useState(0);
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();

      console.log("Employees API Response:", data);

      setEmployees(data);
      setCount(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const payload = {
        employee_name: employeeName,
        department_id: null,
        status: null,
        designation: null,
        joining_date_from: null,
        joining_date_to: null,
        page: 1,
        page_size: 10,
        sort_by: "employee_id",
        sort_order: "desc",
      };

      const data = await searchEmployees(payload);

      setEmployees(data.records);
      setCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="employee-page">

      <h1 className="page-title">
        Employee Directory
      </h1>

      <div className="search-bar">

        <input
          className="search-input"
          type="text"
          placeholder="Search employee..."
          value={employeeName}
          onChange={(e) =>
            setEmployeeName(e.target.value)
          }
        />

        <button
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </button>

      </div>

      <h3 className="result-count">
        Showing {count} Employees
      </h3>

      <div className="employee-card">

        <table className="employee-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {employees.map((emp) => (

              <tr key={emp.employee_id}>

                <td>{emp.employee_id}</td>

                <td>
                  {emp.first_name} {emp.last_name}
                </td>

                <td>{emp.email}</td>

                <td>{emp.designation}</td>

                <td>
                  <span
                    className={
                      emp.status === "ACTIVE"
                        ? "status active"
                        : "status inactive"
                    }
                  >
                    {emp.status}
                  </span>
                </td>

                <td>

                  <Link
                    className="view-btn"
                    to={`/employees/${emp.employee_id}`}
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default EmployeePage;
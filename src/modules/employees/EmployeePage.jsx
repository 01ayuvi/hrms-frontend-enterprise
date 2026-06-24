import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getEmployees,
  searchEmployees,
} from "../../services/employeeService";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [count, setCount] = useState(0);

  const [employeeName, setEmployeeName] =
    useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();

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

      const data = await searchEmployees(
        payload
      );

      setEmployees(data.records);
      setCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Employee Directory</h1>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search Employee"
          value={employeeName}
          onChange={(e) =>
            setEmployeeName(e.target.value)
          }
        />

        <button
          onClick={handleSearch}
          style={{
            marginLeft: "10px",
          }}
        >
          Search
        </button>
      </div>

      <h3>Total Results: {count}</h3>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
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

              <td>{emp.status}</td>

              <td>
                <Link
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
  );
}


export default EmployeePage;
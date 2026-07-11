import { useEffect, useState } from "react";

import {
  createEmployee,
  getDepartments,
  getManagers,
  
} from "../../services/employeeService";
import "./CreateEmployee.css";

function CreateEmployeePage() {
  const [formData, setFormData] = useState({
    organization_id: 1,
    department_id: "",
    manager_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    designation: "",
    joining_date: "",
    status: "ACTIVE",
  });
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const loadData = async () => {

      try {

        const deptData = await getDepartments();
        
        const managerData = await getManagers();
        

        setDepartments(deptData);
        setManagers(managerData);
        

      } catch (err) {

        console.log(err);

      }

    };

    loadData();

  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      department_id: Number(formData.department_id),
      manager_id: Number(formData.manager_id),
    };

    try {

      await createEmployee(payload);

      alert("Employee Created Successfully");

      window.location.reload();

    } catch (error) {

      console.error(error);
      alert("Creation Failed");

    }
  };

  return (
    <div className="employee-form">

      <h1>Create Employee</h1>

      <form onSubmit={handleSubmit}>

        <div className="form-grid">

          <input
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />

          <input
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <select
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
          >

            <option value="">
              Select Department
            </option>

            {departments.map((department) => (

              <option
                key={department.id}
                value={department.id}
              >
                {department.department_name}
              </option>

            ))}

          </select>




          <input
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
          />

          <select
            name="manager_id"
            value={formData.manager_id}
            onChange={handleChange}
          >

            <option value="">
              Select Manager
            </option>

            {managers.map((manager) => (

              <option
                key={manager.employee_id}
                value={manager.employee_id}
              >
                {manager.name}
              </option>

            ))}

          </select>

          <input
            type="date"
            name="joining_date"
            value={formData.joining_date}
            onChange={handleChange}
          />

        </div>

        <button type="submit">
          Create Employee
        </button>

      </form>

    </div>
  );
}

export default CreateEmployeePage;
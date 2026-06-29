import { useState } from "react";
import { createEmployee } from "../../services/employeeService";
import "./CreateEmployee.css";

function CreateEmployeePage() {
  const [formData, setFormData] = useState({
    organization_id: 1,
    department_id: 1,
    manager_id: 2,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    designation: "",
    joining_date: "",
    status: "ACTIVE",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEmployee(formData);

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

          <input
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
          />

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
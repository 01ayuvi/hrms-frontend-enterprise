import { useState } from "react";
import { createEmployee } from "../../services/employeeService";

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
<div style={{ padding: "30px" }}> <h1>Create Employee</h1>

  <form onSubmit={handleSubmit}>
    <input
      name="first_name"
      placeholder="First Name"
      onChange={handleChange}
    />
    <br /><br />

    <input
      name="last_name"
      placeholder="Last Name"
      onChange={handleChange}
    />
    <br /><br />

    <input
      name="email"
      placeholder="Email"
      onChange={handleChange}
    />
    <br /><br />

    <input
      name="phone"
      placeholder="Phone"
      onChange={handleChange}
    />
    <br /><br />

    <input
      name="designation"
      placeholder="Designation"
      onChange={handleChange}
    />
    <br /><br />

    <input
      type="date"
      name="joining_date"
      onChange={handleChange}
    />
    <br /><br />

    <button type="submit">
      Create Employee
    </button>
  </form>
</div>


);
}

export default CreateEmployeePage;

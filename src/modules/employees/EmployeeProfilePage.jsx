import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getEmployeeProfile } from "../../services/employeeService";

function EmployeeProfilePage() {
const { employeeId } = useParams();

const [profile, setProfile] = useState(null);

useEffect(() => {
loadProfile();
}, []);

const loadProfile = async () => {
try {
const data =
await getEmployeeProfile(employeeId);

  setProfile(data);
} catch (error) {
  console.error(error);
}


};

if (!profile) {
return <h2>Loading...</h2>;
}

return (
<div style={{ padding: "30px" }}> <h1>Employee Profile</h1>

  <p>
    <strong>ID:</strong>{" "}
    {profile.employee.employee_id}
  </p>

  <p>
    <strong>Name:</strong>{" "}
    {profile.employee.first_name}{" "}
    {profile.employee.last_name}
  </p>

  <p>
    <strong>Email:</strong>{" "}
    {profile.employee.email}
  </p>

  <p>
    <strong>Designation:</strong>{" "}
    {profile.employee.designation}
  </p>

  <p>
    <strong>Status:</strong>{" "}
    {profile.employee.status}
  </p>

  <p>
    <strong>Manager:</strong>{" "}
    {profile.manager
      ? profile.manager.first_name
      : "Not Assigned"}
  </p>

  <p>
    <strong>Documents:</strong>{" "}
    {profile.documents.length}
  </p>
</div>


);
}

export default EmployeeProfilePage;

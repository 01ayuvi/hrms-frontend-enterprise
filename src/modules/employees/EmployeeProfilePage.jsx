import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EmployeeProfile.css";

import { getEmployeeProfile } from "../../services/employeeService";

function EmployeeProfilePage() {
  const { employeeId } = useParams();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getEmployeeProfile(employeeId);
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-page">

      <div className="profile-header">

        <div className="profile-avatar">
          {profile.employee.first_name.charAt(0)}
          {profile.employee.last_name.charAt(0)}
        </div>

        <div>

          <h1>
            {profile.employee.first_name}{" "}
            {profile.employee.last_name}
          </h1>

          <p className="designation">
            {profile.employee.designation}
          </p>

          <span
            className={
              profile.employee.status === "ACTIVE"
                ? "status active"
                : "status inactive"
            }
          >
            {profile.employee.status}
          </span>

        </div>

      </div>

      <div className="profile-card">

        <div className="info-row">
          <span>Employee ID</span>
          <strong>{profile.employee.employee_id}</strong>
        </div>

        <div className="info-row">
          <span>Email</span>
          <strong>{profile.employee.email}</strong>
        </div>

        <div className="info-row">
          <span>Designation</span>
          <strong>{profile.employee.designation}</strong>
        </div>

        <div className="info-row">
          <span>Manager</span>
          <strong>
            {profile.manager
              ? `${profile.manager.first_name} ${profile.manager.last_name || ""}`
              : "Not Assigned"}
          </strong>
        </div>

        <div className="info-row">
          <span>Documents</span>
          <strong>{profile.documents.length}</strong>
        </div>

      </div>

    </div>
  );
}

export default EmployeeProfilePage;
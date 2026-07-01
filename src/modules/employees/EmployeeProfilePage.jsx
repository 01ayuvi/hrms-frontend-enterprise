import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EmployeeProfile.css";

import {
  getEmployeeProfile,
  updateEmployee,
  getManagers,
} from "../../services/employeeService";

function EmployeeProfilePage() {
  const { employeeId } = useParams();

  const [profile, setProfile] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [managers, setManagers] = useState([]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    designation: "",
    status: "",
    manager_id: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {

      const data =
        await getEmployeeProfile(employeeId);

      setProfile(data);

      setFormData({

        first_name:
          data.employee.first_name,

        last_name:
          data.employee.last_name,

        email:
          data.employee.email,

        phone:
          data.employee.phone || "",

        designation:
          data.employee.designation || "",

        status:
          data.employee.status,

        manager_id:
          data.employee.manager_id || ""

      });

      const managerData =
        await getManagers();

      setManagers(managerData);

    }

    catch (error) {

      console.log(error);

    }
  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSave = async () => {
    try {

      console.log("Sending:", formData);

      await updateEmployee(employeeId, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone || null,
        designation: formData.designation || null,
        status: formData.status,
        manager_id: formData.manager_id
          ? Number(formData.manager_id)
          : null,
      });

      await loadProfile();

      setIsEditing(false);

      alert("Employee updated successfully");

    } catch (error) {

      console.log(error);

      console.log(error.response?.data);

      alert(JSON.stringify(error.response?.data));

    }
  };

  const handleCancel = () => {

    setFormData({

      first_name:
        profile.employee.first_name,

      last_name:
        profile.employee.last_name,

      email:
        profile.employee.email,

      phone:
        profile.employee.phone || "",

      designation:
        profile.employee.designation || "",

      status:
        profile.employee.status,

      manager_id:
        profile.employee.manager_id || ""

    });

    setIsEditing(false);

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

        <div className="profile-info">

          {!isEditing ? (

            <>

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

            </>

          ) : (

            <>

              <input
                className="profile-input"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />

              <input
                className="profile-input"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />

            </>

          )}

        </div>

        <div className="profile-actions">

          {!isEditing ? (

            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

          ) : (

            <>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

            </>

          )}

        </div>

      </div>

      <div className="profile-card">

        <div className="info-row">

          <span>Employee ID</span>

          <strong>
            {profile.employee.employee_id}
          </strong>

        </div>

        <div className="info-row">

          <span>Email</span>

          {!isEditing ? (

            <strong>
              {profile.employee.email}
            </strong>

          ) : (

            <input
              className="profile-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

          )}

        </div>

        <div className="info-row">

          <span>Phone</span>

          {!isEditing ? (

            <strong>
              {profile.employee.phone || "-"}
            </strong>

          ) : (

            <input
              className="profile-input"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

          )}

        </div>

        <div className="info-row">

          <span>Designation</span>

          {!isEditing ? (

            <strong>
              {profile.employee.designation}
            </strong>

          ) : (

            <input
              className="profile-input"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />

          )}

        </div>

        <div className="info-row">

          <span>Status</span>

          {!isEditing ? (

            <strong>
              {profile.employee.status}
            </strong>

          ) : (

            <select
              className="profile-input"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >

              <option value="ACTIVE">
                ACTIVE
              </option>

              <option value="INACTIVE">
                INACTIVE
              </option>

            </select>

          )}

        </div>

        <div className="info-row">

          <span>Manager</span>

          {!isEditing ? (

            <strong>

              {profile.manager

                ? `${profile.manager.first_name} ${profile.manager.last_name}`

                : "Not Assigned"}

            </strong>

          ) : (

            <select
              className="profile-input"
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

          )}

        </div>

        <div className="info-row">

          <span>Documents</span>

          <strong>

            {profile.documents.length}

          </strong>

        </div>

      </div>

    </div>
  );
}

export default EmployeeProfilePage;
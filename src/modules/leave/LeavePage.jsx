import { useEffect, useState } from "react";
import "./Leave.css";

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import {
  getLeaves,
  approveLeave,
  rejectLeave,
  applyLeave,
} from "../../services/leaveService";

function LeavePage() {
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [leaveForm, setLeaveForm] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const { user } = useContext(AuthContext);
  const isHR =
    user?.role === "Admin" ||
    user?.role === "HR_ADMIN";
  


  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const data = await getLeaves();
      setLeaves(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (
    leaveId
  ) => {
    try {
      await approveLeave(
        leaveId,
        0
      );

      alert("Leave Approved");

      loadLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (
    leaveId
  ) => {
    try {
      await rejectLeave(
        leaveId,
        0
      );

      alert("Leave Rejected");

      loadLeaves();
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    setLeaveForm({
      ...leaveForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleApplyLeave = async () => {

  if (
    !leaveForm.leave_type ||
    !leaveForm.start_date ||
    !leaveForm.end_date
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {

    console.log("User:", user);
    console.log("Employee ID:", user?.employee_id);

    await applyLeave({
      employee_id: user.employee_id,
      leave_type: leaveForm.leave_type,
      start_date: leaveForm.start_date,
      end_date: leaveForm.end_date,
      reason: leaveForm.reason,
    });

    alert("Leave Applied Successfully");

    setShowModal(false);

    setLeaveForm({
      leave_type: "",
      start_date: "",
      end_date: "",
      reason: "",
    });

    loadLeaves();

  } catch (error) {

    console.log(error.response.data);

    alert(JSON.stringify(error.response.data));

  }

};

  return (
    <div className="leave-page">

      <div className="leave-header">

          <div>
              <h1 className="page-title">
                  Leave Management
              </h1>

              <p className="page-subtitle">
                  Manage employee leave requests and approvals.
              </p>
          </div>

          {!isHR && (
              <button
                  className="apply-btn"
                  onClick={() => setShowModal(true)}
              >
                  + Apply Leave
              </button>
          )}

      </div>

      <div className="table-card">

        <table className="leave-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              {isHR && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>

            {leaves.map((leave) => (

              <tr key={leave.leave_id}>

                <td>{leave.leave_id}</td>

                <td>{leave.employee_name}</td>

                <td>{leave.leave_type}</td>

                <td>
                  <span
                    className={`leave-status status-${leave.status.toLowerCase()}`}
                  >
                    {leave.status}
                  </span>
                </td>

                <td>{leave.start_date}</td>

                <td>{leave.end_date}</td>

                {isHR && (
                  <td>

                    <button
                      className="approve-btn"
                      onClick={() =>
                        handleApprove(leave.leave_id)
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        handleReject(leave.leave_id)
                      }
                    >
                      Reject
                    </button>

                  </td>
                )}

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      {showModal && (

      <div className="modal-overlay">

        <div className="modal">

            <h2>Apply Leave</h2>

            <label>Leave Type</label>

            <select
                name="leave_type"
                value={leaveForm.leave_type}
                onChange={handleChange}
            >
                <option value="">Select Leave Type</option>
                <option value="CASUAL">Casual Leave</option>
                <option value="SICK">Sick Leave</option>
                <option value="ANNUAL">Annual Leave</option>
            </select>

            <label>Start Date</label>

            <input
                type="date"
                name="start_date"
                value={leaveForm.start_date}
                onChange={handleChange}
            />

            <label>End Date</label>

            <input
                type="date"
                name="end_date"
                value={leaveForm.end_date}
                onChange={handleChange}
            />

            <label>Reason</label>

            <textarea
                name="reason"
                placeholder="Write your reason..."
                value={leaveForm.reason}
                onChange={handleChange}
            />

            <div className="modal-actions">

                <button
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                >
                    Cancel
                </button>

                <button
                    className="save-btn"
                    onClick={handleApplyLeave}
                >
                    Apply Leave
                </button>

            </div>

        </div>

      </div>

      )}

    </div>
  );
}

export default LeavePage;
import { useEffect, useState } from "react";
import "./Leave.css";
import {
  getLeaves,
  approveLeave,
  rejectLeave,
} from "../../services/leaveService";

function LeavePage() {
  const [leaves, setLeaves] = useState([]);

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

  return (
    <div className="leave-page">

      <h1 className="page-title">
        Leave Management
      </h1>

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
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {leaves.map((leave) => (

              <tr key={leave.leave_id}>

                <td>{leave.leave_id}</td>

                <td>{leave.employee_id}</td>

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

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default LeavePage;
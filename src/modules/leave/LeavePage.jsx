import { useEffect, useState } from "react";

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
    <div style={{ padding: "30px" }}>
      <h1>Leave Management</h1>

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
            <th>Employee</th>
            <th>Type</th>
            <th>Status</th>
            <th>Start</th>
            <th>End</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.leave_id}>
              <td>{leave.leave_id}</td>

              <td>{leave.employee_id}</td>

              <td>{leave.leave_type}</td>

              <td>{leave.status}</td>

              <td>{leave.start_date}</td>

              <td>{leave.end_date}</td>

              <td>
                <button
                  onClick={() =>
                    handleApprove(
                      leave.leave_id
                    )
                  }
                >
                  Approve
                </button>

                <button
                  style={{
                    marginLeft: "10px",
                  }}
                  onClick={() =>
                    handleReject(
                      leave.leave_id
                    )
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
  );
}

export default LeavePage;
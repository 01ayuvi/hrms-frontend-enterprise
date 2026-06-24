import { useEffect, useState } from "react";

import {
  getCandidates,
  updateCandidateStatus,
} from "../../services/recruitmentService";

function CandidatePage() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (
    candidateId,
    status
  ) => {
    try {
      await updateCandidateStatus(
        candidateId,
        status
      );

      await loadCandidates();

      alert("Status Updated");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Candidate Applications</h1>

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
            <th>Phone</th>
            <th>Status</th>
            <th>Job ID</th>
            <th>Update Status</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.candidate_id}>
              <td>{candidate.candidate_id}</td>

              <td>
                {candidate.first_name}{" "}
                {candidate.last_name}
              </td>

              <td>{candidate.email}</td>

              <td>{candidate.phone}</td>

              <td>{candidate.status}</td>

              <td>{candidate.job_id}</td>

              <td>
                <select
                  value={candidate.status}
                  onChange={(e) =>
                    handleStatusChange(
                      candidate.candidate_id,
                      e.target.value
                    )
                  }
                >
                  <option value="APPLIED">
                    APPLIED
                  </option>

                  <option value="SCREENING">
                    SCREENING
                  </option>

                  <option value="INTERVIEW">
                    INTERVIEW
                  </option>

                  <option value="OFFERED">
                    OFFERED
                  </option>

                  <option value="HIRED">
                    HIRED
                  </option>

                  <option value="REJECTED">
                    REJECTED
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidatePage;
import { useEffect, useState } from "react";
import "./Recruitment.css";
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
      <div className="recruitment-page">

        <h1 className="page-title">
          Candidate Applications
        </h1>

        <div className="table-card">

          <table className="recruitment-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Job ID</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>

              {candidates.map((candidate) => (

                <tr key={candidate.candidate_id}>

                  <td>{candidate.candidate_id}</td>

                  <td>
                    <strong>
                      {candidate.first_name} {candidate.last_name}
                    </strong>
                  </td>

                  <td>{candidate.email}</td>

                  <td>{candidate.phone}</td>

                  <td>

                    <span
                      className={`status-pill status-${candidate.status.toLowerCase()}`}
                    >
                      {candidate.status}
                    </span>

                  </td>

                  <td>{candidate.job_id}</td>

                  <td>

                    <select
                      className="status-select"
                      value={candidate.status}
                      onChange={(e) =>
                        handleStatusChange(
                          candidate.candidate_id,
                          e.target.value
                        )
                      }
                    >
                      <option value="APPLIED">APPLIED</option>
                      <option value="SCREENING">SCREENING</option>
                      <option value="INTERVIEW">INTERVIEW</option>
                      <option value="OFFERED">OFFERED</option>
                      <option value="HIRED">HIRED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    );
}

export default CandidatePage;
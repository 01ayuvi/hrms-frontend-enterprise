import { useEffect, useState } from "react";
import { getCandidates } from "../../services/recruitmentService";
import "./Recruitment.css";
function CandidatePipelinePage() {
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

  const getByStatus = (status) =>
    candidates.filter(
      (candidate) =>
        candidate.status === status
    );

  const statuses = [
    "APPLIED",
    "SCREENING",
    "INTERVIEW",
    "OFFERED",
    "HIRED",
    "REJECTED",
  ];

  return (
    <div className="recruitment-page">

      <h1 className="page-title">
        Candidate Pipeline
      </h1>

      <div className="pipeline-board">

        {statuses.map((status) => (

          <div
            key={status}
            className="pipeline-column"
          >

            <div className="pipeline-header">

              <h3>{status}</h3>

              <span className="pipeline-count">
                {getByStatus(status).length}
              </span>

            </div>

            {getByStatus(status).length === 0 && (

              <div className="empty-card">

                No Candidates

              </div>

            )}

            {getByStatus(status).map((candidate) => (

              <div
                key={candidate.candidate_id}
                className="candidate-card"
              >

                <h4>
                  {candidate.first_name}{" "}
                  {candidate.last_name}
                </h4>

                <p>{candidate.email}</p>

                <small>
                  Candidate ID: {candidate.candidate_id}
                </small>

              </div>

            ))}

          </div>

        ))}

      </div>

    </div>
  );
}

export default CandidatePipelinePage;
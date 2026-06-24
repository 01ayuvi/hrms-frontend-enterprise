import { useEffect, useState } from "react";
import { getCandidates } from "../../services/recruitmentService";

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
    <div style={{ padding: "30px" }}>
      <h1>Candidate Pipeline</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
        }}
      >
        {statuses.map((status) => (
          <div
            key={status}
            style={{
              minWidth: "220px",
              border: "1px solid #ddd",
              padding: "15px",
            }}
          >
            <h3>{status}</h3>

            {getByStatus(status).map(
              (candidate) => (
                <div
                  key={
                    candidate.candidate_id
                  }
                  style={{
                    border:
                      "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <strong>
                    {candidate.first_name}{" "}
                    {candidate.last_name}
                  </strong>

                  <br />

                  {candidate.email}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidatePipelinePage;
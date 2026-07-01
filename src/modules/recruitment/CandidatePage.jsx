import { useEffect, useState } from "react";
import "./Recruitment.css";
import {
  getCandidates,
  updateCandidateStatus,
  createCandidate,
  getJobs,
} from "../../services/recruitmentService";

function CandidatePage() {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    job_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    resume_path: "",
  });

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const candidateData = await getCandidates();
      const jobData = await getJobs();

      setCandidates(candidateData);
      setJobs(jobData);
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
  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

const handleCreateCandidate = async () => {
  if (
    !form.first_name ||
    !form.last_name ||
    !form.email ||
    !form.job_id
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    alert("Invalid email.");
    return;
  }

  if (
    form.phone &&
    !/^\d{10}$/.test(form.phone)
  ) {
    alert("Phone must contain 10 digits.");
    return;
  }

  try {
    await createCandidate({
      ...form,
      job_id: Number(form.job_id),
    });

    alert("Candidate Added");

    setShowModal(false);

    setForm({
      job_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      resume_path: "",
    });

    loadCandidates();

  } catch (error) {
    console.log(error);

    alert("Unable to create candidate.");
  }
};

  return (
      <div className="recruitment-page">

        <h1 className="page-title">
          Candidate Applications
        </h1>
        <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <button
              className="primary-btn"
              onClick={() => setShowModal(true)}
            >
              + Add Candidate
            </button>
          </div>

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

        {showModal && (
          <div className="modal-overlay">

            <div className="modal">

              <h2>Add Candidate</h2>

              <div className="modal-grid">

                <input
                  name="first_name"
                  placeholder="First Name"
                  value={form.first_name}
                  onChange={handleChange}
                />

                <input
                  name="last_name"
                  placeholder="Last Name"
                  value={form.last_name}
                  onChange={handleChange}
                />

                <input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />

                <input
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                />

                <select
                  name="job_id"
                  value={form.job_id}
                  onChange={handleChange}
                >
                  <option value="">Select Job</option>

                  {jobs.map((job) => (
                    <option
                      key={job.job_id}
                      value={job.job_id}
                    >
                      {job.title}
                    </option>
                  ))}
                </select>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                />

              </div>

              <div className="modal-actions">

                <button
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="save-btn"
                  onClick={handleCreateCandidate}
                >
                  Save Candidate
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
      
    );
}

export default CandidatePage;
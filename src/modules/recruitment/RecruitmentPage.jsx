import { useEffect, useState } from "react";
import {
  getJobs,
  updateJob,
  deleteJob,
} from "../../services/recruitmentService";
import "./Recruitment.css";
function RecruitmentPage() {
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null);

    const [formData, setFormData] = useState({
    title: "",
    description: "",
    openings_count: 0,
    status: "",
    department_id: "",
    });

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const data = await getJobs();

            console.log("JOBS DATA");
            console.log(data);

            setJobs(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (job) => {

        setEditingJob(job.job_id);

        setFormData({
            title: job.title,
            description: job.description,
            openings_count: job.openings_count,
            status: job.status,
            department_id: job.department_id,
        });

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleCancel = () => {

        setEditingJob(null);

    };

    const handleSave = async (jobId) => {

        try {

            await updateJob(jobId, {
            ...formData,
            openings_count: Number(formData.openings_count),
            department_id: Number(formData.department_id),
            });

            setEditingJob(null);

            loadJobs();

            alert("Job updated successfully");

        } catch (err) {

            console.log(err);

        }

    };

    const handleDelete = async (jobId) => {

        if (!window.confirm("Delete this job?"))
            return;

        try {

            await deleteJob(jobId);

            loadJobs();

            alert("Job deleted");

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.detail ||
                "Unable to delete job."
            );

        }

    };

    return (
        <div className="recruitment-page">

            <h1 className="page-title">
            Job Openings
            </h1>

            <div className="stats-card">
            <h3>Total Open Positions</h3>
            <h2>{jobs.length}</h2>
            </div>

            <div className="table-card">

            <table className="recruitment-table">

                <thead>
                <tr>
                    <th>ID</th>
                    <th>Job Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Openings</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>

                {jobs.map((job) => (

                <tr key={job.job_id}>

                <td>{job.job_id}</td>

                <td>

                {editingJob === job.job_id ? (

                <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                />

                ) : (

                job.title

                )}

                </td>

                <td>

                {editingJob === job.job_id ? (

                <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                />

                ) : (

                job.description

                )}

                </td>

                <td>

                {editingJob === job.job_id ? (

                <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                >

                <option value="OPEN">OPEN</option>

                <option value="CLOSED">CLOSED</option>

                </select>

                ) : (

                <span
                className={
                job.status === "OPEN"
                ? "status-open"
                : "status-closed"
                }
                >

                {job.status}

                </span>

                )}

                </td>

                <td>

                {editingJob === job.job_id ? (

                <input
                type="number"
                name="openings_count"
                value={formData.openings_count}
                onChange={handleChange}
                />

                ) : (

                job.openings_count

                )}

                </td>

                <td>

                {editingJob === job.job_id ? (

                <>

                <div className="action-buttons">

                    <button
                        className="save-btn"
                        onClick={() => handleSave(job.job_id)}
                    >
                        Save
                    </button>

                    <button
                        className="cancel-btn"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                </div>

                </>

                ) : (

                <>

                <div className="action-buttons">

                    <button
                        className="edit-btn"
                        onClick={() => handleEdit(job)}
                    >
                        Edit
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() => handleDelete(job.job_id)}
                    >
                        Delete
                    </button>

                </div>

                </>

                )}

                </td>

                </tr>

                ))}

                </tbody>
            </table>

            </div>

        </div>
        );
}

export default RecruitmentPage;
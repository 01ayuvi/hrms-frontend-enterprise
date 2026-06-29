import { useEffect, useState } from "react";
import { getJobs } from "../../services/recruitmentService";
import "./Recruitment.css";
function RecruitmentPage() {
    const [jobs, setJobs] = useState([]);

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
                </tr>
                </thead>

                <tbody>

                {jobs.map((job) => (

                    <tr key={job.job_id}>

                    <td>{job.job_id}</td>

                    <td>{job.title}</td>

                    <td>{job.description}</td>

                    <td>
                        <span
                        className={
                            job.status === "OPEN"
                            ? "status-open"
                            : "status-closed"
                        }
                        >
                        {job.status}
                        </span>
                    </td>

                    <td>{job.openings_count}</td>

                    </tr>

                ))}

                </tbody>

            </table>

            </div>

        </div>
        );
}

export default RecruitmentPage;
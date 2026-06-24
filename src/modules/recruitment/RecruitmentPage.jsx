import { useEffect, useState } from "react";
import { getJobs } from "../../services/recruitmentService";

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
        <div style={{ padding: "30px" }}>
            <h1>Job Openings</h1>

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
                        <th>Title</th>
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
                            <td>{job.status}</td>
                            <td>{job.openings_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecruitmentPage;
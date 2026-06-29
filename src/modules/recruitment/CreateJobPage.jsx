import { useState } from "react";
import { createJob } from "../../services/recruitmentService";
import "./Recruitment.css";
function CreateJobPage() {
    const [formData, setFormData] = useState({
        title: "",
        department_id: 1,
        description: "",
        openings_count: 1,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createJob(
                formData
            );

            console.log(response);

            alert("Job Created Successfully");
        } catch (error) {
            console.error(error);
            alert("Failed To Create Job");
        }
    };

    return (
        <div className="recruitment-page">

            <h1 className="page-title">
            Create Job Opening
            </h1>

            <div className="form-card">

            <form
                onSubmit={handleSubmit}
                className="job-form"
            >

                <div>

                <label>Job Title</label>

                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                </div>

                <div>

                <label>Department ID</label>

                <input
                    type="number"
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleChange}
                />

                </div>

                <div className="full-width">

                <label>Job Description</label>

                <textarea
                    rows="5"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                </div>

                <div>

                <label>Number of Openings</label>

                <input
                    type="number"
                    name="openings_count"
                    value={formData.openings_count}
                    onChange={handleChange}
                />

                </div>

                <div className="full-width">

                <button
                    type="submit"
                    className="primary-btn"
                >
                    Create Job
                </button>

                </div>

            </form>

            </div>

        </div>
        );
}

export default CreateJobPage;
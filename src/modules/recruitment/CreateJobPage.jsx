import { useState } from "react";
import { createJob } from "../../services/recruitmentService";

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
        <div style={{ padding: "30px" }}>
            <h1>Create Job Opening</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Job Title</label>
                    <br />
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Job Description</label>
                    <br />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Department ID</label>
                    <br />
                    <input
                        type="number"
                        name="department_id"
                        value={formData.department_id}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Number of Openings</label>
                    <br />
                    <input
                        type="number"
                        name="openings_count"
                        value={formData.openings_count}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">
                    Create Job
                </button>
            </form>
        </div>
    );
}

export default CreateJobPage;
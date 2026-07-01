import { useEffect, useState } from "react";
import {
    getDepartments,
    createDepartment,
    updateDepartment,
} from "../../services/departmentService";
import { toast } from "react-toastify";
import "../organization/Organization.css";

function DepartmentsPage() {
    const [departments, setDepartments] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [editingDepartment, setEditingDepartment] =
        useState(null);

    const [newDepartment, setNewDepartment] = useState({
        organization_id: 1,
        department_name: "",
        department_code: "",
    });

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            setLoading(true);

            const data = await getDepartments();

            setDepartments(data);
        } catch (error) {
            console.error(error);

            toast.error("Failed to load departments.");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDepartment = async () => {
        try {
            if (editingDepartment) {
                await updateDepartment(
                    editingDepartment.id,
                    newDepartment
                );

                toast.success(
                    "Department updated successfully."
                );
            } else {
                await createDepartment(
                    newDepartment
                );

                toast.success(
                    "Department created successfully."
                );
            }

            setNewDepartment({
                organization_id: 1,
                department_name: "",
                department_code: "",
            });

            setEditingDepartment(null);

            setShowForm(false);

            await loadDepartments();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.detail ||
                "Operation failed."
            );
        }
    };

    const filteredDepartments = departments.filter(
        (department) =>
            department.department_name
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            department.department_code
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    if (loading) {
        return <h2>Loading...</h2>;
    }

       return (
        <div className="organization-page">

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                }}
            >
                <h1 style={{ margin: 0 }}>
                    Departments
                </h1>

                <button
                    style={{
                        width: "180px",
                        marginTop: 0,
                    }}
                    onClick={() => {
                        if (showForm && editingDepartment) {
                            setEditingDepartment(null);

                            setNewDepartment({
                                organization_id: 1,
                                department_name: "",
                                department_code: "",
                            });
                        }

                        setShowForm(!showForm);
                    }}
                >
                    {showForm
                        ? "Close"
                        : "+ Add Department"}
                </button>

            </div>

            <div className="organization-card">

                {showForm && (

                    <>

                        <div className="section-title">
                            Department Information
                        </div>

                        <div
                            className="organization-grid"
                            style={{
                                marginBottom: "25px",
                            }}
                        >

                            <div>

                                <label>
                                    Department Name
                                </label>

                                <input
                                    type="text"
                                    value={newDepartment.department_name}
                                    onChange={(e) =>
                                        setNewDepartment({
                                            ...newDepartment,
                                            department_name:
                                                e.target.value.trimStart(),
                                        })
                                    }
                                />

                            </div>

                            <div>

                                <label>
                                    Department Code
                                </label>

                                <input
                                    type="text"
                                    value={newDepartment.department_code}
                                    onChange={(e) =>
                                        setNewDepartment({
                                            ...newDepartment,
                                            department_code:
                                                e.target.value
                                                    .toUpperCase()
                                                    .trimStart(),
                                        })
                                    }
                                />

                            </div>

                        </div>

                        <button
                            onClick={handleSaveDepartment}
                            disabled={
                                !newDepartment.department_name.trim() ||
                                !newDepartment.department_code.trim()
                            }
                            style={{
                                marginBottom: "25px",
                            }}
                        >
                            {editingDepartment
                                ? "Update Department"
                                : "Save Department"}
                        </button>

                    </>

                )}

                <div
                    style={{
                        marginBottom: "20px",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search departments..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                </div>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >

                    <thead>

                        <tr>

                            <th align="left">
                                Department Name
                            </th>

                            <th align="left">
                                Department Code
                            </th>

                            <th align="left">
                                Organization ID
                            </th>

                            <th align="center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredDepartments.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    style={{
                                        textAlign: "center",
                                        padding: "30px",
                                        color: "#6B7280",
                                    }}
                                >
                                    No departments found.
                                </td>

                            </tr>

                        ) : (

                            filteredDepartments.map((department) => (

                                <tr
                                    key={department.id}
                                >

                                    <td>
                                        {department.department_name}
                                    </td>

                                    <td>
                                        {department.department_code}
                                    </td>

                                    <td>
                                        {department.organization_id}
                                    </td>

                                    <td align="center">

                                        <button
                                            style={{
                                                width: "80px",
                                                marginTop: 0,
                                            }}
                                            onClick={() => {

                                                setEditingDepartment(
                                                    department
                                                );

                                                setNewDepartment({
                                                    organization_id:
                                                        department.organization_id,
                                                    department_name:
                                                        department.department_name,
                                                    department_code:
                                                        department.department_code,
                                                });

                                                setShowForm(true);

                                            }}
                                        >
                                            Edit
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default DepartmentsPage;
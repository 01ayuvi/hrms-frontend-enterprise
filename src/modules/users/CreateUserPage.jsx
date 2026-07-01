import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { getAvailableEmployees } from "../../services/employeeService";
import "./CreateUser.css";

function CreateUserPage() {

    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    const [form, setForm] = useState({
        employee_id:"",

        username: "",

        email: "",

        password: "",

        confirmPassword: "",

        role: "Employee",

        department: "",

        accountStatus: "ACTIVE",

        forcePasswordReset: true,

        sendWelcomeEmail: true,

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({

            ...form,

            [name]: value,

        });

    };

    const handleCheckbox = (e) => {

        const { name, checked } = e.target;

        setForm({

            ...form,

            [name]: checked,

        });

    };

    useEffect(() => {

        loadEmployees();

    }, []);

    const loadEmployees = async () => {

        try {

            const data =
                await getAvailableEmployees();

            setEmployees(data);

        }

        catch (error) {

            console.log("FULL ERROR:", error.response?.data);

            alert(JSON.stringify(error.response?.data));

        }
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !form.username ||
            !form.email ||
            !form.password ||
            !form.confirmPassword
        ) {

            alert("Please fill all required fields.");

            return;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(form.email)) {

            alert("Invalid Email Address");

            return;

        }

        if (form.password.length < 8) {

            alert(
                "Password must contain at least 8 characters."
            );

            return;

        }

        if (
            form.password !==
            form.confirmPassword
        ) {

            alert("Passwords do not match.");

            return;

        }

        try {

            await registerUser({
                employee_id: Number(form.employee_id),

                username: form.username,

                email: form.email,

                password: form.password,
                role: form.role,

            });

            alert(
                "User Created Successfully"
            );

            navigate("/dashboard");

        } catch (error) {

            console.log("FULL ERROR:", error.response?.data);

            alert(JSON.stringify(error.response?.data));

        }

    };

    return (

        <div className="create-user-page">

            <div className="create-user-header">

                <h1>User Access Management</h1>

                <p>

                    Create secure login credentials for employees and assign system access.

                </p>

            </div>

            <form
                className="create-user-form"
                onSubmit={handleSubmit}
            >

                <div className="user-card">

                    <h2>

                        Account Information

                    </h2>

                    <div className="grid-2">

                        <div>

                            <label>
                                Employee
                            </label>

                            <select
                                name="employee_id"
                                value={form.employee_id}
                                onChange={(e) => {

                                    const selectedEmployee =
                                        employees.find(
                                            emp =>
                                                emp.employee_id ==
                                                e.target.value
                                        );

                                    setForm({
                                        ...form,
                                        employee_id:
                                            e.target.value,
                                        email:
                                            selectedEmployee
                                                ? selectedEmployee.email
                                                : ""
                                    });

                                }}
                            >

                                <option value="">
                                    Select Employee
                                </option>

                                {employees.map(employee => (

                                    <option
                                        key={employee.employee_id}
                                        value={employee.employee_id}
                                    >
                                        {employee.name}
                                    </option>

                                ))}

                            </select>

                        </div>

                        <div>

                            <label>
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter Username"
                            />

                        </div>

                    </div>

                    <div className="grid-2">

                        <div>

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter Email"
                            />

                        </div>

                    </div>

                </div>

                <div className="user-card">

                    <h2>

                        Security

                    </h2>

                    <div className="grid-2">

                        <div>

                            <label>

                                Password

                            </label>

                            <input

                                type="password"

                                name="password"

                                value={form.password}

                                onChange={handleChange}

                                placeholder="Password"

                            />

                        </div>

                        <div>

                            <label>

                                Confirm Password

                            </label>

                            <input

                                type="password"

                                name="confirmPassword"

                                value={form.confirmPassword}

                                onChange={handleChange}

                                placeholder="Confirm Password"

                            />

                        </div>

                    </div>
                    <div className="checkbox-group">

                        <label>

                            <input
                                type="checkbox"
                                name="forcePasswordReset"
                                checked={form.forcePasswordReset}
                                onChange={handleCheckbox}
                            />

                            Force password change on first login

                        </label>

                    </div>

                </div>

                <div className="user-card">

                    <h2>

                        Access Control

                    </h2>

                    <div className="grid-2">

                        <div>

                            <label>

                                User Role

                            </label>

                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                            >
                                <option value="Admin">
                                    Administrator
                                </option>

                                <option value="HR Manager">
                                    HR Manager
                                </option>

                                <option value="Employee">
                                    Employee
                                </option>

                                <option value="Recruiter">
                                    Recruiter
                                </option>

                                <option value="Payroll Manager">
                                    Payroll Manager
                                </option>

                                <option value="HR_ADMIN">
                                    HR Admin
                                </option>
                            </select>

                        </div>

                        <div>

                            <label>

                                Department

                            </label>

                            <select
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Department
                                </option>

                                <option>
                                    Engineering
                                </option>

                                <option>
                                    Human Resources
                                </option>

                                <option>
                                    Finance
                                </option>

                                <option>
                                    Sales
                                </option>

                                <option>
                                    Marketing
                                </option>

                            </select>

                        </div>

                        <div>

                            <label>

                                Account Status

                            </label>

                            <select
                                name="accountStatus"
                                value={form.accountStatus}
                                onChange={handleChange}
                            >

                                <option value="ACTIVE">

                                    Active

                                </option>

                                <option value="INACTIVE">

                                    Inactive

                                </option>

                            </select>

                        </div>

                    </div>

                </div>

                <div className="user-card">

                    <h2>

                        Notifications

                    </h2>

                    <div className="checkbox-group">

                        <label>

                            <input
                                type="checkbox"
                                name="sendWelcomeEmail"
                                checked={form.sendWelcomeEmail}
                                onChange={handleCheckbox}
                            />

                            Send Welcome Email

                        </label>

                    </div>

                    <p className="info-text">

                        The employee will receive login instructions after the account is created.

                    </p>

                </div>

                <button
                    className="create-user-btn"
                    type="submit"
                >

                    Create User Account

                </button>

            </form>

        </div>

    );

}

export default CreateUserPage;
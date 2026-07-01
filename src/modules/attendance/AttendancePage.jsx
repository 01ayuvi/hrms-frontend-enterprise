import { useEffect, useState } from "react";
import "./Attendance.css";
import {
    checkIn,
    checkOut,
    getAttendance,
} from "../../services/attendanceService";
import { toast } from "react-toastify";

function AttendancePage() {
    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        loadAttendance();
    }, []);

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatTime = (dateTime) => {
        if (!dateTime) return "-";

        return new Date(dateTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const loadAttendance = async () => {
        try {
            const data = await getAttendance();
            setRecords(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckIn = async () => {
        try {
            await checkIn();


            toast.success("Checked in successfully");

            loadAttendance();
        } catch (error) {
            toast.error(
                error.response?.data?.detail ||
                "Operation Failed"
            );
        }
    };

    const handleCheckOut = async () => {
        try {

            await checkOut();


            toast.success("Checked out successfully");

            loadAttendance();
        } catch (error) {
            toast.error(
                error.response?.data?.detail ||
                "Operation Failed"
            );
        }
    };

    const totalRecords = records.length;

    const presentCount = records.filter(
        (record) => record.attendance_status === "PRESENT"
    ).length;

    const absentCount = records.filter(
        (record) => record.attendance_status === "ABSENT"
    ).length;

    const lateCount = records.filter(
        (record) => record.attendance_status === "LATE"
    ).length;

    const filteredRecords = records.filter((record) => {

        const employeeCode =
            `EMP${String(record.employee_id).padStart(3, "0")}`;

        const matchesSearch =
            employeeCode
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            record.employee_id
                .toString()
                .includes(search);

        const matchesStatus =
            statusFilter === "" ||
            record.attendance_status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="attendance-page">

            <h1 className="page-title">
                Attendance Management
            </h1>

            <div className="attendance-actions">

                <div className="attendance-summary">

                    <div className="summary-card">
                        <h3>Total Records</h3>
                        <p>{totalRecords}</p>
                    </div>

                    <div className="summary-card">
                        <h3>Present</h3>
                        <p>{presentCount}</p>
                    </div>

                    <div className="summary-card">
                        <h3>Late</h3>
                        <p>{lateCount}</p>
                    </div>

                    <div className="summary-card">
                        <h3>Absent</h3>
                        <p>{absentCount}</p>
                    </div>

                </div>

                <button
                    className="checkin-btn"
                    onClick={handleCheckIn}
                >
                    Check In
                </button>

                <button
                    className="checkout-btn"
                    onClick={handleCheckOut}
                >
                    Check Out
                </button>

            </div>

            <div className="attendance-toolbar">

                <input
                    type="text"
                    placeholder="Search Employee ID..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                >
                    <option value="">
                        All Status
                    </option>

                    <option value="PRESENT">
                        Present
                    </option>

                    <option value="ABSENT">
                        Absent
                    </option>

                    <option value="LATE">
                        Late
                    </option>

                    <option value="HALF_DAY">
                        Half Day
                    </option>

                    <option value="LEAVE">
                        Leave
                    </option>

                </select>

            </div>

            <div className="table-card">

                <table className="attendance-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Employee</th>

                            <th>Date</th>

                            <th>Check In</th>

                            <th>Check Out</th>

                            <th>Hours</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredRecords.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    style={{
                                        textAlign: "center",
                                        padding: "30px",
                                        color: "#6B7280",
                                    }}
                                >
                                    No attendance records found.
                                </td>

                            </tr>

                        ) : (

                            filteredRecords.map((record) => (

                                <tr key={record.attendance_id}>

                                    <td>{record.attendance_id}</td>

                                    <td>
                                        EMP{String(record.employee_id).padStart(3, "0")}
                                    </td>

                                    <td>
                                        {formatDate(record.attendance_date)}
                                    </td>

                                    <td>
                                        {formatTime(record.check_in_time)}
                                    </td>

                                    <td>
                                        {formatTime(record.check_out_time)}
                                    </td>

                                    <td>
                                        {record.working_hours
                                            ? `${Number(record.working_hours).toFixed(2)} hrs`
                                            : "-"}
                                    </td>

                                    <td>

                                        <span
                                            className={`attendance-status status-${record.attendance_status?.toLowerCase()}`}
                                        >
                                            {record.attendance_status}
                                        </span>

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

export default AttendancePage;
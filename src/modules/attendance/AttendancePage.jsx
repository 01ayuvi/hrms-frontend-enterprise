import { useEffect, useState } from "react";
import "./Attendance.css";
import {
    checkIn,
    checkOut,
    getAttendance,
} from "../../services/attendanceService";

function AttendancePage() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        loadAttendance();
    }, []);

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

            alert("Checked In");

            loadAttendance();
        } catch (error) {
            alert(
                error.response?.data?.detail ||
                "Operation Failed"
            );
        }
    };

    const handleCheckOut = async () => {
        try {
            await checkOut();

            alert("Checked Out");

            loadAttendance();
        } catch (error) {
            alert(
                error.response?.data?.detail ||
                "Operation Failed"
            );
        }
    };

    return (
        <div className="attendance-page">

            <h1 className="page-title">
            Attendance Management
            </h1>

            <div className="attendance-actions">

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

                {records.map((record) => (

                    <tr key={record.attendance_id}>

                    <td>{record.attendance_id}</td>

                    <td>{record.employee_id}</td>

                    <td>{record.attendance_date}</td>

                    <td>{record.check_in_time}</td>

                    <td>{record.check_out_time || "-"}</td>

                    <td>{record.working_hours || "-"}</td>

                    <td>

                        <span
                        className={`attendance-status status-${record.attendance_status?.toLowerCase()}`}
                        >
                        {record.attendance_status}
                        </span>

                    </td>

                    </tr>

                ))}

                </tbody>

            </table>

            </div>

        </div>
        );
}

export default AttendancePage;
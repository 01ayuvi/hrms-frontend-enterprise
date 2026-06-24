import { useEffect, useState } from "react";

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
            await checkIn(8);

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
            await checkOut(8);

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
        <div style={{ padding: "30px" }}>
            <h1>Attendance Management</h1>

            <button
                onClick={handleCheckIn}
                style={{ marginRight: "10px" }}
            >
                Check In
            </button>

            <button onClick={handleCheckOut}>
                Check Out
            </button>

            <br />
            <br />

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

                            <td>
                                {record.attendance_date}
                            </td>

                            <td>
                                {record.check_in_time}
                            </td>

                            <td>
                                {record.check_out_time}
                            </td>

                            <td>
                                {record.working_hours}
                            </td>

                            <td>
                                {record.attendance_status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AttendancePage;
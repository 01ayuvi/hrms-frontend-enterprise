import { useEffect, useState } from "react";
import "./Payroll.css";
import {
  getPayrollRuns,
  getPayrollDetails,
  createPayrollRun,
  createPayrollDetail,
  downloadPayslip,
} from "../../services/payrollService";

import { getEmployees } from "../../services/employeeService";

function PayrollPage() {
  const [runs, setRuns] = useState([]);
  const [details, setDetails] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [payPeriod, setPayPeriod] = useState("");
  const [remarks, setRemarks] = useState("");

  const [runId, setRunId] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const loadData = async () => {
    try {
      const payrollRuns = await getPayrollRuns();
      const payrollDetails = await getPayrollDetails();
      const employeeList = await getEmployees();

      setRuns(payrollRuns);
      setDetails(payrollDetails);
      setEmployees(employeeList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateRun = async () => {
    try {
      await createPayrollRun({
        pay_period: payPeriod,
        remarks,
      });

      alert("Payroll Run Created");

      setPayPeriod("");
      setRemarks("");

      loadData();
    } catch (err) {
      console.log(err);
      alert("Unable to create payroll run");
    }
  };

  const handleGeneratePayroll = async () => {
    if (!runId || !employeeId) {
      alert("Please select Payroll Run and Employee");
      return;
    }

    try {
      await createPayrollDetail({
        payroll_run_id: Number(runId),
        employee_id: Number(employeeId),
        basic_salary: 0,
        allowances: 0,
        deductions: 0,
      });

      alert("Payroll Generated");

      setRunId("");
      setEmployeeId("");

      loadData();
    } catch (err) {
      console.log(err);
      alert("Unable to generate payroll");
    }
  };

  const handleDownload = async (id) => {
    try {
      const pdf = await downloadPayslip(id);

      const url = window.URL.createObjectURL(pdf);

      const a = document.createElement("a");

      a.href = url;
      a.download = `payslip_${id}.pdf`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
      alert("Unable to download payslip");
    }
  };

  return (
    <div className="payroll-page">

      <h1 className="page-title">
        Payroll Management
      </h1>

      <div className="payroll-grid">

        <div className="payroll-card">

          <h2>Create Payroll Run</h2>

          <input
            placeholder="Pay Period (JULY-2026)"
            value={payPeriod}
            onChange={(e) => setPayPeriod(e.target.value)}
          />

          <input
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />

          <button
            className="primary-btn"
            onClick={handleCreateRun}
          >
            Create Payroll Run
          </button>

        </div>

        <div className="payroll-card">

          <h2>Generate Payroll</h2>

          <select
            value={runId}
            onChange={(e) => setRunId(e.target.value)}
          >
            <option value="">Select Payroll Run</option>

            {runs.map((run) => (
              <option
                key={run.payroll_run_id}
                value={run.payroll_run_id}
              >
                {run.pay_period}
              </option>
            ))}
          </select>

          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          >
            <option value="">Select Employee</option>

            {employees.map((emp) => (
              <option
                key={emp.employee_id}
                value={emp.employee_id}
              >
                {emp.first_name} {emp.last_name}
              </option>
            ))}
          </select>

          <button
            className="primary-btn"
            onClick={handleGeneratePayroll}
          >
            Generate Payroll
          </button>

        </div>

      </div>

      <div className="table-card">

        <h2>Payroll Runs</h2>

        <table className="payroll-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Pay Period</th>
              <th>Status</th>
              <th>Run Date</th>
            </tr>
          </thead>

          <tbody>

            {runs.map((run) => (

              <tr key={run.payroll_run_id}>

                <td>{run.payroll_run_id}</td>

                <td>{run.pay_period}</td>

                <td>{run.status}</td>

                <td>{run.run_date}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="table-card">

        <h2>Payroll Details</h2>

        <table className="payroll-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Payslip</th>
            </tr>
          </thead>

          <tbody>

            {details.map((item) => (

              <tr key={item.payroll_detail_id}>

                <td>{item.payroll_detail_id}</td>

                <td>{item.employee_id}</td>

                <td>{item.gross_salary}</td>

                <td>{item.deductions}</td>

                <td>{item.net_salary}</td>

                <td>

                  <button
                    className="download-btn"
                    onClick={() =>
                      handleDownload(item.payroll_detail_id)
                    }
                  >
                    Download
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default PayrollPage;
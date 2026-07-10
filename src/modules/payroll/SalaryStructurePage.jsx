import { useEffect, useState } from "react";

import {
  getSalaryStructures,
  createSalaryStructure,
  updateSalaryStructure,
  deleteSalaryStructure,
} from "../../services/salaryStructureService";

import {
  getAllEmployees,
} from "../../services/employeeService";

function SalaryStructurePage() {

  const [salaryStructures, setSalaryStructures] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [basicSalary, setBasicSalary] = useState("");

  const [hra, setHra] = useState("40");
  const [pf, setPf] = useState("12");
  const [esic, setEsic] = useState("0.75");
  const [professionalTax, setProfessionalTax] = useState("200");
  const [tds, setTds] = useState("0");
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    const salaryData =
      await getSalaryStructures();

    const employeeData =
      await getAllEmployees();

    setSalaryStructures(salaryData);
    setEmployees(employeeData);
  };
  const handleSave = async () => {

  if (!employeeId || !basicSalary) {
    alert("Employee and Basic Salary are required");
    return;
  }

  try {

    const payload = {

        basic_salary: Number(basicSalary),

        hra_percentage: Number(hra),

        pf_percentage: Number(pf),

        esic_percentage: Number(esic),

        professional_tax: Number(professionalTax),

        tds: Number(tds)

    };

    if (editingEmployeeId) {

        await updateSalaryStructure(
            editingEmployeeId,
            payload
        );

        alert("Salary Structure Updated");

    } else {

        await createSalaryStructure({

            employee_id: Number(employeeId),

            ...payload

        });

        alert("Salary Structure Created");

    }
    setEditingEmployeeId(null);

    setEmployeeId("");
    setBasicSalary("");

    setHra("40");
    setPf("12");
    setEsic("0.75");
    setProfessionalTax("200");
    setTds("0");

    loadData();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.detail ||
      "Unable to create salary structure"
    );

  }

};

  const handleEdit = (salary) => {

    

    

    setEditingEmployeeId(salary.employee_id);

    setEmployeeId(String(salary.employee_id));

    setBasicSalary(String(salary.basic_salary));

    setHra(String(salary.hra_percentage));

    setPf(String(salary.pf_percentage));

    setEsic(String(salary.esic_percentage));

    setProfessionalTax(String(salary.professional_tax));

    setTds(String(salary.tds));

    

};

const handleDelete = async (employeeId) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this salary structure?"
    );

    if (!confirmed) {
        return;
    }

    try {

        await deleteSalaryStructure(employeeId);

        alert("Salary Structure Deleted");

        loadData();

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.detail ||
            "Unable to delete salary structure"
        );

    }

};


  return (

    <div className="payroll-page">

      <h1 className="page-title">
        Salary Structure Management
      </h1>

      <div className="payroll-card">

        <h2>Create Salary Structure</h2>

        <select
          value={employeeId}
          disabled={editingEmployeeId !== null}
          onChange={(e) =>
            setEmployeeId(e.target.value)
          }
        >

          <option value="">
            Select Employee
          </option>

          {employees.map((emp) => (

            <option
              key={emp.employee_id}
              value={emp.employee_id}
            >
              {emp.first_name} {emp.last_name}
            </option>

          ))}

        </select>

        <input
          placeholder="Basic Salary"
          value={basicSalary}
          onChange={(e) =>
            setBasicSalary(e.target.value)
          }
        />

        <input
          placeholder="HRA %"
          value={hra}
          onChange={(e) =>
            setHra(e.target.value)
          }
        />

        <input
          placeholder="PF %"
          value={pf}
          onChange={(e) =>
            setPf(e.target.value)
          }
        />

        <input
          placeholder="ESIC %"
          value={esic}
          onChange={(e) =>
            setEsic(e.target.value)
          }
        />

        <input
          placeholder="Professional Tax"
          value={professionalTax}
          onChange={(e) =>
            setProfessionalTax(e.target.value)
          }
        />

        <input
          placeholder="TDS"
          value={tds}
          onChange={(e) =>
            setTds(e.target.value)
          }
        />

        <button
            className="primary-btn"
            onClick={handleSave}
        >
            {
                editingEmployeeId
                ? "Update Salary Structure"
                : "Save Salary Structure"
            }
        </button>

      </div>

      <div className="table-card">

        <h2>Salary Structures</h2>

        <table className="payroll-table">

            <thead>

            <tr>

                <th>Employee</th>
                <th>Basic Salary</th>
                <th>HRA %</th>
                <th>PF %</th>
                <th>ESIC %</th>
                <th>Professional Tax</th>
                <th>TDS</th>
                <th>Actions</th>

            </tr>

            </thead>

            <tbody>

            {salaryStructures.map((salary) => (

                <tr key={salary.salary_structure_id}>

                <td>{salary.employee_name}</td>

                <td>{salary.basic_salary}</td>

                <td>{salary.hra_percentage}</td>

                <td>{salary.pf_percentage}</td>

                <td>{salary.esic_percentage}</td>

                <td>{salary.professional_tax}</td>

                <td>{salary.tds}</td>

                <td>

                    <div className="action-buttons">

                        <button
                            className="primary-btn"
                            onClick={() => handleEdit(salary)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() =>
                                handleDelete(salary.employee_id)
                            }
                        >
                            Delete
                        </button>

                    </div>

                </td>

                </tr>

            ))}

            </tbody>

        </table>

        </div>

    </div>

  );
}

export default SalaryStructurePage;
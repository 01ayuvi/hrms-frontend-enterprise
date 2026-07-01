import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";  
import { getEmployees } from "../../services/employeeService";
import "./Documents.css";

import {
  uploadDocument,
  searchDocuments,
  downloadDocument,
  deleteDocument,
} from "../../services/documentService";

function DocumentsPage() {
  const [employees, setEmployees] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [searchEmployeeId, setSearchEmployeeId] = useState("");

  const [documentType, setDocumentType] = useState("");

  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);

  const isHR =
      user?.role === "Admin" ||
      user?.role === "HR_ADMIN";

  useEffect(() => {

  if (isHR) {

    loadEmployees();

  } else {

    setEmployeeId(user?.employee_id);
    setSearchEmployeeId(user?.employee_id);

  }

}, [user]);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("User:", user);
  console.log("Uploading for employee:", employeeId);
  const handleUpload = async () => {
    if (!employeeId || !documentType || !file) {
      alert("Please fill all fields");
      return;
    }

    try {
      await uploadDocument(
        employeeId,
        documentType,
        file
      );

      alert("Document uploaded");

      setFile(null);
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };
  const handleSearchForEmployee = async (employeeId) => {

      try {

          const result =
              await searchDocuments({

                  employee_id: employeeId,

              });

          setDocuments(result.records);

      }

      catch (err) {

          console.log(err);

      }

  };
  console.log("Searching for employee:", searchEmployeeId);
  const handleSearch = async () => {
    try {
        const result = await searchDocuments({
        employee_id: Number(searchEmployeeId),
        });

        console.log("Records:", result.records);
        setDocuments(result.records);

    } catch (err) {
        console.log(err);
        setDocuments([]);
    }
    };
  useEffect(() => {

  if (!isHR && user?.employee_id) {

    handleSearch();

  }

}, [searchEmployeeId]);  
  const handleDownload = async (doc) => {
    try {
      const blob = await downloadDocument(doc.id);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = doc.document_name;

      link.click();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete document?"))
      return;

    try {
      await deleteDocument(id);

      alert("Deleted");

      handleSearch();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="documents-page">

      <h1 className="page-title">
        Employee Documents
      </h1>

      <div className="documents-grid">

        {/* Upload Card */}

        <div className="document-card">

          <h2>Upload Document</h2>

          {isHR ? (

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

          ) : (

            <input
              type="text"
              value={user?.username}
              disabled
            />

          )}

          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="">Document Type</option>

            <option>Resume</option>
            <option>Aadhaar</option>
            <option>PAN</option>
            <option>Passport</option>
            <option>Offer Letter</option>
            <option>Appointment Letter</option>
            <option>Salary Slip</option>
            <option>Experience Certificate</option>
            <option>Other</option>

          </select>

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <button
            className="primary-btn"
            onClick={handleUpload}
          >
            Upload Document
          </button>

        </div>

        {/* Search Card */}

        <div className="document-card">

          <h2>Search Documents</h2>

          {isHR ? (

            <select
              value={searchEmployeeId}
              onChange={(e) =>
                setSearchEmployeeId(e.target.value)
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

          ) : (

            <input
              type="text"
              value={user?.username}
              disabled
            />

          )}

          <button
            className="primary-btn"
            onClick={handleSearch}
          >
            Search
          </button>

        </div>

      </div>

      {/* Documents Table */}

      <div className="table-card">

        <h2>Documents</h2>

        <table className="document-table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Document Type</th>

              <th>Download</th>

              <th>Delete</th>

            </tr>

          </thead>

          <tbody>

            {Array.isArray(documents) &&
              documents.map((doc) => (

                <tr key={doc.id}>

                  <td>{doc.id}</td>

                  <td>{doc.document_type}</td>

                  <td>

                    <button
                      className="download-btn"
                      onClick={() =>
                        handleDownload(doc)
                      }
                    >
                      Download
                    </button>

                  </td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(doc.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DocumentsPage;
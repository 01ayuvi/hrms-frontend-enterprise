import { useEffect, useState } from "react";
import "./Performance.css";
import {
  getPerformanceReviews,
  createPerformanceReview,
  updatePerformanceReview,
} from "../../services/performanceService";

import { getEmployees } from "../../services/employeeService";

function PerformancePage() {
  const [reviews, setReviews] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [reviewerId, setReviewerId] = useState("");
  const [reviewPeriod, setReviewPeriod] = useState("");
  const [rating, setRating] = useState("");

  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [goals, setGoals] = useState("");

  const [editingReview, setEditingReview] = useState(null);

  const [editRating, setEditRating] = useState("");
  const [editStrengths, setEditStrengths] = useState("");
  const [editImprovements, setEditImprovements] = useState("");
  const [editGoals, setEditGoals] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const loadData = async () => {
    try {
      const reviewData = await getPerformanceReviews();
      const employeeData = await getEmployees();

      setReviews(reviewData);
      setEmployees(employeeData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    try {
      await createPerformanceReview({
        employee_id: Number(employeeId),
        reviewer_id: Number(reviewerId),
        review_period: reviewPeriod,
        rating: Number(rating),
        strengths,
        improvements,
        goals,
      });

      alert("Performance Review Created");

      setEmployeeId("");
      setReviewerId("");
      setReviewPeriod("");
      setRating("");
      setStrengths("");
      setImprovements("");
      setGoals("");

      loadData();
    } catch (err) {
      console.log(err);
      alert("Unable to create review");
    }
  };

  const openEditor = (review) => {
    setEditingReview(review.review_id);

    setEditRating(review.rating);
    setEditStrengths(review.strengths || "");
    setEditImprovements(review.improvements || "");
    setEditGoals(review.goals || "");
    setEditStatus(review.status);
  };

  const saveUpdate = async () => {
    try {
      await updatePerformanceReview(editingReview, {
        rating: Number(editRating),
        strengths: editStrengths,
        improvements: editImprovements,
        goals: editGoals,
        status: editStatus,
      });

      alert("Review Updated");

      setEditingReview(null);

      loadData();
    } catch (err) {
      console.log(err);
      alert("Unable to update review");
    }
  };

  return (
    <div className="performance-page">

      <h1 className="page-title">
        Performance Management
      </h1>

      <div className="performance-card">

        <h2>Create Performance Review</h2>

        <div className="performance-form">

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

          <input
            placeholder="Reviewer ID"
            value={reviewerId}
            onChange={(e)=>setReviewerId(e.target.value)}
          />

          <input
            placeholder="Review Period"
            value={reviewPeriod}
            onChange={(e)=>setReviewPeriod(e.target.value)}
          />

          <input
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e)=>setRating(e.target.value)}
          />

          <textarea
            placeholder="Strengths"
            value={strengths}
            onChange={(e)=>setStrengths(e.target.value)}
          />

          <textarea
            placeholder="Improvements"
            value={improvements}
            onChange={(e)=>setImprovements(e.target.value)}
          />

          <textarea
            placeholder="Goals"
            value={goals}
            onChange={(e)=>setGoals(e.target.value)}
          />

          <button
            className="primary-btn"
            onClick={handleCreate}
          >
            Create Review
          </button>

        </div>

      </div>

      <div className="table-card">

        <h2>Performance Reviews</h2>

        <table className="performance-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Reviewer</th>
              <th>Period</th>
              <th>Rating</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {reviews.map((review)=>(

              <tr key={review.review_id}>

                <td>{review.review_id}</td>

                <td>{review.employee_id}</td>

                <td>{review.reviewer_id}</td>

                <td>{review.review_period}</td>

                <td>{review.rating}</td>

                <td>{review.status}</td>

                <td>

                  <button
                    className="primary-btn"
                    onClick={()=>openEditor(review)}
                  >
                    Update
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {editingReview && (

        <div className="performance-card">

          <h2>Update Review</h2>

          <div className="performance-form">

            <input
              placeholder="Rating"
              value={editRating}
              onChange={(e)=>setEditRating(e.target.value)}
            />

            <textarea
              placeholder="Strengths"
              value={editStrengths}
              onChange={(e)=>setEditStrengths(e.target.value)}
            />

            <textarea
              placeholder="Improvements"
              value={editImprovements}
              onChange={(e)=>setEditImprovements(e.target.value)}
            />

            <textarea
              placeholder="Goals"
              value={editGoals}
              onChange={(e)=>setEditGoals(e.target.value)}
            />

            <select
              value={editStatus}
              onChange={(e)=>setEditStatus(e.target.value)}
            >
              <option value="DRAFT">DRAFT</option>
              <option value="SUBMITTED">SUBMITTED</option>
              <option value="APPROVED">APPROVED</option>
            </select>

            <button
              className="primary-btn"
              onClick={saveUpdate}
            >
              Save Changes
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default PerformancePage;
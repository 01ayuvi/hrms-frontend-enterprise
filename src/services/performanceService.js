import axiosInstance from "./axiosInstance";

// Get all reviews
export const getPerformanceReviews = async () => {
  const response = await axiosInstance.get("/performance/reviews");
  return response.data;
};

// Get reviews of one employee
export const getEmployeeReviews = async (employeeId) => {
  const response = await axiosInstance.get(
    `/performance/reviews/${employeeId}`
  );

  return response.data;
};

// Create review
export const createPerformanceReview = async (payload) => {
  const response = await axiosInstance.post(
    "/performance/reviews",
    payload
  );

  return response.data;
};

// Update review
export const updatePerformanceReview = async (
  reviewId,
  payload
) => {
  const response = await axiosInstance.put(
    `/performance/reviews/${reviewId}`,
    payload
  );

  return response.data;
};
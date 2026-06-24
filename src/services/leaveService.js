import axiosInstance from "./axiosInstance";

export const getLeaves = async () => {
  const response = await axiosInstance.get("/leave");
  return response.data;
};

export const applyLeave = async (payload) => {
  const response = await axiosInstance.post(
    "/leave/apply",
    payload
  );
  return response.data;
};

export const approveLeave = async (
  leaveId,
  approvedBy
) => {
  const response = await axiosInstance.post(
    "/leave/approve",
    {
      leave_id: leaveId,
      approved_by: approvedBy,
    }
  );

  return response.data;
};

export const rejectLeave = async (
  leaveId,
  approvedBy
) => {
  const response = await axiosInstance.post(
    "/leave/reject",
    {
      leave_id: leaveId,
      approved_by: approvedBy,
    }
  );

  return response.data;
};
import axiosInstance from "./axiosInstance";

export const checkIn = async (
  employeeId
) => {
  const response = await axiosInstance.post(
    "/attendance/checkin",
    {
      employee_id: employeeId,
    }
  );

  return response.data;
};

export const checkOut = async (
  employeeId
) => {
  const response = await axiosInstance.post(
    "/attendance/checkout",
    {
      employee_id: employeeId,
    }
  );

  return response.data;
};

export const getAttendance = async () => {
  const response = await axiosInstance.get(
    "/attendance"
  );

  return response.data;
};
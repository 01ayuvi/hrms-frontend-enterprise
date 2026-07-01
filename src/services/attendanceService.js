import axiosInstance from "./axiosInstance";

export const checkIn = async () => {
  const response = await axiosInstance.post(
    "/attendance/checkin",
    {}
  );

  return response.data;
};

export const checkOut = async () => {
  const response = await axiosInstance.post(
    "/attendance/checkout",
    {}
  );

  return response.data;
};

export const getAttendance = async () => {
  const response = await axiosInstance.get(
    "/attendance"
  );

  return response.data;
};
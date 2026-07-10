import axiosInstance from "./axiosInstance";

export const getSalaryStructures = async () => {
  const response = await axiosInstance.get(
    "/payroll/salary-structure"
  );

  return response.data;
};

export const createSalaryStructure = async (payload) => {
  const response = await axiosInstance.post(
    "/payroll/salary-structure",
    payload
  );

  return response.data;
};

export const updateSalaryStructure = async (
  employeeId,
  payload
) => {
  const response = await axiosInstance.put(
    `/payroll/salary-structure/${employeeId}`,
    payload
  );

  return response.data;
};

export const deleteSalaryStructure = async (
  employeeId
) => {
  const response = await axiosInstance.delete(
    `/payroll/salary-structure/${employeeId}`
  );

  return response.data;
};
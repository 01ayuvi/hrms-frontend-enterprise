import axiosInstance from "./axiosInstance";

// Payroll Runs
export const getPayrollRuns = async () => {
  const response = await axiosInstance.get("/payroll/runs");
  return response.data;
};

export const createPayrollRun = async (data) => {
  const response = await axiosInstance.post("/payroll/run", data);
  return response.data;
};

// Payroll Details
export const getPayrollDetails = async () => {
  const response = await axiosInstance.get("/payroll/details");
  return response.data;
};

export const createPayrollDetail = async (data) => {
  const response = await axiosInstance.post("/payroll/detail", data);
  return response.data;
};

// Payslip
export const downloadPayslip = async (id) => {
  const response = await axiosInstance.get(
    `/payroll/payslip/${id}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};
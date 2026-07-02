import axiosInstance from "./axiosInstance";

export const getEmployees = async () => {
const response = await axiosInstance.get(
"/employees"
);

return response.data;
};

export const searchEmployees = async (payload) => {
const response = await axiosInstance.post(
"/employees/search",
payload
);

return response.data;
};

export const createEmployee = async (payload) => {
const response = await axiosInstance.post(
"/employees",
payload
);

return response.data;
};
export const getEmployeeProfile = async (
employeeId
) => {
const response = await axiosInstance.get(
`/employees/${employeeId}/profile`
);

return response.data;
};
export const getAvailableEmployees = async () => {

    const response = await axiosInstance.get(
        "/employees/available"
    );

    return response.data;

};
export const getAllEmployees = async () => {

  const response = await axiosInstance.get(
    "/employees/all"
  );

  return response.data;

};
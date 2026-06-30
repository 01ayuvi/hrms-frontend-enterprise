import axiosInstance from "./axiosInstance";

export const getDepartments = async () => {
    const response = await axiosInstance.get("/departments/");
    return response.data;
};

export const createDepartment = async (payload) => {
    const response = await axiosInstance.post(
        "/departments/",
        payload
    );

    return response.data;
};

export const updateDepartment = async (
    departmentId,
    payload
) => {
    const response = await axiosInstance.put(
        `/departments/${departmentId}`,
        payload
    );

    return response.data;
};
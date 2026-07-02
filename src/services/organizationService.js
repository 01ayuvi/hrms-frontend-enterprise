import axiosInstance from "./axiosInstance";

export const getOrganization = async () => {
    const response = await axiosInstance.get(
        "/organization"
    );

    return response.data;
};

export const updateOrganization = async (
    payload
) => {
    const response = await axiosInstance.put(
        "/organization",
        payload
    );

    return response.data;
};

export const getPolicies = async () => {
    const response = await axiosInstance.get(
        "/organization/policies"
    );

    return response.data;
};

export const createPolicy = async (
    payload
) => {
    const response = await axiosInstance.post(
        "/organization/policies",
        payload
    );

    return response.data;
};

export const updatePolicy = async (
    payload
) => {
    const response = await axiosInstance.put(
        "/organization/policies",
        payload
    );

    return response.data;
};

export const uploadLogo = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await axiosInstance.post(
        "/organization/upload-logo",
        formData
    );

    return response.data;

};
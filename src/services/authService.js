import axiosInstance from "./axiosInstance";

export const loginUser = async (username, password) => {
  const formData = new URLSearchParams();

  formData.append("username", username);
  formData.append("password", password);

  const response = await axiosInstance.post(
    "/auth/login",
    formData,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

export const registerUser = async (payload) => {
  const response = await axiosInstance.post(
    "/auth/register",
    payload
  );

  return response.data;
};
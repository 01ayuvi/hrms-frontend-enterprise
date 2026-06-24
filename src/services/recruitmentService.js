import axiosInstance from "./axiosInstance";

export const getJobs = async () => {
  const response = await axiosInstance.get(
    "/recruitment/jobs"
  );

  return response.data;
};
export const createJob = async (payload) => {
  const response = await axiosInstance.post(
    "/recruitment/jobs",
    payload
  );

  return response.data;
};
export const getCandidates = async () => {
  const response = await axiosInstance.get(
    "/recruitment/candidates"
  );

  return response.data;
};
export const updateCandidateStatus = async (
  candidateId,
  status
) => {
  const response = await axiosInstance.put(
    `/recruitment/candidates/${candidateId}/status`,
    {
      status,
    }
  );

  return response.data;
};
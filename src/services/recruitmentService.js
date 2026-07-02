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

export const createCandidate = async (payload) => {
  const response = await axiosInstance.post(
    "/recruitment/candidates",
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

export const updateJob = async (
  jobId,
  payload
) => {
  const response = await axiosInstance.put(
    `/recruitment/jobs/${jobId}`,
    payload
  );

  return response.data;
};

export const deleteJob = async (
  jobId
) => {
  const response = await axiosInstance.delete(
    `/recruitment/jobs/${jobId}`
  );

  return response.data;
};
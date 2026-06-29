import axiosInstance from "./axiosInstance";

// Upload Document
export const uploadDocument = async (
  employeeId,
  documentType,
  file
) => {
  const formData = new FormData();

  formData.append("document_type", documentType);
  formData.append("file", file);

  const response = await axiosInstance.post(
    `/employees/${employeeId}/documents`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Search Documents
export const searchDocuments = async (payload) => {
  const response = await axiosInstance.post(
    "/employees/documents/search",
    payload
  );

  return response.data;
};

// Download Document
export const downloadDocument = async (documentId) => {
  const response = await axiosInstance.get(
    `/employees/documents/${documentId}/download`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};

// Delete Document
export const deleteDocument = async (documentId) => {
  const response = await axiosInstance.delete(
    `/employees/documents/${documentId}`
  );

  return response.data;
};
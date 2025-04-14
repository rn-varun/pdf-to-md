import axios from "axios";

interface UploadProps {
  pdfFile: File | null;
  setPdfToMdOutput: (val: string) => void;
}

const VITE_BACKEND_TRANSMITTAL_URL: string = import.meta.env
  .VITE_BACKEND_TRANSMITTAL;
const VITE_BACKEND_IRS_URL: string = import.meta.env.VITE_BACKEND_IRS;
// const VITE_BACKEND_BASE:string = import.meta.env.VITE_BACKEND_BASE

export const handleSubmission = async (
  formName: string,
  text: string
): Promise<string> => {
  // pydantic model / IRS Form
  console.log("formName", formName);
  const response = await axios.post(
    `${VITE_BACKEND_IRS_URL}llm-output/${formName}`,
    {
      formName: formName,
      text: text,
    }
  );
  return response.data;

  // console.log(formName)
  // console.log(response.data)
};

export const handleUpload = async ({
  pdfFile,
  setPdfToMdOutput,
}: UploadProps) => {
  if (!pdfFile) return;
  const formData = new FormData();
  formData.append("file", pdfFile);
  const response = await axios.post(
    `${VITE_BACKEND_IRS_URL}upload-pdf`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  console.log(response.data);
  setPdfToMdOutput(response.data);
  return response.data;
};

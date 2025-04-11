import axios from "axios";


const BACKEND_URL:string = import.meta.env.VITE_BACKEND_URL 

export const  handleSubmission = async (formName: string, text: string): Promise<string>  => {
    const response = await axios.post(`${BACKEND_URL}${formName}`, {
        formName: formName,
        text: text,
    })
    console.log(formName)
    console.log(response.data)
    return response.data
}

interface UploadProps {
    pdfFile: File | null;
    setPdfToMdOutput: (val: string) => void;
}

export const handleUpload = async ({pdfFile, setPdfToMdOutput}:UploadProps) => {
    if (!pdfFile) return;
    const formData = new FormData();
    formData.append("file", pdfFile);
    const response = await axios.post(`${BACKEND_URL}upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    console.log(response.data)
    setPdfToMdOutput(response.data)
    return response.data;
}
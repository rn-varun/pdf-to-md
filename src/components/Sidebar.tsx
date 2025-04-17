import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { handleUpload } from "../api";
import axios from "axios";

interface SidebarProps {
    setFormName: (formName: string) => void;
    setPdfToMdOutput: (val: string) => void;
    setUploadedPDF: (val: File | null) => void;
    formName: string;
}

const Sidebar = ({ setFormName, setPdfToMdOutput, setUploadedPDF, formName }: SidebarProps) => {

    const [textTypes, selectTextTypes] = useState(["Plaintext", "Markdown"]);
    const [formTypes, setFormTypes] = useState(["", "Transmittal", "W2", "fk1", "f1099"]);
    const [selectedTextType, setSelectedTextType] = useState("textTypes[0]");
    const [pdfFile, setPdfFile] = useState<File | null>(null);


    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!(event.target.files)) {
            alert("Please select a file.");
            return;
        }
        console.log("PDF uploaded: ", event.target.files[0]);
        setUploadedPDF(event.target.files[0]);
        setPdfFile(event.target.files[0]);
    }


    const callIText = async (pdfFile: File | null) => {
        if (!pdfFile) {
            alert("Please select a file.");
            return;
        }
        const formData = new FormData();
        formData.append("file", pdfFile);
        const VITE_BACKEND_TRANSMITTAL: string = import.meta.env.VITE_BACKEND_TRANSMITTAL;
        const response = await axios.post(
            `${VITE_BACKEND_TRANSMITTAL}api/Values/ConvertPdfToMarkdown`,
            {
                pdfFile,
            },
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        return response.data;
    }

    return (
        <div className="d-flex flex-row">
            <div className="bg-dark text-light p-4" style={{ width: "300px", height: "100vh" }}>

                <h4 className="mb-4">Configuration</h4>

                <div className="mb-3">
                    <label className="form-label">Select text type</label>
                    <select className="form-select bg-secondary text-light border-0">
                        {textTypes.map((type, index) => (
                            <option key={index} value={type} onChange={(e) => setSelectedTextType((e.target as HTMLSelectElement).value)}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Choose form type:</label>
                    <select className="form-select bg-secondary text-light border-0" onChange={(e) => { setFormName((e.target as HTMLSelectElement).value) }}>
                        {formTypes.map((type, index) => (
                            <option key={index} value={type} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <hr className="border-light" />
                <div className="mb-3">
                    <label htmlFor='inputFormFile' className="font-weight-bold text-light mb-2 form-label">
                        Convert PDF to Markdown
                    </label>
                    <input id="inputFormFile" className="form-control" type="file" onChange={handleFileUpload} />
                    <button className="btn btn-primary mt-3" onClick={async () => {
                        if (formName === "Transmittal") {
                            const md_text = callIText(pdfFile);
                            setPdfToMdOutput(await md_text);
                        } else {
                            if (!pdfFile) {
                                alert("Please select a file.");
                                return;
                            } else {
                                handleUpload({ pdfFile, setPdfToMdOutput })
                            }
                        }
                    }}>Upload pdf</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { handleUpload, plainText } from "../api";
import axios from "axios";

interface SidebarProps {
    setFormName: (formName: string) => void;
    setPdfToMdOutput: (val: string) => void;
    setUploadedPDF: (val: File | null) => void;
    formName: string;
}

const Sidebar = ({ setFormName, setPdfToMdOutput, setUploadedPDF, formName }: SidebarProps) => {

    const [formTypes, setFormTypes] = useState(["", "Transmittal", "W2", "fk1", "f1099"]);
    const [textType, setTextType] = useState("plaintext");
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
                file: pdfFile,
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
                        Get text from {formName} PDF
                    </label>
                    <input id="inputFormFile" className="form-control" type="file" onChange={handleFileUpload} />
                    <div className="form-check mt-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="plaintext"
                            checked={textType === "plaintext"}
                            onChange={(e) => setTextType(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Plaintext
                        </label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            value="markdown"
                            checked={textType === "markdown"}
                            onChange={(e) => setTextType(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Markdown
                        </label>
                    </div>
                    

                    <button className="btn btn-success mt-3" onClick={() => {
                        if(formName == "Transmittal" && textType == "markdown") {
                            callIText(pdfFile).then((data) => {
                                setPdfToMdOutput(data);
                            });
                        }
                        else if (textType === "markdown") {
                            handleUpload({ pdfFile, setPdfToMdOutput }); // this makes call to IRS document, pymupdf endpoint 
                        }
                        else if (textType === "plaintext") {
                            plainText({ pdfFile, setPdfToMdOutput }) // plain text api call, to read model endpoint
                        }
                    }}>Upload pdf</button>
                </div>
                <hr className="border-light" />
            </div>
        </div>
    );
};

export default Sidebar;

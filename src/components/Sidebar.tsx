import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Textarea from "./InputTextarea";

const Sidebar = () => {
    const [textTypes, selectTextTypes] = useState(["Plaintext", "Markdown"]);
    const [formTypes, setFormTypes] = useState(["", "Form W-2", "Form K-1", "Form 1099"]);
    const [documentTypes, setDocumentTypes] = useState(["IRS Form", "Transmittal"]);
    const [selectedDocumentType, setSelectedDocumentType] = useState(documentTypes[0]);
    const [selectedTextType, setSelectedTextType] = useState("textTypes[0]");
    const [selectedFormType, setselectedFormType] = useState(formTypes[0]);
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
                    <label className="form-label">Select Document type</label>
                    <select className="form-select bg-secondary text-light border-0" onChange={(e) => setSelectedDocumentType((e.target as HTMLSelectElement).value)}>
                        {documentTypes.map((type, index) => (
                            <option key={index} value={type}>   
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3" style={selectedDocumentType == "Transmittal" ? { display: "none" } : {}}>
                    <label className="form-label">Choose form type:</label>
                    <select className="form-select bg-secondary text-light border-0" onChange={(e) => setselectedFormType((e.target as HTMLSelectElement).value)}>
                        {formTypes.map((type, index) => (
                            <option key={index} value={type} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <hr className="border-light" />
            </div>
        </div>
    );
};

export default Sidebar;

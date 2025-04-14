import { JSX, useEffect, useState } from "react";
import { handleSubmission } from "../api";
import ReactCodeMirror from "@uiw/react-codemirror";
import MarkdownPreview from "@uiw/react-markdown-preview";

interface TextareaProps {
  formName: string;
  setOutput: (val: string) => void;
  pdfToMdOutput: string;
  uploadedPDF: File | null;
}

const Textarea = ({
  formName,
  setOutput,
  pdfToMdOutput,
  uploadedPDF,
}: TextareaProps) => {
  const [text, setText] = useState("");
  // dropdown states
  const [options, setOptions] = useState([
    "Text",
    "Markdown Preview",
    "PDF Preview",
  ]);
  const [selectedOption, setSelectedOption] = useState("Text");

  const handleClick = async () => {
    const res = await handleSubmission(formName, text);
    setOutput(JSON.stringify(res, null, 2));
  };

  useEffect(() => {
    setText(pdfToMdOutput);
  }, [pdfToMdOutput]);

  const views: Record<string, JSX.Element> = {
    Text: (
      <ReactCodeMirror
        style={{
          backgroundColor: "#21252b",
          width: "38vw",
          height: "100vh",
          outline: "none",
          boxShadow: "none",
          resize: "none",
          overflow: "auto",
        }}
        className="form-control"
        value={pdfToMdOutput || text}
        onChange={(e) => {
          setText(e);
          console.log(e);
        }}
        theme="dark"
      />
    ),
    "Markdown Preview": (
      <MarkdownPreview
        source={text}
        style={{
          backgroundColor: "#21252b",
          width: "38vw",
          height: "100vh",
          outline: "none",
          boxShadow: "none",
          resize: "none",
          overflow: "auto",
        }}
        className="rounded-3"
      />
    ),
    "PDF Preview": (
      <div
        className="pdf-preview"
        style={{
          backgroundColor: "#21252b",
          width: "38vw",
          height: "100vh",
          outline: "none",
          boxShadow: "none",
          resize: "none",
          overflow: "auto",
        }}
      >
        <iframe
          src={uploadedPDF ? URL.createObjectURL(uploadedPDF) : "Please upload a PDF"}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    ),
  };

  return (
    <div className="" style={{ width: "100vw", height: "100vh" }}>
      <div
        className="bg-light d-flex flex-row justify-content-between py-3"
        style={{
          width: "100%",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          height: "100vh",
        }}
      >
        <div
          className="d-flex flex-column justify-content-around justify-content-between"
          style={{ overflow: "hidden", position: "relative" }}
        >
          <select
            className="form-select text-light border-0 w-25"
            onChange={(e) =>
              setSelectedOption((e.target as HTMLSelectElement).value)
            }
            style={{
              position: "absolute",
              zIndex: 10,
              top: "0",
              right: "0",
              backgroundColor: "#21252b",
              marginLeft: "auto",
            }}
          >
            {options.map((type, index) => (
              <option
                key={index}
                value={type}
                className="p-2"
                onChange={(e) => setText((e.target as HTMLSelectElement).value)}
              >
                {type}
              </option>
            ))}
          </select>
          {views[selectedOption]}
          <button className="btn btn-dark mt-2" onClick={handleClick}>
            Get LLM response
          </button>
        </div>
      </div>
    </div>
  );
};

export default Textarea;

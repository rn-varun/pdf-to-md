import { useEffect, useState } from "react";
import { handleSubmission } from "../api";
import OutputTextarea from "./OutputTextarea"

interface TextareaProps {
  formName: string;
  setOutput: (val: string) => void;
  pdfToMdOutput: string;
}

const Textarea = ({ formName, setOutput, pdfToMdOutput }: TextareaProps) => {

  const [text, setText] = useState("")

  const handleClick = async () => {
    const res = await handleSubmission(formName, text);
    setOutput(JSON.stringify(res, null, 2)); // assuming your API call returns string
  };

  useEffect(() => {
    setText(pdfToMdOutput)
  }, [pdfToMdOutput])

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
      <div className="d-flex flex-column justify-content-around justify-content-between">
        <textarea className="form-control" value={pdfToMdOutput} onChange={(e) => {
          setText(e.target.value)
          console.log(text)
        }} style={{
          width: "38vw",
          height: "100vh",
        }}
        >
        </textarea>
        <button className="btn btn-primary mt-2" onClick={handleClick}>Submit</button>
      </div>
    </div>
    </div>
  );
};

export default Textarea;

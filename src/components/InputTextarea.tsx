import { useEffect } from "react";
import { handleSubmission } from "../api";
import OutputTextarea from "./OutputTextarea"

interface TextareaProps {
  formName: string;
  setOutput: (val: string) => void;
}

const Textarea = ({ formName, setOutput }: TextareaProps) => {

  const handleClick = async () => {
    const res = await handleSubmission(formName);
    setOutput(res); // assuming your API call returns string
  };

  return (
    <div
      className="bg-light d-flex flex-row justify-content-between"
      style={{
        width: "100%",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        height: "100vh",
      }}
    >
      <div className="d-flex flex-column justify-content-between">
        <textarea className="form-control" style={{
          width: "38vw",
          height: "100vh",
        }}
        >
        </textarea>
        <button className="btn btn-primary" onClick={handleClick}>Submit</button>
      </div>
    </div>
  );
};

export default Textarea;

import ReactCodeMirror, { oneDark } from "@uiw/react-codemirror";
import { BsDownload } from "react-icons/bs";

interface OutputTextareaProps {
    output: string;
    setOutput: (val: string) => void;
}

const handleDownload = (output_text: string) => {
  if (!output_text) return;
  const blob = new Blob([output_text], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "LLM_response.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};



const OutputTextarea = ({output, setOutput}: OutputTextareaProps) => {
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
      <div className="d-flex flex-column justify-content-between">
      <ReactCodeMirror style={{
          backgroundColor: "#21252b",
          width: "38vw",
          height: "100vh",
          outline: "none",
          boxShadow: "none",
          resize: "none",
          overflow: "auto",

        }} className="form-control" value={output} onChange={(e) => {
          setOutput(e)
          console.log(e)
        }}   theme="dark"
/>
        <button className="btn btn-dark mt-2 btn-dark" style={{}} onClick={() => handleDownload(output)}>Download file</button>
      </div>
    </div>
    </div>
  );
};

export default OutputTextarea;

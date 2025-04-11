import { handleSubmission } from "../api";

interface OutputTextareaProps {
    output: string;
    setOutput: (val: string) => void;
}


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
        <textarea className="form-control" value={output} onChange={(e) => setOutput((e.target as unknown as HTMLSelectElement).value)}
  style={{
          width: "38vw",
          height: "100vh",
        }}
        >
        </textarea>
        <button className="btn btn-primary mt-2" style={{}}>Download file</button>
      </div>
    </div>
    </div>
  );
};

export default OutputTextarea;

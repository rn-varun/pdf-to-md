import { useState } from "react"
import OutputTextarea from "../components/OutputTextarea"
import Sidebar from "../components/Sidebar"
import Textarea from "../components/InputTextarea"

const Home = () => {

  const [output, setOutput] = useState("")
  const [formName, setFormName] = useState("");
  const [pdfToMdOutput, setPdfToMdOutput] = useState("")


  return (
    <div className="d-flex flex-row">
        <Sidebar setFormName={setFormName} setPdfToMdOutput={setPdfToMdOutput}/>
        <Textarea formName={formName} setOutput={setOutput} pdfToMdOutput={pdfToMdOutput}/>
        <OutputTextarea setOutput={setOutput} output={output}/>
    </div>
  )
}

export default Home
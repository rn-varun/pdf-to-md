import { useState } from "react"
import OutputTextarea from "../components/OutputTextarea"
import Sidebar from "../components/Sidebar"
import Textarea from "../components/InputTextarea"

const Home = () => {

  const [output, setOutput] = useState("")
  const [formName, setFormName] = useState("Form W-2");


  return (
    <div className="d-flex flex-row">
        <Sidebar />
        <Textarea formName={formName} setOutput={setOutput} />
        <OutputTextarea output={output} />
    </div>
  )
}

export default Home
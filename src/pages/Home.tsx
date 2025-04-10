import { useState } from "react"
import OutputTextarea from "../components/OutputTextarea"
import Sidebar from "../components/Sidebar"
import Textarea from "../components/InputTextarea"

const Home = () => {

  const [output, setOutput] = useState("")
  const [formName, setFormName] = useState("");


  return (
    <div className="d-flex flex-row">
        <Sidebar setFormName={setFormName}/>
        <Textarea formName={formName} setOutput={setOutput} />
        <OutputTextarea setOutput={setOutput} output={output} />
    </div>
  )
}

export default Home
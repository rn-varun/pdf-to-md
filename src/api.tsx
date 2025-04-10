import axios from "axios";

const BACKEND_URL:string = "http://127.0.0.1:8000/llm-output/"

export const  handleSubmission = async (formName: string, text: string): Promise<string>  => {
    const response = await axios.post(`${BACKEND_URL}${formName}`, {
        formName: formName,
        text: text,
    })
    console.log(formName)
    console.log(response.data)
    return response.data
}
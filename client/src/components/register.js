import React,{useState} from 'react'
import Form from './form'
import api from "../api/configAxios"

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit=async(e)=>{
        e.preventDefault()
        try {
            await api.post("auth/register",{
                username,
                password
            })
            alert("Registartion completed! Now Log in ")
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <Form label={"Register"} username={username} setUsername={setUsername} password={password} setPassword={setPassword} onSubmit={onSubmit} />
  )
}

export default Register
import React,{useState} from 'react'
import Form from './form'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit=async(e)=>{

    }

  return (
    <Form label={"Login"} onSubmit={onSubmit} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
  )
}

export default Login
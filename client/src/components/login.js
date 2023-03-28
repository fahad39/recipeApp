import React,{useState} from 'react'
import {useCookies} from "react-cookie"
import api from "../api/configAxios"
import Form from './form'
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [_, setCookies]=useCookies(["access_token"])
    const navigate=useNavigate()

    const onSubmit=async(e)=>{
      e.preventDefault();
      try {
        const response=await api.post("auth/login",{
          userName:username,
          password
        })
        console.log(response)
        setCookies("access_token",response.data.token)
        window.localStorage.setItem("userID",response.data.userID)
        navigate("/")
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <Form label={"Login"} onSubmit={onSubmit} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
  )
}

export default Login
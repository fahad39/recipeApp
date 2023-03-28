import axios from 'axios'

export default axios.create({
    baseURL: "https://localhost:3001/",
    timeout:5000,
    headers:{
        "Content-Type":"application/json"
    }
})

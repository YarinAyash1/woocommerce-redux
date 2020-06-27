import React, { useState } from 'react'
import { userLogin } from '../../api/wp'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleChangeUserNme = (e) => {
        let { value } = e.target;
        setUsername(value);
    }
    const handleChangePassword = (e) => {
        let { value } = e.target;
        setPassword(value);
    }
    const handleClick = async () => {
        if(username && password){
            let res = await userLogin(username, password)
            console.log(res)
        }
    }
    return(
        <div>
            <form>
                
            <input type="text" placeholder="Enter Username" onChange={handleChangeUserNme} />
            <input type="password" placeholder="Enter Password" onChange={handleChangePassword} />
            <button onClick={handleClick}>Login</button>
            </form>
        </div>
    )
}

export default Login;
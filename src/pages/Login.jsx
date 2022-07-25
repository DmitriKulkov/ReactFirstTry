import React, {useContext, useRef, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [pass, setPass] = useState('')
    const p = useRef()

    const validPassword = (value) => {
        if(value.length < 8){
            p.current.setCustomValidity("Password must be more than 8 symbols")
        }else{
            p.current.setCustomValidity("")
        }
    }

    const login = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem("auth", "true")
    }
    return (
        <div className='App'>
            <h1>Log in page</h1>
            <form onSubmit={login}>
                <MyInput type="email" required placeholder="Enter email"/>
                <MyInput ref={p} type="password" placeholder="Enter password" value={pass} onChange={e=>{
                        setPass(e.target.value)
                        validPassword(pass)
                    }
                }/>
                <MyButton>Enter</MyButton>
            </form>
        </div>
    );
};

export default Login;
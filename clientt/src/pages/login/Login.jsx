import "./login.css";
import {Link} from 'react-router-dom';
import {useContext, useRef} from 'react';
import {Context} from '../../context/Context';
import axios from 'axios';


const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const {dispatch, isFetching} = useContext(Context);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type : "LOGIN_START"});
        try{
            const res = await axios.post("/auth/login",{
                username : userRef.current.value,
                password : passwordRef.current.value,
            });
            dispatch({type : "LOGIN_SUCCESS", payload: res.data});
        }catch(err){
            dispatch({type : "LOGIN_FAILURE"});
        }
    };
    return (
        <div className="login">
            <span className="loginTitle">LOGIN</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input ref={userRef} className="loginInput" type="text" placeholder="Enter Your Username..."/>
                <label>Password</label>
                <input ref={passwordRef} className="loginInput" type="text" placeholder="Enter Your Password..."/>
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">Register</Link>
            </button>
        </div>
    )
}

export default Login;
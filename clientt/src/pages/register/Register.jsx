import "./register.css";
import {Link} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        try{
            const res = await axios.post("/auth/register", {
                username,
                email,
                password,
            })
            res.data && window.location.replace("/login");
        }catch (err){
            setError(true);
        }
    }
    return (
        <div className="register">
            <span className="registerTitle">REGISTER</span>
            <form onSubmit={handleSubmit} className="registerForm">
                <label>Email</label>
                <input onChange={e => setEmail(e.target.value)} className="registerInput" type="text" placeholder="Enter Your Email..."/>
                <label>Username</label>
                <input onChange={e => setUsername(e.target.value)} className="registerInput" type="text" placeholder="Enter Your Username..."/>
                <label>Password</label>
                <input onChange={e => setPassword(e.target.value)} className="registerInput" type="password" placeholder="Enter Your Password..."/>
                <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to="/login">Login</Link>
            </button>
            {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
        </div>
    )
}

export default Register;
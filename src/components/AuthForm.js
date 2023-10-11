import react, {useState} from "react";
import React from "react";
import {authService} from "../fbase";

const inputStyles = {};

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [newAccount, setNewAccount] = useState(true);
    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onChange = (event) =>{
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }
    const onsubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword( email, password);
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword( email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            alert(error.message);
        }
    }

    return (
        <form onSubmit={onsubmit} className="container">
            <input
                name="email"
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={onChange}
                className="authInput"
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={onChange}
                className="authInput"
            />

            <input
                name="submit"
                type="submit"
                value={newAccount ? "Create Account" : "Log In"}
                onClick={onsubmit}
                className="authInput authSubmit"
            />
            {error && <span className="authError">{error}</span>}
            <span className="authSwitch" onClick={toggleAccount}>{newAccount ? "log in " : "Create Account"}</span>
        </form>


    );
}

export default AuthForm;
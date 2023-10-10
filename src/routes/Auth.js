import React, {useState} from "react";
import {authService, firebaseInstance} from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
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

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        const { target : {name}, } = event;
        let provider;
        if(name === "google"){
            // 구글 로그인
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "git"){
            // 깃허브 로그인
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    }

    return (
        <div>
            <form>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />

                <input
                    name="submit"
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"}
                    onClick={onsubmit}
                />

            </form>
            <span onClick={toggleAccount}>{newAccount ? "log in " : "Create Account"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="git"  onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;

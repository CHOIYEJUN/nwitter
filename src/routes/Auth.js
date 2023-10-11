import React, {useState} from "react";
import {authService, firebaseInstance} from "fbase";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {

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
            <div className="authContainer">

            <AuthForm/>

            <div>
                <button name="google" onClick={onSocialClick} className="authBtn">
                    Google 로 로그인
                    <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button name="git"  onClick={onSocialClick} className="authBtn">
                    Github 로 로그인
                    <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
}

export default Auth;

import React from "react";
import { authService } from "fbase";
import {useNavigate} from "react-router-dom";

export default () => {
// react-router-dom 최신버전은 useHistory 대신 useNavigate를 사용한다.
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    }
    return (
        <div>
            <span>Profile</span>

            <button onClick={onLogOutClick}>Log Out</button>
        </div>

    )
};

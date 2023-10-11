import React, {useEffect, useState} from "react";
import {authService, dbService} from "fbase";
import {useNavigate} from "react-router-dom";
import "style/styles.css"

export default ({userObj, refreshUser}) => {
// react-router-dom 최신버전은 useHistory 대신 useNavigate를 사용한다.
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    }
    const getMyNweets = async () => {
        const MyNweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt")
            .get();
        console.log(MyNweets.docs.map((doc) => doc.data()));
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            const checkConfrim = window.confirm("프로필 이름을 "+ newDisplayName +" (으)로 변경하시겠습니까?");

            if(checkConfrim){
                try{
                    await userObj.updateProfile({
                        displayName : newDisplayName,
                    });
                    alert("프로필 업데이트 성공");
                    refreshUser();
                }catch (error) {
                    console.log(error);
                    alert("프로필 업데이트 실패");
                }
            }



        }else {
            alert("프로필 이름이 동일합니다 변경 후 업데이트 해주세요");
        }

    }
    const onChange = (event) => {
        const {target : {value}} = event;
        setNewDisplayName(value);
    }


    useEffect(() => {
        getMyNweets();
    },[]);
    return (
        <div className="container">
            <h4 className="profileH4">프로필</h4>

            <form onSubmit={onSubmit} className="profileForm">
                <input
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                    onChange={onChange}
                    autoFocus
                />
                <input
                    type="submit"
                    value={"프로필 업데이트"}
                    onClick={onSubmit}
                    style={{
                        marginTop: 10,
                    }}
                    className="profileBtn formBtn"
                />
            </form>


            <button className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</button>
        </div>

    )
};

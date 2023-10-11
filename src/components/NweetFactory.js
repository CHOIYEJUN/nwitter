import react, {useEffect, useState} from "react";
import React from "react";
import {dbService, storageService} from "../fbase";
import {v4 as uuidv4} from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({userObj}) => {

    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        if (nweet === "") {
            return;
        }

        event.preventDefault();
        let attachmentUrl = "";

        if(attachment !== ""){
            // uuidv4()는 랜덤한 아이디를 생성해준다.
            const fileRef =  storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            // putString은 스트링을 저장해준다.
            const response =  await fileRef.putString(attachment, "data_url");
            attachmentUrl =  await response.ref.getDownloadURL()
        }

        await dbService.collection("nweets").add({
            text : nweet,
            createdAt: Date.now(),
            creatorId : userObj.uid,
            attachmentUrl : attachmentUrl,
            displayName : userObj.displayName,
        });
        setNweet("");
        setAttachment("");
    }
    const onChange = (event) => {
        console.log("click");
        const {target : {value}} = event;
        setNweet(value);
    }

    const onFileChange = (event) => {
        const {target : {files}} = event;

        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget : {result},
            } = finishedEvent;

            setAttachment(result);
        };
        reader.readAsDataURL(theFile);

    }
    const onClearAttachment = () => setAttachment(null);


    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    type={"text"}
                    placeholder={"트윗을 작성하세요"}
                    maxLength={120}
                    onChange={onChange}
                    value={nweet}
                />
                <input
                    className="factoryInput__arrow"
                    type={"submit"}
                    value={"Nweet"}
                    onClick={onSubmit}
                />

            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
                <input
                    id="attach-file"
                    type={"file"}
                    accept={"image/*"}
                    onChange={onFileChange}
                    style={{
                        opacity: 0,
                    }}
                />

                {attachment
                    &&
                    (
                        <div className="factoryForm__attachment">
                            <img
                                src={attachment}
                                style={{
                                    backgroundImage: attachment,
                                }}
                            >

                            </img>
                            <div className="factoryForm__clear" onClick={onClearAttachment}>
                                <span>Remove</span>
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                        </div>

                    )}

        </form>
    );
}
export default NweetFactory;

import React, {useEffect, useState} from "react";
import {dbService} from "../fbase";
import Nweet from "../components/Nweet";

const Home = ({userObj}) => {

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(() => {

        // onSnapshot은 데이터베이스에 무슨일이 있을 때 알림을 받는다.
        dbService.collection(("nweets")).onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })
            );
            setNweets(nweetArray);

        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text : nweet,
            createdAt: Date.now(),
            creatorId : userObj.uid,
        });
        setNweet("");
    }
    const onChange = (event) => {
        console.log("click");
        const {target : {value}} = event;
        setNweet(value);
    }

    return (
        <div>
            <form>
                <input
                    type={"text"}
                    placeholder={"What's on your mind?"}
                    maxLength={120}
                    onChange={onChange}
                    value={nweet}
                />
                <input
                    type={"submit"}
                    value={"Nweet"}
                    onClick={onSubmit}
                />
            </form>

            <div>
                {nweets.map ((nweets => (
                    <Nweet key={nweets.id} nweetObj={nweets} isOwner={nweets.creatorId === userObj.uid}/>
                    )
                ))}
            </div>
        </div>
    )
}

export default Home;
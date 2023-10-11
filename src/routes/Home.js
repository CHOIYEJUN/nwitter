import React, {useEffect, useState} from "react";
import {dbService, storageService} from "../fbase";
import Nweet from "../components/Nweet";
import {v4 as uuidv4} from "uuid";
import NweetFactory from "../components/NweetFactory";

const Home = ({userObj}) => {

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

    return (
        <div className={"container"}>
            <NweetFactory  userObj={userObj}/>
            <div style={{ marginTop: 30 }}>
                {nweets.map ((nweets => (
                    <Nweet
                        key={nweets.id}
                        nweetObj={nweets}
                        isOwner={nweets.creatorId === userObj.uid}
                    />
                    )
                ))}
            </div>
        </div>
    )
}

export default Home;
import react, {useState} from "react";
import "style/nweetStyle.css";
import {dbService} from "../fbase";
const Nweet = ({nweetObj , isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = () => {
        const cheackDelectConfrim = window.confirm("진짜 지울꺼에요?");
        if(cheackDelectConfrim){
            dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    }

    const onChange = (event) => {
        const {target : {value}} = event;
        setNewNweet(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dbService.doc(`nweets/${nweetObj.id}`).update({
            text : newNweet,
        });
        setEditing(false);
    }
    const toggleEditing = () => setEditing((prev) => !prev);

    return (
        <div className={"nweetUinit"}>
            {editing ?
                <form>
                    <input
                        value={newNweet}
                        required
                        onChange={onChange}
                    />
                    <button onClick={toggleEditing}>취소</button>
                    <button onClick={onSubmit}>수정</button>
                </form>
                :
                <>
                    <h4>{nweetObj.text}</h4>
                </>
                }

            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>삭제</button>
                    <button onClick={toggleEditing}>수정</button>
                </>
            )}

        </div>
    );
}

export default Nweet;
import react, {useState} from "react";
import "style/nweetStyle.css";
import {dbService, storageService} from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
const Nweet = ({nweetObj , isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const cheackDelectConfrim = window.confirm("진짜 지울꺼에요?");
        if(cheackDelectConfrim){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
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
        <div className="nweet">
            {editing ?
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input
                        value={newNweet}
                        required
                        onChange={onChange}
                        autoFocus
                        className="formInput"
                    />
                    <input type="submit" value="Update Nweet" className="formBtn" />
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                </form>
                :
                <>

                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                    <span>작성자 : {nweetObj.displayName}</span>

                </>
                }

            {isOwner && (
                <div className="nweet__actions">
                         <span onClick={onDeleteClick}>
                         <FontAwesomeIcon icon={faTrash} />
                         </span>
                        <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                </div>
            )}

        </div>
    );
}

export default Nweet;
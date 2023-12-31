import {useEffect, useState} from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";


function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(()=>{
        authService.onAuthStateChanged((user) => {
            if(user){
                setIsLoggedIn(true);
                // 로그인 된 유저 변수에 넣어줌
                setUserObj({
                    displayName : user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args)
                });
                if(user.displayName === null){


                }
            }else{
                setIsLoggedIn(false);
            }
            setInit(true);
        })
    }, [])

    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName : user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args)
        });
    }

  return (
    <div>
        {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser}/> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>

    </div>
  );
}

export default App;


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
                setUserObj(user);
            }else{
                setIsLoggedIn(false);
            }
            setInit(true);
        })
    }, [])

  return (
    <div>
        {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>

    </div>
  );
}

export default App;


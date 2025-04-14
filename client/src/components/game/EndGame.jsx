import {useEffect} from "react";
import "./scene.css";
export default function EndGame({password, restartGame}) {
    
    useEffect(()=>{
        window.addEventListener("keydown",type);
        return () => window.removeEventListener("keydown",type);
    },[])

    function type(e) {
        if(e.key == "Enter") restartGame();
    }

    return <div onKeyDown={type} className="last-scene">
            <header className="last-words">
                <h2>It was a {password}</h2>
            </header>
            <div className="restart-game-con"><button className="reset-btn" onClick={restartGame}>Restart</button></div>
        </div>
}

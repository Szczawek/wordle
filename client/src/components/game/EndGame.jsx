import "./scene.css";
export default function EndGame({password, restartGame}) {
    
    return <div className="last-scene">
            <header className="last-words">
                <h2>It was a {password}</h2>
            </header>
            <div className="restart-game-con"><button className="reset-btn" onClick={()=>{restartGame()}}>Restart</button></div>
        </div>
}

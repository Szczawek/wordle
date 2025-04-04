import "./scene.css";
export default function EndGame({password}) {
    
    return <div className="last-scene">
            <header className="last-words">
                <h2>It was a {password}</h2>
            </header>
        </div>
}

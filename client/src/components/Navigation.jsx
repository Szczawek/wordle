import {Outlet,NavLink} from "react-router";
import "./navi.css"
export default function Navigation({offline}) {
    return <>
            <header className="gui">
                <nav className="navigation">
                    <ul className="nav-list">
                        <li className="broker">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className="broker">
                            <NavLink to="/game">Game</NavLink>
                        </li>
                    </ul>
                </nav>
                {offline && <h2 className="warning">Game is offline</h2>}
            </header>
            <Outlet/>
        </>
}

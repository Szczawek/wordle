import {useState, useEffect, Suspense, lazy} from "react";
import {BrowserRouter, Routes,Route} from "react-router";
import Loading from "./components/Loading.jsx";
import "./styles.css";
const PlayBoard = lazy(() =>import("./components/game/PlayBoard.jsx"));
const Home = lazy(()=>import("./components/Home.jsx"));
const Navigation = lazy(()=>import("./components/Navigation.jsx"));

export default function App() {
    const [password, setPassword] = useState("");
    useEffect(() => {
        findRandomWord();
    },[])
    
    async function findRandomWord() {
        try {
            setPassword("hello");
        } catch(err) {
            console.log(err)
        }
    }

    return <div className="app">
            <BrowserRouter>
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route element={<Navigation/>}>
                            <Route index element={<Home/>}/>
                            <Route path="/game" element={<PlayBoard findRandomWord={findRandomWord} password={password}/>}/>
                        </Route>
                     </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
}

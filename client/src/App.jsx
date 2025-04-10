import {useState, useEffect, Suspense, lazy} from "react";
import {BrowserRouter, Routes,Route} from "react-router";
import Loading from "./components/Loading.jsx";
import "./styles.css";
const PlayBoard = lazy(() =>import("./components/game/PlayBoard.jsx"));
const Home = lazy(()=>import("./components/Home.jsx"));
const Navigation = lazy(()=>import("./components/Navigation.jsx"));

const stdStatus = {
    loading:false,
    error:false,
}

const offlineMode = ["elbow","mexic","tacos","state","chrom","hello","earth","right","texas","mouth","paper","tenis","brain","april","cable","knife","black","chair","table","dress","apple"];

export default function App() {
    const [password, setPassword] = useState("");
    const [status,setStatus] = useState(stdStatus);
    useEffect(() => {
        findRandomWord();
    },[])
    
    function updateStatus(name, boolen) {
        setStatus(prev =>({...prev,[name]:boolen}));
    }

    async function findRandomWord() {
        try {
            updateStatus("loading",true);
            const res = await fetch(`${process.env.VITE_API_URL}/password`)
            if(!res.ok) throw res.status;
            const obj = await res.json();
            setPassword(obj);
        } catch(err) {
            const size = offlineMode.length;
            const index = Math.floor(Math.random() * size);
            setPassword(offlineMode[index]);
            updateStatus("error",true);
        } finally {
            updateStatus("loading",false);
        }
    }

    return <div className="app">
            <BrowserRouter>
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route element={<Navigation offline={status.error} />}>
                            <Route index element={<Home/>}/>
                            <Route path="/game" element={<PlayBoard loading={status.loading}findRandomWord={findRandomWord} password={password}/>}/>
                        </Route>
                     </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
}

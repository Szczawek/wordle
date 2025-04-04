import {useState} from "react";
import Table from "./Table.jsx";
import EndGame from "./EndGame.jsx";
import "./game.css"

export default function PlayBoard({password}) {
    const [row,setRow] = useState(0);
    const [complete,setComplete] = useState(false);
    const [status,setStatus] = useState([]);
   
    function increseRow(obj) {
        setRow(prev => prev + 1);
        if(row == 4) return setComplete(true);
        const arr = [];
        for(const [key, value] of Object.entries(obj)) {
            arr.push(value);
        }
        compareLetters(arr)
        const word = arr.join("")
        if(password == word) {
            setComplete(true);
        }
    }
    
    function compareLetters(value) {
        const word = password.split('');
        const inputWord = [...value]
        const obj = {};
        console.log("start");
        for(let i = 0; i < password.length; i++) {
            const wordLetter = word[i];
            const inpLetter = inputWord[i];
            if(wordLetter == inpLetter) {
                obj[i] = "correct";
                continue 
            }
            const condition = password.indexOf(inpLetter);
            if(condition != -1) {
                obj[i] = "include";
                continue 
            }
            obj[i] = "";

        }
        setStatus(prev => [...prev, obj]);
    }

    return <>
        <div className="board">
            {[... new Array(5)].map((_,index)=> {
                return <Table complete={complete} status={status} addRow={increseRow} active={row} key={`column-${index}`} id={index}/>
            })}
        </div>
        {complete && <EndGame password={password}  />}
        </>
}

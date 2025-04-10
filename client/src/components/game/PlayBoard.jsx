import {useState} from "react";
import Table from "./Table.jsx";
import EndGame from "./EndGame.jsx";
import "./game.css"

const std = [... new Array(5)];
export default function PlayBoard({password,loading, findRandomWord}) {
    const [row,setRow] = useState(0);
    const [complete,setComplete] = useState(false);
    const [status,setStatus] = useState([]);
    const [table,setTable] = useState(std);

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

    function restartGame() {
        setComplete(false);
        setRow(0);
        setStatus([]);
        findRandomWord();
    }
    
    function compareLetters(value) {
        const word = password.split('');
        const inputWord = [...value]
        const obj = {};
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

    if(loading) return <div className="waiting"><p className="comunicat">Finding password</p></div>

    return <>
        <div className="board">
            {table.map((_,index)=> {
                return <Table complete={complete} status={status} addRow={increseRow} active={row} key={`column-${index}`} id={index}/>
            })}
        </div>
        {complete && <EndGame restartGame={restartGame} password={password}  />}
        </>
}

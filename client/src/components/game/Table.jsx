import {useState, useEffect, useRef} from "react";

const stdData = {0: '', 1: '', 2: '', 3: '', 4: ''};

export default function Table({status,addRow,id,active, complete}) {
    const [char,setChar] = useState(stdData);
    const [collection, setCollection] = useState(0);
    const activeElement = useRef(null);
    const [tabIsOn, setTabIsOn] = useState(false);
    const [current, setCurrent] = useState(0); 
    
    useEffect(() => {
       if(activeElement.current && !tabIsOn) {
            activeElement.current.focus();
       }
        if(tabIsOn) setTabIsOn(false)
    },[current,active])

    useEffect(() => {
        function clear() {
            setChar(stdData)
            setCollection(0);
            setCurrent(0);
        }
        if(!complete) clear()
    }, [complete])


    function arrowMove(e) {;
        const {value, ariaColIndex} = e.target;
        switch(e.key) {
            case "Backspace":
                if(value == " ") return;
                
                if(current != 0) setCurrent(prev => prev - 1);
                if(value == "") return;
                
                if(collection != 0) setCollection(prev => prev - 1);
                setChar(prev => ({...prev,[ariaColIndex]:""}));
                break;
            case "Tab":
                setTabIsOn(true);
                if(current < 4) setCurrent(prev => prev + 1);
                break;
            case "ArrowLeft":
                if(current <= 0) return;
                setCurrent(prev => prev - 1);
            break;
            case "ArrowRight":
                if(current >=4) return;
                setCurrent(prev => prev + 1);
            break;
        }
    }
    function writeChar(e) {
        const {value,ariaColIndex} = e.target; 
        const name = ariaColIndex;
        if(value == " " || value == "") return;
    
        setChar(prev => ({...prev,[name]:value}));
        // Collection equal 4 and value different that "" is end of word;
        if(collection == 4) {
            const obj = {...char, [name]:value};
            addRow(obj)
        };
        if(current < 4) setCurrent(prev => prev + 1);
        setCollection(prev => prev + 1);
    }

    function movePosition(e) {
        const {ariaColIndex} = e.target
        const num = Number(ariaColIndex);
        // In name is asing index of element;
        setCurrent(num);
    }

    return <div id={`column-${id}`}  className="table">
            {[... new Array(5)].map((_,index) => {
                const name = `${id}-${index}`
                const visClass = !status[id]? "": status[id][index];
                  return <label onKeyDown={arrowMove} onClick={movePosition} ref={id == active && index == current? activeElement: null} className="handler" htmlFor={name} key={name}>
                        <input className={visClass} disabled={id == active && !complete? false:true}  aria-colindex={index} value={char[index]} onChange={writeChar} maxLength="1" id={name}  />
                    </label>
            })}
        </div>
}

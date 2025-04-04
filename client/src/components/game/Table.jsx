import {useState, useEffect, useRef} from "react";

const stdData = {0: '', 1: '', 2: '', 3: '', 4: ''};

export default function Table({status,addRow,id,active, complete}) {
    const [char,setChar] = useState(stdData);
    const [collection, setCollection] = useState(0);
    const activeElement = useRef(null);
    const [current, setCurrent] = useState(0); 
    
    useEffect(() => {
       if(activeElement.current) {
            activeElement.current.focus();
       }
    },[current,active])

    function writeChar(e) {
        const {value,ariaColIndex} = e.target; 
        const name = ariaColIndex;
        setChar(prev => ({...prev,[name]:value}));
        if(value === "") {
            setCollection(prev => prev - 1);
            if(current != 0) setCurrent(prev => prev -1)
            return;
        }
        // Collection equal 4 and value different that "" is end of word;
        if(collection == 4) {
            const obj = {...char, [name]:value};
            addRow(obj)
        };
        setCurrent(prev => prev + 1)
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
                  return <label onClick={movePosition} ref={id == active && index == current? activeElement: null} className="handler" htmlFor={name} key={name}>
                        <input className={visClass} disabled={id == active && !complete? false:true}  aria-colindex={index} value={char[index]} onChange={writeChar} maxLength="1" id={name}  />
                    </label>
            })}
        </div>
}

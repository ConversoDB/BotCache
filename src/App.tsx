
import './App.css'
import { useEffect  , useRef , useState} from "react";
import {useChromeStorage} from "./Hooks/useChromeStorage.ts";

function App() {

    const modeValue  = useRef("")

    useEffect ( () => {
        (async () => {
            // modeValue = await get("Mode");
            modeValue.current =await get("Mode");
        })()
    } , [] );

    const [selectdValue, setSelectedValue] = useState<string>(modeValue.current);
    const { set,get } = useChromeStorage()

    async function handleSelect(event: any) {
        event.preventDefault()
        await set("Mode", selectdValue);
        setSelectedValue(selectdValue)
    }



    // function highestZindex(){
    //     const elements = Array.from(document.querySelectorAll('*'))
    //     // let highest = 0;
    //     const Z_INDEX:number[] = []; // Maximum z-index value
    //
    //     function collectZIndexes(elements: Element[]) {
    //
    //         elements?.forEach((element) => {
    //             const zIndex = window.getComputedStyle(element, null).getPropertyValue("z-index");
    //             if (zIndex !== 'auto' && zIndex !== undefined) {
    //                 Z_INDEX.push(Number(zIndex));
    //                 // highest = parseInt(zIndex);
    //             }
    //         });
    //     }
    //
    //     collectZIndexes(elements);
    //
    //     const shadowRoots = elements.filter(el => el.shadowRoot);
    //
    //     for (const root of shadowRoots) {
    //         if (root.shadowRoot === null) {
    //             continue;
    //         }
    //
    //         collectZIndexes(Array.from(root.shadowRoot.querySelectorAll('*')));
    //     }
    //
    //     setSubmit(Z_INDEX.length === 0 ? 0 : Math.max(...Z_INDEX))
    //     // return highest;
    // }

    // const z_index = highestZindex()

    // const My_Element = document.getElementById('english_vocabulary_root') ;
    // if (My_Element) {
    //     My_Element.style.zIndex = (highestZindex() + 1).toString();
    //
    // }


  return (
      <>
        <div >
            <fieldset style={{display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "10px"}}>
                <legend>Choose an option:</legend>
                <label>
                    <input checked={selectdValue==="storage" } onChange={()=>setSelectedValue("storage")} type="radio" name="option" value="storage" />
                    Storage
                </label>
                <label>
                    <input checked={selectdValue==="chatBot" } onChange={()=>setSelectedValue("chatBot")} type="radio" name="option" value="chatBot" />
                    ChatBot
                </label>
                <label>
                    <input checked={selectdValue==="disable" } onChange={()=>setSelectedValue("disable")} type="radio" name="option" value="disable" />
                    Disable
                </label>
                {/*<label>*/}
                {/*    <input checked={selectdValue==="dual" || submit === "dual"} onChange={()=>setSelectedValue("dual")} type="radio" name="option" value="dual" />*/}
                {/*    Dual*/}
                {/*</label>*/}
            </fieldset>
            <button type="submit" onClick={(event)=>handleSelect(event)}>Submit</button>

        </div>
          <h4>{selectdValue}</h4>
      </>
  )
}

export default App

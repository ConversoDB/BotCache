
import './App.css'
import {useEffect , useRef , useState} from "react";
import {useChromeStorage} from "./Hooks/useChromeStorage.ts";

function App() {

    const modeValue  = useRef("")
    const { set,get, remove } = useChromeStorage()


    console.log(modeValue)

    const [selectdValue, setSelectedValue] = useState<string>("");
    const [email, setEmail] = useState<string>( "");

    async function handleSelect(event: any) {
        event.preventDefault()
        set("Mode", selectdValue);
        setSelectedValue(selectdValue)
        setEmail(email)
        set("email", email);
    }

    useEffect ( () => {
        (async () => {
            // modeValue = await get("Mode");
            setSelectedValue(await get("Mode"))
        })()
    } , [] );



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
            <form style={{display: "flex", flexDirection: "column", alignItems: "start"}} onSubmit={handleSelect}>
                <fieldset style={{display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "10px", width : "100%"}}>
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
                <label style={{ marginBottom : "5px"}}>Email address</label>
                <div style={{display: "flex", flexDirection: "row", alignItems: "baseline", width : "100%", gap : "5px"}}>
                    <input required={selectdValue==="storage"} style={{width : "100%", marginBottom: "10px"}} type="email" value={email} onChange={(event)=>setEmail(event.target.value)} />
                    <button onClick={()=>{remove("email")}} style={{backgroundColor : "red", padding : "5px"}}>Remove</button>
                </div>
                <button style={{backgroundColor : "green"}} type="submit" >Submit</button>
            </form>


        </div>
          {/*<h4>{selectdValue}</h4>*/}
      </>
  )
}

export default App

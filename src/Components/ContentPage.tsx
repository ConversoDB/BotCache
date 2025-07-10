// import "bootstrap/dist/css/bootstrap.css"
import {type FormEvent , useEffect  , useState} from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {chatBot , generateAiResponse} from "../Ai-Setup/generateAiResponse.ts";
import {TbMessageChatbotFilled} from "react-icons/tb";
import styles from "../Style/ContentPage.module.css"
import TextareaAutosize from "react-textarea-autosize";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {useChromeStorage} from "../Hooks/useChromeStorage.ts";

function getContent(){
    return window.getSelection()?.toString().trim()
}


export function ContentPage(){


    const [mode, setMode] = useState<string >("disable");
    const {get} = useChromeStorage()

    useEffect ( () => {
        (async () => {
            const storedMode = await get("Mode");
            setMode(storedMode ?? "disable");
        })()
    } , [] );

    const [content, setContnent] = useState<string | undefined>(undefined);


    console.log("Mode: " + mode);

    document.body.addEventListener('mouseup', ()=>{setContnent(getContent())});
    document.body.addEventListener('dblclick', ()=>{setContnent(getContent())});

    useEffect(() => {
        // console.log(mode)
        if(!content) return

        if(mode === "storage") {
            generateAiResponse({ contents: content }).then(response => {
                console.log(response && response?.meaning);
            });
            console.log("Storing content: ", content);
        }

    },[content])

    const [popupVisible, setPopupVisible] = useState(false);

    function togglePopup(){
        setPopupVisible(!popupVisible);
    }

    if(mode === "disable") return

    return (

        <>
            { mode != "storage" &&
                <div className={ styles.mainDiv }
                // className="d-flex position-fixed flex-column justify-content-end align-items-center h-screen z-3 end-0 bottom-0"
                >
                    <button className={ styles.button } style={ { borderRadius : "10px" , zIndex : "2147483647" } }
                            onClick={ () => togglePopup () }>
                        <TbMessageChatbotFilled size={ 22 }/>
                    </button>
                    { popupVisible && <Popup textcontent={ content }/> /* Render the Popup component if popupVisible is true */

                    }
                    {/*<button onClick={()=>getMode()}>getMode</button>*/}
                </div>


            }
        </>
    );
}


export type Content = { role: "user" | "model", parts: any[] };

function Popup({ textcontent } : { textcontent : any } )
{

    const [history, setHistory] = useState<Content[]>([])

    // const historyArray : Content[] = []

    console.log("textcontent : " +textcontent)
    
    const [value, setValue] = useState<any>(textcontent);
    const [result, setResult] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    function handleChange(event : any){
        setValue(event.target.value);
    }

    async function handleClick(event : FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        chatBot( {contents : value , history: history as Content[]} )
            .then(response => {

                // historyArray.push({role : 'user' , parts : parts.push(value ? value : textcontent)})
                // historyArray.push({role : 'model' , parts : [...response]})
                setResult ( response )
                const userMEssage : Content[] = [{ role : 'user' , parts : [{text : value }] },{ role : 'model' , parts : [{text : response }] }]
                setHistory(prevState=>[ ...prevState, ...userMEssage])
                setLoading(false)
                setValue("")
            })
            .catch(error => console.error(error));
    }

    console.log(result);
    console.log(" : " + JSON.stringify(history, null, 2) );
    
    return (
        <div style={{zIndex : "2147483630"}} className={styles.popup}>
            {loading &&
                    <DotLottieReact
                        src="https://lottie.host/017dda67-503d-4bfa-951b-9cad8c8f2605/nEwkfoGZDh.lottie"
                        loop
                        autoplay
                    />
            }

            {history?.map(item=>(
                <div>
                    {item.role === 'user' ?
                        <div className={styles.queryStyle} style={{whiteSpace : 'pre-line'}}>
                            <pre>{item.parts[0].text}</pre>
                        </div> :
                        <div className={styles.resultDiv} style={{ whiteSpace : 'pre-line'}}>
                            <h5>Response:</h5>
                            <pre >{item.parts[0].text}</pre>
                        </div>
                    }
                </div>
            ))}

            <div className={styles.formContainer} >

                <form onSubmit={(event)=>handleClick(event)} className={styles.form}>

                    <div className={styles.formGroup}>
                        <TextareaAutosize onChange={(event)=>{handleChange(event)}} value={value} className={styles.textarea} placeholder="type here..."/>
                        {/*<Form.Control  className="pe-4 p-2 overflow-visible text-wrap" as="textarea"  />*/}
                        <button className={styles.popup_button} type="submit">
                            Ask AI
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
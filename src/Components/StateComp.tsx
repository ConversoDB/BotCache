import type {ReactNode} from "react";
import styles from "../Style/ContentPage.module.css";

interface stateProp  {
    error? : any,
    children? : ReactNode,
}

export function StateComp({ error, children } : stateProp) {

    if(error) return (
        <span className={styles.popup} style={{color : "red"}}>{error || "Some Error Occured"}</span>
    )

    return (
        <>
            {children}
        </>
    );
}


import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import {ContentPage} from "./Components/ContentPage.tsx";

const root = document.createElement("div")
root.id = "english_vocabulary_root"
document.body.append(root)
document.body.style.zIndex = "2147483646"

createRoot(root).render(
    <StrictMode>
        <ContentPage/>
    </StrictMode>
)
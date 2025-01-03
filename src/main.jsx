import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App'
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index";

createRoot(document.getElementById('root')).render(
    <DevSupport ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}>
        <StrictMode>
            <App />
        </StrictMode>
    </DevSupport>,
)

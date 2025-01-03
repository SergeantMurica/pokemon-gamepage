import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
>
    <App/>
</DevSupport>);

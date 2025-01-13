import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
        <App/>
    </DevSupport>);
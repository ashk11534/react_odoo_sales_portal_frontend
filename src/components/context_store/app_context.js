import { createContext } from "react";

const AppContext = createContext({
    reRenderHomePage: false,
    setReRenderHomePage: () => {}
})

export {AppContext};
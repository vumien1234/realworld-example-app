import { createContext, useState } from "react";
const DarkLightContext = createContext()
function DarkLightProvider({children}) {
    const [darkLight,setDarkLight] = useState('light')
    const value = {
        darkLight,
        setDarkLight,
    }
    return (
        <DarkLightContext.Provider value={value}>
            {children}
        </DarkLightContext.Provider>
    );
}

export {DarkLightProvider,DarkLightContext} ;
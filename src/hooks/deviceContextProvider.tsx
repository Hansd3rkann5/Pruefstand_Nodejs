import React, {  useState } from "react";
import { Comp_Konfig, SingleConfig } from "./types";
import { DeviceContext } from "./deviceContext";



export const DeviceContextProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {

    const [testnum, setTestnum] = useState(1)
    const [testcombinations, setTestcombinations] = useState<SingleConfig[]>([])
    const [checkdone, setCheckdone] = useState(false)
    const [checkifconfig, setCheckifconfig] = useState(false)
    const [konfig, setKonfig] = useState<Comp_Konfig>()
    const [checkifauto, setCheckifauto] = useState(false)
    const [odds, setOdds] = useState<string[]>([])

    return (<DeviceContext.Provider value= {{ 
        testnum, setTestnum,
        testcombinations, setTestcombinations,
        checkdone, setCheckdone,
        checkifconfig, setCheckifconfig,
        konfig, setKonfig,
        checkifauto, setCheckifauto,
        odds, setOdds,
    } } > { children } </DeviceContext.Provider> )
}
import React, { useState } from "react";
import { Comp_Konfig, SingleConfig } from "./types";
import { DeviceContext } from "./deviceContext";



export const DeviceContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [testnum, setTestnum] = useState(1);
    const [konfigquantity, setKonfigQuantity] = useState(1);
    const [popup, setPopup] = useState(false)
    const [first, setFirst] = useState(true)
    const [running, setRunning] = useState(false)
    const [testcombinations, setTestcombinations] = useState<Partial<SingleConfig>[]>([])
    const [checkdone, setCheckdone] = useState(false)
    const [checkifconfig, setCheckifconfig] = useState(false)
    const [konfig, setKonfig] = useState<Comp_Konfig>()
    const [checkifauto, setCheckifauto] = useState(false)
    const [odds, setOdds] = useState<string[]>([])

    return (<DeviceContext.Provider value={{
        testnum, setTestnum,
        konfigquantity, setKonfigQuantity,
        popup, setPopup,
        first, setFirst,
        running, setRunning,
        testcombinations, setTestcombinations,
        checkdone, setCheckdone,
        checkifconfig, setCheckifconfig,
        konfig, setKonfig,
        checkifauto, setCheckifauto,
        odds, setOdds,
    }} > {children} </DeviceContext.Provider>)
}
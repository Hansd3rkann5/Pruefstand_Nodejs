import { useNavigate } from "react-router"
import { useMyWebsocket } from "../hooks/websocket";
import { Popup } from "../components/Popup"
import { useDeviceContext } from "../hooks/useDeviceContext";
import { useState } from "react";

export function Konfig_Manu() {
    const navigate = useNavigate();
    const { sendMessage, checkifauto } = useMyWebsocket();
    const { setPopup, first, setFirst } = useDeviceContext();

    if (first) {
        checkifauto ? sendMessage(JSON.stringify({ type: "auto" })) : sendMessage(JSON.stringify({ type: "manuell" }))
        setFirst(false)
        console.log(first)
    }

    function konfig() {
        sendMessage(JSON.stringify({ type: "konfig" }))
        navigate("/konfig_drop")
    }

    function manu() {
        sendMessage(JSON.stringify({ type: "manuell_comp" }))
        navigate("/manu")
    }

    return <>
        <div className="window" id="window" onClick={() => setPopup(false)}>
            <div id="konfig">
                <div onClick={konfig} className="button"><span>Test<br />über<br />Konfig-File</span></div>
            </div>
            <hr id="sep" />
            <div id="manuell">
                <div onClick={manu} className="button"><span>Manuelle<br />Komponenten<br />Auswahl</span></div>
            </div>
        </div>
    </>
}
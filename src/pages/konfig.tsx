import { useCallback, useState } from "react";
import { useNavigate } from "react-router"
import { useMyWebsocket } from "../hooks/websocket";

export function Konfig() {
    const navigate = useNavigate();
    const { sendMessage } = useMyWebsocket();

    const auto = useCallback(() => {
        sendMessage(JSON.stringify({ type: "auto"}))
        navigate("/drop")
    }, [ navigate, sendMessage])

    function manuell() {
        sendMessage(JSON.stringify({ type: "manuell" }))
        navigate("/drop")
    }

    return <>
        <div className="window" id="window">
            <div id="konfig">
                <div onClick={auto} className="button" id="auto_test">Automatisierter<br />Test</div>
            </div>
            <hr id="sep" />
            <div id="manuell">
                <div onClick={manuell} className="button">Manuelles<br />durchlaufen<br />der Kombinatoriken</div>
            </div>
        </div>
    </>
}
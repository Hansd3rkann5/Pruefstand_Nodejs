import { useCallback } from "react";
import { useNavigate } from "react-router"
import { useMyWebsocket } from "../hooks/websocket";
import { useDeviceContext } from "../hooks/useDeviceContext";

export function Home() {
    const navigate = useNavigate();
    const { sendMessage, setCheckifauto } = useMyWebsocket();
    const { first } = useDeviceContext();

    const auto = useCallback(() => {
        if (!first) sendMessage(JSON.stringify({ type: "auto" }))
        navigate("/konfig_manu")
        setCheckifauto(true)
    }, [first, sendMessage, navigate, setCheckifauto])

    const manuell = useCallback(() => {
        if (!first) sendMessage(JSON.stringify({ type: "manuell" }))
        navigate("/konfig_manu")
    }, [first, sendMessage, navigate])

    return <>
        <div className="window" id="window">
            <div id="konfig">
                <div onClick={auto} className="button" id="auto_test"><span>Automatisierter<br />Test</span></div>
            </div>
            <hr id="sep" />
            <div id="manuell">
                <div onClick={manuell} className="button"><span>Manuelles<br />durchlaufen<br />der Kombinationen</span></div>
            </div>
        </div>
    </>
}
import { useNavigate } from "react-router"
import { useMyWebsocket } from "../hooks/websocket";
import { useDeviceContext } from "../hooks/useDeviceContext";
import { useCallback, useEffect } from "react";

export function Konfig_Manu() {
    const navigate = useNavigate();
    const { sendMessage, checkifauto } = useMyWebsocket();
    const { setPopup, first, setFirst } = useDeviceContext();

    useEffect(() => {
        if (first) {
            if (checkifauto) {
                sendMessage(JSON.stringify({ type: "auto" }))
            }
            else { sendMessage(JSON.stringify({ type: "manuell" })) }
            setFirst(false)
        }
    }, [first, setFirst, sendMessage, checkifauto])

    const konfig = useCallback(() => {
        sendMessage(JSON.stringify({ type: "konfig" }))
        navigate("/konfig_drop")
    }, [sendMessage, navigate])

    const manu = useCallback(() => {
        sendMessage(JSON.stringify({ type: "manuell_comp" }))
        navigate("/manu")
    }, [sendMessage, navigate])

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
import { useNavigate } from "react-router"
import { useMyWebsocket } from "../hooks/websocket";
import { Popup } from "../components/Popup"
import { useDeviceContext } from "../hooks/useDeviceContext";

export function Home() {
    const navigate = useNavigate();
    const { sendMessage } = useMyWebsocket();
    const { popup, setPopup } = useDeviceContext();

    function konfig() {
        sendMessage(JSON.stringify({ type: "konfig" }))
        navigate("/konfig")
        //navigate("/drop")
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
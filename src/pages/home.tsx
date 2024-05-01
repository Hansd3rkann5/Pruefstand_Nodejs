import { useNavigate } from "react-router"
import { useMyWebsocket } from "../hooks/websocket";

export function Home() {
    const navigate = useNavigate();
    const { sendMessage } = useMyWebsocket();

    function konfig() {
        sendMessage(JSON.stringify({ type: "konfig" }))
        navigate("/konfig")
    }

    function manu() {
        sendMessage(JSON.stringify({ type: "manuell_comp" }))
        navigate("/manu")
    }

    return <>
        <div className="window" id="window">
            <div id="konfig">
                <div onClick={konfig} className="button">Test<br />über<br />Konfig-File</div>
            </div>
            <hr id="sep" />
            <div id="manuell">
                <div onClick={manu} className="button">Manuelle<br />Komponenten<br />Auswahl</div>
            </div>
        </div>
    </>
}
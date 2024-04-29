import { useCallback, useState } from "react";
import { MultiSelectPopup } from "../components/MultiSelectPopUp";
import { useMyWebsocket } from "../hooks/websocket";
import { useNavigate } from "react-router"


export function Manu() {

    const [activeMotor, setActiveMotor] = useState<number | null>()
    const [activeDisp, setActiveDisp] = useState<number | null>()
    const [activeSD, setActiveSD] = useState<number | null>()
    const [activeBat, setActiveBat] = useState<number | null>()
    const [activeExt, setActiveExt] = useState<number | null>()
    const [activeChar, setActiveChar] = useState<number | null>()
    const checkAll = activeMotor !== undefined && activeDisp !== undefined && activeSD !== undefined && activeBat !== undefined && activeExt !== undefined && activeChar !== undefined
    const { sendMessage, konfig } = useMyWebsocket();
    const navigate = useNavigate();

    function send(id: number | null, type: string) {
        sendMessage(JSON.stringify({ type: type, id: id==null?null:id }))
    }

    function set_konfig () {
        if(checkAll) {
            sendMessage(JSON.stringify({ type: "set_konfig"}))
            navigate("/running")
        }
    }

    return <>
        <div className="window manuell" id="window">
            <div>
                <h2 id="bitte" >Bitte Wähle die jeweilige Komponente</h2>
            </div>
            <div className="wrapper">
                <div className="selector_2">
                    <MultiSelectPopup type="Motor" active={activeMotor} names={konfig?.Motor.map(m => m.name)} onClick={(id, type) => { setActiveMotor(id); send(id, type)}} />
                    <MultiSelectPopup type="Display" active={activeDisp} names={konfig?.Display.map(m => m.name)} onClick={(id, type) => { setActiveDisp(id); send(id, type)}} />
                </div>
                <div className="selector_2">
                    <MultiSelectPopup type="Battery" active={activeBat} names={konfig?.Battery.map(m => m.name)} onClick={(id, type) => { setActiveBat(id); send(id, type)}} />
                    <MultiSelectPopup required={false} type="Charger" active={activeChar} names={konfig?.Charger.map(m => m.name)} onClick={(id, type) => { setActiveChar(id); send(id, type)}} />
                </div>
                <div className="selector_2">
                    <MultiSelectPopup required={false} type="Range EXT" active={activeExt} names={konfig?.["Range EXT"].map(m => m.name)} onClick={(id, type) => { setActiveExt(id); send(id, type)}} />
                    <MultiSelectPopup required={false} type="Service Dongle" active={activeSD} names={konfig?.["Service Dongle"].map(m => m.name)} onClick={(id, type) => { setActiveSD(id); send(id, type)}} />
                    {/* Innerhalb Bat Abfrage für 2, ob 
                    Service Dongle, Range Extender 
                    */}
                </div>
            </div>
            <div className="start_wrapper">
                <button className={"start " + (checkAll ? "allow " : "not_allow ")} onClick={set_konfig} id="start">Test starten</button>
            </div>
        </div>
    </>
}
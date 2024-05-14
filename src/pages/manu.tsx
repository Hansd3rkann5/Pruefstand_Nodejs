import { useState, useEffect } from "react";
import { MultiSelectPopup } from "../components/MultiSelectPopUp";
import { useMyWebsocket } from "../hooks/websocket";
import Slider from '@mui/material/Slider';
import { useNavigate } from "react-router"
import { Combination, SingleConfig } from "../hooks/types";



function is_all_checked(current_comb: Partial<Combination>) {
    return current_comb.Motor !== undefined && current_comb.Display !== undefined && current_comb.Battery !== undefined && current_comb.Charger !== undefined && current_comb["Range EXT"] !== undefined && current_comb["Service Dongle"] !== undefined
}

export function Manu() {

    const { sendMessage, konfig, konfigquantity, setKonfigQuantity } = useMyWebsocket();
    const navigate = useNavigate();
    const handleChange = (event: Event) => { setKonfigQuantity((event.target as any)?.value == 0 ? 1 : (event.target as any)?.value) }
    const [combinations, setCombinations] = useState<Partial<Combination>[]>([])
    const current_comb = combinations[konfigquantity - 1] ?? {}
    const current_checked = is_all_checked(current_comb)
    const all_checked = combinations.length > 0 && combinations.every(c => is_all_checked(c))

    function send(id: number | null, type: string) {
        sendMessage(JSON.stringify({ type: type, id: id == null ? null : id }))
    }

    function set_combinations() {
        if (all_checked) {
            sendMessage(JSON.stringify({ type: "set_combinations", comb: combinations }))
            navigate("/show_konfig")
        }
    }

    function set_combination(id: number | null, type: string) {
        const _combinations = [...combinations]
        if (_combinations.length < konfigquantity) {
            _combinations[konfigquantity - 1] = {}
        }
        _combinations[konfigquantity - 1][type as "Display"] = id
        setCombinations(_combinations)
    }


    return <>
        <div className="window picker">
            <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ position: 'absolute', top: '0', marginLeft: '2.6vw', marginTop: '27px' }}>Anzahl<br />Konfigs</h2>
                <Slider style={{ marginTop: '12px', marginLeft: '4.4vw', marginBottom: '3vh', height: '39%', position: 'absolute', zIndex: 1, transform: 'scale(1.6)' }}
                    orientation="vertical"
                    aria-label="Custom marks"
                    value={konfigquantity}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    marks={Array(combinations.length).fill(0).map((_, i) => ({ value: i + 1, label: i + 1 }))}
                    min={combinations.length <= 1 ? 0 : 1}
                    max={Math.max(combinations.length, 1)}
                    onChange={handleChange}
                    track={false}
                    disabled={combinations.length <= 1 ? true : false}
                //disabled={(combinations.length <= 1 ? true : false)}
                />
            </div>
            <div className="window manuell" id="window">
                <div>
                    <h2 >Bitte Wähle die jeweilige Komponente</h2>
                </div>
                <div className="wrapper">
                    <div className="selector_2">
                        <MultiSelectPopup type="Motor" active={current_comb.Motor} names={konfig?.Motor.map(m => m.name)} onClick={(id, type) => { set_combination(id, type) }} />
                        <MultiSelectPopup type="Display" active={current_comb.Display} names={konfig?.Display.map(m => m.name)} onClick={(id, type) => { set_combination(id, type) }} />
                    </div>
                    <div className="selector_2">
                        <MultiSelectPopup type="Battery" active={current_comb.Battery} names={konfig?.Battery.map(m => m.name)} onClick={(id, type) => { set_combination(id, type) }} />
                        <MultiSelectPopup required={false} type="Charger" active={current_comb.Charger} names={konfig?.Charger.map(m => m.name)} onClick={(id, type) => { set_combination(id, type) }} />
                    </div>
                    <div className="selector_2">
                        <MultiSelectPopup required={false} type="Range EXT" active={current_comb["Range EXT"]} names={konfig?.["Range EXT"].map(m => m.name)} onClick={(id, type) => { set_combination(id, type) }} />
                        <MultiSelectPopup required={false} type="Service Dongle" active={current_comb["Service Dongle"]} names={konfig?.["Service Dongle"].map(m => m.name)} onClick={(id, type) => { set_combination(id, type) }} />
                    </div>
                </div>
                <div className="start_wrapper">
                    <button
                        style={{ marginLeft: '3vw' }}
                        className={"start " + (all_checked ? "allow " : "not_allow ")} id="start"
                        onClick={() => (all_checked ? set_combinations() : undefined)}>Test starten</button>
                    <button
                        style={{ marginRight: '3vw' }}
                        className={"start " + (current_checked ? "allow " : "not_allow ")} id="next"
                        onClick={() => (current_checked ? setKonfigQuantity(konfigquantity + 1) : undefined)}>Nächste Konfiguration</button>
                </div>
            </div>
        </div>
    </>
}
import { Outlet, useLocation, useNavigate } from "react-router"
import { useMyWebsocket } from "./hooks/websocket";
import { Popup } from "./components/Popup"
import Logo from "../public/assets/Logo.svg?react"
import House from "../public/assets/house.svg?react"
import Back from "../public/assets/back.svg?react"
import Settings from "../public/assets/settings.svg?react"
import { useCallback, useState } from "react";
import { useDeviceContext } from "./hooks/useDeviceContext";
import { ReadyState } from "react-use-websocket";

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { sendMessage, readyState } = useMyWebsocket();
    const [buttonpopup, setButtonPopup] = useState(false);
    const { setPopup } = useDeviceContext();

    const home = useCallback(() => {
        sendMessage(JSON.stringify({ type: "home" }))
        navigate("/")
    }, [sendMessage, navigate])

    const back = useCallback(() => {
        sendMessage(JSON.stringify({ type: "back" }))
        navigate(-1)
    }, [sendMessage, navigate])

    return <>
        <header onClick={() => setPopup(false)}>{readyState !== ReadyState.OPEN && readyState !== ReadyState.CONNECTING && <div className="con_error">connecting to server...</div>}
            <House id="home" onClick={(location.pathname === "/" || location.pathname === "/show_konfig" ? undefined : home)}
                className={"button_header left " + (location.pathname === "/" || location.pathname === "/show_konfig" ? "home" : "")} />
            <Logo id="tq" className="img" onClick={(location.pathname === "/show_konfig" ? home : undefined)} />
            <Back id="back" onClick={(location.pathname === "/" || location.pathname === "/results" || location.pathname === "/show_konfig" ? undefined : back)}
                className={"button_header right " + (location.pathname === "/" || location.pathname === "/results" || location.pathname === "/show_konfig" ? "home" : "")} />
            <Settings id="gear" className={"button_header gear" + (location.pathname === "/" ? "" : " home")} onClick={(location.pathname === "/" ? () => setButtonPopup(true) : undefined)}>
            </Settings>
            <Popup trigger={buttonpopup} setTrigger={setButtonPopup}>
            </Popup>
        </header>
        <Outlet />
    </>
}


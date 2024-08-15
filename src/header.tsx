import { Outlet, useLocation, useNavigate } from "react-router"
import { useMyWebsocket } from "./hooks/websocket";
import { Popup } from "./components/Popup"
import Logo from "../public/assets/Logo.svg?react"
import House from "../public/assets/house.svg?react"
import Back from "../public/assets/back.svg?react"
import Settings from "../public/assets/settings.svg?react"
import YAML from 'yaml'
import { useEffect, useState } from "react";
import { useDeviceContext } from "./hooks/useDeviceContext";

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { running, konfig, sendMessage } = useMyWebsocket();
    const [buttonpopup, setButtonPopup] = useState(false);
    const { popup, setPopup } = useDeviceContext();


    // useEffect(() => {
    //     if (location.pathname === "/") {
    //         sendMessage(JSON.stringify({ type: "home" }))
    //     }
    // }, [location.pathname])

    function home() {
        navigate("/")
        sendMessage(JSON.stringify({ type: "home" }))
    }

    function back() {
        navigate(-1)
        sendMessage(JSON.stringify({ type: "back" }))
    }

    return <>
        <header onClick={() => setPopup(false)}>
            <House id="home" onClick={(location.pathname === "/" || location.pathname === "/show_konfig" ? undefined : home)}
                className={"button_header left " + (location.pathname === "/" || location.pathname === "/show_konfig" ? "home" : "")} />
            <Logo id="tq" className="img" onClick={(location.pathname === "/show_konfig" ? home : undefined)} />
            <Back id="back" onClick={(location.pathname === "/" || location.pathname === "/results" || location.pathname === "/show_konfig" ? undefined : back)}
                className={"button_header right " + (location.pathname === "/" || location.pathname === "/results" || location.pathname === "/show_konfig" ? "home" : "")} />
            <Settings id="gear" className={"button_header gear" + (location.pathname === "/" ? "" : " home")} onClick={(location.pathname === "/" ? () => setButtonPopup(true) : undefined)}>
            </Settings>
            {/* <img src={"../public/assets/c.png"} id="gear" className={"gear" + (location.pathname === "/" ? "" : " home")} onClick={(location.pathname === "/" ? () => setButtonPopup(true) : undefined)}> */}
            {/* </img> */}
            <Popup trigger={buttonpopup} setTrigger={setButtonPopup}>
            </Popup>
        </header>
        <Outlet />
    </>
}


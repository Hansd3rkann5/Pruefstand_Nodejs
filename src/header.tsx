import { Outlet, useLocation, useNavigate } from "react-router"
import { useMyWebsocket } from "./hooks/websocket";
import Logo from "../public/assets/Logo.svg?react"
import House from "../public/assets/house.svg?react"
import Back from "../public/assets/back.svg?react"
import Gear from "../public/assets/gear.svg?react"

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { running, konfig, sendMessage } = useMyWebsocket();


    function home() {
        navigate("/")
        sendMessage(JSON.stringify({ type: "home" }))
    }

    function back() {
        navigate(-1)
    }

    function get_konfig() {
        filehandler
    }

    return <>
        <header>
            <House id="home" onClick={(location.pathname === "/" || location.pathname === "/show_konfig" ? undefined : home)}
                className={"button_header left " + (location.pathname === "/" || location.pathname === "/show_konfig" ? "home" : "")} />
            <Logo id="tq" className="img" />
            <Back id="back" onClick={(location.pathname === "/" || location.pathname === "/results" || location.pathname === "/show_konfig" ? undefined : back)}
                className={"button_header right " + (location.pathname === "/" || location.pathname === "/results" || location.pathname === "/show_konfig" ? "home" : "")} />
            <Gear id="gear" className={"button_header gear" + (location.pathname === "/" ? "" : " home")} onClick={(location.pathname === "/" ? get_konfig : undefined)}></Gear>
        </header>
        <Outlet />
    </>
}


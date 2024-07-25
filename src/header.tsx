import { Outlet, useLocation, useNavigate } from "react-router"
import { useMyWebsocket } from "./hooks/websocket";
import Logo from "../public/assets/Logo.svg?react"
import House from "../public/assets/house.svg?react"
import Back from "../public/assets/back.svg?react"

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { running, sendMessage } = useMyWebsocket();


    function home() {
        navigate("/")
        sendMessage(JSON.stringify({ type: "home" }))
    }

    function back() {
        navigate(-1)
    }

    return <>
        <header>
            <House id="home" onClick={(location.pathname === "/" || location.pathname === "/show_konfig" ? undefined : home)}
                className={"button_header left " + (location.pathname === "/" || location.pathname === "/show_konfig" ? "home" : "")} />
            <Logo id="tq" className="img" />
            <Back id="back" onClick={(location.pathname === "/" || location.pathname === "/results" || location.pathname === "/show_konfig" ? undefined : back)}
                className={"button_header right " + (location.pathname === "/" || location.pathname === "/results" || location.pathname === "/show_konfig" ? "home" : "")} />
        </header>
        <Outlet />
    </>
}


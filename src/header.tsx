import { Outlet, useLocation, useNavigate } from "react-router"
import { useWebSocket8000 } from "./hooks/websocket";
import Logo from "../public/assets/Logo.svg?react"
import House from "../public/assets/house.svg?react"
import Back from "../public/assets/back.svg?react"

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { sendMessage } = useWebSocket8000();

    //sendMessage(JSON.stringify({ type: location.pathname }))
    //console.log(location.pathname)
    //sendMessage(JSON.stringify("Websocket Connection created"))

    function home() {
        navigate("/")
        sendMessage(JSON.stringify({ type: "home" }))
    }

    function back() {
        navigate(-1)
    }

    return <>
        <header>
            <House id="home" onClick={(location.pathname !== "/" ? home : undefined)} className={"button_header left " + (location.pathname === "/" ? "home" : "")} />
            <Logo id="tq" className="img" />
            <Back id="back" onClick={(location.pathname === "/" || location.pathname === "/results" ? undefined : back)} className={"button_header right " + (location.pathname === "/" || location.pathname === "/results" ? "home" : "")} />
        </header>
        <Outlet />
    </>
}


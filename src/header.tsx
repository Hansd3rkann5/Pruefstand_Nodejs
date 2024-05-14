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
    console.log(running)

    function back() {
        navigate(-1)
    }

    return <>
        <header>
            <House id="home" onClick={(location.pathname === "/" || running === true ? undefined : home)}
                className={"button_header left " + (location.pathname === "/" || running === true ? "home" : "")} />
            <Logo id="tq" className="img" />
            <Back id="back" onClick={(location.pathname === "/" || location.pathname === "/results" || running === true ? undefined : back)}
                className={"button_header right " + (location.pathname === "/" || location.pathname === "/results" || running === true ? "home" : "")} />
        </header>
        <Outlet />
    </>
}


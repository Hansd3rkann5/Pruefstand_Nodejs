import { Outlet, useLocation, useNavigate } from "react-router"
import { useMyWebsocket } from "./hooks/websocket";

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { sendMessage } = useMyWebsocket();

    // sendMessage(JSON.stringify("Websocket Connection created"))

    function home() {
        navigate("/")
        sendMessage(JSON.stringify({ type: "home" }))
    }

    function back() {
        // if ( location.pathname === "" ) {
        //     sendMessage(JSON.stringify({ type: "home"}))
        // }
        // else {}
        navigate(-1)
        //console.log(navigate(-1))
    }

    return <>
        <header>
            <a>
                <img id="home" onClick={(location.pathname === "/" ? undefined : home)} className={"button_header left " + (location.pathname === "/" ? "home" : "")} src="/assets/house.svg" alt="" />
            </a>
            <img id="tq" className="img" src="/assets/Logo.svg" alt="B" />
            <a>
                <img id="back" onClick={(location.pathname === "/" || location.pathname === "/results" ? undefined : back)} className={"button_header right " + (location.pathname === "/" || location.pathname === "/results" ? "home" : "")} src="/assets/back.svg" alt="" />
            </a>
        </header>
        <Outlet />
    </>
}


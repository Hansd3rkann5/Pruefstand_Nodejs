import { Outlet, useLocation, useNavigate, useNavigation } from "react-router"
import { useMyWebsocket } from "./hooks/websocket";

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { sendMessage } = useMyWebsocket();

    // sendMessage(JSON.stringify("Websocket Connection created"))

    function home() {
        navigate("/")
        sendMessage(JSON.stringify({ type: "home"}))
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
                <img id="home" onClick={home} className={"button_header left " + (location.pathname==="/"?"home":"")} src="/static/house.svg" alt="" />
            </a>
            <img id="tq" className="img" src="/static/Logo.svg" alt="B" />
            <a>
                <img id="back" onClick={back} className={"button_header right " + (location.pathname==="/"?"home":"")} src="/static/back.svg" alt="" />
            </a>
        </header>
        <Outlet/>
    </>
}


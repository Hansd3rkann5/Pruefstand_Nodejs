import { ConfigCards } from "../components/ConfigCard";
import { useMyWebsocket } from "../hooks/websocket";



export const Show_Konfig: React.FC = () => {

    const { testcombinations } = useMyWebsocket()

    return <>
        <ConfigCards configs={testcombinations} />
    </>
}

//Matthias Schoppe
//Wolfgang Burger
//Alexander Elbers
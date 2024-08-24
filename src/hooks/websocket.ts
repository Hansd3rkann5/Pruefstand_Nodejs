/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket"
import { useNavigate } from "react-router"
import { useDeviceContext } from "./useDeviceContext";
import { Comp_Konfig, SingleConfig } from "./types";
import YAML from 'yaml'

let x = true

export function useWebSocket8000() {
    return useWebSocket<Record<string, any>>(
        "ws://" + window.location.hostname + ":8000" + "/ws/",
        { share: true, 'shouldReconnect': () => true, 'retryOnError': true, 'reconnectAttempts': 10000 });
}

export function useMyWebsocket() {
    const navigate = useNavigate();
    const socket = useWebSocket8000()
    const lastJM = socket.lastJsonMessage
    const [progress, setProgress] = useState(0)
    const [filename, setFilename] = useState('')
    const {
        master, setMaster,
        checkdone, setCheckdone,
        checkifconfig, setCheckifconfig,
        testnum, setTestnum,
        konfigquantity, setKonfigQuantity,
        running, setRunning,
        testcombinations, setTestcombinations,
        odds, setOdds,
        checkifauto, setCheckifauto,
        results, setResults,
    } = useDeviceContext()


    const reset = useCallback(() => {
        setCheckdone(false)
        setRunning(false)
        setMaster(undefined)
        setCheckifauto(false)
        setCheckifconfig(false)
        setTestnum(0)
        setKonfigQuantity(1)
        setRunning(false)
    }, [])

    useEffect(() => {
        if (lastJM) {
            if ("progress" in lastJM) {
                setProgress(lastJM["progress"])
                if (progress == 100) setRunning(false)
            }
            if ("done" in lastJM) {
                navigate("/results")
                reset()
            }
            if ("home" in lastJM) {
                reset()
            }
            if ("master" in lastJM) {
                setMaster(lastJM["master"])
                navigate("/")
            }
            if ("Upload erfolgreich" in lastJM) {
                setCheckifconfig(true)
                setRunning(true)
                navigate("/show_konfig")
            }
            if ("combinations" in lastJM) {
                if (master) setTestcombinations(map_relays(lastJM["combinations"], master))
                navigate("/show_konfig")
                setRunning(true)
            }
            if ("testnum" in lastJM) {
                setTestnum(lastJM["testnum"])
            }
            if ("manuell" in lastJM) {
                setCheckifauto(false)
            }
            if ("auto" in lastJM) {
                setCheckifauto(true)
            }
            if ("odds" in lastJM) {
                setOdds([...odds, lastJM["odds"]])
            }
            if ("konfigquantity" in lastJM) {
                setKonfigQuantity(lastJM["konfigquantity"])
            }
            if ("results" in lastJM) {
                setResults(lastJM["results"])
            }
            if ("filename" in lastJM) {
                setFilename(lastJM["filename"])
            }
            if ("download" in lastJM) {
                download_results(filename, lastJM["download"])
            }
        }
    }, [lastJM])
    return { ...socket, progress, master, testnum, konfigquantity, setKonfigQuantity, running, checkifauto, setCheckifauto, testcombinations, checkdone, checkifconfig, odds, results, filename }
}

function map_relays(combinations: (number | null)[][], master: Comp_Konfig): Partial<SingleConfig>[] {
    return combinations.map(combination => {
        const conf: Partial<SingleConfig> = {
            Motor: master.Motor.find(c => c.relay === combination[0]),
            Display: master.Display.find(c => c.relay === combination[1]),
            Battery: master.Battery.find(c => c.relay === combination[2]),
            Smartbox: master.Smartbox.find(c => c.relay === combination[3]),
            "Range EXT": master["Range EXT"].find(c => c.relay === combination[4]),
            "Ladegerät/Service Dongle": master["Ladegerät/Service Dongle"].find(c => c.relay === combination[5]),
        }
        return conf
    })
}

function download_results(filename: string, file: any) {
    if (x) {
        console.log(file)
        const text = YAML.stringify(file)
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename.slice(0, -8));

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
        x = false
        setTimeout(() => {
            x = true
        }, 1000)
    }
}
//import React, { useState, useCallback, useEffect } from 'react';
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket"
import { useNavigate, useLocation } from "react-router"
import { useDeviceContext } from "./useDeviceContext";
import { Comp_Konfig, SingleConfig } from "./types";
import YAML from 'yaml'

let x = true
console.log(x)

export function useWebSocket8000() {
    return useWebSocket<Record<string, any>>(
        "ws://" + window.location.hostname + ":8000" + "/ws/",
        { share: true });
}

export function useMyWebsocket() {
    const navigate = useNavigate();
    const socket = useWebSocket8000()
    const lastJM = socket.lastJsonMessage
    const [progress, setProgress] = useState(0)
    const {
        konfig, setKonfig,
        checkdone, setCheckdone,
        checkifconfig, setCheckifconfig,
        testnum, setTestnum,
        konfigquantity, setKonfigQuantity,
        running, setRunning,
        testcombinations, setTestcombinations,
        odds, setOdds,
        checkifauto, setCheckifauto,
    } = useDeviceContext()

    function reset() {
        setKonfig(undefined)
        setCheckifauto(false)
        setCheckifconfig(false)
        setTestnum(0)
        setKonfigQuantity(1)
        setRunning(false)
    }

    useEffect(() => {
        if (lastJM) {
            if ("progress" in lastJM) {
                setProgress(lastJM["progress"])
                if (progress == 100) {
                    setRunning(false)
                }
            }
            if ("done" in lastJM) {
                setCheckdone(false)
                setRunning(false)
                navigate("/results")
                reset()
            }
            if ("home" in lastJM) {
                reset()
            }
            if ("components_names" in lastJM) {
                setKonfig(lastJM["components_names"])
            }
            if ("Upload erfolgreich" in lastJM) {
                setCheckifconfig(true)
                setRunning(true)
                navigate("/show_konfig")
            }
            if ("combinations" in lastJM) {
                if (konfig) setTestcombinations(map_relays(lastJM["combinations"], konfig))
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
                download_results(lastJM["results"])
            }
        }
    }, [socket.lastMessage])
    return { sendMessage: socket.sendMessage, progress, konfig, testnum, konfigquantity, setKonfigQuantity, running, setCheckifauto, checkifauto, testcombinations, checkdone, checkifconfig, odds }
}

function map_relays(combinations: (number | null)[][], konfig: Comp_Konfig): Partial<SingleConfig>[] {
    return combinations.map(combination => {
        const conf: Partial<SingleConfig> = {
            Motor: konfig.Motor.find(c => c.relay === combination[0]),
            Display: konfig.Display.find(c => c.relay === combination[1]),
            Battery: konfig.Battery.find(c => c.relay === combination[2]),
            Smartbox: konfig.Smartbox.find(c => c.relay === combination[3]),
            "Range EXT": konfig["Range EXT"].find(c => c.relay === combination[4]),
            "Ladegerät/Service Dongle": konfig["Ladegerät/Service Dongle"].find(c => c.relay === combination[5]),
        }
        return conf
    })
}

function download_results(results: any) {
    if (window.location.hostname !== 'localhost' && x) {
        console.log('download results')
        let text = YAML.stringify(results)
        let currentdate = new Date();
        let datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + "@ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();
        let filename = 'TestResults_' + (datetime) + '.txt'
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
        x = false
    }
}
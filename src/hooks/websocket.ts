//import React, { useState, useCallback, useEffect } from 'react';
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket"
import { useNavigate } from "react-router"
import { useDeviceContext } from "./useDeviceContext";
import { Comp_Konfig, SingleConfig } from "./types";


export function useMyWebsocket() {
    const navigate = useNavigate();
    const socket = useWebSocket<Record<string, any>>(
        "ws://" + "127.0.0.1:8000" + "/ws/",
        { share: true });
    const lastJM = socket.lastJsonMessage
    const [ progress, setProgress ] = useState(0)
    const {
        konfig, setKonfig,
        checkdone, setCheckdone,
        checkifconfig, setCheckifconfig,
        testnum, setTestnum,
        testcombinations, setTestcombinations,
        odds, setOdds,
        checkifauto, setCheckifauto
    } = useDeviceContext()

    useEffect(() => {
        if (lastJM) {
            if ("progress" in lastJM) {
                setProgress(lastJM["progress"])
            }
            if ("done" in lastJM) {
                navigate("/results")
                //setCheckifconfig(false)
            }
            if ("components_names" in lastJM) {
                setKonfig(lastJM["components_names"])
            }
            if ("Upload erfolgreich" in lastJM) {
                setCheckifconfig(true)
                navigate("/show_konfig")
            }
            if ("combinations" in lastJM) {
                if (konfig) setTestcombinations(map_relays(lastJM["combinations"], konfig))
            }
            if ("testnum" in lastJM) {
                setTestnum(lastJM["testnum"])
            }
            if ("auto" in lastJM) {
                setCheckifauto(true)
            }
            if ("done" in lastJM) {
                setCheckdone(false)
            }
            if ("odds" in lastJM) {
                setOdds(lastJM["odds"])
            }
        }
    }, [socket.lastMessage])
    return { sendMessage: socket.sendMessage, progress: progress, konfig, testnum, testcombinations, checkdone, checkifconfig, checkifauto, odds }
}

function map_relays(combinations:(number|null)[][], konfig:Comp_Konfig): Partial<SingleConfig>[] {
    console.log(combinations)
    return combinations.map(combination=> {
        console.log(combination)
        const conf:Partial<SingleConfig> = {
            Motor:konfig.Motor.find(c=>c.relay===combination[0]),
            Display:konfig.Display.find(c=>c.relay===combination[1]),
            Battery:konfig.Battery.find(c=>c.relay===combination[2]),
            Charger:konfig.Charger.find(c=>c.relay===combination[3]),
            "Range EXT":konfig["Range EXT"].find(c=>c.relay===combination[4]),
            "Service Dongle":konfig["Service Dongle"].find(c=>c.relay===combination[5])
        }
        return conf
    })

}
//: SingleConfig[] 
//:(number|null)[]
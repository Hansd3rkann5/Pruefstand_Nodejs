//import React, { useState, useCallback, useEffect } from 'react';
import { Component, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket"
import { useNavigate } from "react-router"


type PruefstandKomponente = {name: string, adress: number}
export interface Comp_Konfig{
    Motor: PruefstandKomponente[]
    Display: PruefstandKomponente[]
    Battery: PruefstandKomponente[]
    Charger: PruefstandKomponente[]
    "Range EXT": PruefstandKomponente[]
    "Service Dongle": PruefstandKomponente[]
}

export function useMyWebsocket() {
    const navigate = useNavigate();
    const socket = useWebSocket<Record<string, any>>(
        "ws://" + "127.0.0.1:8000" + "/ws/",
        { share: true });
    const [progress, setProgress] = useState(0)
    const [konfig, setkonfig] = useState<Comp_Konfig>()

    useEffect(() => {
        if (socket.lastJsonMessage) {
            if ("progress" in socket.lastJsonMessage) {
                setProgress(socket.lastJsonMessage["progress"])
            }
            if ("done" in socket.lastJsonMessage) {
                navigate("/results")
            }
            if ("components_names" in socket.lastJsonMessage) {
                setkonfig(socket.lastJsonMessage["components_names"])
            }
            if ("Upload erfolgreich" in socket.lastJsonMessage) {
                navigate("/results")
            }
        }
    }, [socket.lastMessage])
    return {sendMessage:socket.sendMessage, progress:progress, konfig}
}